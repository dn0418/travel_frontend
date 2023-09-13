// @flow strict
import { Container } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { BlogType } from "../../../../types/armenia";

interface PropsType {
  blog: BlogType,
  blogs: BlogType[],
}

function BlogDetailsUI({ blog }: PropsType) {
  const { locale } = useRouter();

  console.log(blog)

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <h1>
          {locale === 'ru' ? blog?.title_ru :
            (locale === 'hy' ? blog?.title_hy : blog?.title)
          }
        </h1>
        <div className="my-8 w-full">
          <div className="w-full lg:w-8/12 mx-auto">
            <Image
              className="rounded-lg"
              src={blog?.thumbnail}
              width={560}
              height={280}
              alt={blog?.title}
              layout="responsive"
            />
          </div>
        </div>
        <div
          className="blog-content my-5"
          dangerouslySetInnerHTML={{
            __html: locale === 'ru' ? blog?.description_ru :
              (locale === 'hy' ? blog?.description_hy : blog?.description)
          }}
        />
      </Container>
    </div>
  );
};

export default BlogDetailsUI;