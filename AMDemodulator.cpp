#include <cstdio>
#include <cassert>
#include <cmath>
#include <unistd.h>
#include <complex>
#include <vector>
#include <liquid.h>
#include <algorithm>
#include <mutex>
#include "DataBuffer.h"
#include "AudioOutput.h"
#include "AMDemodulator.h"
#include "Waterfall.h"
#include "sdrberry.h"
#include "vfo.h"

void* am_demod_thread(void* ptr);
/** Compute RMS level over a small prefix of the specified sample vector. */

void	AMDemodulator::init(demod_struct * ptr)
{
	float	As = 60.0f;      // resampling filter stop-band attenuation [dB]
	float	mod_index  = 0.03125f; 
	
	
	// resampler and band filter
	m_r = (float)ptr->pcmrate / (float)ptr->ifrate; 
	m_audio_mean = m_audio_rms = m_audio_level = m_if_level = 0.0;
	m_source_buffer = ptr->source_buffer;
	if (m_r < 0.5)
	{
		printf("resample rate %f \n", m_r);
		m_bresample = true;
		m_q = msresamp_crcf_create(m_r, As);
		msresamp_crcf_print(m_q);			
	}
	m_demod = ampmodem_create(mod_index, ptr->mode, ptr->suppressed_carrier);
	tune_offset(vfo.get_vfo_offset());
	m_lowpass = iirfilt_crcf_create_lowpass(m_order, 0.03125);
	m_init = true;
}

void AMDemodulator::tune_offset(long offset)
{
		// get lock on modulator process
	unique_lock<mutex> lock(m_mutex);
	
	if (m_upnco != nullptr)
		nco_crcf_destroy(m_upnco);
	m_offset = offset;
	float rad_per_sample   = ((2.0f * (float)M_PI * (float)(vfo.get_vfo_offset())) / (float)ifrate);
	m_upnco = nco_crcf_create(LIQUID_NCO);
	nco_crcf_set_phase(m_upnco, 0.0f);
	nco_crcf_set_frequency(m_upnco, rad_per_sample);
}

void AMDemodulator::adjust_gain(IQSampleVector& samples_in, float vol)
{
	for (auto& col : samples_in)
	{
		col.real(col.real() * vol);
		col.imag(col.imag() * vol);
	}
}

void AMDemodulator::exit_demod()
{
	if (m_demod)
		ampmodem_destroy(m_demod);
	if (m_q)
		msresamp_crcf_destroy(m_q);
	iirfilt_crcf_destroy(m_lowpass);
	if (m_upnco != nullptr)
		nco_crcf_destroy(m_upnco);
}

AMDemodulator::~AMDemodulator()
{

}

void	AMDemodulator::set_filter(double if_rate, int band_width)
{
	double	factor {0.0625};
	
	unique_lock<mutex> lock(m_mutex); 
	iirfilt_crcf_destroy(m_lowpass);
	switch (band_width)
	{
	case 0:
		// 500hz
		factor = 0.00520833333333333;
		break;
	case 1:
		// 1Khz
		factor = 0.010416667;
		break;
	case 2:
		// 1.5 khz
		factor = 0.015625;
		break;
	case 3:
		// 2khz
		factor = 0.0208333333333333;
		break;
	case 4:
		// 2.5 khz
		factor = 0.0260416666666667;
		break;
	case 5:
		factor = 0.03125;
		// 3 Khz
		break;
	case 6:
		factor = 0.0364583333333333;
		//  3.5Khz
		break;
	case 7:
		factor = 0.0416666666666667;
		//  4Khz
		break;
	}
	m_lowpass = iirfilt_crcf_create_lowpass(m_order, factor);
	iirfilt_crcf_print(m_lowpass);
}

void	AMDemodulator::calc_if_level(const IQSampleVector& samples_in)
{
	double if_rms = rms_level_approx(samples_in);
	m_if_level = 0.95 * m_if_level + 0.05 * if_rms;
	//printf("if_rms level %f if_rms %f\n", m_if_level, if_rms);
}

void AMDemodulator::mono_to_left_right(const SampleVector& samples_mono,
	SampleVector& audio)
{
	unsigned int n = samples_mono.size();

	audio.resize(2*n);
	for (unsigned int i = 0; i < n; i++) {
		Sample m = samples_mono[i];
		audio[2*i]   = m;
		audio[2*i + 1] = m;
	}
}

