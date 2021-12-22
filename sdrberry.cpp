#include "sdrberry.h"
#include "Mouse.h"
#include "Catinterface.h"
#include "BandFilter.h"
#include "Demodulator.h"
#include "FMDemodulator.h"
#include "FMModulator.h"
#include "AMModulator.h"

AudioOutput *audio_output;
AudioInput *audio_input;
DataBuffer<IQSample>	source_buffer_rx;
DataBuffer<IQSample16>	source_buffer_tx;
DataBuffer<Sample>		audiooutput_buffer;
DataBuffer<Sample>		audioinput_buffer;

LV_FONT_DECLARE(FreeSansOblique42);
LV_FONT_DECLARE(FreeSansOblique32);

#define MAX(x, y) (((x) > (y)) ? (x) : (y))
#define MIN(x, y) (((x) < (y)) ? (x) : (y))

// display buffer size - not sure if this size is really needed
#define DISP_BUF_SIZE 384000		// 800x480
//#define DISP_BUF_SIZE (128 * 1024)

const int screenWidth = 800;
const int screenHeight = 480;
const int bottomHeight = 40;
const int topHeight = 35;
const int tunerHeight = 100;
const int barHeight = 90;
const int nobuttons = 8;
const int bottombutton_width = (screenWidth / nobuttons) - 2;
const int bottombutton_width1 = (screenWidth / nobuttons);

lv_obj_t* scr;
lv_obj_t* bg_middle;
lv_obj_t* vfo1_button;
lv_obj_t* vfo2_button;
lv_obj_t *tabview_mid;
lv_obj_t *bar_view;
lv_obj_t *tab_buttons;

using namespace std;

atomic_bool stop_flag(false);
atomic_bool stop_tx_flag(false);
atomic_bool	stop_txmod_flag(false);

std::mutex gui_mutex;

int					mode = mode_broadband_fm;
double				ifrate  = 0.53e6;  //1.0e6;//
double				ifrate_tx;
bool				stereo  = true;
int					pcmrate = 48000;
double				freq = 89800000;
//double	tuner_freq = freq + 0.25 * ifrate;
//double	tuner_offset = freq - tuner_freq;

mutex			fm_finish;
Mouse			Mouse_dev;
Catinterface	catinterface;
BandFilter		bpf;

MidiControle	*midicontrole = nullptr;
auto			startTime = std::chrono::high_resolution_clock::now();

SdrDeviceVector		SdrDevices;
std::string			default_radio;
int					default_rx_channel = 0;
int					default_tx_channel = 0;

