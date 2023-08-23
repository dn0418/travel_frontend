// @flow strict
import { Container } from "@mui/material";
import { ReviewTypes, SurroundingType } from "../../../../types";
import SurroundingReview from "./review-section";
import SurroundingDetailsMaps from "./surrounding-maps";
import SurroundingSpecification from "./surroundings-specification";
import SurroundingThumbnailSection from "./surroundings-thumbnail";

interface PropsType {
  surrounding: SurroundingType,
  surroundings: SurroundingType[],
  reviews: ReviewTypes[]
}

function SurroundingDetailsUI({ surrounding, reviews }: PropsType) {

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <SurroundingThumbnailSection surrounding={surrounding} />
          <SurroundingSpecification surrounding={surrounding} />
        </div>
        <SurroundingDetailsMaps surrounding={surrounding} />
      </Container>
      <SurroundingReview
        surrounding={surrounding}
        reviews={reviews}
      />
    </div>
  );
};

export default SurroundingDetailsUI;