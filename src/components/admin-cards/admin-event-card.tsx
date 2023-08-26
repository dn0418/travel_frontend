// @flow strict

import { Button, Card } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import armeniaClient from '../../rest-api/client/armenia-client';
import { EventType } from '../../types/armenia';
import { formatDate } from '../../utils/formate-date';
import { localizationData } from '../../utils/locales';

interface CardProps {
  event: EventType;
}

function AdminEventCard({ event }: CardProps) {
  const router = useRouter();
  const { locale } = useRouter();

  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

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
            await armeniaClient.events.delete(event.id)
            toast.success('Event deleted successfully!')
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
          src={event.thumbnail}
          alt={event.name}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
          priority
        />
        <div className="p-3">
          <Link href={`/armenia/events/${event.id}`}>
            <p className="text-xl font-medium my-2 text-black">
              {locale === 'ru' ? event?.name_ru :
                (locale === 'hy' ? event?.name_hy : event?.name)
              }
            </p>
          </Link>
          <div className="flex items-center justify-between">
            <p className="mt-0 text-[#5E5E5E] text-sm">
              {
                ((locale === 'ru' ? 'тип:' : (locale === 'hy' ? 'տիպ:' : 'Type:'))
                  + ' ' + (locale === 'ru' ? event?.type_ru : (locale === 'hy' ? event?.type_hy : event?.type)))
              }
            </p>
            <p className="mt-0 text-[#5E5E5E] text-sm">
              {(locale === 'ru' ? 'Дата:' :
                (locale === 'hy' ? 'Ամսաթիվ:' : 'Date:')) + ' ' + formatDate(event.date)}
            </p>
          </div>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {localData.address_text + ': ' + (
              locale === 'ru' ? event?.address_ru :
                (locale === 'hy' ? event?.address_hy : event?.address)
            )}
          </p>
          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {
              locale === 'ru' ? event?.shortDescription_ru :
                (locale === 'hy' ? event?.shortDescription_hy : event?.shortDescription)
            }
          </p>
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-3">
              <Link href={`/admin/events/update/${event.id}`}>
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

export default AdminEventCard;
