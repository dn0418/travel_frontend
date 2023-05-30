// @flow strict

import GeneralLayout from "../../../src/components/layouts/_general";
import HotelsUI from "../../../src/components/page-components/hotels";
import { NextPageWithLayout } from "../../../src/types/page-props";


const Hotels: NextPageWithLayout = () => {

  return (
    <>
      <HotelsUI />
    </>
  );
};

Hotels.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Hotels;