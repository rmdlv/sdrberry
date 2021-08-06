
#include <cstdio>
#include <cmath>
#include <complex>
#include <liquid.h>
#include <vector>
#include <atomic>
#include <mutex>
#include <condition_variable>
#include "Waterfall.h"
#include "sdrberry.h"

Fft_calculator	Fft_calc;

Fft_calculator::Fft_calculator()
{

}

Fft_calculator::~Fft_calculator()
{
	fft_destroy_plan(plan);
}

void	Fft_calculator::process_samples(IQSampleVector	input)
{
	m_input.insert(m_input.end(), input.begin(), input.end());
	if (m_input.size() >= nfft)
	{
		std::unique_lock<std::mutex> lock(m_mutex); 
		plan = fft_create_plan(nfft, m_input.data(), fft_output.data(), type, flags);
		fft_execute(plan);
		m_input.clear();
	}
}

void	Fft_calculator::plan_fft(int size)
{
	nfft = size;
	fft_output.reserve(nfft); 
	m_input.reserve(nfft);
	plan = fft_create_plan(nfft, m_input.data(), fft_output.data(), type, flags);
	fft_output.resize(nfft); 
}



void Waterfall::init(lv_obj_t* scr, lv_coord_t x, lv_coord_t y, lv_coord_t w, lv_coord_t h)
{
	lv_style_init(&waterfall_style);
	lv_style_set_radius(&waterfall_style, 0);
	lv_style_set_bg_color(&waterfall_style, lv_color_black());
	
	chart = lv_chart_create(scr);
	lv_obj_add_style(chart, &waterfall_style, 0); 
	lv_obj_set_pos(chart, x, y); 
	lv_obj_set_size(chart, w, h - 50);
	lv_chart_set_range(chart, LV_CHART_AXIS_PRIMARY_Y, 0, 1000);
	lv_obj_set_style_pad_hor(scr, 0, LV_PART_MAIN);
	lv_obj_set_style_pad_ver(scr, 0, LV_PART_MAIN);
	
	lv_obj_set_style_size(chart, 0, LV_PART_INDICATOR);
	ser = lv_chart_add_series(chart, lv_palette_main(LV_PALETTE_RED), LV_CHART_AXIS_PRIMARY_Y);
	lv_obj_clear_flag(scr, LV_OBJ_FLAG_SCROLLABLE);
}


void Waterfall::load_data()
{
	int i = data_set.size();
	if (i > 0)
	{
		lv_chart_set_point_count(chart, i);
		lv_chart_set_ext_y_array(chart, ser, (lv_coord_t *)data_set.data());		
	}
}

void Fft_calculator::upload_fft(std::vector<lv_coord_t>& data_set)
{
	std::unique_lock<std::mutex> lock(m_mutex);
	int i = 0;
	data_set.resize(fft_output.size());
	for (auto& col : fft_output)
	{
		data_set[i++] = (lv_coord_t)200 * log10((10.0 * sqrt(col.real() * col.real() + col.imag() * col.imag())));
		//printf("%d \n", data_set[i++]);
	}
}

void Fft_calculator::set_signal_strength(double strength)
{
	std::unique_lock<std::mutex> lock(m_mutex);
	signal_strength =  20* log10(strength);
	//printf(" signal_strength %f \n", signal_strength);
}

double Fft_calculator::get_signal_strength()
{
	std::unique_lock<std::mutex> lock(m_mutex);
	return signal_strength ;
}
