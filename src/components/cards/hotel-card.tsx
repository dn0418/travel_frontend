// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { HotelType } from '../../types';


function HotelCard({ hotel }: { hotel: HotelType }) {


  return (
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={hotel.thumbnail}
          alt={hotel.name}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/services/hotels/${hotel.id}`}>
              <p className="text-xl font-medium my-2 text-black">{hotel.name}</p>
            </Link>
            {
              hotel.rating > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={hotel.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">{hotel.rating.toFixed(1)}</span>
              </div>
            }
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiOutlineLocationMarker className="text-[#EDA592] text-base" />
              <span className=" text-[#5E5E5E] text-sm">
                {hotel.city + " - " + hotel.country}
              </span>
            </div>
            {
              hotel.type &&
              <p className="my-0 text-[#5e5e5e] text-sm">

                Type: {hotel.type?.name}
              </p>
            }
          </div>

          <p className="text-sm  text-[#5e5e5e] line-clamp-3">{hotel.shortDescription}</p>
          <div className="flex justify-end items-center">
            <Link href={`/services/hotels/${hotel.id}`}>
              <Button className="rounded-lg bg-black text-white" variant='contained'>
                See More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
