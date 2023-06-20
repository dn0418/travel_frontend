// @flow strict

import { Card, Rating } from "@mui/material";
import Image from "next/image";
import { ReviewTypes } from "../../types";

type ReviewCardProps = {
  review: ReviewTypes,
  isRating?: boolean
}

function ReviewCard({ review, isRating = false }: ReviewCardProps) {

  return (
    <Card className='bg-white p-3 md:p-8 h-[300px] regular-shadow rounded-3xl'>
      <div className="flex justify-between items-start">
        <div className='md:flex items-center gap-3 md:gap-5 md:mb-5'>
          <Image
            src={review.profilePhoto}
            width={64}
            height={64}
            className='rounded-full'
            alt={review.firstName + ' ' + review.lastName}
          />
          <div className=''>
            <p className='my-1 text-xl'>{review.firstName + ' ' + review.lastName}</p>
            <p className='my-0'>{review.location}</p>
          </div>
        </div>
        {
          isRating &&
          <div className="flex items-center gap-2">
            <Rating
              max={1}
              size="small"
              name="half-rating"
              readOnly
              defaultValue={1}
              precision={0.1}
            />
            <span className="text-[#5E5E5E] text-sm">5 Star</span>
          </div>
        }
      </div>
      <p className='text-[#626262] my-2 line-clamp-5 md:line-clamp-6'>
        {review.message}
      </p>
    </Card>
  );
}

export default ReviewCard;
