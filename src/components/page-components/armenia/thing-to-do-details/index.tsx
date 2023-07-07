// @flow strict
import { Container } from "@mui/material";
import { ReviewTypes, ThingToSeeType } from "../../../../types";
import DoDetailsMaps from "./do-details-maps";
import DoSpecification from "./do-specification";
import DoThumbnailSection from "./do-thumbnail";
import DoReviewSection from "./review-section";

interface PropsType {
  thing: ThingToSeeType,
  things: ThingToSeeType[],
  reviews: ReviewTypes[]
}

function ThingToDoDetailsUI({ thing, things, reviews }: PropsType) {
  // console.log(thing, things, reviews);

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <DoThumbnailSection thing={thing} />
          <DoSpecification thing={thing} />
        </div>
        <DoDetailsMaps thing={thing} />
      </Container>
      <DoReviewSection
        thing={thing}
      />
    </div>
  );
};

export default ThingToDoDetailsUI;