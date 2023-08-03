// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import MiceDetailsUI from "../../../src/components/page-components/services/mice-details";
import {
  getStaticPaths,
  getStaticProps
} from "../../../src/rest-api/mice/mice-details.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const MiceDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const miceDetails = props.miceDetails?.data;
  const reviews = props?.reviews?.data;
  const metadata = props?.reviews?.meta;

  return (
    <>
      <MiceDetailsUI
        reviews={reviews}
        miceDetails={miceDetails}
        metadata={metadata}
      />
    </>
  );
};

MiceDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default MiceDetails;