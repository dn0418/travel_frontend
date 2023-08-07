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
import { MiceTypes } from "../../types/services";

interface MiceCardProps {
  mice: MiceTypes;
}

function MiceAdminCard({ mice }: MiceCardProps) {
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
            const res = await serviceClient.mice.delete(mice.id)
            toast.success('Mice deleted successfully!')
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
          src={mice.thumbnail}
          alt={mice.name}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
          priority
        />
        <div className="p-3 flex flex-col justify-between">
          <div className="">
            <div className="flex items-center justify-between">
              <Link href={`/services/mice/${mice.id}`}>
                <p className="text-xl font-medium my-2 text-black">
                  {mice.name}
                </p>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <p className="my-0 text-[#5e5e5e] text-sm">
                {mice?.comportable}
              </p>
              {mice.rating && (
                <div className="flex items-center gap-1">
                  <Rating
                    max={1}
                    size="small"
                    name="half-rating"
                    readOnly
                    defaultValue={mice.rating || 0}
                    precision={0.1}
                  />
                  <span className="text-[#5E5E5E] text-sm">
                    {mice.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <p className="my-2 text-[#5E5E5E] text-sm">
              Team building activities:
              {mice?.activities}
            </p>
            <p className="text-sm  text-[#5e5e5e] mt-6 line-clamp-3">
              {mice.shortDescription}
            </p>
          </div>
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-3">
              <Link href={`/admin/mice/update/${mice.id}`}>
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

export default MiceAdminCard;
