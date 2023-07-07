// @flow strict
import { Container } from "@mui/material";
import { CarType, ReviewTypes, TourAccessoryType } from "../../../../types";
import AccessoryPricingTable from "./accessory-pricing";
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

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <AccessorySpecification
          accessoryDetails={accessoryDetails}
          metadata={metadata}
          car={car} />
        <AccessoryPricingTable accessoryDetails={accessoryDetails} />
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