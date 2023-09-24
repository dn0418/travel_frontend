// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { HotelDataType } from '../../types/services';
import serviceClient from '../client/service-client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await serviceClient.hotels.all();

  const paths = data?.map((item: HotelDataType) => {
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
  const allHotel = await serviceClient.hotels.all();

  try {
    await serviceClient.hotels.all();
    const hotelDetails = await serviceClient.hotels.getByID(id);
    const reviews = await serviceClient.reviews.hotelReview(id);
    const hotelsTypes = await serviceClient.hotelType.all();

    return {
      props: {
        allHotel: allHotel,
        hotelDetails: hotelDetails,
        hotelReviews: reviews,
        hotelsTypesData: hotelsTypes,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};