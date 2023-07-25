// @flow strict

import { Button, Card, Rating } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import swal from "sweetalert";
import serviceClient from "../../rest-api/client/service-client";
import { TourAccessoryType } from "../../types/services";

interface TransportCardProps {
  accessory: TourAccessoryType;
}

function AccessoriesAdminCard({ accessory }: TransportCardProps) {
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
            const res = await serviceClient.accessories.deleteByID(accessory.id)
            toast.success('Accessory deleted successfully!')
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
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={accessory.thumbnail}
          alt={accessory.title}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
          priority
        />
        <div className="p-3 flex flex-col justify-between">
          <div className="">
            <div className="flex items-center justify-between">
              <Link href={`/services/tour-accessories/${accessory.id}`}>
                <p className="text-xl font-medium my-2 text-black">
                  {accessory.title}
                </p>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <p className="my-2 text-[#5E5E5E] text-sm">
                Type: {accessory.type.name}
              </p>
              {accessory.rating && (
                <div className="flex items-center gap-1">
                  <Rating
                    max={1}
                    size="small"
                    name="half-rating"
                    readOnly
                    defaultValue={accessory.rating || 0}
                    precision={0.1}
                  />
                  <span className="text-[#5E5E5E] text-sm">
                    {accessory.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <p className="my-2 text-[#5E5E5E] text-sm">
              Available: {accessory.available}
            </p>
            <p className="text-sm  text-[#5e5e5e] mt-6 line-clamp-3">
              {accessory.shortDescription}
            </p>
          </div>
          <div className="flex justify-end items-center">
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
    </Card>
  );
}

export default AccessoriesAdminCard;
