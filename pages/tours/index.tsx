// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GeneralLayout from "../../src/components/layouts/_general";
import ToursPage from "../../src/components/page-components/tours";
import { getServerSideProps } from "../../src/rest-api/tours/tours.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
import { tourTypes } from "../../src/utils/data/tours-types";
export { getServerSideProps };

const Tours: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  { toursData }
) => {
  const tours = toursData?.data;
  const meta = toursData?.meta;
  const router = useRouter()
  const [title, setTitle] = useState('Tours')
  const [tabIndex, setTabIndex] = useState('active_tours');
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
    <div>
      <ToursPage
        tabIndex={tabIndex}
        handleTabChange={handleTabChange}
        tabs={tourTypes}
        title={title}
        tours={tours}
        handlePageChange={handlePageChange}
        handleSearch={handleSearch}
        meta={meta}
      />
    </div>
  );
};

Tours.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Tours;