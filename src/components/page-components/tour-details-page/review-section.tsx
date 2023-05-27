// @flow strict

import { Button, Container } from "@mui/material";
import { useState } from "react";
import { testimonials } from "../../../utils/data/testimonial-data";
import ReviewCard from "../../shared/cards/review-card";
import ExpandedSectionTitle from "../../shared/expanded-section-title";


function ReviewSection() {
  const [isReviewShow, setIsReviewShow] = useState(false)
  const handleChangeFunction = () => {
    setIsReviewShow(!isReviewShow);
  }

  return (
    <div className="my-5">
      <ExpandedSectionTitle
        title="Reviews"
        onchange={handleChangeFunction}
      />
      <div hidden={!isReviewShow} className="transition-all duration-1000 ease-in-out ">
        <Container>
          <div className="my-5 md:my-8 flex justify-center items-center ">
            <Button className="px-24 min-w-[196px] py-3" variant="contained">
              Add reviews
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {
              testimonials.map((review, i) => (
                <ReviewCard review={review} key={i} />
              ))
            }
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ReviewSection;