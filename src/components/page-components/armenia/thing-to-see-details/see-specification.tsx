// @flow strict

import { Button, Rating } from "@mui/material";
import { BiCalendar, BiCategory } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";
import { MdEventAvailable, MdNestCamWiredStand, MdPayment } from "react-icons/md";
import { ReviewTypes, ThingToSeeType } from "../../../../types";


function SeeSpecification({ thing }: { thing: ThingToSeeType }) {
  const getReviewsAvarage = (reviews: ReviewTypes[]) => {
    let sum = 0;
    reviews.map((review) => {
      sum += review.rating;
    });
    return (sum / reviews.length).toFixed(1);
  }

  return (
    <div className="px-4 md:px-12">
      <h3 className="text-[#000000] text-xl font-semibold mt-0">{thing.name}</h3>
      {
        thing.reviews.length > 0 &&
        <p className="flex items-center gap-2">
          <Rating
            max={1}
            size="small"
            name="half-rating"
            readOnly
            defaultValue={1}
            precision={0.1}
          />
          <span className="text-base text-[#5e5e5e]">
            {getReviewsAvarage(thing.reviews)} Star | {thing.reviews.length} People
          </span>
        </p>
      }
      <p className="flex items-center gap-3">
        <IoLocation className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">From Yerevan:</span>
        <span className="text-base text-[#000000] font-bold">
          $ {thing.fromYerevan}
        </span>
      </p>


      <p className="flex items-center gap-3">
        <BiCategory className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          Type:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {thing.type}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          Date:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {thing.date}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdNestCamWiredStand className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          The nearest Settlement:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {thing.neatestSettlement}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdEventAvailable className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          Available:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {thing.available}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdPayment className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          Entrance:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {thing.entrance}
        </span>
      </p>

      <div className="md:mt-8">
        <Button
          className="px-8 md:px-12 rounded-lg"
          variant="contained">Submit</Button>
      </div>
    </div>
  );
};

export default SeeSpecification;