void	AMDemodulator::process(const IQSampleVector&	samples_in, SampleVector& audio)
{
	unsigned int			num_written;
	SampleVector			audio_tmp, audio_mono;
	IQSampleVector			filter, buf_mix;
	IQSampleVector			buf_iffiltered; 
	
	// Downsample to pcmrate (pcmrate will be 44100 or 48000)
	unique_lock<mutex> lock(m_mutex); 
	buf_mix.clear();
	for (auto& col : samples_in)
	{
		complex<float> v;
		
		nco_crcf_step(m_upnco);
		nco_crcf_mix_down(m_upnco, col, &v);
		buf_mix.push_back(v);
	}
	// Take the FFT of the original baseband
	// The baseband for demodulation will be downmixed my vfo.setting.m_offset
	Fft_calc.process_samples(samples_in);
	Fft_calc.set_signal_strength(get_if_level()); 
	
	if (m_bresample)
	{
		float nx = (float)buf_mix.size() * m_r + 500;
		buf_iffiltered.reserve((int)ceilf(nx));
		buf_iffiltered.resize((int)ceilf(nx));
		msresamp_crcf_execute(m_q, (complex<float> *)buf_mix.data(), buf_mix.size(), (complex<float> *)buf_iffiltered.data(), &num_written);	
		buf_iffiltered.resize(num_written);
		filter.clear();
		for (auto& col : buf_iffiltered)
		{
			complex<float> v;
			iirfilt_crcf_execute(m_lowpass, col, &v);
			filter.insert(filter.end(), v);
		}
	}
	else
	{
		filter.clear();
		for (auto& col : buf_mix)
		{
			complex<float> v;
			iirfilt_crcf_execute(m_lowpass, col, &v);
			filter.insert(filter.end(), v);
		}
	}
		
	// apply audio filter set by user [2.2Khz, 2.4Khz, 2.6Khz, 3.0 Khz, ..]
    calc_if_level(filter);
	    
	for (auto& col : filter)  
	{
		float z {0};
		ampmodem_demodulate(get_am_demod(), (liquid_float_complex)col, &z);
		try
		{
			audio_mono.insert(audio_mono.end(), z);
		}
		catch (const std::exception& e)
		{
			std::cout << e.what() << "audio_mono.insert" << std::endl; 
		}	
	}
	mono_to_left_right(audio_mono, audio);
	buf_iffiltered.clear();
	filter.clear();
	buf_mix.clear();
}

pthread_t		am_thread;

int	create_am_thread(demod_struct *demod)
{
	return pthread_create(&am_thread, NULL, am_demod_thread, (void *)demod);
}


void* am_demod_thread(void* ptr)
{
	unsigned int            fft_block = 0;
	bool                    inbuf_length_warning = false;
	demod_struct			*demod_ptr = (demod_struct *)ptr;
	AudioOutput             *audio_output = demod_ptr->audio_output;
	SampleVector            audiosamples, audioframes;
	AMDemodulator			ammod;
	int						ifilter {-1};
	
	unique_lock<mutex> lock(am_finish); 
	vfo.set_tuner_offset(0);
	ammod.init(demod_ptr);
	Fft_calc.plan_fft(nfft_samples);  //
	while (!stop_flag.load())
	{
		if (vfo.tune_flag == true)
		{
			vfo.tune_flag = false;
			ammod.tune_offset(vfo.get_vfo_offset());
		}
		
		if (ifilter != filter)
		{
			ammod.set_filter(ifrate, filter);
			ifilter = filter;
		}
			
		if (!inbuf_length_warning && ammod.m_source_buffer->queued_samples() > 10 * 530000) {
			printf("\nWARNING: Input buffer is growing (system too slow) queued samples %u\n", ammod.m_source_buffer->queued_samples());
			inbuf_length_warning = true;
		}
		
		if (ammod.m_source_buffer->queued_samples() == 0)
		{
			usleep(5000);
			continue;
		}
		
		IQSampleVector iqsamples = ammod.m_source_buffer->pull();	
		if (iqsamples.empty())
		{
			usleep(5000);
			continue;
		}
		//process
		ammod.process(iqsamples, audiosamples);		
		// Measure audio level.
		samples_mean_rms(audiosamples, ammod.m_audio_mean, ammod.m_audio_rms);
		ammod.m_audio_level = 0.95 * ammod.m_audio_level + 0.05 * ammod.m_audio_rms;

		// Set nominal audio volume.
		audio_output->adjust_gain(audiosamples);
		for (auto& col : audiosamples)
		{
			audioframes.insert(audioframes.end(), col);
			if (audioframes.size() == (2 * audio_output->get_framesize()))
			{
				audio_output->write(audioframes);		
			}
		}
		iqsamples.clear();
		audiosamples.clear();
	}
	ammod.exit_demod();
	pthread_exit(NULL); 
}

static demod_struct	demod;

void start_dsb(int mode, double ifrate, int pcmrate, DataBuffer<IQSample> *source_buffer, AudioOutput *audio_output)
{	
	demod.source_buffer = source_buffer;
	demod.audio_output = audio_output;
	demod.pcmrate = pcmrate;
	demod.ifrate = ifrate;
	demod.tuner_offset = 0;    // not used 
	demod.downsample = 0;    //not used
	vfo.set_step(10, 0);
	
	printf("pcmrate %u\n", demod.pcmrate);
	printf("ifrate %f\n", demod.ifrate);
				
	switch (mode)
	{
	case mode_usb:
		demod.suppressed_carrier = 1;
		demod.mode = LIQUID_AMPMODEM_USB;
		printf("mode LIQUID_AMPMODEM_USB carrier %d\n", demod.suppressed_carrier);		
		break;
	case mode_lsb:
		demod.suppressed_carrier = 1;
		demod.mode = LIQUID_AMPMODEM_LSB;
		printf("mode LIQUID_AMPMODEM_LSB carrier %d\n", demod.suppressed_carrier);		
		break;
	case mode_am:
		demod.suppressed_carrier = 0;
		demod.mode = LIQUID_AMPMODEM_DSB;
		printf("mode LIQUID_AMPMODEM_DSB carrier %d\n", demod.suppressed_carrier);		
		break;
	case mode_dsb:
		demod.suppressed_carrier = 1;
		demod.mode = LIQUID_AMPMODEM_DSB;
		printf("mode LIQUID_AMPMODEM_DSB carrier %d\n", demod.suppressed_carrier);		
		break;
	default:
		printf("Mode not correct\n");		
		return;
	}
	create_am_thread(&demod);
	create_rx_streaming_thread(&soapy_devices[0]);
}
	

