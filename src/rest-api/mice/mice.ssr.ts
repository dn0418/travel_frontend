import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import serviceClient from "../client/service-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query, locale } = context;
  const page = query["page"] || 1;
  const search = query["search"] || "";

  const miceData = await serviceClient.mice.filtered(page, search, locale);

  return {
    props: {
      miceData: miceData
    },
  };
};
