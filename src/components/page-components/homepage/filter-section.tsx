// @flow strict

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";
import CustomSelectInput from "../../shared/select";

function FilterSection() {
  const [age, setAge] = useState("");
  const [startDate, setStartDate] = useState<null | Date>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: Date) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-screen flex justify-center items-center my-5'>
      <div className='w-full lg:w-3/4 shadow-lg rounded-xl p-4 md:px-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center gap-4'>
        <div className=''>
          <CustomSelectInput title='Type of tour' />
        </div>

        <div className=''>
          <CustomSelectInput title='Destination' />
        </div>
        <div className=''>
          <TextField placeholder='Days' />
        </div>

        <div className='flex items-center gap-1'>
          <FcCalendar className='text-xl' />
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            dateFormat='MMMM'
            showMonthYearPicker
            showFullMonthYearPicker
            className='border-0 focus:outline-0 react-datepicker font-medium'
            placeholderText='Date'
          />
        </div>
        <div className=''>
          <Button onClick={handleClick} className='text-black w-fit'>
            <FcCalendar className='text-xl' />{" "}
            <span className='capitalize pl-1'>Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
