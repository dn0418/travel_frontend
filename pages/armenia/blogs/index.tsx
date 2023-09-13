// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import GeneralLayout from "../../../src/components/layouts/_general";
import BlogsUI from "../../../src/components/page-components/armenia/blogs";
import { getServerSideProps } from "../../../src/rest-api/armenia/blogs/blogs.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const Events: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const blogs = props.blogsData?.data || [];
  const metaData = props.blogsData?.meta || {};
  const router = useRouter();
  const params = router.query;

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/armenia/blogs',
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
      pathname: '/armenia/blogs',
      query: params,
    });
  }

  return (
    <>
      <BlogsUI
        blogs={blogs}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        metaData={metaData}
      />
    </>
  );
};

Events.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Events;