import type { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import type { BlogPageProps } from "../types";
import client from "./client";
import { API_ENDPOINTS } from "./client/api-endpoints";

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([API_ENDPOINTS.POST], client.posts?.all);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 120,
  };
};
