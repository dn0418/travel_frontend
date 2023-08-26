// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRoad } from "react-icons/fa";
import { GiChurch, GiColombianStatue, GiModernCity } from "react-icons/gi";
import { MdNaturePeople } from "react-icons/md";
import { SiInternetarchive } from "react-icons/si";
import { TbBuildingArch, TbPlaceholder } from "react-icons/tb";
import GeneralLayout from "../../../src/components/layouts/_general";
import ThingToSeeUI from "../../../src/components/page-components/armenia/thing-to-see";
import { getServerSideProps } from "../../../src/rest-api/armenia/thing-to-see/thing-to-see.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

export const thingsSeeTabs = {
  en: [
    { title: 'OLd Road', value: 'old_road', icon: <FaRoad /> },
    { title: 'Statues', value: 'statues', icon: <GiColombianStatue /> },
    { title: 'Museums', value: 'museums', icon: <SiInternetarchive /> },
    { title: 'Soviet Modernism', value: 'soviet_modernism', icon: <GiModernCity /> },
    { title: 'Churches & Monasteries', value: 'churches_monasteries', icon: <GiChurch /> },
    { title: 'Natural Sites', value: 'natural_sites', icon: <MdNaturePeople /> },
    { title: 'Archeological sites & founding', value: 'archeological_sites', icon: <TbBuildingArch /> },
    { title: 'Abandoned Place', value: 'abandoned_place', icon: <TbPlaceholder /> },
  ],
  ru: [
    { title: 'Старая дорога', value: 'old_road', icon: <FaRoad /> },
    { title: 'Статуи', value: 'statues', icon: <GiColombianStatue /> },
    { title: 'Музеи', value: 'museums', icon: <SiInternetarchive /> },
    { title: 'Советский модернизм', value: 'soviet_modernism', icon: <GiModernCity /> },
    { title: 'Церкви и монастыри', value: 'churches_monasteries', icon: <GiChurch /> },
    { title: 'Природные места', value: 'natural_sites', icon: <MdNaturePeople /> },
    { title: 'Археологические места и основание', value: 'archeological_sites', icon: <TbBuildingArch /> },
    { title: 'Заброшенные места', value: 'abandoned_place', icon: <TbPlaceholder /> },
  ],
  hy: [
    { title: 'Հին ճանապարհ', value: 'old_road', icon: <FaRoad /> },
    { title: 'Ստատուերներ', value: 'statues', icon: <GiColombianStatue /> },
    { title: 'Թանգարաններ', value: 'museums', icon: <SiInternetarchive /> },
    { title: 'Սովետական մոդեռնիզմ', value: 'soviet_modernism', icon: <GiModernCity /> },
    { title: 'Եկեղեցիներ և վանքեր', value: 'churches_monasteries', icon: <GiChurch /> },
    { title: 'Բնակավայրերի բնույթ', value: 'natural_sites', icon: <MdNaturePeople /> },
    { title: 'Արեգական հուշարձաններ և հիմնականացում', value: 'archeological_sites', icon: <TbBuildingArch /> },
    { title: 'Թուղթատեղեկագիր վայր', value: 'abandoned_place', icon: <TbPlaceholder /> },
  ]
}

const ThingToSee: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const things = props.thingsData?.data || [];
  const metaData = props.thingsData?.meta || {};
  const [tabs, setTabs] = useState(thingsSeeTabs.en)
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const router = useRouter();
  const params = router.query;
  const locale = router.locale;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findTab = tabs.find((tab) => tab.value === newValue);
    params['page'] = '1';

    params['type'] = newValue;

    router.push({
      pathname: '/armenia/thing-to-see',
      query: params,
    });

    if (findTab) {
      setCurrentTab(findTab);
    }
  };

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/armenia/thing-to-see',
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
      pathname: '/armenia/thing-to-see',
      query: params,
    });
  };


  const findTab = (value: string) => {
    if (locale === 'ru') {
      return thingsSeeTabs.ru.find((tab) => tab.value === value);
    } else if (locale === 'hy') {
      return thingsSeeTabs.hy.find((tab) => tab.value === value);
    } else {
      return thingsSeeTabs.en.find((tab) => tab.value === value) || { title: '' };
    }
  };

  useEffect(() => {
    if (locale && locale === 'ru') {
      setTabs(thingsSeeTabs.ru);
    } else if (locale && locale === 'hy') {
      setTabs(thingsSeeTabs.hy);
    } else {
      setTabs(thingsSeeTabs.en);
    }
  }, [locale])

  return (
    <>
      <ThingToSeeUI
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        tabs={tabs}
        things={things}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
        findTab={findTab}
      />
    </>
  );
};

ThingToSee.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default ThingToSee;