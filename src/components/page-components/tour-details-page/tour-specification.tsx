// @flow strict

import { Button, Rating } from "@mui/material";
import { BiCalendar, BiCar, BiHash } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { RiHotelLine } from "react-icons/ri";
import { TourType } from "../../../types";


function TourSpecification({ tour }: { tour: TourType }) {

  return (
    <div className="px-4 md:px-12">
      <h3 className="text-[#000000] text-xl font-semibold mt-0">{tour.title}</h3>
      <p className="flex items-center gap-2">
        <IoLocationOutline className="text-sm text-[#EDA592]  font-bold" />
        <span className="text-sm text-[#5e5e5e]">{tour.destination}</span>
      </p>
      <p className="flex items-center gap-2">
        <Rating
          max={1}
          size="small"
          name="half-rating"
          readOnly
          defaultValue={1}
          precision={0.1}
        />
        <span className="text-sm text-[#5e5e5e]">5 Star | 100 People</span>
      </p>
      <p className="flex items-center gap-3">
        <span className="text-sm text-[#5e5e5e] line-through">$ {tour.price}</span>
        <span className="text-base text-[#000000] font-bold">
          $ {tour.discountedPrice | tour.price}
        </span>
      </p>
      <p className="flex items-center gap-4">
        <BiHash className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {tour.dayLength + ' days' + ' ' + tour.nightLength + ' night'}
        </span>
      </p>
      <p className="flex items-center gap-4">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {new Date(tour.startedDate).toDateString()}
        </span>
      </p>
      <p className="flex items-center gap-4">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {new Date(tour.endDate).toDateString()}
        </span>
      </p>
      <p className="flex items-center gap-4">
        <RiHotelLine className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{tour.hotelDetails}</span>
      </p>
      {
        tour.car &&
        <p className="flex items-center gap-4">
          <BiCar className="text-base text-[#EDA592]  font-bold" />
          <span className="text-base text-[#5e5e5e]">Car</span>
        </p>
      }
      <p className="flex items-center gap-4">
        <BsPerson className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{tour.activities} Activities</span>
      </p>
      <div className="md:mt-8">
        <Button
          className="px-8 md:px-12 rounded-lg"
          variant="contained">Submit</Button>
      </div>
    </div>
  );
};

export default TourSpecification;