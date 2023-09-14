import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import client from "../client";
import armeniaClient from "../client/armenia-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query, locale } = context;
  const page = query["page"] || 1;
  const limit = query["limit"] || 12;
  const search = query["search"] || "";

  const vacancies = await armeniaClient.vacancy.all(page, search, locale);

  const reviews = await client.reviews?.all(page, limit);
  const staticPages = await client.staticPages?.all();

  return {
    props: {
      reviewsData: reviews,
      staticPagesData: staticPages,
      vacanciesData: vacancies
    },
  };
};
