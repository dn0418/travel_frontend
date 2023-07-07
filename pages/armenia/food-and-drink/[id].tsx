// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import FoodAndDrinkDetailsUI from "../../../src/components/page-components/armenia/food-and-drink-details";
import {
  getStaticPaths,
  getStaticProps
} from "../../../src/rest-api/armenia/food-and-drinks/details.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const FoodAndDrinksDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const foodAndDrinkDetails = props.foodAndDrinkDetails?.data;
  const foodAndDrinks = props?.foodAndDrinks?.data;
  const reviews = props?.reviews?.data;

  return (
    <>
      <FoodAndDrinkDetailsUI
        foodAndDrinks={foodAndDrinks}
        foodAndDrinkDetails={foodAndDrinkDetails}
        reviews={reviews}
      />
    </>
  );
};

FoodAndDrinksDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default FoodAndDrinksDetails;