// @flow strict

import { Button, Card } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EventType } from '../../types/armenia';
import { formatDate } from '../../utils/formate-date';
import { localizationData } from '../../utils/locales';

interface CardProps {
  event: EventType;
}

function EventCard({ event }: CardProps) {
  const { locale } = useRouter();

  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

  return (
    <Card className="regular-shadow rounded-lg flex flex-col justify-between">
      <div className="bg-white p-3">
        <Image
          src={event.thumbnail}
          alt={event.name}
          className="rounded-lg"
          height={340}
          width={560}
          layout="responsive"
          priority
        />
        <div className="p-3">
          <Link href={`/armenia/events/${event.id}`}>
            <p className="text-xl font-medium my-2 text-black line-clamp-2">
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

        </div>
      </div>
      <div className="flex justify-end items-end p-3">
        <Link href={`/armenia/events/${event.id}`}>
          <Button className="rounded-lg bg-black text-white" variant='contained'>
            {localData.see_more_text}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default EventCard;
