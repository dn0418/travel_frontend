// @flow strict

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GeneralLayout from "../../src/components/layouts/_general";
import { NextPageWithLayout } from "../../src/types/page-props";
const ToursPage = dynamic(() => import("../../src/components/page-components/tours"));

const tabs = [
  { title: 'Active Tours', value: 'active-tours' },
  { title: 'Gastro Tours', value: 'gastro-tours' },
  { title: 'Oneday Tours', value: 'oneday-tours' },
  { title: 'Classic Tours', value: 'classic-tours' },
  { title: 'Fixed date Tour', value: 'fixed-date-tour' },
  { title: 'Themed Tours', value: 'themed-tours' },
];

const Tours: NextPageWithLayout = () => {
  const routes = useRouter()
  const route = routes.query["slag"];
  const [title, setTitle] = useState('Tours')
  const [tabIndex, setTabIndex] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (route) {
      setTabIndex(route as string)
    }
  }, [route])

  useEffect(() => {
    const findCurrentTab = tabs.find(tab => tab.value === tabIndex)
    if (findCurrentTab) {
      setTitle(findCurrentTab.title)
    }
  }, [tabIndex])

  return (
    <div>
      <ToursPage
        tabIndex={tabIndex}
        handleTabChange={handleTabChange}
        tabs={tabs}
        title={title}
      />
    </div>
  );
};

Tours.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Tours;
