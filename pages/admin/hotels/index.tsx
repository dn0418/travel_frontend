// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import HotelDashboard from "../../../src/components/admin-components/hotels";
import DashboardLayout from "../../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../../src/rest-api/hotels/hotels.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const Hotels: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const hotels = props?.hotelData?.data;
  const metadata = props?.hotelData?.meta;
  const router = useRouter();
  const params = router.query;

  const handleSearchHotels = (searchText: string) => {
    if (searchText) {
      params['search'] = searchText;
    } else {
      delete params['search'];
    }
    params['page'] = '1';

    router.push({
      pathname: '/admin/hotels',
      query: params,
    });
  };

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/admin/hotels',
      query: params,
    });
  }

  return (
    <>
      <HotelDashboard
        hotels={hotels}
        handleSerachHotels={handleSearchHotels}
        metadata={metadata}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

Hotels.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Hotels;