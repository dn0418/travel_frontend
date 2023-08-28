// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { MiceTypes } from '../../types/services';
import serviceClient from '../client/service-client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await serviceClient.mice.related();

  const paths = data?.map((item: MiceTypes) => {
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

  try {
    await serviceClient.mice.related();
    const miceDetails = await serviceClient.mice.getByID(id);
    const reviews = await serviceClient.reviews.miceReview(id);

    return {
      props: {
        miceDetails: miceDetails,
        reviews: reviews,
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};