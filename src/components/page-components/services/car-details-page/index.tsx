// @flow strict
import { Container } from "@mui/material";
import { ReviewTypes } from "../../../../types";
import { CarWithOutType } from "../../../../types/car-type";
import CarPricingTable from "./car-pricing";
import CarReviewSection from "./car-review-section";
import CarSpecification from "./car-specification";
import TopSuggestedCars from "./top-suggested";

interface PropsType {
  car: CarWithOutType,
  cars: CarWithOutType[],
  reviews: ReviewTypes[]
}

function CarDetailsUI({ car, cars, reviews }: PropsType) {

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <CarSpecification car={car} />
        <CarPricingTable car={car} />
      </Container>
      <CarReviewSection
        car={car}
        reviews={reviews}
      />
      <TopSuggestedCars cars={cars} />
    </div>
  );
};

export default CarDetailsUI;