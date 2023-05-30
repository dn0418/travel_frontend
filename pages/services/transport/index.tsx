// @flow strict

import { useState } from "react";
import GeneralLayout from "../../../src/components/layouts/_general";
import TransportUI from "../../../src/components/page-components/transport";
import { NextPageWithLayout } from "../../../src/types/page-props";

const tabs = [
  { title: 'Transfer to and from', value: 'transfer-to-and-from' },
  { title: 'Without driver', value: 'without-driver' },
  { title: 'With driver', value: 'with-driver' },
];


const Transport: NextPageWithLayout = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findTab = tabs.find((tab) => tab.value === newValue);
    if (findTab) {
      setCurrentTab(findTab);
    }
  };

  return (
    <>
      <TransportUI
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        tabs={tabs}
      />
    </>
  );
};

Transport.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Transport;