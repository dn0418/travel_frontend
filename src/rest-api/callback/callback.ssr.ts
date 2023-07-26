import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import client from "../client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;

  const callbacks = await client.callBack.allCallBack(page);

  return {
    props: {
      callbacksData: callbacks
    },
  };
};
