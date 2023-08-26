// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GeneralLayout from "../../../src/components/layouts/_general";
import HotelsUI from "../../../src/components/page-components/services/hotels";
import { getServerSideProps } from "../../../src/rest-api/hotels/hotels.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
import { countriesAndCities } from "../../../src/utils/data/hotel-filter-data";
export { getServerSideProps };

interface CityType {
  name: string;
  value: string;
}

const Hotels: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const hotels = props.hotelData.data;
  const metadata = props.hotelData.meta;
  const hotelTypes = props.hotelTypes.data;
  const [cities, setCities] = useState<CityType[]>([]);
  const [countryData, setCountryData] = useState(countriesAndCities.en);
  const router = useRouter();
  const params = router.query;
  const [filterInput, setFilterInput] = useState({
    type: '',
    city: '',
    country: '',
  });
  const { locale } = router;

  const handleChangeFilterData = (e: any) => {
    if (e.target.name === 'country') {
      const findCities = countryData.find(city => city.value === e.target.value);
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

  const handleClickSearch = () => {
    const { type, city, country } = filterInput;
    delete params['type'];
    delete params['city'];
    delete params['country'];

    if (type) {
      params['type'] = type;
    }
    if (city) {
      params['city'] = city;
    }
    if (country) {
      params['country'] = country;
    }

    params['page'] = '1';

    router.push({
      pathname: '/services/hotels',
      query: params,
    });
  };

  const handleSearchHotels = (searchText: string) => {
    if (searchText) {
      params['search'] = searchText;
    } else {
      delete params['search'];
    }
    params['page'] = '1';

    router.push({
      pathname: '/services/hotels',
      query: params,
    });
  };

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/services/hotels',
      query: params,
    });
  }

  useEffect(() => {
    if (locale === 'ru') {
      setCountryData(countriesAndCities.ru);
    } else if (locale === 'hy') {
      setCountryData(countriesAndCities.hy);
    } else {
      setCountryData(countriesAndCities.en);
    }
    setCities([]);
    setFilterInput({
      type: '',
      city: '',
      country: '',
    })
  }, [locale])

  return (
    <>
      <HotelsUI
        hotels={hotels}
        filterInput={filterInput}
        cities={cities}
        handleChangeFilterData={handleChangeFilterData}
        handleClickSearch={handleClickSearch}
        handleSerachHotels={handleSearchHotels}
        metadata={metadata}
        handlePageChange={handlePageChange}
        hotelTypes={hotelTypes}
      />
    </>
  );
};

Hotels.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Hotels;