// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { ThingToSeeType } from '../../types';

interface ThingToSeeCardProps {
  thing: ThingToSeeType;
}

function ThingToSeeAdminCard({ thing }: ThingToSeeCardProps) {

  return (
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={thing.thumbnail}
          alt={thing.name}
          className="rounded-lg"
          width={600}
          height={220}
          layout="responsive"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/armenia/thing-to-see/${thing.id}`}>
              <p className="text-xl font-medium my-2 text-black">
                {thing.name}
              </p>
            </Link>
            {
              thing.rating > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={thing.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">{thing.rating.toFixed(1)}</span>
              </div>
            }
          </div>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            Date: {thing.date}
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            Type: {thing.type}
          </p>

          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {thing.shortDescription}
          </p>

          <div className="flex justify-end items-end">
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

export default ThingToSeeAdminCard;
