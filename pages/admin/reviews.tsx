// @flow strict

import { InferGetServerSidePropsType } from "next";
import ReviewsDashboard from "../../src/components/admin-components/reviews";
import DashboardLayout from "../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../src/rest-api/about/about.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
export { getServerSideProps };

const Reviews: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const { reviewsData } = props;
  const reviews = reviewsData.data;
  const reviewsPagination = reviewsData.pagination;
  console.log(reviews)

  return (
    <>
      <ReviewsDashboard reviews={reviews} reviewsPagination={reviewsPagination} />
    </>
  );
};

Reviews.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Reviews;