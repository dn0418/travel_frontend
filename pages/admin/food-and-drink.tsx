// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import FoodAndDrinksDashboard from "../../src/components/admin-components/food-and-drink";
import DashboardLayout from "../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../src/rest-api/armenia/food-and-drinks/index.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
export { getServerSideProps };

const FoodAndDrinks: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const foodAndDrinks = props.foodAndDrinks?.data || [];
  const metaData = props.foodAndDrinks?.meta || {};
  const router = useRouter();
  const params = router.query;

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/admin/food-and-drink',
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
      pathname: '/admin/food-and-drink',
      query: params,
    });
  }

  return (
    <>
      <FoodAndDrinksDashboard
        foodAndDrinks={foodAndDrinks}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

FoodAndDrinks.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default FoodAndDrinks;