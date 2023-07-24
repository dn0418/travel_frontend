// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import ThingToSeeDashboard from "../../../src/components/admin-components/thing-to-see";
import DashboardLayout from "../../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../../src/rest-api/armenia/thing-to-see/thing-to-see.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };


const ThingToSee: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const things = props.thingsData?.data || [];
  const metaData = props.thingsData?.meta || {};
  const router = useRouter();
  const params = router.query;

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/admin/thing-to-see',
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
      pathname: '/admin/thing-to-see',
      query: params,
    });
  }

  return (
    <>
      <ThingToSeeDashboard
        things={things}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

ThingToSee.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ThingToSee;