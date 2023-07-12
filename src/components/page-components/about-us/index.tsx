// @flow strict

import { Container, Tab, Tabs } from "@mui/material";
import dynamic from "next/dynamic";
import { AboutUsUIProps } from "../../../types/page-props";
const ReviewsSection = dynamic(() => import("./reviews-section"))

function AboutUsUI({
  handleTabChange,
  tabIndex,
  reviews,
  reviewsPagination
}: AboutUsUIProps) {


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
          <Tab value='who-are-you' label='Who are you' />
          <Tab value='how-to-book-a-tour' label='How to book a tour' />
          <Tab value='vacancy' label='Vecancy' />
          <Tab value='review' label='Review' />
        </Tabs>
      </div>
      <div hidden={tabIndex !== "review"} className='w-full my-4 md:my-8'>
        <ReviewsSection reviewsPagination={reviewsPagination} reviews={reviews} />
      </div>
    </Container>
  );
}

export default AboutUsUI;
