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
import { BlogType } from '../../types/armenia';
import { formatDate } from '../../utils/formate-date';
import { localizationData } from '../../utils/locales';


function BlogAdminCard({ blog }: { blog: BlogType }) {
  const router = useRouter();
  const { locale } = router;

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
            const res = await armeniaClient.blogs.delete(blog.id)
            toast.success('Blog post deleted successfully!')
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
    <Card className="regular-shadow rounded-lg h-full">
      <div className="bg-white p-3">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
        />
        <div className="p-3">
          <Link href={`/armenia/blogs/${blog.id}`}>
            <p className="text-xl font-medium my-2 text-black">
              {locale === 'ru' ? blog?.title_ru :
                (locale === 'hy' ? blog?.title_hy : blog?.title)
              }
            </p>
          </Link>

          <p className="mt-0 text-[#5E5E5E] text-sm">
            {
              locale === 'ru' ? blog?.rubric.name_ru : (locale === 'hy' ? blog?.rubric.name_hy : blog?.rubric.name)
            }
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {(locale === 'ru' ? 'Опубликовано на:' :
              (locale === 'hy' ? 'Հրապարակվել է:' : 'Published at:')) + ' ' + formatDate(blog.createdAt)}
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {(locale === 'ru' ? 'Автор:' :
              (locale === 'hy' ? 'Հեղինակ:' : 'Author:')) + ' ' +
              (locale === 'ru' ? blog?.author_ru :
                (locale === 'hy' ? blog?.author_hy : blog?.author))
            }
          </p>
          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {
              locale === 'ru' ? blog?.short_description_ru :
                (locale === 'hy' ? blog?.short_description_hy : blog?.short_description)
            }
          </p>
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-3">
              <Link href={`/admin/blogs/update/${blog.id}`}>
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

export default BlogAdminCard;
