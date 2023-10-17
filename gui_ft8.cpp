#include "gui_ft8.h"
#include "gui_ft8bar.h"


extern const int screenWidth;
extern const int screenHeight;
extern const int bottomHeight;
extern const int topHeight;
extern const int tunerHeight;

gui_ft8 gft8;

static void qso_press_part_event_cb(lv_event_t *e)
{
	lv_obj_t *obj = lv_event_get_target(e);
	lv_table_t *table = (lv_table_t *)obj;
	uint16_t row, col;
	char *ptr;
	int db, length;

	lv_table_get_selected_cell(obj, &row, &col);
	if (lv_table_get_row_cnt(obj) < row+1)
		return;
	ptr = (char *)lv_table_get_cell_value(obj, row, 1);
	if (ptr != nullptr)
		db = atoi(ptr);
	ptr = (char *)lv_table_get_cell_value(obj, row, col);
	std::string str(ptr);
	size_t i = str.find(' ');
	size_t q = str.rfind(' ');
	if (i != string::npos && q != string::npos && (q-i-1) > 0)
		guift8bar.setMessage(str.substr(i+1, q -i - 1), db, 2);
}

static void press_part_event_cb(lv_event_t *e)
{
	lv_obj_t *obj = lv_event_get_target(e);
	lv_table_t *table = (lv_table_t *)obj;
	uint16_t row, col;
	char *ptr;
	int db, length;

	lv_table_get_selected_cell(obj, &row, &col);
	ptr = (char *)lv_table_get_cell_value(obj, row, 1);
	if (ptr != nullptr)
		db = atoi(ptr);
	ptr = (char *)lv_table_get_cell_value(obj, row, col);
	std::string str(ptr);

	std::string::iterator new_end =
		std::unique(str.begin(), str.end(),
					[](char lhs, char rhs) { return (lhs == rhs) && (lhs == ' '); });
	str.erase(new_end, str.end());
	if (str.rfind("CQ ", 0) == 0)
	{
		int i = str.find(' ',3) - 3;
		if (i > 0)
			guift8bar.setMessage(str.substr(3, i), db);
		else
			guift8bar.setMessage(str.substr(3), db);
		gft8.cpy_qso(row);
		gft8.QsoScrollLatestItem();
	}
}

static void qso_draw_part_event_cb(lv_event_t *e)
{
	lv_obj_t *obj = lv_event_get_target(e);
	lv_table_t *table = (lv_table_t *)obj;
	lv_obj_draw_part_dsc_t *dsc = (lv_obj_draw_part_dsc_t *)lv_event_get_param(e);
	/*If the cells are drawn...*/
	if (dsc->part == LV_PART_ITEMS)
	{
		uint32_t row = dsc->id / lv_table_get_col_cnt(obj);
		uint32_t col = dsc->id - row * lv_table_get_col_cnt(obj);

		/*Make the texts in the first cell center aligned*/

		/*MAke every 2nd row grayish*/
		if (col == 3)
		{
			char *ptr = table->cell_data[((col + 1) * (row + 1)) - 1] + 1;
			if (strstr(ptr, gft8.getcall().c_str()) != NULL)
			{
				dsc->rect_dsc->bg_color = lv_color_mix(lv_palette_main(LV_PALETTE_ORANGE), dsc->rect_dsc->bg_color, LV_OPA_30);
				dsc->rect_dsc->bg_opa = LV_OPA_COVER;
			}
		}
	}
}

