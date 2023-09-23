import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import armeniaClient from "../../client/armenia-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query, locale } = context;
  const page = query["page"] || 1;
  const search = query["search"] || "";

  const brochurer = await armeniaClient.brochure.all(page, search, locale);

  return {
    props: {
      brochureData: brochurer
    },
  };
};
