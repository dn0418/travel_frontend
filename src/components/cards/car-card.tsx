// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CarWithOutType } from '../../types/car-type';

interface TransportCardProps {
  car: CarWithOutType;
}

function TransportCard({ car }: TransportCardProps) {
  const { t } = useTranslation('common');

  return (
    <Card className="regular-shadow  w-full h-full rounded-lg">
      <div className="bg-white p-3  w-full h-full">
        <Image
          src={car.thumbnail}
          alt={car.name}
          className="rounded-lg w-full h-full"
          width={600}
          height={350}
          layout="responsive"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/services/transport/${car.id}`}>
              <p className="text-xl font-medium my-2 text-black">
                {car.name}
              </p>
            </Link>
            {
              car.rating > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={car.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">{car.rating.toFixed(1)}</span>
              </div>
            }
          </div>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            Year: {car.year}
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            No of Seats: {car.seatNo}
          </p>

          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {car.shortDescription}
          </p>
          <div className="flex justify-end items-center">
            <Link href={`/services/transport/${car.id}`}>
              <Button className="rounded-lg bg-black text-white" variant='contained'>
                {t('seemore_text')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransportCard;
