// @flow strict

import { Button, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BiCalendar } from 'react-icons/bi';
import { TourType } from '../../types/tour';

function TourCard({ tour }: { tour: TourType }) {
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
  const { t } = useTranslation('common');

  return (
    <div className="bg-white p-3">
      <Image
        src={thumbnail}
        alt={title}
        className="rounded-lg"
        width={600}
        height={350}
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
          <Link href={`/tour-details/${tour.id}`}>
            <Button
              className="rounded-lg bg-black text-white"
              variant='contained'>{t('seemore_text')}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
