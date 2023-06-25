// @flow strict
import { Container } from "@mui/material";
import { CarType, ReviewTypes } from "../../../types";
import CarReviewSection from "./car-review-section";
import CarSpecification from "./car-specification";
import TopSuggestedCars from "./top-suggested";

interface PropsType {
  car: CarType,
  cars: CarType[],
  reviews: ReviewTypes[]
}

function CarDetailsUI({ car, cars, reviews }: PropsType) {

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <CarSpecification car={car} />
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