// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { IoLogoGameControllerB } from "react-icons/io";
import { IoCameraReverseSharp } from "react-icons/io5";
import GeneralLayout from "../../../src/components/layouts/_general";
import ThingToDoUI from "../../../src/components/page-components/thing-to-do";
import { getServerSideProps } from "../../../src/rest-api/armenia/thing-to-do/thing-to-do.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const tabs = [
  { title: 'Entertainment', value: 'entertainment', icon: <IoCameraReverseSharp /> },
  { title: 'Festival', value: 'festival', icon: <IoLogoGameControllerB /> },
  { title: 'Tourists experience', value: 'tourists_experience', icon: <ImSpoonKnife /> },
  { title: 'Shopping', value: 'shopping', icon: <FaShoppingBag /> },

];

const ThingToDo: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const things = props.thingsData?.data || [];
  const metaData = props.thingsData?.meta || {};
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const router = useRouter();
  const params = router.query;


  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findTab = tabs.find((tab) => tab.value === newValue);
    params['page'] = '1';

    params['type'] = newValue;

    router.push({
      pathname: '/armenia/thing-to-do',
      query: params,
    });

    if (findTab) {
      setCurrentTab(findTab);
    }
  };

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/armenia/thing-to-do',
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
      pathname: '/armenia/thing-to-do',
      query: params,
    });
  }

  return (
    <>
      <ThingToDoUI
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        tabs={tabs}
        things={things}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

ThingToDo.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default ThingToDo;