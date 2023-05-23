// @flow strict

import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

function RidePlanForm() {
  const [startDate, setStartDate] = useState<null | Date>(null);

  return (
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            format="d-MMMM-YYYY"
            open={true}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default RidePlanForm;