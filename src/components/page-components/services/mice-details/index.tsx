// @flow strict
import { Container } from "@mui/material";
import { ReviewTypes } from "../../../../types";
import { MiceTypes } from "../../../../types/services";
import MiceReviewSection from "./mice-review-section";
import MiceSpecification from "./mice-specification";

interface PropsType {
  reviews: ReviewTypes[];
  miceDetails: MiceTypes;
  metadata: {
    avarage: number;
    total: number;
  };
}

function MiceDetailsUI({
  reviews,
  miceDetails,
  metadata,
}: PropsType) {

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <MiceSpecification
          mice={miceDetails}
          metadata={metadata}
        />
      </Container>
      <MiceReviewSection
        mice={miceDetails}
        reviews={reviews}
      />
    </div>
  );
}

export default MiceDetailsUI;
