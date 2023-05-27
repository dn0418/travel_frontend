// @flow strict

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgCalendarDates } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { destinationFilterData, tourFilterData } from "../../../utils/data/homepage-data";
import CustomSelectInput from "../../shared/select";

function FilterSection() {
  const [filterData, setFilterData] = useState({
    tourType: '',
    destination: '',
  });
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeFilterData = (e: any) => {
    setFilterData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleChange = (e: Date) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      aria-label="tour filter section"
      className='w-screen flex justify-center items-center my-5'>
      <div className='w-full lg:w-3/4 home-filter-section rounded-xl p-3 md:px-8 grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-4 home-filter-section'>
        <div className='flex justify-center'>
          <CustomSelectInput
            handleOnChange={handleChangeFilterData}
            name="tourType"
            title='Type of tour'
            value={filterData?.tourType}
            isHideTitle={filterData?.tourType ? true : false}
            options={tourFilterData}
          />
        </div>

        <div className='flex justify-center'>
          <CustomSelectInput
            name="destination"
            title='Destination'
            handleOnChange={handleChangeFilterData}
            value={filterData?.destination}
            isHideTitle={filterData?.destination ? true : false}
            options={destinationFilterData}
          />
        </div>
        <div className='flex justify-center'>
          <TextField
            name="days"
            className='w-8 filter-date-count'
            type="number"
            placeholder='Days'
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
              placeholderText='Date'
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <Button onClick={handleClick} className='text-white bg-black rounded-lg px-4 w-fit'>
            <FiSearch className='text-xl' />{" "}
            <span className='capitalize pl-1'>Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
