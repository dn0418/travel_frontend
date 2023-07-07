// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ThingToSeeType } from '../../types';
import client from '../client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await client.thingToSee.all();

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
  const allThings = await client.thingToSee.all(1, '', '');

  try {
    await client.thingToSee.all();
    const thingDetails = await client.thingToSee.getByID(id);
    const reviews = await client.reviews.thingToSeeReview(id);

    return {
      props: {
        thingDetails: thingDetails,
        allThingsData: allThings,
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