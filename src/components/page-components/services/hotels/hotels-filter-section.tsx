// @flow strict

import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import { FiSearch } from "react-icons/fi";
import { HotelTypes } from "../../../../types/services";
import { countriesAndCities } from "../../../../utils/data/hotel-filter-data";

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
  hotelTypes: HotelTypes[]
}

function HotelsFilterSection({
  filterInput,
  handleChangeFilterData,
  cities,
  handleClickSearch,
  hotelTypes
}: PropsType) {
  const { locale } = useRouter();
  const countryData = locale === "ru" ? countriesAndCities.ru : (locale === "hy" ? countriesAndCities.hy : countriesAndCities.en);

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
              {filterInput.country ? "" :
                (locale === 'ru' ? 'Страна' : (locale === 'hy' ? 'Երկիր' : 'Country'))}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              name="country"
              value={filterInput.country}
              onChange={handleChangeFilterData}>
              {countryData.map((country) => (
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
              {filterInput.city ? "" :
                (locale === 'ru' ? 'Место назначения' :
                  (locale === 'hy' ? 'Նպատակակետ' : 'Destination')
                )
              }
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
              {filterInput.type ? "" : (locale === 'ru' ? 'Тип' :
                (locale === 'hy' ? 'Տիպ' : 'Type')
              )}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              name="type"
              value={filterInput.type}
              onChange={handleChangeFilterData}>
              {hotelTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {
                    locale === 'ru' ? type.name_ru :
                      (locale === 'hy' ? type.name_hy : type.name)
                  }
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
            <span className='capitalize pl-1'>
              {
                locale === 'ru' ? 'Поиск' : (locale === 'hy' ? 'Որոնում' : 'Search')
              }
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HotelsFilterSection;
