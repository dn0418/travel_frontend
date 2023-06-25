// @flow strict

import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { FiSearch } from "react-icons/fi";
import { countriesAndCities } from "../../../utils/data/hotel-filter-data";

interface PropsType {
  filterInput: {
    country: string;
    city: string;
    type: string;
  },
  handleChangeFilterData: any;
  cities: {
    name: string;
    value: string;
  }[];
  handleClickSearch: () => void;
  hotelTypes: {
    id: number;
    name: string;
  }[]
}

function HotelsFilterSection({
  filterInput,
  handleChangeFilterData,
  cities,
  handleClickSearch,
  hotelTypes
}: PropsType) {

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
              {filterInput.country ? "" : 'Country'}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              name="country"
              value={filterInput.country}
              onChange={handleChangeFilterData}>
              {countriesAndCities.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='flex justify-center'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {filterInput.city ? "" : 'Destination'}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              name="city"
              value={filterInput.city}
              onChange={handleChangeFilterData}>
              {cities.map((destination) => (
                <MenuItem key={destination.value} value={destination.value}>
                  {destination.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='flex justify-center'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {filterInput.type ? "" : 'Type'}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              name="type"
              value={filterInput.type}
              onChange={handleChangeFilterData}>
              {hotelTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>



        <div className='flex justify-center'>
          <Button
            onClick={handleClickSearch}
            className='text-white bg-black rounded-lg px-4 w-fit'>
            <FiSearch className='text-xl' />{" "}
            <span className='capitalize pl-1'>Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HotelsFilterSection;
