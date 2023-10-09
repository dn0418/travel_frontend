// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SurroundingType } from '../../types';
import { formatDate } from '../../utils/formate-date';
import { localizationData } from '../../utils/locales';

interface SurroundingCardProps {
  surrounding: SurroundingType;
}

function SurroundingCard({ surrounding }: SurroundingCardProps) {
  const { locale } = useRouter();

  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

  return (
    <Card className="regular-shadow md:min-h-[500px] rounded-lg flex flex-col justify-between">
      <div className="bg-white p-3">
        <Image
          src={surrounding.thumbnail}
          alt={surrounding.name}
          className="rounded-lg"
          height={340}
          width={560}
          layout="responsive"
          priority
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/armenia/surrounding/${surrounding.id}`}>
              <p className="text-xl font-medium my-2 text-black line-clamp-2">
                {locale === 'ru' ? surrounding?.name_ru :
                  (locale === 'hy' ? surrounding?.name_hy : surrounding?.name)
                }
              </p>
            </Link>
            {
              surrounding.rating > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={surrounding.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">{surrounding.rating.toFixed(1)}</span>
              </div>
            }
          </div>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {
              ((locale === 'ru' ? 'тип:' : (locale === 'hy' ? 'տիպ:' : 'Type:'))
                + ' ' + (locale === 'ru' ? surrounding?.type_ru : (locale === 'hy' ? surrounding?.type_hy : surrounding?.type)))
            }
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {(locale === 'ru' ? 'Дата:' :
              (locale === 'hy' ? 'Ամսաթիվ:' : 'Date:')) + ' ' + formatDate(surrounding.date)}
          </p>

          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {
              locale === 'ru' ? surrounding?.shortDescription_ru :
                (locale === 'hy' ? surrounding?.shortDescription_hy : surrounding?.shortDescription)
            }
          </p>


        </div>
      </div>
      <div className="flex justify-end items-end p-3">
        <Link href={`/armenia/surrounding/${surrounding.id}`}>
          <Button className="rounded-lg bg-black text-white" variant='contained'>
            {localData.see_more_text}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default SurroundingCard;
