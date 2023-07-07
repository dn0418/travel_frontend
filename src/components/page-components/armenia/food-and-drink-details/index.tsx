// @flow strict
import { Container } from "@mui/material";
import { FoodAndDrinksType, ReviewTypes } from "../../../../types";
import FoodAndSeeDetailsMaps from "./food-details-maps";
import FoodAndDrinkSpecification from "./food-specification";
import FoodAndDrinkThumbnailSection from "./food-thumbnail";
import FoodAndDrinkReviewSection from "./review-section";

interface PropsType {
  foodAndDrinkDetails: FoodAndDrinksType,
  foodAndDrinks: FoodAndDrinksType[],
  reviews: ReviewTypes[]
}

function FoodAndDrinkDetailsUI({ foodAndDrinkDetails, foodAndDrinks, reviews }: PropsType) {
  // console.log(thing, things, reviews);

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <FoodAndDrinkThumbnailSection thing={foodAndDrinkDetails} />
          <FoodAndDrinkSpecification thing={foodAndDrinkDetails} />
        </div>
        <FoodAndSeeDetailsMaps thing={foodAndDrinkDetails} />
      </Container>
      <FoodAndDrinkReviewSection
        foodAndDrink={foodAndDrinkDetails}
      />
    </div>
  );
};

export default FoodAndDrinkDetailsUI;