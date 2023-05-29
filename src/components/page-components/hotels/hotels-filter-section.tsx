// @flow strict

import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FiSearch } from "react-icons/fi";
import { countries } from "../../../utils/data/countries";
import { tourFilterData } from "../../../utils/data/homepage-data";

function HotelsFilterSection() {
  const [filterData, setFilterData] = useState({
    type: '',
    destination: '',
    country: '',
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChangeFilterData = (e: any) => {
    console.log(e)
    setFilterData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      aria-label="Hotel filter section"
      className='w-full lg:w-3/4 flex justify-center items-center my-5'>
      <div
        className='hotel-filter-section rounded-xl p-3 md:px-8 grid grid-cols-2 md:grid-cols-4 justify-center items-center gap-4'
      >

        <div className='flex justify-center'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {filterData.country ? "" : 'Country'}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              name="country"
              value={filterData.country}
              onChange={handleChangeFilterData}>
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='flex justify-center'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {filterData.destination ? "" : 'Destination'}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              name="destination"
              value={filterData.destination}
              onChange={handleChangeFilterData}>
              {countries.map((destination) => (
                <MenuItem key={destination.code} value={destination.code}>
                  {destination.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='flex justify-center'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {filterData.type ? "" : 'Type'}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              name="type"
              value={filterData.type}
              onChange={handleChangeFilterData}>
              {tourFilterData.map((destination) => (
                <MenuItem key={destination.value} value={destination.value}>
                  {destination.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default HotelsFilterSection;
