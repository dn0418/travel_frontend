// @flow strict
import { Container } from "@mui/material";
import { CarType } from "../../../types";
import CarSpecification from "./car-specification";
import CarReviewSection from "./review-section/car-review-section";
import TopSuggestedCars from "./top-suggested";

function CarDetailsUI({ car, cars }: { car: CarType, cars: CarType[] }) {
  // console.log(car)

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <CarSpecification car={car} />
      </Container>
      <CarReviewSection reviews={car.reviews} />
      <TopSuggestedCars cars={cars} />
    </div>
  );
};

export default CarDetailsUI;