int main(int argc, char *argv[])
{
	
	Settings_file.read_settings(std::string("sdrberry_settings.cfg"));
	Mouse_dev.init_mouse(Settings_file.find_input("mouse"));

	catinterface.begin();
	std::thread thread_catinterface(std::ref(catinterface));
	thread_catinterface.detach();

	string s = Settings_file.find_audio("device");	
	audio_output = new AudioOutput();
	if (!audio_output) 
	{
		fprintf(stderr, "ERROR: AudioOutput\n");
		exit(1);
	}
	audio_output->init(s, pcmrate, &audiooutput_buffer);
	audio_input = new AudioInput();
	if (!(*audio_input)) {
		fprintf(stderr, "ERROR: AudioInput\n");
	}	
	audio_input->init(s, pcmrate, false, &audioinput_buffer);
	audio_output->set_volume(50);
	
	bpf.initFilter();
	
	std::string smode = Settings_file.find_vfo1("Mode");
	mode = Settings_file.convert_mode(smode);
	
	/*LittlevGL init*/
	lv_init();

	/*Linux frame buffer device init*/
	fbdev_init();

	// Touch pointer device init
	evdev_init();
	
	/*A small buffer for LittlevGL to draw the screen's content*/
	static lv_color_t buf[DISP_BUF_SIZE];

	/*Initialize a descriptor for the buffer*/
	static lv_disp_draw_buf_t disp_buf;
	lv_disp_draw_buf_init(&disp_buf, buf, NULL, DISP_BUF_SIZE);

	/*Initialize and register a display driver*/
	static lv_disp_drv_t disp_drv;
	lv_disp_drv_init(&disp_drv);
	disp_drv.draw_buf   = &disp_buf;
	disp_drv.flush_cb   = fbdev_flush;
	disp_drv.hor_res    = screenWidth;
	disp_drv.ver_res    = screenHeight;
	lv_disp_drv_register(&disp_drv);
	
	// Initialize and register a pointer device driver
	lv_indev_drv_t indev_drv;
	lv_indev_drv_init(&indev_drv);
	indev_drv.type = LV_INDEV_TYPE_POINTER;
	indev_drv.read_cb = evdev_read;       // defined in lv_drivers/indev/evdev.h
	lv_indev_drv_register(&indev_drv);
	
	lv_theme_t* th = lv_theme_default_init(NULL, lv_palette_main(LV_PALETTE_BLUE), lv_palette_main(LV_PALETTE_CYAN), LV_THEME_DEFAULT_DARK, &lv_font_montserrat_14);
	lv_disp_set_theme(NULL, th);
	scr = lv_scr_act();
	
	setup_top_bar(scr);
	gui_vfo_inst.gui_vfo_init(scr);
	
	static lv_style_t background_style;
		
	lv_style_init(&background_style);
	lv_style_set_radius(&background_style, 0);
	lv_style_set_bg_color(&background_style, lv_palette_main(LV_PALETTE_RED));
	
	lv_obj_t * obj1;
	bar_view = lv_obj_create(lv_scr_act());
	lv_obj_set_pos(bar_view, 0, topHeight + tunerHeight );
	lv_obj_set_size(bar_view, LV_HOR_RES - 3, barHeight);
	
	
	tabview_mid = lv_tabview_create(lv_scr_act(), LV_DIR_BOTTOM, 40);
	lv_obj_set_pos(tabview_mid, 0, topHeight + tunerHeight + barHeight);
	lv_obj_set_size(tabview_mid, LV_HOR_RES - 3, screenHeight - topHeight - tunerHeight - barHeight);
	
	lv_obj_t *tab1 = lv_tabview_add_tab(tabview_mid, "Spectrum");
	lv_obj_t *tab2 = lv_tabview_add_tab(tabview_mid, "Band");
	lv_obj_t *tab3 = lv_tabview_add_tab(tabview_mid, LV_SYMBOL_KEYBOARD);
	lv_obj_t *tab4 = lv_tabview_add_tab(tabview_mid, "Mode");
	lv_obj_t *tab5 = lv_tabview_add_tab(tabview_mid, "Agc");
	lv_obj_t *tab6 = lv_tabview_add_tab(tabview_mid, "TX");
	lv_obj_t *tab7 = lv_tabview_add_tab(tabview_mid, LV_SYMBOL_SETTINGS);	
	
	lv_obj_clear_flag(lv_tabview_get_content(tabview_mid), LV_OBJ_FLAG_SCROLL_CHAIN | LV_OBJ_FLAG_SCROLLABLE | LV_OBJ_FLAG_SCROLL_MOMENTUM | LV_OBJ_FLAG_SCROLL_ONE);
	tab_buttons = lv_tabview_get_tab_btns(tabview_mid);
	Wf.init(tab1, 0, 0, LV_HOR_RES - 3, screenHeight - topHeight - tunerHeight);	
	Gui_rx.gui_rx_init(tab4, LV_HOR_RES - 3);
	gagc.init(tab5, LV_HOR_RES - 3);
	Gui_tx.gui_tx_init(tab6, LV_HOR_RES - 3);
	gsetup.init(tab7, LV_HOR_RES - 3);
	lv_btnmatrix_set_btn_ctrl(tab_buttons, 5, LV_BTNMATRIX_CTRL_HIDDEN);
	
	if (Settings_file.get_mac_address() != std::string(""))
	{
		//create_ble_thread(Settings_file.get_mac_address());
		
		Ble_instance.set_mac_address(Settings_file.get_mac_address());
		std::thread thread_ble(std::ref(Ble_instance));
		thread_ble.detach();
	}
	
	
	//Ble_instance.set_mac_address(Settings_file.get_mac_address());
	//Ble_instance.setup_ble();	
	

	Gui_rx.set_gui_mode(mode);
		
	ifrate = Settings_file.find_samplerate(Settings_file.find_sdr("default").c_str());
	ifrate_tx = Settings_file.find_samplerate_tx(Settings_file.find_sdr("default").c_str());
	if (ifrate_tx == 0)
		ifrate_tx = ifrate;
	printf("samperate %f \n", ifrate);
	keyb.init_keyboard(tab3, LV_HOR_RES - 3, screenHeight - topHeight - tunerHeight);
	
	default_radio = Settings_file.find_sdr("default");
	std::cout << "default sdr: " << Settings_file.find_sdr("default").c_str() << std::endl;
	default_rx_channel = 0;
	default_tx_channel = 0;
		
	midicontrole = new(MidiControle);
	if (midicontrole)
	{
		int ports = midicontrole->check_midi_input();
		if (ports > 1)
			midicontrole->openport(1);
	}
	SoapySDR::ModuleManager mm(false);
	SoapySDR::loadModules();
	freq = Settings_file.find_vfo1_freq("freq");
	
	for (auto & con : Settings_file.receivers)
	{
		std::string probe = Settings_file.find_probe((char *)con.c_str());
		SdrDevices.AddDevice(con, probe);
	}
	
	if (SdrDevices.MakeDevice(default_radio))
	{	
		gbar.init(bar_view, mode, LV_HOR_RES - 3, barHeight);
		SoapySDR::Range r = SdrDevices.get_full_frequency_range(default_radio, default_rx_channel);
		std::string start_freq = std::to_string(r.minimum() / 1.0e6);
		std::string stop_freq = std::to_string(r.maximum() / 1.0e6);
		std::string s = std::string(default_radio.c_str()) + " " + start_freq + " Mhz - " + stop_freq + " Mhz";
		lv_label_set_text(label_status, s.c_str()); 
		if (SdrDevices.get_tx_channels(default_radio) < 1) // for now assume only 1 tx channel
			default_tx_channel = -1;
		else
			default_tx_channel = 0;
		vfo.set_vfo_range(r.minimum(),r.maximum());	
		vfo.vfo_init((long)ifrate, pcmrate, &SdrDevices, default_radio, default_rx_channel, default_tx_channel);
		try
		{
			if (SdrDevices.SdrDevices[default_radio]->get_txchannels() > 0)
			{
				lv_btnmatrix_clear_btn_ctrl(tab_buttons, 5, LV_BTNMATRIX_CTRL_HIDDEN);
				Gui_tx.set_sample_rate((int)ifrate_tx);
				Gui_tx.set_drv_range();
				for (auto& col : SdrDevices.SdrDevices.at(default_radio)->get_tx_sample_rates(default_tx_channel))
				{
					int v = (int)col;
					Gui_tx.add_sample_rate(v);
				}
			}
		}
		catch (const std::exception& e)
		{
			std::cout << e.what();
		}

		gsetup.set_radio(default_radio);		
		try
		{	
			for (auto& col : SdrDevices.SdrDevices.at(default_radio)->get_rx_sample_rates(default_rx_channel))
			{
				int v = (int)col;
				gsetup.add_sample_rate(v);
			}
		}
		catch (const std::exception& e)
		{
			std::cout << e.what();
		}
		gsetup.set_sample_rate((int)ifrate);
		try
		{
			SdrDevices.SdrDevices.at(default_radio)->setSampleRate(SOAPY_SDR_RX, 0, ifrate);
		}
		catch (const std::exception& e)
		{
			std::cout << e.what();
		}
		gui_band_instance.init_button_gui(tab2, LV_HOR_RES - 3, SdrDevices.get_full_frequency_range_list(default_radio, default_rx_channel));
		gbar.set_vol_slider(Settings_file.volume());
		catinterface.SetAG(Settings_file.volume());
		gagc.set_gain_range();
		gbar.set_gain_range();
		gagc.set_gain_slider(Settings_file.gain());	
		gbar.set_gain_slider(Settings_file.gain());	
		vfo.set_vfo(freq, false);
		select_mode(mode); // start streaming
	}
	else
	{
		gbar.init(bar_view, mode, LV_HOR_RES - 3, barHeight); 
		lv_label_set_text(label_status, "No SDR Device Found");
		gsetup.set_radio(default_radio);
	}
	
	/*Handle LitlevGL tasks (tickless mode)*/
	auto timeLastStatus = std::chrono::high_resolution_clock::now(); 
	while (1) {
		gui_mutex.lock();
		lv_task_handler();
		Mouse_dev.step_vfo();
		const auto now = std::chrono::high_resolution_clock::now();
		if (timeLastStatus + std::chrono::milliseconds(200) < now && !stop_flag.load())
		{
			timeLastStatus = now;
			Fft_calc.upload_fft(Wf.data_set);
			Wf.load_data();
			double s = Fft_calc.get_signal_strength();
			set_s_meter(s);
		}
		
		if (midicontrole)
			midicontrole->read_midi_input();
		set_time_label();
		gui_mutex.unlock();
		usleep(5000);
	}
	delete audio_output;
	if (midicontrole)
		delete midicontrole;
	return 0;
}

