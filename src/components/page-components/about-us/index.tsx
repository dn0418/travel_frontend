// @flow strict

import { Container, Tab, Tabs } from "@mui/material";
import { AboutUsUIProps } from "../../../types/page-props";
import ReviewsSection from "./reviews-section";

function AboutUsUI({
  handleTabChange,
  tabIndex,
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
          <Tab value='two' label='Who are you' />
          <Tab value='book' label='How to book a tour' />
          <Tab value='vecancy' label='Vecancy' />
          <Tab value='review' label='Review' />
        </Tabs>
      </div>
      <div hidden={tabIndex !== "review"} className='my-4 md:my-8'>
        <ReviewsSection />
      </div>
    </Container>
  );
}

export default AboutUsUI;
