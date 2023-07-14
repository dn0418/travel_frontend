// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import GeneralLayout from "../../../src/components/layouts/_general";
import TransportUI from "../../../src/components/page-components/services/transport";
import { getServerSideProps } from "../../../src/rest-api/cars/cars.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const tabs = [
  { title: 'Airport Transfers', value: 'all' },
  { title: 'Without driver', value: 'without_driver' },
  { title: 'With driver', value: 'with_driver' },
];

const Transport: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const carsWithoutDriver = props.carsData?.data || [];
  const carWithDriver = props.carWithDriverData?.data[0] || {};
  const airportTransport = props.airportTransportData?.data[0] || {};
  const metaData = props.carsData?.meta || {};
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const router = useRouter();
  const locale = router.locale;
  const params = router.query;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findTab = tabs.find((tab) => tab.value === newValue);
    // params['page'] = '1';

    if (newValue === "all") {
      router.push({
        pathname: '/services/transport',
      });
    }

    if (findTab) {
      setCurrentTab(findTab);
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

Transport.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Transport;