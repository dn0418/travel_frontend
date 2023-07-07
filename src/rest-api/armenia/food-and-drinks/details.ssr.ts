// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { FoodAndDrinksType } from '../../../types';
import client from '../../client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await client.foodAndDrinks.all();

  const paths = data?.map((item: FoodAndDrinksType) => {
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
  const foodAndDrinks = await client.foodAndDrinks.all(1, '', '');

  try {
    await client.foodAndDrinks.all();
    const foodAndDrinkDetails = await client.foodAndDrinks.getByID(id);
    const reviews = await client.reviews.foodAndDrinksReview(id);

    return {
      props: {
        foodAndDrinkDetails: foodAndDrinkDetails,
        foodAndDrinks: foodAndDrinks,
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