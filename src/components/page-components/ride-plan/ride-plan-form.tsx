// @flow strict

import { Box, FormControl, InputLabel, OutlinedInput, Radio } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { FaBicycle } from 'react-icons/fa';
import { RiMotorbikeFill } from 'react-icons/ri';

function RidePlanForm() {
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="">
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
      </div>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <p>Ride type</p>
        <Radio
          checked={selectedValue === 'a'}
          onChange={handleChange}
          value="a"
          name="radio-buttons"
          icon={<FaBicycle />}
          checkedIcon={<FaBicycle />}
        />
        <Radio
          checked={selectedValue === 'b'}
          onChange={handleChange}
          value="b"
          className='p-0'
          name="radio-buttons"
          icon={<RiMotorbikeFill />}
          checkedIcon={<RiMotorbikeFill />}
        />
      </Box>
    </div>
  );
};

export default RidePlanForm;