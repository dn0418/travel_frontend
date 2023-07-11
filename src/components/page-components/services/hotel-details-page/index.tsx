// @flow strict

import { Container } from "@mui/material";
import { HotelType, ReviewTypes } from "../../../../types";
import HotelDetailsMaps from "./hotel-details-map";
import HotelPricingTable from "./hotel-pricing";
import HotelSpecification from "./hotel-specifications";
import RelatedHotels from "./related-hotels";
import ReviewSection from "./review-section";
import HotelThumbnailSection from "./thumbnail-section";

interface PropsType {
  allHotel: HotelType[];
  hotel: HotelType;
  reviews: ReviewTypes[];
  metadata: {
    total: number;
    avarage: number;
  }
}

function HotelDetailsPage({ hotel, allHotel, reviews, metadata }: PropsType) {

  // console.log(hotel)

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <HotelThumbnailSection hotel={hotel} />
          <HotelSpecification metadata={metadata} hotel={hotel} />
        </div>
        <HotelDetailsMaps hotel={hotel} />
      </Container>
      <HotelPricingTable hotel={hotel} />
      <RelatedHotels hotels={allHotel} />
      <ReviewSection hotel={hotel} reviews={reviews} />
    </div>
  );
};

export default HotelDetailsPage;