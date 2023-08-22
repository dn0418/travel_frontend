// @flow strict

import { Container, Tab, Tabs } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AboutUsUIProps } from "../../../types/page-props";
import { aboutPageTabs } from "../../../utils/data/about-page-tabs";
import { localizationData } from "../../../utils/locales";
const ReviewsSection = dynamic(() => import("./reviews-section"));


function AboutUsUI({
  handleTabChange,
  tabIndex,
  reviews,
  reviewsPagination,
  findStaticPage
}: AboutUsUIProps) {
  const [tabItems, setTabItems] = useState(aboutPageTabs.en);
  const { locale } = useRouter();

  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

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
      <div hidden={tabIndex !== "who_we_are"} className='w-full my-4 md:my-8'>
        {
          findStaticPage("who_we_are") ?
            <div dangerouslySetInnerHTML={{ __html: findStaticPage("who_we_are") }} />
            :
            <div className="flex justify-center items-center my-5">
              <p className="text-3xl font-medium text-[#000000] py-5">
                {localData.not_found_text}
              </p>
            </div>
        }
      </div>
      <div hidden={tabIndex !== "how_to_book_a_tour"} className='w-full my-4 md:my-8'>
        {
          findStaticPage("how_to_book_a_tour") ?
            <div dangerouslySetInnerHTML={{ __html: findStaticPage("how_to_book_a_tour") }} />
            :
            <div className="flex justify-center items-center my-5">
              <p className="text-3xl font-medium text-[#000000] py-5">
                {localData.not_found_text}
              </p>
            </div>
        }
      </div>
      <div hidden={tabIndex !== "vacancy"} className='w-full my-4 md:my-8'>
        {
          findStaticPage("vacancy") ?
            <div dangerouslySetInnerHTML={{ __html: findStaticPage("vacancy") }} />
            :
            <div className="flex justify-center items-center my-5">
              <p className="text-3xl font-medium text-[#000000] py-5">
                {localData.not_found_text}
              </p>
            </div>
        }
      </div>
      <div hidden={tabIndex !== "review"} className='w-full my-4 md:my-8'>
        <ReviewsSection reviewsPagination={reviewsPagination} reviews={reviews} />
      </div>
    </Container>
  );
}

export default AboutUsUI;
