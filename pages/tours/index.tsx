// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GeneralLayout from "../../src/components/layouts/_general";
import ToursPage from "../../src/components/page-components/tours";
import { getServerSideProps } from "../../src/rest-api/server/tours.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
export { getServerSideProps };

const Tours: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  { toursData, tourType }
) => {
  const tours = toursData?.data;
  const router = useRouter()
  const type = router.query["type"];
  const [title, setTitle] = useState('Tours')
  const [tabIndex, setTabIndex] = useState('');
  const tabs = tourType?.data;
  // console.log(tabs)

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const { pathname, query } = router;
    query['type'] = newValue;
    delete query['page'];
    setTabIndex(newValue);

    router.push({
      pathname,
      query,
    });
  };

  useEffect(() => {
    if (type) {
      setTabIndex(type as string)
    }
  }, [type])

  useEffect(() => {
    const findCurrentTab = tabs.find(tab => tab.id === parseInt(tabIndex));

    if (findCurrentTab) {
      setTitle(findCurrentTab.name)
    }
  }, [tabIndex, tabs])

  return (
    <div>
      <ToursPage
        tabIndex={tabIndex}
        handleTabChange={handleTabChange}
        tabs={tabs}
        title={title}
        tours={tours}
      />
    </div>
  );
};

Tours.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Tours;
