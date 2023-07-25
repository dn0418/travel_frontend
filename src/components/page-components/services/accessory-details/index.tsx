// @flow strict
import { Container } from "@mui/material";
import { ReviewTypes } from "../../../../types";
import { TourAccessoryType } from "../../../../types/services";
import AccessoryPricingTable from "./accessory-pricing";
import AccessoryReviewSection from "./accessory-review-section";
import AccessorySpecification from "./accessory-specification";

interface PropsType {
  accessories: TourAccessoryType[];
  reviews: ReviewTypes[];
  accessoryDetails: TourAccessoryType;
  metadata: {
    avarage: number;
    total: number;
  };
}

function AccessoryDetailsUI({
  accessories,
  reviews,
  accessoryDetails,
  metadata,
}: PropsType) {
  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <AccessorySpecification
          accessoryDetails={accessoryDetails}
          metadata={metadata}
        />
        <AccessoryPricingTable accessoryDetails={accessoryDetails} />
      </Container>
      <AccessoryReviewSection
        accessoryDetails={accessoryDetails}
        reviews={reviews}
      />
      {/* <TopSuggestedAccessories accessories={accessories} /> */}
    </div>
  );
}

export default AccessoryDetailsUI;
