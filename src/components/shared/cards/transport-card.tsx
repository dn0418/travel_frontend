// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const tourCardData = {
  imageSrc: "https://i.ibb.co/k0qB6f3/jad-limcaco-NT1m-JPgni6-A-unsplash.png",
  imageAlt: "BMW - CX7",
  title: "BMW - CX7",
  rating: 4.9,
  driver: true,
  seatNo: 4,
  description: "The second largest city in Armenia, Gyumri is well worth a visit for anyone heading to the country for the first time",
  basePrice: 1000,
  discountPrice: 950,
};

function TransportCard() {
  const {
    imageSrc,
    imageAlt,
    title,
    rating,
    seatNo,
    driver,
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
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {seatNo} seat {driver ? "with" : "without"} driver
          </p>

          <p className="text-sm  text-[#5e5e5e] mt-6">{description}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <p className="text-sm text-[#5e5e5e] line-through">${basePrice}</p>
              <p className="text-base font-semibold">${discountPrice}</p>
            </div>
            <Button className="rounded-lg" variant='contained'>Submit</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransportCard;
