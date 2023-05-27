// @flow strict

import { Button, Rating } from "@mui/material";
import { BiCalendar, BiCar, BiHash } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { RiHotelLine } from "react-icons/ri";


function TourSpecification() {
  return (
    <div className="px-4 md:px-12">
      <h3 className="text-[#000000] text-xl font-semibold mt-0">Lake Sevan</h3>
      <p className="flex items-center gap-2">
        <IoLocationOutline className="text-sm text-[#EDA592]  font-bold" />
        <span className="text-sm text-[#5e5e5e]">center city of Armenia</span>
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
        <span className="text-sm text-[#5e5e5e] line-through">$ 1000</span>
        <span className="text-base text-[#000000] font-bold">$ 950</span>
      </p>
      <p className="flex items-center gap-4">
        <BiHash className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">3 Days, 4 Night</span>
      </p>
      <p className="flex items-center gap-4">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">15 - Feb - 2023</span>
      </p>
      <p className="flex items-center gap-4">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">18 - Feb - 2023</span>
      </p>
      <p className="flex items-center gap-4">
        <RiHotelLine className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">1 Room ( 2 bed, 1 bath )</span>
      </p>
      <p className="flex items-center gap-4">
        <BiCar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">Car</span>
      </p>
      <p className="flex items-center gap-4">
        <BsPerson className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">2 Activities</span>
      </p>
      <div className="flex items-center gap-5 md:mt-8">
        <Button className="px-8 md:px-12" variant="outlined">Favorite</Button>
        <Button className="px-8 md:px-12" variant="contained">Subscribe</Button>
      </div>
    </div>
  );
};

export default TourSpecification;