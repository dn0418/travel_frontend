// @flow strict

import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsStopwatch } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { VacancyType } from '../../types/armenia';
import { formatDate } from '../../utils/formate-date';

function VacancyCard({ vacancy }: { vacancy: VacancyType }) {
  const { locale } = useRouter();

  return (
    <div className="shadow grid grid-cols-4 rounded-lg">
      <div className="flex justify-center items-center">
        <FaUser size={48} />
      </div>
      <div className="col-span-3 py-8">
        <Link href={`/vacancy/${vacancy.id}`}>
          <p className="text-xl font-medium text-[#000000] mt-0">
            {
              locale === 'ru' ? vacancy.title_ru :
                (locale === 'hy' ? vacancy.title_hy : vacancy.title)}
          </p>
        </Link>
        <p className="flex justify-start items-center gap-2 my-0 text-gray-500">
          <BsStopwatch />
          <span>{formatDate(vacancy.createdAt)}</span>
        </p>
      </div>
    </div>
  );
};

export default VacancyCard;