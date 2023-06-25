// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { HotelType } from '../../types';
import client from '../client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await client.hotels.all();

  const paths = data?.map((item: HotelType) => {
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
  const { id } = params!; //* we know it's required because of getStaticPaths
  const allHotel = await client.hotels.all();

  try {
    await client.hotels.all();
    const hotelDetails = await client.hotels.getByID(id);
    const reviews = await client.reviews.hotelReview(id);

    return {
      props: {
        allHotel: allHotel,
        hotelDetails: hotelDetails,
        hotelReviews: reviews
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};