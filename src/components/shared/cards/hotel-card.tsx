// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const tourCardData = {
  imageSrc: "https://i.ibb.co/3kPS9dZ/vojtech-bruzek-Yrxr3bs-Pd-S0-unsplash-1.png",
  imageAlt: "Kocatas Mansions",
  title: "Kocatas Mansions",
  rating: 4.5,
  duration: "3 Days 4 Nights",
  startDate: "15-Feb-2023",
  endDate: "15-Feb-2023",
  hotelCount: 1,
  carCount: 1,
  activityCount: 2,
  description: "The second largest city in Armenia, Gyumri is well worth a visit for anyone heading to the country for the first time",
  basePrice: 1000,
  discountPrice: 950,
};

function HotelCard() {
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
    basePrice,
    discountPrice
  } = tourCardData;

  return (
    <Card className="regular-shadow rounded-lg">
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
            <Link href="/tour-details">
              <p className="text-xl font-medium my-2 text-black">{title}</p>
            </Link>
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
            <div className="flex items-center gap-2">
              <HiOutlineLocationMarker className="text-[#EDA592] text-base" />
              <span className=" text-[#5E5E5E] text-sm">2C-Turki</span>
            </div>
            <Button className="min-w-fit p-0">
              <AiOutlineHeart className="text-xl font-semibold text-[#EDA592]" />
            </Button>
          </div>
          <p className="my-2  mb-6 text-[#5e5e5e] text-sm">
            2 bed, 1 bath
          </p>
          <p className="mb-1 flex items-center gap-1">
            <AiOutlineStar className="text-[#5a5a5a] text-sm" />
            <span className="text-[#5e5e5e] text-sm">5 star restaurant</span>
          </p>
          <p className="my-2 flex items-center gap-1">
            <BiCalendar className="text-[#5a5a5a] text-sm" />
            <span className="text-[#5e5e5e] text-sm">{endDate}</span>
          </p>
          <p className="text-sm  text-[#5e5e5e]">{description}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <p className="text-sm text-[#5e5e5e] my-2 line-through">${basePrice}</p>
              <p className="text-base font-semibold my-2">${discountPrice}</p>
            </div>
            <Button className="rounded-lg" variant='contained'>Submit</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
