// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import GeneralLayout from "../../../src/components/layouts/_general";
import TransportUI from "../../../src/components/page-components/services/transport";
import { getServerSideProps } from "../../../src/rest-api/cars/cars.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const transportsTabs = [
  {
    value: 'all',
    label: {
      en: 'Airport Transfers',
      ru: 'Аэропорт Трансферы', // Note: translated using online translator
      hy: 'Օդանավակայան Փոխադրումներ' // Note: translated using online translator
    }
  },
  {
    value: 'without_driver',
    label: {
      en: 'Without Driver',
      ru: 'Без водителя', // Note: translated using online translator
      hy: 'Առանց վարորդի' // Note: translated using online translator
    }
  },
  {
    value: 'with_driver',
    label: {
      en: 'With Driver',
      ru: 'С водителем', // Note: translated using online translator
      hy: 'Վարորդով' // Note: translated using online translator
    }
  },
];

const Transport: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const carsWithoutDriver = props.carsData?.data || [];
  const carWithDriver = props.carWithDriverData?.data[0] || {};
  const airportTransport = props.airportTransportData?.data[0] || {};
  const metaData = props.carsData?.meta || {};
  const [currentTab, setCurrentTab] = useState('all');
  const router = useRouter();
  const params = router.query;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "all") {
      router.push({
        pathname: '/services/transport',
      });
    }

    if (newValue) {
      setCurrentTab(newValue);
    }
  };

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/services/transport',
      query: params,
    });
  }

  const handleSearch = (searchText: string) => {
    if (searchText) {
      params['search'] = searchText;
    } else {
      delete params['search'];
    }
    params['page'] = '1';

    router.push({
      pathname: '/services/transport',
      query: params,
    });
  }

  return (
    <>
      <TransportUI
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        carsWithoutDriver={carsWithoutDriver}
        carsWithDriver={carWithDriver}
        airportTransport={airportTransport}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

Transport.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Transport;