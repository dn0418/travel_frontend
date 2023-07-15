// @flow strict

import { Pagination, PaginationItem } from "@mui/material";
import { useRouter } from "next/router";
import { PaginationType, ReviewTypes } from "../../../types";
import ReviewCard from "../../cards/review-card";

interface Props {
  reviews: ReviewTypes[];
  reviewsPagination: PaginationType;
}

function ReviewsSection({ reviews, reviewsPagination }: Props) {
  const router = useRouter();
  const { totalPages } = reviewsPagination;

  const handleUpdatePage = (queryParams: { page: number }) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...queryParams },
    });
  };

  return (
    <div className='w-full'>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        {reviews.map((item, i) => (
          <ReviewCard review={item} key={i} />
        ))}
      </div>
      <div className='flex justify-center my-3 md:my-6'>
        {reviews.length > 0 && (
          <Pagination
            size='large'
            onChange={(_, p) => handleUpdatePage({ page: p })}
            count={totalPages}
            shape='rounded'
            renderItem={(item) => (
              <PaginationItem
                sx={{ color: "#EDA592", bgcolor: "#ffffff" }}
                className='pagination'
                components={{
                  next: (props) => (
                    <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                      Next
                    </span>
                  ),
                  previous: (props) => (
                    <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                      Prev
                    </span>
                  ),
                }}
                {...item}
              />
            )}
            variant='outlined'
          />
        )}
      </div>
    </div>
  );
}

export default ReviewsSection;
