// @flow strict

import { Button, Card } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineStar } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { HotelType } from '../../types';
import { formatDate } from '../../utils/formate-date';


function HotelCard({ hotel }: { hotel: HotelType }) {
  console.log(hotel)

  return (
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={hotel.thumbnail}
          alt={hotel.name}
          className="rounded-lg"
          width={600}
          height={220}
          layout="responsive"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/services/hotels/${hotel.id}`}>
              <p className="text-xl font-medium my-2 text-black">{hotel.name}</p>
            </Link>
            {/* {
              parseInt(hotel.reviewCount) > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={hotel.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">{hotel.rating}</span>
              </div>
            } */}
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

          <p className="my-2  mb-6 text-[#5e5e5e] text-sm">
            {hotel.roomsDetails}
          </p>

          <p className="my-2 flex items-center gap-1">
            <AiOutlineStar className="text-[#5a5a5a] text-sm" />
            <span className="text-[#5e5e5e] text-sm">{hotel.quality}</span>
          </p>
          <p className="my-2 flex items-center gap-1">
            <BiCalendar className="text-[#5a5a5a] text-sm" />
            <span className="text-[#5e5e5e] text-sm">{formatDate(hotel.date)}</span>
          </p>
          <p className="text-sm  text-[#5e5e5e] line-clamp-3">{hotel.hotelDetails}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <p className="text-sm text-[#5e5e5e] my-2 line-through">${hotel.price}</p>
              <p className="text-base font-semibold my-2">${hotel.discountedPrice}</p>
            </div>
            <Button className="rounded-lg" variant='contained'>Submit</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
