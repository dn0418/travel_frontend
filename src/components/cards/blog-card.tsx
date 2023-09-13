// @flow strict

import { Button, Card } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BlogType } from '../../types/armenia';
import { formatDate } from '../../utils/formate-date';
import { localizationData } from '../../utils/locales';

interface CardProps {
  blog: BlogType;
}

function BlogCard({ blog }: CardProps) {
  const { locale } = useRouter();

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
          src={blog.thumbnail}
          alt={blog.title}
          className="rounded-lg"
          height={340}
          width={560}
          layout="responsive"
          priority
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
          <div className="flex justify-end items-end">
            <Link href={`/armenia/blogs/${blog.id}`}>
              <Button className="rounded-lg bg-black text-white" variant='contained'>
                {localData.read_more_text}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
