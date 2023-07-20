// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ThingToSeeType } from '../../../types';
import armeniaClient from '../../client/armenia-client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await armeniaClient.thingToSee.all();

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
  const allThings = await armeniaClient.thingToSee.all(1, '', '');

  try {
    await armeniaClient.thingToSee.all();
    const thingDetails = await armeniaClient.thingToSee.getByID(id);
    const reviews = await armeniaClient.reviews.thingToSeeReview(id);

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