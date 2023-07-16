// @flow strict

import { Container, Pagination, PaginationItem } from "@mui/material";
import { useRouter } from "next/router";
import { PaginationType, ReviewTypes } from "../../../types";
import ReviewAdminCard from "../../admin-cards/review-admin-card";

interface Props {
  reviews: ReviewTypes[];
  reviewsPagination: PaginationType;
}

function ReviewsDashboard({ reviews, reviewsPagination }: Props) {
  const router = useRouter();
  const { totalPages } = reviewsPagination;


  const handleUpdatePage = (queryParams: { page: number }) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...queryParams },
    });
  };

  return (
    <>
      <Container className='flex  my-5 lg:mt-8 flex-col items-center'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {reviews.map((item, i) => (
            <ReviewAdminCard review={item} key={i} />
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
      </Container>
    </>
  );
}

export default ReviewsDashboard;
