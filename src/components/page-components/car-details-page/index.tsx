// @flow strict
import { Container } from "@mui/material";
import { CarType } from "../../../types";
import CarSpecification from "./car-specification";

function CarDetailsUI({ car }: { car: CarType }) {
  console.log(car)

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <CarSpecification car={car} />
      </Container>
    </div>
  );
};

export default CarDetailsUI;