/*Set in lv_conf.h as `LV_TICK_CUSTOM_SYS_TIME_EXPR`*/
uint32_t custom_tick_get(void)
{
	static uint64_t start_ms = 0;
	if (start_ms == 0) {
		struct timeval tv_start;
		gettimeofday(&tv_start, NULL);
		start_ms = (tv_start.tv_sec * 1000000 + tv_start.tv_usec) / 1000;
	}

	struct timeval tv_now;
	gettimeofday(&tv_now, NULL);
	uint64_t now_ms;
	now_ms = (tv_now.tv_sec * 1000000 + tv_now.tv_usec) / 1000;

	uint32_t time_ms = now_ms - start_ms;
	return time_ms;
}

void destroy_demodulators()
{
	FMDemodulator::destroy_demodulator();
	AMDemodulator::destroy_demodulator();
	AMModulator::destroy_modulator();
	FMModulator::destroy_modulator();
	RX_Stream::destroy_rx_streaming_thread();
	TX_Stream::destroy_tx_streaming_thread();
}

void stop_rxtx()
{
	// wait for threads to finish
	printf("select_mode_rx stop all threads\n");
	destroy_demodulators();
	stop_flag = true;
	unique_lock<mutex> lock_fm(fm_finish); 
	lock_fm.unlock();
	audio_input->close();  
	audio_output->close(); 
}

