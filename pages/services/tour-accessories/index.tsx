// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import GeneralLayout from "../../../src/components/layouts/_general";
import TourAccessoriesUI from "../../../src/components/page-components/tour-accessories";
import { getServerSideProps } from "../../../src/rest-api/server/accessories.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const TourAccessories: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const accessories = props.accessoriesData?.data || [];
  const metaData = props.accessoriesData?.meta || {};
  const router = useRouter();
  const params = router.query;

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/services/tour-accessories',
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
      pathname: '/services/tour-accessories',
      query: params,
    });
  }

  return (
    <>
      <TourAccessoriesUI
        accessories={accessories}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

TourAccessories.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default TourAccessories;