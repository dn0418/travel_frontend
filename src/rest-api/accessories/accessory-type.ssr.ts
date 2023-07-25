import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import serviceClient from "../client/service-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const accessoryTypes = await serviceClient.accessoryType.all();

  return {
    props: {
      accessoryTypeData: accessoryTypes,
    },
  };
};
