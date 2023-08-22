// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GeneralLayout from "../../src/components/layouts/_general";
import AboutUsUI from "../../src/components/page-components/about-us";
import { getServerSideProps } from "../../src/rest-api/about/about.ssr";
import { StaticPageType } from "../../src/types";
import { NextPageWithLayout } from "../../src/types/page-props";
export { getServerSideProps };

const AboutUs: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const { reviewsData, staticPagesData } = props;
  const reviews = reviewsData.data;
  const staticPages: StaticPageType[] = staticPagesData.data;
  const reviewsPagination = reviewsData.pagination;
  const router = useRouter()
  const tab = router.query["tab"];
  const [tabIndex, setTabIndex] = useState("who-are-you");


  const findStaticPage = (code: string) => {
    const page = staticPages.find((page: StaticPageType) => page.code === code);
    if (page) {
      return page.content;
    }
    return false;
  }

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
        findStaticPage={findStaticPage}
      />
    </div>
  );
};

AboutUs.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default AboutUs;
