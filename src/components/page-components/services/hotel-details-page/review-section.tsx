// @flow strict

import { Button, Container, Modal, Pagination, PaginationItem } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { ReviewTypes } from "../../../../types";
import { HotelDataType } from "../../../../types/services";
import { localizationData } from "../../../../utils/locales";
import ReviewCard from "../../../cards/review-card";
import CreateNewReview from "../../../common/create-review/create-review";
import ExpandedSectionTitle from "../../../common/expanded-section-title";

interface PropsType {
  reviews: ReviewTypes[];
  hotel: HotelDataType;
}

function ReviewSection({ reviews, hotel }: PropsType) {
  const [isReviewShow, setIsReviewShow] = useState(false);
  const [page, setPage] = useState(1);
  const { locale } = useRouter();
  const localData = locale === "ru" ? localizationData.ru :
    (locale === 'hy' ? localizationData.hy : localizationData.en);

  const handleChangeFunction = () => {
    setIsReviewShow(!isReviewShow);
  }

  const [openContactModal, setOpenContactModal] = useState(false);


  const handleChangeModal = () => {
    setOpenContactModal(!openContactModal);
  };

  return (
    <>
      <div className="my-5">
        <ExpandedSectionTitle
          title={localData.reviews_title}
          onchange={handleChangeFunction}
        />
        <div hidden={!isReviewShow} className="transition-all duration-1000 ease-in-out ">
          <Container>
            <div className="my-5 md:my-8 flex justify-center items-center ">
              <Button
                onClick={handleChangeModal}
                className="px-24 min-w-[196px] py-3 bg-black text-white"
                variant="contained">
                {localData.add_reviews}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {
                reviews.slice((page - 1) * 4, page * 4).map((review, i) => (
                  <ReviewCard isRating={true} review={review} key={i} />
                ))
              }
            </div>
            <div className='flex justify-center my-3 md:my-6'>
              {reviews.length > 4 && (
                <Pagination
                  size='large'
                  onChange={(_, p) => setPage(p)}
                  count={Math.ceil(reviews.length / 4)}
                  shape='rounded'
                  renderItem={(item) => (
                    <PaginationItem
                      sx={{ color: "#EDA592", bgcolor: "#ffffff" }}
                      className='pagination'
                      components={{
                        next: (props) => (
                          <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                            {localData.next_text}
                          </span>
                        ),
                        previous: (props) => (
                          <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                            {localData.prev_text}
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
        </div>
      </div>
      <Modal
        open={openContactModal}
        onClose={handleChangeModal}
        aria-labelledby='Add review modal'
        aria-describedby='Add a review'>
        <CreateNewReview
          type="hotel"
          id={hotel.id}
          handleChangeModal={handleChangeModal}
        />
      </Modal>
    </>
  );
};

export default ReviewSection;

