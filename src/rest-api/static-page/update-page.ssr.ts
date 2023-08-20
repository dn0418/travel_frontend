// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import client from '../client';

type ParsedQueryParams = {
  code: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await client.staticPages.all();

  const paths = data?.map((item: any) => {
    return {
      params: { code: item.code },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};



export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { code } = params!;

  try {
    await client.staticPages.all();
    const pageDetails = await client.staticPages.findOne(code);

    return {
      props: {
        pageDetails: pageDetails,
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};