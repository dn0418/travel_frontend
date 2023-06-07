// @flow strict

import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GeneralLayout from "../../src/components/layouts/_general";
import AboutUsUI from "../../src/components/page-components/about-us";
import { getStaticProps } from "../../src/rest/about.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
export { getStaticProps };

const AboutUs: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { reviews } = props;
  const routes = useRouter()
  const tab = routes.query["tab"];
  const [tabIndex, setTabIndex] = useState("who-are-you");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (tab) {
      setTabIndex(tab as string)
    }
  }, [tab])


  return (
    <div>
      <AboutUsUI
        tabIndex={tabIndex}
        handleTabChange={handleTabChange}
        reviews={reviews}
      />
    </div>
  );
};

AboutUs.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default AboutUs;
