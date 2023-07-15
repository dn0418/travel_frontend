// @flow strict

import { Container, Tab, Tabs } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AboutUsUIProps } from "../../../types/page-props";
import { aboutPageTabs } from "../../../utils/data/about-page-tabs";
const ReviewsSection = dynamic(() => import("./reviews-section"));


function AboutUsUI({
  handleTabChange,
  tabIndex,
  reviews,
  reviewsPagination
}: AboutUsUIProps) {
  const [tabItems, setTabItems] = useState(aboutPageTabs.en);
  const { locale } = useRouter();

  useEffect(() => {
    if (locale && locale === 'ru') {
      setTabItems(aboutPageTabs.ru);
    } else if (locale && locale === 'hy') {
      setTabItems(aboutPageTabs.hy);
    } else {
      setTabItems(aboutPageTabs.en);
    }
  }, [locale])

  return (
    <Container className='my-8 flex flex-col items-center'>
      <div className='w-full md:w-3/4 text-center py-3 px-6 regular-shadow rounded-lg'>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          className='pages-tabs'
          TabIndicatorProps={{
            style: { display: "none" },
          }}>
          {
            tabItems?.map((item, index) => (
              <Tab
                key={index}
                value={item.value}
                label={item.label}
              />
            ))
          }
        </Tabs>
      </div>
      <div hidden={tabIndex !== "review"} className='w-full my-4 md:my-8'>
        <ReviewsSection reviewsPagination={reviewsPagination} reviews={reviews} />
      </div>
    </Container>
  );
}

export default AboutUsUI;
