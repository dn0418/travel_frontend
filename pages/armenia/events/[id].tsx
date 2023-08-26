// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import EventDetailsUI from "../../../src/components/page-components/armenia/event-details";
import {
  getStaticPaths,
  getStaticProps
} from "../../../src/rest-api/armenia/events/single-events.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const EventDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const eventDetails = props.eventDetails?.data;
  const events = props?.eventsData?.data;

  return (
    <>
      <EventDetailsUI
        events={events}
        event={eventDetails}
      />
    </>
  );
};

EventDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default EventDetails;