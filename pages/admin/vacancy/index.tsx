// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import AdminVacancy from "../../../src/components/admin-components/vacancy";
import DashboardLayout from "../../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../../src/rest-api/about/about.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const Vacancy: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const vacancies = props?.vacanciesData?.data;
  const metadata = props?.vacanciesData?.meta;
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
      pathname: '/admin/vacancy',
      query: params,
    });
  };

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/admin/vacancy',
      query: params,
    });
  }

  return (
    <>
      <AdminVacancy
        vacancies={vacancies}
        handleSerachHotels={handleSearchHotels}
        metadata={metadata}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

Vacancy.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Vacancy;