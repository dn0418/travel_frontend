// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import ThingToDoDetailsUI from "../../../src/components/page-components/thing-to-do-details";
import {
  getStaticPaths,
  getStaticProps
} from "../../../src/rest-api/armenia/thing-to-do/single-thing-to-do.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const ThingToDoDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const thingDetails = props.thingDetails?.data;
  const things = props?.allThingsData?.data;
  const reviews = props?.reviews?.data;

  return (
    <>
      <ThingToDoDetailsUI
        things={things}
        thing={thingDetails}
        reviews={reviews}
      />
    </>
  );
};

ThingToDoDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default ThingToDoDetails;