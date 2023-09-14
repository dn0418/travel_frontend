// @flow strict

import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiEdit } from 'react-icons/bi';
import { BsStopwatch } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import armeniaClient from '../../rest-api/client/armenia-client';
import { VacancyType } from '../../types/armenia';
import { formatDate } from '../../utils/formate-date';

function AdminVacancyCard({ vacancy }: { vacancy: VacancyType }) {
  const router = useRouter();
  const { locale } = router;

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
            const res = await armeniaClient.vacancy.delete(vacancy.id)
            toast.success('Job vacancy deleted successfully!')
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
    <div className="shadow grid grid-cols-4 rounded-lg">
      <div className="flex justify-center items-center">
        <FaUser size={48} />
      </div>
      <div className="col-span-3 p-4">
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
        <div className="flex justify-end items-center mt-5">
          <div className="flex items-center gap-3">
            <Link href={`/admin/vacancy/update/${vacancy.id}`}>
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
  );
};

export default AdminVacancyCard;