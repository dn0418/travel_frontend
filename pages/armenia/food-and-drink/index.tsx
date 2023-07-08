// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaMugHot, FaWineGlassAlt } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { IoHome } from "react-icons/io5";
import GeneralLayout from "../../../src/components/layouts/_general";
import FoodAndDrinksUI from "../../../src/components/page-components/armenia/food-and-drink";
import { getServerSideProps } from "../../../src/rest-api/armenia/food-and-drinks/index.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

interface TabType {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const tabs: TabType[] = [
  { title: 'Cafes', value: 'cafes', icon: <FaMugHot /> },
  { title: 'Village Yards', value: 'village_yards', icon: <IoHome /> },
  { title: 'Restaurants', value: 'restaurants', icon: <ImSpoonKnife /> },
  { title: 'Wineries', value: 'wineries', icon: <FaWineGlassAlt /> },
];

const FoodAndDrinks: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const foodAndDrinks = props.foodAndDrinks?.data || [];
  const metaData = props.foodAndDrinks?.meta || {};
  const [currentTab, setCurrentTab] = useState<TabType | null>(null);
  const router = useRouter();
  const params = router.query;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findTab = tabs.find((tab) => tab.value === newValue);
    params['page'] = '1';

    params['type'] = newValue;

    router.push({
      pathname: '/armenia/food-and-drink',
      query: params,
    });

    if (findTab) {
      setCurrentTab(findTab);
    }
  };

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/armenia/food-and-drink',
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
      pathname: '/armenia/food-and-drink',
      query: params,
    });
  }

  return (
    <>
      <FoodAndDrinksUI
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        tabs={tabs}
        foodAndDrinks={foodAndDrinks}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

FoodAndDrinks.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default FoodAndDrinks;