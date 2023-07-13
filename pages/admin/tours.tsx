// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ToursDashboard from "../../src/components/admin-components/tours";
import DashboardLayout from "../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../src/rest-api/tours/tours.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
import { tourTypes } from "../../src/utils/data/tours-types";
export { getServerSideProps };


const Tours: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const tours = props?.toursData?.data;
  const meta = props?.toursData?.meta;
  const [title, setTitle] = useState('Tours')
  const [tabIndex, setTabIndex] = useState('active_tours');
  const router = useRouter()
  const { pathname, query } = router;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findCurrentTab = tourTypes.find((tab: { value: string }) => tab.value === newValue);

    query['type'] = newValue;
    delete query['page'];

    if (findCurrentTab) {
      setTabIndex(findCurrentTab.value);
      setTitle(findCurrentTab.name);
    }

    router.push({
      pathname,
      query,
    });
  };

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    query['page'] = value.toString();

    router.push({
      pathname,
      query,
    });
  }


  const handleSearch = (searchText: string) => {
    if (searchText) {
      query['search'] = searchText;
    } else {
      delete query['search'];
    }
    query['page'] = '1';

    router.push({
      pathname,
      query,
    });
  }

  useEffect(() => {
    const findCurrentTab = tourTypes.find((tab: { value: string }) => tab.value === query["type"]);
    if (findCurrentTab) {
      setTabIndex(findCurrentTab.value);
      setTitle(findCurrentTab.name);
    }
  }, [query]);

  return (
    <>
      <ToursDashboard
        tabIndex={tabIndex}
        handleTabChange={handleTabChange}
        tabs={tourTypes}
        title={title}
        tours={tours}
        handlePageChange={handlePageChange}
        handleSearch={handleSearch}
        meta={meta}
      />
    </>
  );
};

Tours.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tours;