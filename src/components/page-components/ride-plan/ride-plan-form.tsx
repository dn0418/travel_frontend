// @flow strict

import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaBicycle, FaCarSide, FaHiking } from 'react-icons/fa';
import { FiMinus } from 'react-icons/fi';
import { RiMotorbikeFill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { TiLocation } from 'react-icons/ti';
import { destinationFilterData } from '../../../utils/data/homepage-data';

function RidePlanForm({
  inputData,
  handleOnChangeInputData,
  date,
  setDate,
  destinationCount,
  destinationInput,
  handleChangeDestination,
  changeDestinationCount,
  handleRemoveDestination,
  handleSubmit,
  incrementCount,
  decrementCount,
  isLoading
}: any) {

  return (
    <div className="make-ride-plan">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5'>
        <FormControl variant='outlined'>
          <InputLabel>Name</InputLabel>
          <OutlinedInput
            label='Name'
            name='name'
            value={inputData?.name}
            onChange={(e) => handleOnChangeInputData(e.target.name, e.target.value)}
          />
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            label='Email'
            name='email'
            value={inputData?.email}
            type='email'
            onChange={(e) => handleOnChangeInputData(e.target.name, e.target.value)}
          />
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel>Phone Number</InputLabel>
          <OutlinedInput
            label='Phone Number'
            name='phoneNumber'
            value={inputData?.phoneNumber}
            onChange={(e) => handleOnChangeInputData(e.target.name, e.target.value)}
          />
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel>Address</InputLabel>
          <OutlinedInput
            label='Address'
            name='address'
            value={inputData?.address}
            onChange={(e) => handleOnChangeInputData(e.target.name, e.target.value)}
          />
        </FormControl>
        <div className="w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              disablePast
              onChange={(newValue) => setDate(newValue)}
              format='DD-MMM-YYYY'
            />
          </LocalizationProvider>
        </div>
        <div className="w-full grid grid-cols-2">
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Adult</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type='number'
              name='adult'
              value={inputData?.adult}
              className='rounded-tr-none rounded-br-none border-r-0'
              onChange={(e) => handleOnChangeInputData(e.target.name, e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <div
                    className="flex flex-col border border-[#8c8c8ca2] border-solid
                     rounded-[4px] px-1">
                    <IconButton
                      onClick={() => incrementCount('adult')}
                      className="p-1 w-fit" aria-label="Increment Button">
                      <AiOutlinePlus className="text-sm text-[#EDA592]" />
                    </IconButton>
                    <Divider />
                    <IconButton
                      onClick={() => decrementCount('adult')}
                      className="p-1 w-fit" aria-label="Decrement Button">
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
              name='child'
              value={inputData?.child}
              onChange={(e) => handleOnChangeInputData(e.target.name, e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <div
                    className="flex flex-col border border-[#8c8c8ca2] border-solid
                     rounded-[4px] px-1">
                    <IconButton
                      onClick={() => incrementCount('child')}
                      className="p-1 w-fit" aria-label="Increment Button">
                      <AiOutlinePlus className="text-sm text-[#EDA592]" />
                    </IconButton>
                    <Divider />
                    <IconButton
                      onClick={() => decrementCount('child')}
                      className="p-1 w-fit" aria-label="Decrement Button">
                      <FiMinus className="text-sm text-[#EDA592]" />
                    </IconButton>
                  </div>
                </InputAdornment>
              }
              label="Child"
            />
          </FormControl>
        </div>
        {
          destinationCount.map((item: any, i: number) => (
            <div key={i} className="col-span-1 md:col-span-2 grid grid-cols-2 gap-5">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {
                    i === 0 ? 'Starting city' : 'Next city'
                  }
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="starting city"
                  value={destinationInput[i].name}
                  onChange={(e: any) =>
                    handleChangeDestination("name", e.target.value, i)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <div
                        className="flex flex-col bg-white rounded-[4px] px-1">
                        {
                          destinationInput[i].name ?
                            <Button
                              variant='text'
                              onClick={() => handleRemoveDestination(i)}
                              className='text-sm bg-[#EDA592] min-w-fit p-0.5 rounded-full'
                            >
                              <RxCross2 className="text-white" />
                            </Button>
                            :
                            <TiLocation className="text-2xl text-[#EDA592]" />
                        }
                      </div>
                    </InputAdornment>
                  }
                >
                  {
                    destinationFilterData.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.title}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl variant='outlined'>
                <InputLabel>Duration</InputLabel>
                <OutlinedInput
                  label='Duration'
                  name='duration'
                  value={destinationInput[i].duration}
                  onChange={(e) => handleChangeDestination('duration', e.target.value, i)}
                />
              </FormControl>
            </div>
          ))
        }
        <div className="">
          <Button
            onClick={changeDestinationCount}
            className='py-1'
            variant="contained">
            Add Next
          </Button>
        </div>
        <div className="md:col-span-2 flex items-center gap-5 border border-[#8c8c8ca2] border-solid rounded-lg p-2 w-fit px-4">
          <p className='text-[#5e5e5e] m-0'>Ride type</p>
          <Radio
            checked={inputData?.rideType === 'biCycle'}
            onChange={(e) => handleOnChangeInputData(e.target.name, e.target.value)}
            value="biCycle"
            name="rideType"
            icon={<FaBicycle className="w-8 h-8 text-[#EDA592]" />}
            checkedIcon={<FaBicycle className="w-8 h-8 text-[#6F7531]" />}
          />
          <Divider orientation="vertical" flexItem />
          <Radio
            checked={inputData?.rideType === 'bike'}
            onChange={(e) => handleOnChangeInputData(e.target.name, e.target.value)}
            value="bike"
            className='p-0'
            name="rideType"
            icon={<RiMotorbikeFill className="w-7 h-7 text-[#EDA592]" />}
            checkedIcon={<RiMotorbikeFill className="w-7 h-7 text-[#6F7531]" />}
          />
          <Divider orientation="vertical" flexItem />

          <Radio
            checked={inputData?.rideType === 'car'}
            onChange={(e) => handleOnChangeInputData(e.target.name, e.target.value)}
            value="car"
            className='p-0'
            name="rideType"
            icon={<FaCarSide className="w-7 h-6 text-[#EDA592]" />}
            checkedIcon={<FaCarSide className="w-7 h-6 text-[#6F7531]" />}
          />
          <Divider orientation="vertical" flexItem />

          <Radio
            checked={inputData?.rideType === 'hiking'}
            onChange={(e) => handleOnChangeInputData(e.target.name, e.target.value)}
            value="hiking"
            className='p-0'
            name="rideType"
            icon={<FaHiking className="w-6 h-6 text-[#EDA592]" />}
            checkedIcon={<FaHiking className="w-6 h-6 text-[#6F7531]" />}
          />
        </div>
        <TextField
          className="text-area md:col-span-2"
          label='Add your comment'
          onChange={(e) => handleOnChangeInputData('note', e.target.value)}
        />
        <div className="md:col-span-2 flex justify-end gap-5">
          <Button variant="outlined">Cancle</Button>
          <Button onClick={handleSubmit} disabled={isLoading} variant="contained">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RidePlanForm;