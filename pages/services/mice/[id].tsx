// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import AccessoryDetailsUI from "../../../src/components/page-components/services/accessory-details";
import {
  getStaticPaths,
  getStaticProps
} from "../../../src/rest-api/accessories/accessory-details";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const AccessoryDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const accessoryDetails = props.accessoryDetails?.data;
  const accessories = props?.accessoriesData?.data;
  const reviews = props?.reviews?.data;
  const metadata = props?.reviews?.meta;

  return (
    <>
      <AccessoryDetailsUI
        accessories={accessories}
        reviews={reviews}
        accessoryDetails={accessoryDetails}
        metadata={metadata}
      />
    </>
  );
};

AccessoryDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default AccessoryDetails;