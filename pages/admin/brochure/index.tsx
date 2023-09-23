// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import AdminBrochureUI from '../../../src/components/admin-components/brochure';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { getServerSideProps } from "../../../src/rest-api/armenia/brochure/brochure.ssr";
import { NextPageWithLayout } from '../../../src/types/page-props';
export { getServerSideProps };

const Brochure: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const brochures = props.brochureData?.data || [];
  const metaData = props.brochureData?.meta || {};
  const router = useRouter();
  const params = router.query;

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/armenia/brochure',
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
      pathname: '/armenia/brochure',
      query: params,
    });
  }

  return (
    <>
      <AdminBrochureUI
        brochures={brochures}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};


Brochure.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Brochure;