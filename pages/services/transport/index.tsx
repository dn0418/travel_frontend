// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import GeneralLayout from "../../../src/components/layouts/_general";
import TransportUI from "../../../src/components/page-components/transport";
import { getServerSideProps } from "../../../src/rest-api/cars/cars.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const tabs = [
  { title: 'Transfer to and from', value: 'all' },
  { title: 'Without driver', value: 'false' },
  { title: 'With driver', value: 'true' },
];

const Transport: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const cars = props.carsData?.data || [];
  const metaData = props.carsData?.meta || {};
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const router = useRouter();
  const params = router.query;


  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findTab = tabs.find((tab) => tab.value === newValue);
    params['page'] = '1';

    if (newValue === "all") {
      delete params['driver'];
    } else {
      params['driver'] = newValue;
    }

    router.push({
      pathname: '/services/transport',
      query: params,
    });

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
        cars={cars}
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