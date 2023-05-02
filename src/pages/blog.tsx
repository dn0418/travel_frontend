import { getStaticProps } from "../rest/blog.ssr";
import { API_ENDPOINTS } from "../rest/client/api-endpoints";

export { getStaticProps };

const Blog = (props: { dehydratedState: { queries: any[] } }) => {
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

export default Blog;
