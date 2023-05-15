// @flow strict

import { Pagination, PaginationItem } from "@mui/material";
import { useState } from "react";
import { testimonials } from "../../../utils/data/testimonial-data";
import ReviewCard from "../../shared/cards/review-card";

function ReviewsSection() {
  const [page, setPage] = useState(1);

  return (
    <div className=''>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        {testimonials.slice((page - 1) * 12, page * 12).map((item, i) => (
          <ReviewCard review={item} key={i} />
        ))}
      </div>
      <div className='flex justify-center my-3 md:my-6'>
        {testimonials.length > 0 && (
          <Pagination
            size='large'
            onChange={(_, p) => setPage(p)}
            count={Math.ceil(testimonials.length / 12)}
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
