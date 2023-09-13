import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import armeniaClient from "../../client/armenia-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;

  const rubrics = await armeniaClient.rubrics.all();

  return {
    props: {
      rubricsData: rubrics
    },
  };
};
