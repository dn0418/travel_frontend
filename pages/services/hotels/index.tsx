// @flow strict

import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import GeneralLayout from "../../../src/components/layouts/_general";
import HotelsUI from "../../../src/components/page-components/hotels";
import { getStaticProps } from "../../../src/rest-api/server/hotels.ssr";
import { HotelType } from "../../../src/types";
import { NextPageWithLayout } from "../../../src/types/page-props";
import { countriesAndCities } from "../../../src/utils/data/hotel-filter-data";
export { getStaticProps };

interface CityType {
  name: string;
  value: string;
}

const Hotels: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({ hotels }) => {
  const [cities, setCities] = useState<CityType[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelType[]>(hotels);

  const [filterInput, setFilterInput] = useState({
    type: '',
    city: '',
    country: '',
  });


  const handleChangeFilterData = (e: any) => {
    if (e.target.name === 'country') {
      const findCities = countriesAndCities.find(city => city.value === e.target.value);
      if (findCities) {
        setCities(findCities.cities);
        setFilterInput(prev => ({
          ...prev,
          ['city']: ''
        }))
      }
    }

    setFilterInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const filterHotels = (hotel: HotelType) => {
    const { type, city, country } = filterInput;

    if (type && hotel.type !== type) {
      return false;
    }

    if (city && hotel.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }

    if (country && hotel.country.toLowerCase() !== country.toLowerCase()) {
      return false;
    }

    return true;
  };

  const handleClickSearch = () => {
    const filteredHotels = hotels.filter(filterHotels);
    setFilteredHotels(filteredHotels);
  };

  const handleSearchHotels = (name: string) => {
    const filteredHotels = hotels.filter(filterHotels);
    const filteredSearchHotels = filteredHotels.filter((hotel: HotelType) =>
      hotel.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredHotels(filteredSearchHotels);
  };


  return (
    <>
      <HotelsUI
        hotels={filteredHotels}
        filterInput={filterInput}
        cities={cities}
        handleChangeFilterData={handleChangeFilterData}
        handleClickSearch={handleClickSearch}
        handleSerachHotels={handleSearchHotels}
      />
    </>
  );
};

Hotels.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Hotels;