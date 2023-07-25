// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiEdit } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import serviceClient from '../../rest-api/client/service-client';
import { HotelDataType } from '../../types/services';


function HotelAdminCard({ hotel }: { hotel: HotelDataType }) {
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
            const res = await serviceClient.hotels.deleteHotels(hotel.id)
            toast.success('Hotel deleted successfully!')
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
    <Card className="regular-shadow rounded-lg h-full">
      <div className="bg-white p-3">
        <Image
          src={hotel.thumbnail}
          alt={hotel.name}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/services/hotels/${hotel.id}`}>
              <p className="text-xl font-medium my-2 text-black">{hotel.name}</p>
            </Link>
            {
              hotel.rating > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={hotel.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">{hotel.rating.toFixed(1)}</span>
              </div>
            }
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiOutlineLocationMarker className="text-[#EDA592] text-base" />
              <span className=" text-[#5E5E5E] text-sm">
                {hotel.city + " - " + hotel.country}
              </span>
            </div>
            {
              hotel.type &&
              <p className="my-0 text-[#5e5e5e] text-sm">
                Type: {hotel.type?.name}
              </p>
            }
          </div>

          <p className="text-sm  text-[#5e5e5e] line-clamp-3">{hotel.shortDescription}</p>
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-3">
              <Link href={`/admin/hotels/update/${hotel.id}`}>
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
    </Card>
  );
};

export default HotelAdminCard;
