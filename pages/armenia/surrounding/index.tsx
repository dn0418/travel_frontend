// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import GeneralLayout from "../../../src/components/layouts/_general";
import SurroundingUI from "../../../src/components/page-components/armenia/surrounding";
import { getServerSideProps } from "../../../src/rest-api/armenia/surrounding/surrounding.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };



const Surrounding: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const surroundings = props.surroundingData?.data || [];
  const metaData = props.surroundingData?.meta || {};
  const router = useRouter();
  const params = router.query;

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/armenia/surrounding',
      query: params,
    });
  }

  const handleSearch = (searchText: string) => {
    if (searchText) {
      params['search'] = searchText;
    } else {
      delete params['search'];
    }
    params['page'] = '1';

    router.push({
      pathname: '/armenia/surrounding',
      query: params,
    });
  }

  return (
    <>
      <SurroundingUI
        surroundings={surroundings}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

Surrounding.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Surrounding;