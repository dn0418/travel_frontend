// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import ThingToSeeDetailsUI from "../../../src/components/page-components/thing-to-see-details";
import {
  getStaticPaths,
  getStaticProps
} from "../../../src/rest-api/thing-to-see/single-thing-to-see.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const TransportDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const thingDetails = props.thingDetails?.data;
  const things = props?.allThingsData?.data;
  const reviews = props?.reviews?.data;

  return (
    <>
      <ThingToSeeDetailsUI
        things={things}
        thing={thingDetails}
        reviews={reviews}
      />
    </>
  );
};

TransportDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default TransportDetails;