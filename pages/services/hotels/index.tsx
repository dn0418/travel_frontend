// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import HotelsUI from "../../../src/components/page-components/hotels";
import { getStaticProps } from "../../../src/rest-api/server/hotels.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticProps };


const Hotels: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({ hotels }) => {
  return (
    <>
      <HotelsUI hotels={hotels} />
    </>
  );
};

Hotels.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Hotels;