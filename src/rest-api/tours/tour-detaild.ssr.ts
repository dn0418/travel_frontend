// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { TourType } from '../../types/tour';
import tourClient from '../client/tour-client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await tourClient.tours.all('en');

  const paths = data?.map((item: TourType) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};



export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { id } = params!; //* we know it's required because of getStaticPaths

  try {
    const tourDetails = await tourClient.tours.getByID(id);
    const toursData = await tourClient.tours.all(locale);
    const reviews = await tourClient.reviews.tourReview(id);
    const destinationData = await tourClient.tourDestination.all();

    return {
      props: {
        tourDetails: tourDetails,
        toursData: toursData,
        tourReviews: reviews,
        destinationData: destinationData
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};