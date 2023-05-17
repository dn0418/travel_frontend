// @flow strict

import { Button, Rating } from '@mui/material';
import Image from 'next/image';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import { BsCarFrontFill } from 'react-icons/bs';
import { IoMdMan } from 'react-icons/io';
import { RiHotelLine } from 'react-icons/ri';

const tourCardData = {
  imageSrc: "https://i.ibb.co/HhLQtsx/1.png",
  imageAlt: "",
  title: "Yerevan",
  rating: 4.5,
  duration: "3 Days 4 Nights",
  startDate: "15-Feb-2023",
  endDate: "15-Feb-2023",
  hotelCount: 1,
  carCount: 1,
  activityCount: 2,
  description: "The second largest city in Armenia, Gyumri is well worth a visit for anyone heading to the country for the first time",
  price: 950
};

function TourCard() {
  const {
    imageSrc,
    imageAlt,
    title,
    rating,
    duration,
    startDate,
    endDate,
    hotelCount,
    carCount,
    activityCount,
    description,
    price,
  } = tourCardData;

  return (
    <div className="bg-white p-3">
      <Image
        src={imageSrc}
        alt={imageAlt}
        className="rounded-lg"
        width={600}
        height={220}
        layout="responsive"
      />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium my-2">{title}</p>
          <div className="flex items-center gap-1">
            <Rating
              max={1}
              size="small"
              name="half-rating"
              readOnly
              defaultValue={rating}
              precision={0.1}
            />
            <span className="text-[#5E5E5E] text-sm">{rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="my-2 text-[#5E5E5E] text-sm">{duration}</p>
          <Button className="min-w-fit p-0">
            <AiOutlineHeart className="text-xl font-semibold text-[#EDA592]" />
          </Button>
        </div>
        <p className="my-2 flex items-center gap-1">
          <BiCalendar className="text-[#5a5a5a] text-sm" />
          <span className="text-[#5e5e5e] text-sm">{startDate}</span>
        </p>
        <p className="my-2 flex items-center gap-1">
          <BiCalendar className="text-[#5a5a5a] text-sm" />
          <span className="text-[#5e5e5e] text-sm">{endDate}</span>
        </p>
        <div className="mt-6 grid grid-cols-3">
          <div className="flex flex-col items-center justify-start">
            <RiHotelLine />
            <p className="text-sm text-[#5e5e5e] my-2">{hotelCount} Hotel</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <BsCarFrontFill />
            <p className="text-sm text-[#5e5e5e] my-2">{carCount} Car</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <IoMdMan />
            <p className="text-sm text-[#5e5e5e] my-2">{activityCount} Activities</p>
          </div>
        </div>
        <p className="text-sm  text-[#5e5e5e] my-2">{description}</p>
        <p className="text-sm  text-[#5e5e5e] my-2">
          <span>Start from</span>
          <strong className="text-base ms-5 text-black">${price}</strong>
        </p>
      </div>
    </div>
  );
};

export default TourCard;
