// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { TourAccessoryType } from '../../types';
import client from '../client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await client.accessories.all(1, '');

  const paths = data?.map((item: TourAccessoryType) => {
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
  const allAccessory = await client.accessories.all(1, '');

  try {
    await client.accessories.all();
    const carsDetails = await client.carWithoutDriver.getByID(id);
    const accessoryDetails = await client.accessories.getByID(id);
    const reviews = await client.reviews.accessoryReview(id);

    return {
      props: {
        carsDetails: carsDetails,
        accessoryDetails: accessoryDetails,
        accessoriesData: allAccessory,
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