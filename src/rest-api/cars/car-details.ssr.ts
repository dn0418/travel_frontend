// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { CarWithOutType } from '../../types/car-type';
import serviceClient from '../client/service-client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await serviceClient.carWithoutDriver.all();

  const paths = data?.map((item: CarWithOutType) => {
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
  const allCar = await serviceClient.carWithoutDriver.all(1);

  try {
    await serviceClient.carWithoutDriver.all();
    const carsDetails = await serviceClient.carWithoutDriver.getByID(id);
    const reviews = await serviceClient.reviews.carReview(id);

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