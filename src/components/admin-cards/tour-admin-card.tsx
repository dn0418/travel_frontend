// @flow strict

import { Button, Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { BiCalendar, BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { TourType } from '../../types/tour';

function TourAdminCard({ tour }: { tour: TourType }) {
  const {
    thumbnail,
    title,
    bestTime,
    dayLength,
    nightLength,
    shortDescription,
    price,
    reviewsRating
  } = tour;

  return (
    <div className="bg-white p-3">
      <Image
        src={thumbnail}
        alt={title}
        className="rounded-lg"
        width={600}
        height={220}
        layout="responsive"
      />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <Link href={`/tour-details/${tour.id}`}>
            <p className="text-xl font-medium my-2 text-black">{title}</p>
          </Link>
          {reviewsRating &&
            <div className="flex items-center gap-1">
              <Rating
                max={1}
                size="small"
                name="half-rating"
                readOnly
                defaultValue={reviewsRating}
                precision={0.1}
              />
              <span className="text-[#5E5E5E] text-sm">{reviewsRating.toFixed(1)}</span>
            </div>
          }
        </div>
        <p className="my-2 text-[#5E5E5E] text-sm">
          {dayLength + ' Days' + ' ' + nightLength + ' Nights'}
        </p>

        <p className="my-2 flex items-center gap-2">
          <BiCalendar className="text-[#5a5a5a] text-sm" />
          <span className="text-[#5e5e5e] text-sm">Best Time:</span>
          <span className="text-[#5e5e5e] text-sm font-medium">{bestTime}</span>
        </p>

        <p className="text-sm line-clamp-3 text-[#5e5e5e] my-3">{shortDescription}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <p className="text-sm text-[#5e5e5e] my-2">Start From</p>
            <p className="text-base font-semibold my-2">${price}</p>
          </div>
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
  );
};

export default TourAdminCard;
