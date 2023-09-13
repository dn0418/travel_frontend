// @flow strict

import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import AdminBlogs from "../../../src/components/admin-components/blogs";
import DashboardLayout from "../../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../../src/rest-api/armenia/blogs/blogs.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const Blogs: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const blogs = props?.blogsData?.data;
  const metadata = props?.blogsData?.meta;
  const router = useRouter();
  const params = router.query;

  const handleSearchHotels = (searchText: string) => {
    if (searchText) {
      params['search'] = searchText;
    } else {
      delete params['search'];
    }
    params['page'] = '1';

    router.push({
      pathname: '/admin/blogs',
      query: params,
    });
  };

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/admin/blogs',
      query: params,
    });
  }

  return (
    <>
      <AdminBlogs
        blogs={blogs}
        handleSerachHotels={handleSearchHotels}
        metadata={metadata}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

Blogs.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Blogs;