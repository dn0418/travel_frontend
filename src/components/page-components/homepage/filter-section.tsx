// @flow strict

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgCalendarDates } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { TourDestinationType } from "../../../types/tour";
import { tourTypes } from "../../../utils/data/tours-types";
import { localizationData } from "../../../utils/locales";
import CustomSelectInput from "../../common/select";

function FilterSection({ destinations }: { destinations: TourDestinationType[] }) {
  const [filterData, setFilterData] = useState({
    tourType: '',
    destination: '',
    days: ''
  });
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [typeItems, setTypeItems] = useState(tourTypes.en);
  const router = useRouter()
  const { query, locale } = router;

  const localData = locale === "ru" ? localizationData.ru :
    (locale === 'hy' ? localizationData.hy : localizationData.en);


  const handleChangeFilterData = (e: any) => {
    setFilterData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleClick = () => {
    if (startDate) {
      const value = new Date(startDate).toDateString().split(' ')
      query['month'] = value[1];
    }
    if (filterData.tourType) {
      query['type'] = filterData.tourType;
    }
    if (filterData.destination) {
      query['destination'] = filterData.destination.toString();
    }
    if (filterData.days) {
      query['days'] = filterData.days;
    }

    router.push({
      pathname: '/search',
      query,
    });
  };

  useEffect(() => {
    if (locale && locale === 'ru') {
      setTypeItems(tourTypes.ru);
    } else if (locale && locale === 'hy') {
      setTypeItems(tourTypes.hy);
    } else {
      setTypeItems(tourTypes.en);
    }
    setFilterData({
      tourType: '',
      destination: '',
      days: ''
    })
  }, [locale])

  return (
    <div
      aria-label="tour filter section"
      className='w-screen flex justify-center items-center my-5'>
      <div className='w-full lg:w-3/4 home-filter-section rounded-xl p-3 md:px-8 grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-4 home-filter-section'>
        <div className='flex justify-center'>
          <CustomSelectInput
            handleOnChange={handleChangeFilterData}
            name="tourType"
            title={localData.tour_type_title}
            value={filterData?.tourType}
            isHideTitle={filterData?.tourType ? true : false}
            options={typeItems}
          />
        </div>

        <div className='flex justify-center'>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            {
              !(filterData?.destination ? true : false) &&
              <InputLabel className='text-black p-0'>
                {localData.destination_title}
              </InputLabel>
            }
            <Select
              onChange={(e) => handleChangeFilterData(e)}
              name="destination"
              value={filterData?.destination}
              className='border-0'>
              {
                destinations.length > 0 &&
                destinations.map((item, index) => (
                  <MenuItem key={index} className='px-6' value={item?.id}>
                    {
                      locale === 'ru' ? item?.name_ru :
                        (locale === 'hy' ? item.name_hy : item.name)
                    }
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className='flex justify-center'>
          <TextField
            name="days"
            className='w-8 filter-date-count'
            type="number"
            placeholder={localData.days_title}
            onChange={handleChangeFilterData}
          />
        </div>

        <div className='flex justify-center'>
          <div className="flex items-center gap-2 w-fit">
            <CgCalendarDates className='text-xl text-[#5E5E5E]' />
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat='MMMM'
              showMonthYearPicker
              showFullMonthYearPicker
              className='border-0 focus:outline-0 w-24 react-datepicker text-base font-medium'
              placeholderText={localData.date_title}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <Button onClick={handleClick} className='text-white bg-black rounded-lg px-4 w-fit'>
            <FiSearch className='text-xl' />{" "}
            <span className='capitalize pl-1'>
              {localData.search_text}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
