// @flow strict

import { Button, Card, Modal, Rating } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import swal from "sweetalert";
import client from "../../rest-api/client";
import { ReviewTypes } from "../../types";
import UpdateReview from "../admin-components/reviews/update-review";

type ReviewCardProps = {
  review: ReviewTypes,
  isRating?: boolean
}

function ReviewAdminCard({ review, isRating = false }: ReviewCardProps) {
  const router = useRouter();
  const [openContactModal, setOpenContactModal] = useState(false);


  const handleChangeModal = () => {
    setOpenContactModal(!openContactModal);
  };

  const handleActiveReview = async () => {
    try {
      const res = await client.reviews.activeReview(review.id)
      toast.success('Review active successfully!')
      router.push({
        pathname: router.pathname
      });
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  const handleDeleteReview = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this review!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Delete",
          value: true,
          visible: true,
          closeModal: true
        }
      }
    })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            const res = await client.reviews.deleteReview(review.id)
            toast.success('Review deleted successfully!')
            router.push({
              pathname: router.pathname
            });
          } catch (error) {
            toast.error('Something went wrong!')
          }
        }
      });
  }

  return (
    <>
      <Card className='bg-white h-full p-3 md:p-8 flex flex-col justify-between regular-shadow rounded-3xl'>
        <div className="">
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
          <p className='text-[#626262] my-2 line-clamp-3 md:line-clamp-6'>
            {review.message}
          </p>
        </div>
        <div className="flex justify-end items-center mt-3">
          <div className="flex items-center gap-3">
            {
              !review.isActive &&
              <Button onClick={handleActiveReview} className="shadow">
                Active
              </Button>
            }
            <Button
              onClick={handleChangeModal}
              className='shadow min-w-fit py-2 px-5 text-[#5e5e5e] text-lg'>
              <BiEdit />
            </Button>
            <Button
              onClick={handleDeleteReview}
              color='error'
              className='shadow min-w-fit py-2 px-5 text-lg'>
              <MdDelete />
            </Button>
          </div>
        </div>
      </Card>
      <Modal
        open={openContactModal}
        onClose={handleChangeModal}>
        <UpdateReview
          review={review}
          handleChangeModal={handleChangeModal}
        />
      </Modal>
    </>
  );
}

export default ReviewAdminCard;
