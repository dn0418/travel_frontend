// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { TourAccessoryType } from '../../types';

interface TransportCardProps {
  accessory: TourAccessoryType;
}

function AccessoriesAdminCard({ accessory }: TransportCardProps) {

  return (
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={accessory.thumbnail}
          alt={accessory.title}
          className="rounded-lg"
          width={600}
          height={220}
          layout="responsive"
        />
        <div className="p-3 flex flex-col justify-between">
          <div className="">
            <div className="flex items-center justify-between">
              <Link href={`/services/tour-accessories/${accessory.id}`}>
                <p className="text-xl font-medium my-2 text-black">
                  {accessory.title}
                </p>
              </Link>
            </div>
            <div className="flex justify-between items-center">

              <p className="my-2 text-[#5E5E5E] text-sm">
                Type: {accessory.type.name}
              </p>
              {
                accessory.rating &&
                <div className="flex items-center gap-1">
                  <Rating
                    max={1}
                    size="small"
                    name="half-rating"
                    readOnly
                    defaultValue={accessory.rating || 0}
                    precision={0.1}
                  />
                  <span className="text-[#5E5E5E] text-sm">
                    {accessory.rating.toFixed(1)}
                  </span>
                </div>
              }
            </div>

            <p className="my-2 text-[#5E5E5E] text-sm">
              Available: {accessory.available}
            </p>
            <p className="text-sm  text-[#5e5e5e] mt-6 line-clamp-3">
              {accessory.shortDescription}
            </p>
          </div>
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

export default AccessoriesAdminCard;
