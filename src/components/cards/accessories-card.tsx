// @flow strict

import { Button, Card } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { TourAccessoryType } from '../../types';

interface TransportCardProps {
  accessory: TourAccessoryType;
}

function AccessoriesCard({ accessory }: TransportCardProps) {

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
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/services/tour-accessories/${accessory.id}`}>
              <p className="text-xl font-medium my-2 text-black">
                {accessory.title}
              </p>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <p className="my-2 text-[#5E5E5E] text-sm">
              Type: {accessory.type.name}
            </p>
            {
              accessory.isAvailable === true ?
                <p className="my-2 text-[#1a8a36] text-sm">Available</p> :
                <p className="my-2 text-[#5E5E5E] text-sm">Not Available</p>
            }
          </div>
          <p className="my-2 text-[#5E5E5E] text-sm">
            {accessory.specification}
          </p>


          <p className="text-sm  text-[#5e5e5e] mt-6">{accessory.goodsDetails}</p>
          <div className="flex justify-between items-center">
            <p className="text-base font-semibold">${accessory.price}</p>
            <Button className="rounded-lg" variant='contained'>Submit</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccessoriesCard;
