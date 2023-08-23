// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ThingToSeeType } from '../../../types';
import armeniaClient from '../../client/armenia-client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await armeniaClient.surrounding.all();

  const paths = data?.map((item: ThingToSeeType) => {
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
  const surroundings = await armeniaClient.surrounding.all(1, '', '');

  try {
    await armeniaClient.surrounding.all();
    const thingDetails = await armeniaClient.surrounding.getByID(id);
    const reviews = await armeniaClient.reviews.surroundingReview(id);

    return {
      props: {
        surroundingDetails: thingDetails,
        surroundingsData: surroundings,
        reviews: reviews
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};