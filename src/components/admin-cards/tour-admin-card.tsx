// @flow strict

import { Button, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiCalendar, BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import tourClient from '../../rest-api/client/tour-client';
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
  const router = useRouter();

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
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
            const res = await tourClient.tours.deleteById(tour.id)
            toast.success('Tour deleted successfully!')
            router.push({
              pathname: router.pathname
            });
          } catch (error) {
            toast.error('Something went wrong!')
          }
        }
      })
  }

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
          <div className="flex items-center gap-3">
            <Link href='#'>
              <Button color='secondary' className='shadow min-w-fit py-2 px-5 text-lg'>
                <BiEdit />
              </Button>
            </Link>
            <Button
              onClick={handleDelete}
              color='error'
              className='shadow min-w-fit py-2 px-5 text-lg'>
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourAdminCard;
