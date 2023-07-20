import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import armeniaClient from "../../client/armenia-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query, locale } = context;
  const page = query["page"] || 1;
  const type = query["type"] || '';
  const search = query["search"] || "";

  const things = await armeniaClient.thingToSee.all(page, type, search, locale);

  return {
    props: {
      thingsData: things
    },
  };
};
