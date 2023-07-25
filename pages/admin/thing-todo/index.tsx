// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import ThingToDoDashboard from "../../../src/components/admin-components/thing-todo";
import DashboardLayout from "../../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../../src/rest-api/armenia/thing-to-do/thing-to-do.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const ThingToDo: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const things = props.thingsData?.data || [];
  const metaData = props.thingsData?.meta || {};
  const router = useRouter();
  const params = router.query;

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/admin/thing-todo',
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
      pathname: '/admin/thing-todo',
      query: params,
    });
  }

  return (
    <>
      <ThingToDoDashboard
        things={things}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

ThingToDo.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ThingToDo;