void select_mode(int s_mode, bool bvfo)
{	
	if (!SdrDevices.isValid(default_radio))
		return;
	startTime = std::chrono::high_resolution_clock::now(); 
	// wait for threads to finish
	printf("select_mode_rx stop all threads\n");
	// stop transmit and close audio input
	
	destroy_demodulators();
	printf("stop am_tx\n");
	stop_flag = true; 
	unique_lock<mutex> lock_fm(fm_finish); 
	lock_fm.unlock();
	stop_tx_flag = false;
	stop_flag = false;
	mode = s_mode;
	if (SdrDevices.get_tx_channels(default_radio) > 0)
		Gui_tx.set_tx_state(false);
	vfo.vfo_rxtx(true, false);
	vfo.set_freq_to_sdr();
	if (bvfo)
	{
		vfo.set_vfo(0, false);
		vfo.set_mode(0, mode);
	}
	printf("select_mode_rx start rx threads\n");
	switch (mode)
	{
	case mode_narrowband_fm:
		FMDemodulator::create_demodulator(ifrate, pcmrate, &source_buffer_rx, audio_output);
		RX_Stream::create_rx_streaming_thread(default_radio, default_rx_channel, &source_buffer_rx);
		break;
	
	case mode_broadband_fm:
		audio_output->open(); 
		start_fm(ifrate, pcmrate, true, &source_buffer_rx, audio_output);
		RX_Stream::create_rx_streaming_thread(default_radio, default_rx_channel, &source_buffer_rx); 
		break;
		
	case mode_am:
	case mode_dsb:
	case mode_usb:
	case mode_lsb:
		vfo.set_step(10, 0);
		AMDemodulator::create_demodulator(mode, ifrate, pcmrate, &source_buffer_rx, audio_output);
		RX_Stream::create_rx_streaming_thread(default_radio, default_rx_channel, &source_buffer_rx);
		break;
	}
}

void select_mode_tx(int s_mode, int tone)
{
	// Stop all threads
	if (!SdrDevices.isValid(default_radio))
		return;
	startTime = std::chrono::high_resolution_clock::now();
	auto now = std::chrono::high_resolution_clock::now();
	std::chrono::duration<double> timePassed = now - startTime;
	printf("select_mode_tx stop all threads time %4.2f\n", (double)timePassed.count() * 1000000.0);
	destroy_demodulators();
	
	//printf("select_mode_tx stop all threads\n");
	stop_flag = true;
	// wait for threads to finish
	unique_lock<mutex> lock_fm(fm_finish); 
	lock_fm.unlock();
	
	stop_flag = false;
	mode = s_mode;
	audio_output->close();
	if (tone == 0)
		audio_input->open();
	Gui_tx.set_tx_state(true); // set tx button
	vfo.vfo_rxtx(false, true);
	vfo.set_vfo(0, false);
	printf("select_mode_tx start tx threads\n");
	try
	{
		SdrDevices.SdrDevices.at(default_radio)->setGain(SOAPY_SDR_TX, default_rx_channel, (double)Gui_tx.get_drv_pos());
	}
	catch (const std::exception& e)
	{
		std::cout << e.what();
		return;
	}
	switch (mode)
	{	
	case mode_broadband_fm:
		//start_fm_tx(ifrate, pcmrate, true, &source_buffer_tx, audio_output);
		//mode_running = 1;
		break;
	
	case mode_narrowband_fm:
		FMModulator::create_modulator(mode, ifrate_tx, pcmrate, tone, &source_buffer_tx, audio_input);
		TX_Stream::create_tx_streaming_thread(default_radio, default_rx_channel, &source_buffer_tx, ifrate_tx);
		break;
		
	case mode_cw:
	case mode_am:
	case mode_dsb:
	case mode_usb:
	case mode_lsb:
		AMModulator::create_modulator(mode, ifrate_tx, pcmrate, tone, &source_buffer_tx, audio_input);
		TX_Stream::create_tx_streaming_thread(default_radio, default_rx_channel, &source_buffer_tx, ifrate_tx);
		break;
	}
}


