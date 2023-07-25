// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import armeniaClient from '../../rest-api/client/armenia-client';
import { ThingToSeeType } from '../../types';

interface ThingToSeeCardProps {
  thing: ThingToSeeType;
}

function ThingToDoAdminCard({ thing }: ThingToSeeCardProps) {
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
            const res = await armeniaClient.thingToDo.delete(thing.id)
            toast.success('Thing to do deleted successfully!')
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
          src={thing.thumbnail}
          alt={thing.name}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/armenia/thing-to-do/${thing.id}`}>
              <p className="text-xl font-medium my-2 text-black">
                {thing.name}
              </p>
            </Link>
            {
              thing.rating > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={thing.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">{thing.rating.toFixed(1)}</span>
              </div>
            }
          </div>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            Type: {thing.type}
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            Date: {thing.date}
          </p>

          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {thing.shortDescription}
          </p>

          <div className="flex justify-end items-end">
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
};

export default ThingToDoAdminCard;
