// @flow strict
import { Container } from "@mui/material";
import { CarType, ReviewTypes, TourAccessoryType } from "../../../types";
import AccessoryReviewSection from "./accessory-review-section";
import AccessorySpecification from "./accessory-specification";

interface PropsType {
  car: CarType;
  accessories: TourAccessoryType[];
  reviews: ReviewTypes[];
  accessoryDetails: TourAccessoryType;
  metadata: {
    avarage: number;
    total: number;
  }
}

function AccessoryDetailsUI({ car, accessories, reviews, accessoryDetails, metadata }: PropsType) {

  // console.log(accessoryDetails)
  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <AccessorySpecification
          accessoryDetails={accessoryDetails}
          metadata={metadata}
          car={car} />
      </Container>
      <AccessoryReviewSection
        accessoryDetails={accessoryDetails}
        reviews={reviews}
      />
      {/* <TopSuggestedAccessories accessories={accessories} /> */}
    </div>
  );
};

export default AccessoryDetailsUI;