void	switch_sdrreceiver(std::string receiver)
{
	/// First switchoff current receiver
	stop_rxtx();
	SdrDevices.UnMakeDevice(default_radio);
	default_radio = receiver;
	// Hide TX page
	lv_btnmatrix_set_btn_ctrl(tab_buttons, 5, LV_BTNMATRIX_CTRL_HIDDEN);
	if (SdrDevices.MakeDevice(default_radio))
	{
		// set top line with receiver information
		SoapySDR::Range r = SdrDevices.get_full_frequency_range(default_radio, default_rx_channel);
		std::string start_freq = std::to_string(r.minimum() / 1.0e6);
		std::string stop_freq = std::to_string(r.maximum() / 1.0e6);
		std::string s = std::string(default_radio.c_str()) + " " + start_freq + " Mhz - " + stop_freq + " Mhz";
		lv_label_set_text(label_status, s.c_str());
		if (SdrDevices.get_tx_channels(default_radio) < 1) // for now assume only 1 tx channel
			default_tx_channel = -1;
		else
			default_tx_channel = 0;
		vfo.set_vfo_range(r.minimum(), r.maximum());	
		vfo.vfo_init((long)ifrate, pcmrate, &SdrDevices, default_radio, default_rx_channel, default_tx_channel);
		try
		{
			if (SdrDevices.SdrDevices[default_radio]->get_txchannels() > 0)
			{
				lv_btnmatrix_clear_btn_ctrl(tab_buttons, 5, LV_BTNMATRIX_CTRL_HIDDEN);
				Gui_tx.clear_sample_rate();
				Gui_tx.set_sample_rate((int)ifrate_tx);
				Gui_tx.set_drv_range();
				for (auto& col : SdrDevices.SdrDevices.at(default_radio)->get_tx_sample_rates(default_tx_channel))
				{
					int v = (int)col;
					Gui_tx.add_sample_rate(v);
				}
			}
		}
		catch (const std::exception& e)
		{
			std::cout << e.what();
		}
		// Rx sample rates
		ifrate = Settings_file.find_samplerate(default_radio.c_str());
		ifrate_tx = Settings_file.find_samplerate_tx(default_radio.c_str());
		if (ifrate_tx == 0)
			ifrate_tx = ifrate;
		printf("samperate rx%f sample rate tx %f\n", ifrate, ifrate_tx);
		gsetup.clear_sample_rate();
		try
		{	
			for (auto& col : SdrDevices.SdrDevices.at(default_radio)->get_rx_sample_rates(default_rx_channel))
			{
				int v = (int)col;
				gsetup.add_sample_rate(v);
			}
		}
		catch (const std::exception& e)
		{
			std::cout << e.what();
		}
		gsetup.set_sample_rate((int)ifrate);
		try
		{
			SdrDevices.SdrDevices.at(default_radio)->setSampleRate(SOAPY_SDR_RX, 0, ifrate);
		}
		catch (const std::exception& e)
		{
			std::cout << e.what();
		}
		gui_band_instance.init_button_gui(nullptr, LV_HOR_RES - 3, SdrDevices.get_full_frequency_range_list(default_radio, default_rx_channel));
		gbar.set_vol_slider(Settings_file.volume());
		catinterface.SetAG(Settings_file.volume());
		gagc.set_gain_range();
		gbar.set_gain_range();
		gagc.set_gain_slider(Settings_file.gain());	
		gbar.set_gain_slider(Settings_file.gain());	
		vfo.set_vfo(freq, false);
		select_mode(mode); // start streaming
	}
}


/*
 *
 *const auto startTime = std::chrono::high_resolution_clock::now();
		const auto now = std::chrono::high_resolution_clock::now();
		const auto timePassed = std::chrono::duration_cast<std::chrono::microseconds>(now - startTime);			
		printf("create demodulator %lld\n", timePassed.count());
 *
 **/