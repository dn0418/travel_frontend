// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ThingToSeeType } from '../../types';
import { localizationData } from '../../utils/locales';

interface ThingToSeeCardProps {
  thing: ThingToSeeType;
  findTab: any;
}

function ThingToDoCard({ thing, findTab }: ThingToSeeCardProps) {
  const { locale } = useRouter();
  const findType = findTab(thing?.type)
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

  return (
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={thing.thumbnail}
          alt={thing.name}
          className="rounded-lg"
          height={340}
          width={560}
          layout="responsive"
          priority
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/armenia/thing-to-do/${thing.id}`}>
              <p className="text-xl font-medium my-2 text-black">
                {locale === 'ru' ? thing?.name_ru :
                  (locale === 'hy' ? thing?.name_hy : thing?.name)
                }
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
            {
              findType &&
              ((locale === 'ru' ? 'тип:' : (locale === 'hy' ? 'տիպ:' : 'Type:'))
                + ' ' + findType?.title)
            }
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {(locale === 'ru' ? 'Дата:' :
              (locale === 'hy' ? 'Ամսաթիվ:' : 'Date:')) + ' ' + thing.date}
          </p>

          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {
              locale === 'ru' ? thing?.shortDescription_ru :
                (locale === 'hy' ? thing?.shortDescription_hy : thing?.shortDescription)
            }
          </p>

          <div className="flex justify-end items-end">
            <Link href={`/armenia/thing-to-do/${thing.id}`}>
              <Button className="rounded-lg bg-black text-white" variant='contained'>
                {localData.see_more_text}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThingToDoCard;
