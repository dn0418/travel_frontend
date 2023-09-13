// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import BlogDetailsUI from "../../../src/components/page-components/armenia/blogs/blog-details";
import {
  getStaticPaths,
  getStaticProps
} from "../../../src/rest-api/armenia/blogs/single-blog.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const BlogDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const blogDetails = props.blogDetails?.data;
  const blogs = props?.blogsData?.data;

  return (
    <>
      <BlogDetailsUI
        blogs={blogs}
        blog={blogDetails}
      />
    </>
  );
};

BlogDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default BlogDetails;