// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import MiceDashboard from "../../../src/components/admin-components/mice";
import DashboardLayout from "../../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../../src/rest-api/mice/mice.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };


const Mice: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const mices = props.miceData?.data || [];
  const metaData = props.miceData?.meta || {};
  const router = useRouter();
  const params = router.query;

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/admin/mice',
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
      pathname: '/admin/mice',
      query: params,
    });
  }

  return (
    <>
      <MiceDashboard
        mices={mices}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

Mice.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Mice;