static void draw_part_event_cb(lv_event_t *e)
{
	lv_obj_t *obj = lv_event_get_target(e);
	lv_table_t *table = (lv_table_t *)obj;
	lv_obj_draw_part_dsc_t *dsc = (lv_obj_draw_part_dsc_t *)lv_event_get_param(e);
	/*If the cells are drawn...*/
	if (dsc->part == LV_PART_ITEMS)
	{
		uint32_t row = dsc->id / lv_table_get_col_cnt(obj);
		uint32_t col = dsc->id - row * lv_table_get_col_cnt(obj);

		/*Make the texts in the first cell center aligned*/

		/*MAke every 2nd row grayish*/
		if (col == 3)
		{
			char *ptr = table->cell_data[((col+1) * (row+1))-1] + 1;
			if (strstr(ptr, "CQ ") != NULL)
			{
				dsc->rect_dsc->bg_color = lv_color_mix(lv_palette_main(LV_PALETTE_GREEN), dsc->rect_dsc->bg_color, LV_OPA_30);
				dsc->rect_dsc->bg_opa = LV_OPA_COVER;
			}
			if (strstr(ptr, gft8.getcall().c_str()) != NULL)
			{
				dsc->rect_dsc->bg_color = lv_color_mix(lv_palette_main(LV_PALETTE_ORANGE), dsc->rect_dsc->bg_color, LV_OPA_30);
				dsc->rect_dsc->bg_opa = LV_OPA_COVER;
			}
			if (strstr(ptr, guift8bar.GetFilter().c_str()) != NULL && guift8bar.GetFilter().length() > 0) 
			{
				dsc->rect_dsc->bg_color = lv_color_mix(lv_palette_main(LV_PALETTE_YELLOW), dsc->rect_dsc->bg_color, LV_OPA_30);
				dsc->rect_dsc->bg_opa = LV_OPA_COVER;
			}
		}
	}
}

void gui_ft8::init(lv_obj_t *o_tab, lv_coord_t x, lv_coord_t y, lv_coord_t w, lv_coord_t h)
{

	const lv_coord_t x_margin = 10;
	const lv_coord_t y_margin = 5;
	const int x_number_buttons = 5;
	const int y_number_buttons = 4;
	const lv_coord_t tab_margin = 20;

	int button_width_margin = ((w - tab_margin) / x_number_buttons);
	int button_width = ((w - tab_margin) / x_number_buttons) - x_margin;
	int button_height = 50;
	int button_height_margin = button_height + y_margin;
	int ibutton_x = 0, ibutton_y = 0;

	lv_style_init(&ft8_style);
	lv_style_set_radius(&ft8_style, 0);
	lv_style_set_bg_color(&ft8_style, lv_color_black());
	
	lv_style_init(&style_btn);
	lv_style_set_radius(&style_btn, 10);
	lv_style_set_bg_color(&style_btn, lv_color_make(0x60, 0x60, 0x60));
	lv_style_set_bg_grad_color(&style_btn, lv_color_make(0x00, 0x00, 0x00));
	lv_style_set_bg_grad_dir(&style_btn, LV_GRAD_DIR_VER);
	lv_style_set_bg_opa(&style_btn, 255);
	lv_style_set_border_color(&style_btn, lv_color_make(0x9b, 0x36, 0x36)); // lv_color_make(0x2e, 0x44, 0xb2)
	lv_style_set_border_width(&style_btn, 2);
	lv_style_set_border_opa(&style_btn, 255);
	lv_style_set_outline_color(&style_btn, lv_color_black());
	lv_style_set_outline_opa(&style_btn, 255);
	lv_obj_clear_flag(o_tab, LV_OBJ_FLAG_SCROLLABLE);
	//m_button_group = lv_group_create();
	lv_obj_set_style_pad_hor(o_tab, 0, LV_PART_MAIN);
	lv_obj_set_style_pad_ver(o_tab, 0, LV_PART_MAIN);
	
	table = lv_table_create(o_tab);
	lv_obj_add_event_cb(table, draw_part_event_cb, LV_EVENT_DRAW_PART_BEGIN, NULL);
	lv_obj_add_event_cb(table, press_part_event_cb, LV_EVENT_PRESSED, NULL);
	
	lv_obj_add_style(table, &ft8_style, 0);
	//lv_obj_align(table, LV_ALIGN_TOP_LEFT, w, h);
	lv_obj_set_pos(table, x, y);
	lv_obj_set_size(table, w/2, h);

	lv_obj_set_style_pad_top(table, 2, LV_PART_MAIN);
	lv_obj_set_style_pad_bottom(table, 2, LV_PART_MAIN);
	lv_obj_set_style_pad_left(table, 2, LV_PART_MAIN);
	lv_obj_set_style_pad_right(table, 2, LV_PART_MAIN);
	lv_obj_set_style_pad_ver(table, 0, LV_PART_ITEMS);

	lv_obj_set_style_pad_left(table, 0, LV_PART_ITEMS);
	lv_obj_set_style_pad_right(table, 0, LV_PART_ITEMS);

	
	lv_table_set_cell_value(table, 0, 0, "Time");
	lv_table_set_col_width(table, 0, w/12);
	lv_table_set_cell_value(table, 0, 1, "db");
	lv_table_set_col_width(table, 1, w/16);
	lv_table_set_cell_value(table, 0, 2, "Freq");
	lv_table_set_col_width(table, 2, w/12);
	lv_table_set_cell_value(table, 0, 3, "Message");
	lv_table_set_col_width(table, 3, w/2 - (w / 12 + w / 16 + w / 12) - 10);
	m_cycle_count++;

	qsoTable = lv_table_create(o_tab);
	lv_obj_add_event_cb(qsoTable, qso_draw_part_event_cb, LV_EVENT_DRAW_PART_BEGIN, NULL);
	lv_obj_add_event_cb(qsoTable, qso_press_part_event_cb, LV_EVENT_PRESSED, NULL);

	lv_obj_add_style(qsoTable, &ft8_style, 0);
	//lv_obj_align(table, LV_ALIGN_TOP_LEFT, w, h);
	lv_obj_set_pos(qsoTable, w / 2, y);
	lv_obj_set_size(qsoTable, w / 2, h);

	lv_obj_set_style_pad_top(qsoTable, 2, LV_PART_MAIN);
	lv_obj_set_style_pad_bottom(qsoTable, 2, LV_PART_MAIN);
	lv_obj_set_style_pad_left(qsoTable, 2, LV_PART_MAIN);
	lv_obj_set_style_pad_right(qsoTable, 2, LV_PART_MAIN);
	lv_obj_set_style_pad_ver(qsoTable, 0, LV_PART_ITEMS);

	lv_obj_set_style_pad_left(qsoTable, 0, LV_PART_ITEMS);
	lv_obj_set_style_pad_right(qsoTable, 0, LV_PART_ITEMS);

	lv_table_set_cell_value(qsoTable, 0, 0, "Time");
	lv_table_set_col_width(qsoTable, 0, w / 12);
	lv_table_set_cell_value(qsoTable, 0, 1, "db");
	lv_table_set_col_width(qsoTable, 1, w / 16);
	lv_table_set_cell_value(qsoTable, 0, 2, "Freq");
	lv_table_set_col_width(qsoTable, 2, w / 12);
	lv_table_set_cell_value(qsoTable, 0, 3, "Message");
	lv_table_set_col_width(qsoTable, 3, w / 2 - (w / 12 + w / 16 + w / 12) - 10);
	qsoRowCount++;

	call = Settings_file.get_string("wsjtx", "call");
	if (call.size() == 0)
		call = "PA0PHH";
	//DK7ZT
	//message m{12, 1, 1, 1, 1, 1, 1000, "PA0PHH PB23AMF JO22"};
	//add_qso(m);
}

