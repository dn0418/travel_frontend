// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import AccessoriesDashboard from "../../src/components/admin-components/accessories";
import DashboardLayout from "../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../src/rest-api/accessories/accessories.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
export { getServerSideProps };

const Accessories: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const accessories = props.accessoriesData?.data || [];
  const metaData = props.accessoriesData?.meta || {};
  const router = useRouter();
  const params = router.query;

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/admin/accessories',
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
      pathname: '/admin/accessories',
      query: params,
    });
  }

  return (
    <>
      <AccessoriesDashboard
        accessories={accessories}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

Accessories.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Accessories;