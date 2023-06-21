// @flow strict

import { Button, Rating } from "@mui/material";
import { AiOutlineStar } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { RiHotelLine } from "react-icons/ri";
import { HotelType } from "../../../types";
import { formatDate } from "../../../utils/formate-date";


function HotelSpecification({ hotel }: { hotel: HotelType }) {

  return (
    <div className="px-4 md:px-12">
      <h3 className="text-[#000000] text-xl font-semibold mt-0">{hotel.name}</h3>
      <p className="flex items-center gap-2">
        <IoLocationOutline className="text-sm text-[#EDA592]  font-bold" />
        <span className="text-sm text-[#5e5e5e]">
          {hotel.country + '-' + hotel.city}
        </span>
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
        <span className="text-sm text-[#5e5e5e] line-through">$ {hotel.price}</span>
        <span className="text-base text-[#000000] font-bold">
          $ {hotel.discountedPrice | hotel.price}
        </span>
      </p>
      <p className="flex items-center gap-4">
        <RiHotelLine className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{hotel.roomsDetails}</span>
      </p>
      <p className="flex items-center gap-4">
        <AiOutlineStar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{hotel.quality}</span>
      </p>
      <p className="flex items-center gap-4">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {formatDate(hotel.date)}
        </span>
      </p>

      <p className="flex items-center gap-4">
        <BsPerson className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{hotel.activities} Activities</span>
      </p>
      <div className="md:mt-8">
        <Button
          className="px-8 md:px-12 rounded-lg"
          variant="contained">Submit</Button>
      </div>
    </div>
  );
};

export default HotelSpecification;