// @flow strict
import { Container } from "@mui/material";
import { ReviewTypes, ThingToSeeType } from "../../../../types";
import SeeReviewSection from "./review-section";
import SeeDetailsMaps from "./see-details-maps";
import SeeSpecification from "./see-specification";
import SeeThumbnailSection from "./see-thumbnail";

interface PropsType {
  thing: ThingToSeeType,
  things: ThingToSeeType[],
  reviews: ReviewTypes[]
}

function ThingToSeeDetailsUI({ thing, things, reviews }: PropsType) {
  // console.log(thing, things, reviews);

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <SeeThumbnailSection thing={thing} />
          <SeeSpecification thing={thing} />
        </div>
        <SeeDetailsMaps thing={thing} />
      </Container>
      <SeeReviewSection
        thing={thing}
      />
    </div>
  );
};

export default ThingToSeeDetailsUI;