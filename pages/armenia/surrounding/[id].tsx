// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import SurroundingDetailsUI from "../../../src/components/page-components/armenia/surrounding-details";
import {
  getStaticPaths,
  getStaticProps
} from "../../../src/rest-api/armenia/surrounding/single-surrounding.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const SurroundingDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const surroundingDetails = props.surroundingDetails?.data;
  const surroundings = props?.surroundingsData?.data;
  const reviews = props?.reviews?.data;

  return (
    <>
      <SurroundingDetailsUI
        surroundings={surroundings}
        surrounding={surroundingDetails}
        reviews={reviews}
      />
    </>
  );
};

SurroundingDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default SurroundingDetails;