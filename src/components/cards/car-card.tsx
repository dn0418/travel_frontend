// @flow strict

import { Button, Card } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { CarType } from '../../types';

interface TransportCardProps {
  car: CarType;
}

function TransportCard({ car }: TransportCardProps) {

  return (
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={car.thumbnail}
          alt={car.name}
          className="rounded-lg"
          width={600}
          height={220}
          layout="responsive"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/services/transport/${car.id}`}>
              <p className="text-xl font-medium my-2 text-black">
                {car.name + " " + car.model}
              </p>
            </Link>
          </div>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {car.seatNo} seat {car.isDriver ? "with" : "without"} driver
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            Year: {car.year}
          </p>

          <p className="text-sm  text-[#5e5e5e] mt-6">{car.description}</p>
          <div className="flex justify-between items-center">
            {
              car.discountedPrice ? <div className="flex items-center gap-4">
                <p className="text-sm text-[#5e5e5e] line-through">${car.price}</p>
                <p className="text-base font-semibold">${car.discountedPrice}</p>
              </div>
                :
                <p className="text-base font-semibold">${car.price}</p>
            }
            <Button className="rounded-lg" variant='contained'>Submit</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransportCard;