void gui_ft8::add_line(int hh, int min, int sec, int snr, int correct_bits, double off,int hz0, string msg)
{
	char str[128];
	
	//unique_lock<mutex> gui_lock(gui_mutex);
	if (bclear)
	{
		lv_table_set_row_cnt(table, 1);
		ScrollFirstItem();
		m_cycle_count = 1;
		bclear = false;
	}

	if (msg.find(call) != std::string::npos && guift8bar.GetFilter().length() == 0)
	{
		message m{hh, min, sec, snr, correct_bits, off, hz0, msg};
		add_qso(m);
	}
	else
	{
		if (guift8bar.GetFilter().length() > 0)
		{
			if (msg.find(call) != std::string::npos && msg.find(guift8bar.GetFilter()))
			{
				message m{hh, min, sec, snr, correct_bits, off, hz0, msg};
				add_qso(m);
			}

			if (msg.find(guift8bar.GetFilter()) != std::string::npos && msg.find("CQ") != std::string::npos)
			{
				message m{hh, min, sec, snr, correct_bits, off, hz0, msg};
				add_qso(m);
			}
		}
	}

	sprintf(str,"%02d:%02d:%02d", hh, min, sec);
	lv_table_set_cell_value(table, m_cycle_count, 0, str);

	sprintf(str,"%3d",snr);
	lv_table_set_cell_value(table, m_cycle_count, 1, str);

	sprintf(str, "%6d", hz0);
	lv_table_set_cell_value(table, m_cycle_count, 2, str);

	lv_table_set_cell_value(table, m_cycle_count, 3, msg.c_str());

	m_cycle_count++;
}

