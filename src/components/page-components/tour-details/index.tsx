// @flow strict
import { Container } from "@mui/material";
import PackageDetails from "./package-details";
import RelatedProductsSection from "./related-products-section";
import ReviewSection from "./review-section";
import ThumbnailSection from "./thumbnail-section";

function TourDetailsUI() {

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <ThumbnailSection />
          <div className="">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In distinctio porro,
              ut repellendus nesciunt eius assumenda molestias laudantium architecto exercitationem?</p>
          </div>
        </div>
      </Container>
      <PackageDetails />
      <RelatedProductsSection />
      <ReviewSection />
    </div>
  );
};

export default TourDetailsUI;