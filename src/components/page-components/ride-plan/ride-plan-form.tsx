// @flow strict

import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaBicycle, FaCarSide, FaHiking } from 'react-icons/fa';
import { FiMinus } from 'react-icons/fi';
import { RiMotorbikeFill } from 'react-icons/ri';

function RidePlanForm() {
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="make-ride-plan">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5'>
        <FormControl variant='outlined'>
          <InputLabel>Name</InputLabel>
          <OutlinedInput
            label='Name'
          />
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            label='Email'
          />
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel>Phone Number</InputLabel>
          <OutlinedInput
            label='Phone Number'
          />
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel>Address</InputLabel>
          <OutlinedInput
            label='Address'
          />
        </FormControl>
        <div className="w-full">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              label="Date"
              format="d-MMMM-YYYY"
            // open={true}
            />
          </LocalizationProvider>
        </div>
        <div className="w-full grid grid-cols-2">
          <FormControl variant="outlined">
            <InputLabel>Adult</InputLabel>
            <OutlinedInput
              type='number'
              className='rounded-tr-none rounded-br-none border-r-0'
              endAdornment={
                <InputAdornment position="end">
                  <div
                    className="flex flex-col border border-[#8c8c8ca2] border-solid
                     rounded-[4px] px-1">
                    <IconButton className="p-1 w-fit" aria-label="Increment Button">
                      <AiOutlinePlus className="text-sm text-[#EDA592]" />
                    </IconButton>
                    <Divider />
                    <IconButton className="p-1 w-fit" aria-label="Decrement Button">
                      <FiMinus className="text-sm text-[#EDA592]" />
                    </IconButton>
                  </div>
                </InputAdornment>
              }
              label="Adult"
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>Child</InputLabel>
            <OutlinedInput
              className='rounded-tl-none rounded-bl-none'
              type='number'
              endAdornment={
                <InputAdornment position="end">
                  <div
                    className="flex flex-col border border-[#8c8c8ca2] border-solid
                     rounded-[4px] px-1">
                    <IconButton className="p-1 w-fit" aria-label="Increment Button">
                      <AiOutlinePlus className="text-sm text-[#EDA592]" />
                    </IconButton>
                    <Divider />
                    <IconButton className="p-1 w-fit" aria-label="Decrement Button">
                      <FiMinus className="text-sm text-[#EDA592]" />
                    </IconButton>
                  </div>
                </InputAdornment>
              }
              label="Child"
            />
          </FormControl>
        </div>
        <div className="md:col-span-2 flex items-center gap-5 border border-[#8c8c8ca2] border-solid rounded-lg p-2 w-fit px-4">
          <p className='text-[#5e5e5e] m-0'>Ride type</p>
          <Radio
            checked={selectedValue === 'a'}
            onChange={handleChange}
            value="a"
            name="rideType"
            icon={<FaBicycle className="w-8 h-8 text-[#EDA592]" />}
            checkedIcon={<FaBicycle className="w-8 h-8 text-[#6F7531]" />}
          />
          <Divider orientation="vertical" flexItem />
          <Radio
            checked={selectedValue === 'b'}
            onChange={handleChange}
            value="b"
            className='p-0'
            name="rideType"
            icon={<RiMotorbikeFill className="w-7 h-7 text-[#EDA592]" />}
            checkedIcon={<RiMotorbikeFill className="w-7 h-7 text-[#6F7531]" />}
          />
          <Divider orientation="vertical" flexItem />

          <Radio
            checked={selectedValue === 'c'}
            onChange={handleChange}
            value="c"
            className='p-0'
            name="rideType"
            icon={<FaCarSide className="w-7 h-6 text-[#EDA592]" />}
            checkedIcon={<FaCarSide className="w-7 h-6 text-[#6F7531]" />}
          />
          <Divider orientation="vertical" flexItem />

          <Radio
            checked={selectedValue === 'd'}
            onChange={handleChange}
            value="d"
            className='p-0'
            name="rideType"
            icon={<FaHiking className="w-6 h-6 text-[#EDA592]" />}
            checkedIcon={<FaHiking className="w-6 h-6 text-[#6F7531]" />}
          />
        </div>
        <TextField
          className="text-area md:col-span-2"
          label='Add your comment'
        />
        <div className="md:col-span-2 flex justify-end gap-5">
          <Button variant="outlined">Cancle</Button>
          <Button variant="contained">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default RidePlanForm;