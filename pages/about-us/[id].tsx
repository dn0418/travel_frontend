// @flow strict

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GeneralLayout from "../../src/components/layouts/_general";
import { NextPageWithLayout } from "../../src/types/page-props";
const AboutUsUI = dynamic(() => import("../../src/components/page-components/about-us"));

const AboutUs: NextPageWithLayout = () => {
  const routes = useRouter()
  const route = routes.query["id"];

  const [tabIndex, setTabIndex] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (route) {
      setTabIndex(route as string)
    }
  }, [route])


  return (
    <div>
      <AboutUsUI
        tabIndex={tabIndex}
        handleTabChange={handleTabChange}
      />
    </div>
  );
};

AboutUs.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default AboutUs;
