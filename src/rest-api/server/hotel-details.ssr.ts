// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { TourType } from '../../types';
import client from '../client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await client.cars.all();

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



export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params!; //* we know it's required because of getStaticPaths
  const allCar = await client.cars.all();

  try {
    await client.cars.all();
    const carsDetails = await client.cars.getByID(id);
    const hotelDetails = await client.hotels.getByID(id);

    return {
      props: {
        carsDetails: carsDetails,
        carsData: allCar,
        hotelDetails: hotelDetails
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};