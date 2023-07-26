// @flow strict
import { Container } from "@mui/material";
import { ReviewTypes } from "../../../types";
import { TourType } from "../../../types/tour";
import PackageDetails from "./package-details/package-details";
import TourPriceTable from "./package-details/tour-price-table";
import RelatedTourSection from "./related-tour-section";
import ReviewSection from "./review-section/review-section";
import ThumbnailSection from "./thumbnail-section";
import TourDetailsMaps from "./tour-details-maps";
import TourRoute from "./tour-route";
import TourSpecification from "./tour-specification";

interface PropsType {
  tour: TourType;
  tours: TourType[];
  reviews: ReviewTypes[];
}

function TourDetailsUI({ tour, tours, reviews }: PropsType) {
  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <ThumbnailSection tour={tour} />
          <TourSpecification tour={tour} />
        </div>
        <TourDetailsMaps tour={tour} />
      </Container>
      <TourRoute tour={tour} />
      <PackageDetails tour={tour} />
      <Container>
        <TourPriceTable tour={tour} />
      </Container>
      <RelatedTourSection tours={tours} />
      <ReviewSection
        reviews={reviews}
        tour={tour}
      />
    </div>
  );
}

export default TourDetailsUI;
