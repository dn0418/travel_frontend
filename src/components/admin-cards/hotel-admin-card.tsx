// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { HotelType } from '../../types';


function HotelAdminCard({ hotel }: { hotel: HotelType }) {

  return (
    <Card className="regular-shadow rounded-lg h-full">
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
            <div className="flex items-center gap-3">
              <Link href='#'>
                <Button className='shadow min-w-fit py-2 px-5 text-[#5e5e5e] text-lg'>
                  <BiEdit />
                </Button>
              </Link>
              <Link href='#'>
                <Button className='shadow min-w-fit py-2 px-5 text-orange-500 text-lg'>
                  <MdDelete />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotelAdminCard;
