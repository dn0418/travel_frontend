// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { CarType } from '../../types';
import client from '../client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await client.carWithoutDriver.all();

  const paths = data?.map((item: CarType) => {
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
  const allCar = await client.carWithoutDriver.all(1);

  try {
    await client.carWithoutDriver.all();
    const carsDetails = await client.carWithoutDriver.getByID(id);
    const reviews = await client.reviews.carReview(id);

    return {
      props: {
        carsDetails: carsDetails,
        carsData: allCar,
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