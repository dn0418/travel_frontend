import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import client from "../client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;
  const limit = query["limit"] || 12;

  const reviews = await client.reviews?.all(page, limit);
  const staticPages = await client.staticPages?.all();

  return {
    props: {
      reviewsData: reviews,
      staticPagesData: staticPages
    },
  };
};
