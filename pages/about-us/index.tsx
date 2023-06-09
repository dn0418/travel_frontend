// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GeneralLayout from "../../src/components/layouts/_general";
import AboutUsUI from "../../src/components/page-components/about-us";
import { getServerSideProps } from "../../src/rest/about.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
export { getServerSideProps };

const AboutUs: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const { reviewsData } = props;
  const reviews = reviewsData.data;
  const reviewsPagination = reviewsData.pagination;
  const router = useRouter()
  const tab = router.query["tab"];
  const [tabIndex, setTabIndex] = useState("who-are-you");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const { pathname, query } = router;
    query['tab'] = newValue;
    delete query['page'];
    setTabIndex(newValue);

    router.push({
      pathname,
      query,
    });
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
        reviewsPagination={reviewsPagination}
      />
    </div>
  );
};

AboutUs.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default AboutUs;
