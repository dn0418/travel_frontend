// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import armeniaClient from '../../client/armenia-client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await armeniaClient.blogs.all();

  const paths = data?.map((item: any) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params!;
  const blogs = await armeniaClient.blogs.all(1, '', '');

  try {
    await armeniaClient.blogs.all();
    const blogDetails = await armeniaClient.blogs.getByID(id);

    return {
      props: {
        blogDetails: blogDetails,
        blogsData: blogs,
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};