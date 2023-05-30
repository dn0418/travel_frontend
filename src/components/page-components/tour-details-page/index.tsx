// @flow strict
import { Container } from "@mui/material";
import PackageDetails from "./package-details/package-details";
import TourPriceTable from "./package-details/tour-price-table";
import RelatedTourSection from "./related-tour-section";
import ReviewSection from "./review-section/review-section";
import ThumbnailSection from "./thumbnail-section";
import TourDetailsMaps from "./tour-details-maps";
import TourRoute from "./tour-route";
import TourSpecification from "./tour-specification";

function TourDetailsUI() {

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <ThumbnailSection />
          <TourSpecification />
        </div>
        <TourDetailsMaps />
      </Container>
      <TourRoute />
      <PackageDetails />
      <Container>
        <TourPriceTable />
      </Container>
      <RelatedTourSection />
      <ReviewSection />
    </div>
  );
};

export default TourDetailsUI;