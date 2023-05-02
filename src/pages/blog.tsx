import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../components/layouts/_general";
import { getStaticProps } from "../rest/blog.ssr";
import { API_ENDPOINTS } from "../rest/client/api-endpoints";
import { NextPageWithLayout } from "../types";

export { getStaticProps };

const Blog: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props: { dehydratedState: { queries: any[] } }) => {
  const blogState = props.dehydratedState?.queries.find(
    (item: any) => item.queryKey[0] === API_ENDPOINTS.POST,
  );

  const blogs = blogState?.state?.data ?? null;
  console.log(blogs);

  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

Blog.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Blog;
