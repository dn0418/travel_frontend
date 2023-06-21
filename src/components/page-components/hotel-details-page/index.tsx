// @flow strict

import { Container } from "@mui/material";
import { HotelType } from "../../../types";
import HotelDetailsMaps from "./hotel-details-map";
import HotelSpecification from "./hotel-specifications";
import RelatedHotels from "./related-hotels";
import ReviewSection from "./review-section/review-section";
import HotelThumbnailSection from "./thumbnail-section";

interface PropsType {
  allHotel: HotelType[];
  hotel: HotelType;
}

function HotelDetailsPage({ hotel, allHotel }: PropsType) {
  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <HotelThumbnailSection hotel={hotel} />
          <HotelSpecification hotel={hotel} />
        </div>
        <HotelDetailsMaps hotel={hotel} />
      </Container>
      <RelatedHotels hotels={allHotel} />
      <ReviewSection reviews={hotel.reviews} />
    </div>
  );
};

export default HotelDetailsPage;