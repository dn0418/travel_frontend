import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import armeniaClient from "../../client/armenia-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query, locale } = context;
  const page = query["page"] || 1;
  const rubics = query["rubics"] || '';
  const search = query["search"] || "";

  const blogs = await armeniaClient.blogs.all(page, search, locale);

  return {
    props: {
      blogsData: blogs
    },
  };
};
