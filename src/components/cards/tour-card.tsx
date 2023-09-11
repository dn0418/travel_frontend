// @flow strict
import { Button, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiCalendar } from 'react-icons/bi';
import { useGlobalContext } from '../../context/global-context';
import { TourType } from '../../types/tour';
import { formatDate } from '../../utils/formate-date';
import { localizationData } from '../../utils/locales';

function TourCard({ tour }: { tour: TourType }) {
  const { convertCurrency } = useGlobalContext();
  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

  return (
    <div className="bg-white p-3">
      <Image
        src={tour.thumbnail}
        alt={tour.title}
        className="rounded-lg"
        height={340}
        width={560}
        layout="responsive"
        priority
      />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <Link href={`/tour-details/${tour.id}`}>
            <p className="text-xl font-medium my-2 text-black">
              {
                locale === 'ru' ? tour.title_ru :
                  (locale === 'hy' ? tour.title_hy : tour.title)
              }
            </p>
          </Link>
          {tour.reviewsRating &&
            <div className="flex items-center gap-1">
              <Rating
                max={1}
                size="small"
                name="half-rating"
                readOnly
                defaultValue={tour.reviewsRating}
                precision={0.1}
              />
              <span className="text-[#5E5E5E] text-sm">
                {tour.reviewsRating.toFixed(1)}
              </span>
            </div>
          }
        </div>
        <p className="my-2 text-[#5E5E5E] text-sm">
          {tour.dayLength + ' ' + (locale === 'ru' ? 'Дни' :
            (locale === 'hy' ? 'Օրեր' : 'Days')) + ' ' + tour.nightLength + ' ' +
            (locale === 'ru' ? 'Ночи' : (locale === 'hy' ? 'Գիշերներ' : 'Nights'))}
        </p>

        {
          (tour.isFixedDate && tour.startDate && tour.endDate) ?
            <>
              <p className="my-2 flex items-center gap-2">
                <BiCalendar className="text-[#5a5a5a] text-sm" />
                <span className="text-[#5e5e5e] text-sm font-medium">
                  {formatDate(tour.startDate)}
                </span>
              </p>
              <p className="my-2 flex items-center gap-2">
                <BiCalendar className="text-[#5a5a5a] text-sm" />
                <span className="text-[#5e5e5e] text-sm font-medium">
                  {formatDate(tour.endDate)}
                </span>
              </p>
            </>
            : <p className="my-2 flex items-center gap-2">
              <BiCalendar className="text-[#5a5a5a] text-sm" />
              <span className="text-[#5e5e5e] text-sm">
                {
                  locale === 'ru' ? 'Лучшее время:' :
                    (locale === 'hy' ? 'Լավագույն ժամանակ:' : 'Best Time:')
                }
              </span>
              <span className="text-[#5e5e5e] text-sm font-medium">
                {
                  locale === 'ru' ? tour.bestTime_ru :
                    (locale === 'hy' ? tour.bestTime_hy : tour.bestTime)
                }
              </span>
            </p>
        }

        <p className="text-sm line-clamp-3 text-[#5e5e5e] my-3">
          {
            locale === 'ru' ? tour.shortDescription_ru :
              (locale === 'hy' ? tour.shortDescription_hy : tour.shortDescription)
          }
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <p className="text-sm text-[#5e5e5e] my-2">
              {
                locale === 'ru' ? 'Начать с' : (locale === 'hy' ? 'Սկսել' : 'Start From')
              }
            </p>
            <p className="text-base font-semibold my-2">{convertCurrency(tour.price)}</p>
          </div>
          <Link href={`/tour-details/${tour.id}`}>
            <Button
              className="rounded-lg bg-black text-white"
              variant='contained'>
              {localData.see_more_text}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
