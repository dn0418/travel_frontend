// @flow strict

import DashboardLayout from "../../../src/components/layouts/dashboard-layout";
import { NextPageWithLayout } from "../../../src/types/page-props";

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import TransportDashboard from "../../../src/components/admin-components/transport";
import { getServerSideProps } from "../../../src/rest-api/cars/cars.ssr";
export { getServerSideProps };

const tabs = [
  { title: 'Airport Transfers', value: 'all' },
  { title: 'Without driver', value: 'without_driver' },
  { title: 'With driver', value: 'with_driver' },
];

const Transports: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const carsWithoutDriver = props.carsData?.data || [];
  const carWithDriver = props.carWithDriverData?.data[0] || {};
  const airportTransport = props.airportTransportData?.data[0] || {};
  const metaData = props.carsData?.meta || {};
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const router = useRouter();
  const params = router.query;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findTab = tabs.find((tab) => tab.value === newValue);

    if (newValue === "all") {
      router.push({
        pathname: '/admin/transports',
      });
    }

    if (findTab) {
      setCurrentTab(findTab);
    }
  };

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/admin/transports',
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
      pathname: '/admin/transports',
      query: params,
    });
  }

  return (
    <>
      <TransportDashboard
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        tabs={tabs}
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

Transports.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Transports;