void gui_ft8::add_qso(struct message msg)
{
	char str[128];

	sprintf(str, "%02d:%02d:%02d", msg.hh, msg.min, msg.sec);
	lv_table_set_cell_value(qsoTable, qsoRowCount, 0, str);

	sprintf(str, "%3d", msg.snr);
	lv_table_set_cell_value(qsoTable, qsoRowCount, 1, str);

	sprintf(str, "%6d", msg.hz0);
	lv_table_set_cell_value(qsoTable, qsoRowCount, 2, str);

	lv_table_set_cell_value(qsoTable, qsoRowCount, 3, msg.msg.c_str());

	qsoRowCount++;
}

void gui_ft8::cpy_qso(int row)
{
	char *ptr;

	ptr = (char *)lv_table_get_cell_value(table, row, 0);
	lv_table_set_cell_value(qsoTable, qsoRowCount, 0,ptr);
	ptr = (char *)lv_table_get_cell_value(table, row, 1);
	lv_table_set_cell_value(qsoTable, qsoRowCount, 1, ptr);
	ptr = (char *)lv_table_get_cell_value(table, row, 2);
	lv_table_set_cell_value(qsoTable, qsoRowCount, 2, ptr);
	ptr = (char *)lv_table_get_cell_value(table, row, 3);
	lv_table_set_cell_value(qsoTable, qsoRowCount, 3, ptr);
	qsoRowCount++;
}

int gui_ft8::getQsoLogRows(){
	return lv_table_get_row_cnt(qsoTable);
}

std::string gui_ft8::getQso(int row)
{
	char *ptr;
	std::string s;

	ptr = (char *)lv_table_get_cell_value(qsoTable, row, 0);
	s = std::string(ptr);
	s += ",";
	ptr = (char *)lv_table_get_cell_value(qsoTable, row, 1);
	s += std::string(ptr);
	s += ",";
	ptr = (char *)lv_table_get_cell_value(qsoTable, row, 2);
	s += std::string(ptr);
	s += ",";
	ptr = (char *)lv_table_get_cell_value(qsoTable, row, 3);
	s += std::string(ptr);

	return s;
}

void gui_ft8::clr_qso()
{
	lv_table_set_row_cnt(qsoTable, 1);
	QsoScrollFirstItem();
	lv_obj_invalidate(table);
	qsoRowCount = 1;
}

void gui_ft8::clear()
{
	bclear = true;
}

void gui_ft8::set_group()
{

}

void gui_ft8::reset()
{
	lv_table_set_row_cnt(table, 1);
	m_cycle_count = 1;
	bclear = true;
}

void gui_ft8::ScrollLatestItem()
{
	lv_coord_t currScrollPos = lv_obj_get_scroll_y(table);
	Scroll(table,currScrollPos);
}

void gui_ft8::ScrollFirstItem()
{
	lv_coord_t currScrollPos{};
	lv_obj_scroll_to(table, 0, currScrollPos, LV_ANIM_OFF);
}

void gui_ft8::QsoScrollLatestItem()
{
	lv_coord_t currScrollPos = lv_obj_get_scroll_y(qsoTable);
	Scroll(qsoTable, currScrollPos);
}

void gui_ft8::QsoScrollFirstItem()
{
	lv_coord_t currScrollPos{};
	lv_obj_scroll_to(qsoTable, 0, currScrollPos, LV_ANIM_OFF);
}

void gui_ft8::Scroll(lv_obj_t *table, lv_coord_t currScrollPos)
{
	lv_coord_t y = lv_obj_get_self_height(table);

	//If the object content is big enough to scroll
	if (y > lv_obj_get_height(table))
	{
		//Calculate the "out of view" y size
		lv_coord_t outOfView = y - lv_obj_get_height(table);

		if (outOfView > currScrollPos)
		{
			//Calculate the difference between the required scroll pos and the current scroll pos
			lv_coord_t differenceToScroll = -(outOfView - currScrollPos);

			//this will bring the bottom of the table into view
			lv_obj_scroll_by(table, 0, differenceToScroll, LV_ANIM_ON);
		}
	}
	return;
}

