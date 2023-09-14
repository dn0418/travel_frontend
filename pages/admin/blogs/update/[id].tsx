// @flow strict

import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateAdminBlog from '../../../../src/components/admin-components/blogs/update-blog';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/armenia/blogs/single-blog.ssr';
import armeniaClient from '../../../../src/rest-api/client/armenia-client';
import { BlogType, RubricType } from '../../../../src/types/armenia';
import { BlogInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from '../../../../src/types/page-props';
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'Blog Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const UpdateHotel: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const rubrics: RubricType[] = props?.rubrics?.data;
  const blogDetails: BlogType = props?.blogDetails?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [inputData, setInputData] = useState<BlogInputType>({
    isRu: blogDetails?.isRu || false,
    isHy: blogDetails?.isHy || false,
    title: blogDetails?.title || '',
    title_ru: blogDetails?.title_ru || '',
    title_hy: blogDetails?.title_hy || '',
    thumbnail: blogDetails?.thumbnail || '',
    author: blogDetails?.author || '',
    author_hy: blogDetails?.author_hy || '',
    author_ru: blogDetails?.author_ru || '',
    description: blogDetails?.description || '',
    description_hy: blogDetails?.description_hy || '',
    description_ru: blogDetails?.description_ru || '',
    short_description: blogDetails?.short_description || '',
    short_description_hy: blogDetails?.short_description_hy || '',
    short_description_ru: blogDetails?.short_description_ru || '',
    rubric: blogDetails?.rubric.id.toString() || '',
  });
  const router = useRouter();


  const uploadThumbnail = async (event: any) => {
    setUploading(true);
    const formData = new FormData();

    const file = event.target.files[0];
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/file/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data?.Location) {
        setInputData({ ...inputData, thumbnail: data?.Location })
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setUploading(false);
    }
  }


  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findTab = tabs.find((tab) => tab.value === newValue);

    if (findTab) {
      setCurrentTab(findTab);
    }
  };

  const checkInputValidation = () => {
    const requiredFields = [
      "title",
      "author",
      "description",
      "short_description",
      "thumbnail"
    ];

    if (inputData.isRu) {
      requiredFields.push("title_ru", "author_ru", "description_ru", "short_description_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("title_hy", "author_hy", "description_hy", "short_description_hy");
    }

    const missingFields = requiredFields.filter((field) => !inputData[field]);

    return missingFields.length
      ? `${missingFields.join(", ")} field${missingFields.length > 1 ? "s" : ""} are required`
      : null;
  }

  const handleInputChange = (name: string, value: string) => {
    setInputData((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return { ...temp };
    })
  }

  const handleSubmit = async () => {
    const error = checkInputValidation();
    if (error) {
      toast.error(error);
      return;
    }

    setIsLoading(true);

    const payload = JSON.stringify({
      ...inputData,
      rubric: parseInt(inputData.rubric),
    });

    try {
      await armeniaClient.blogs.updateBlog(blogDetails.id, payload);
      toast.success('Travel Blog updated successfully');
      router.push('/admin/blogs');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <UpdateAdminBlog
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        inputData={inputData}
        setInputData={setInputData}
        tabs={tabs}
        uploadThumbnail={uploadThumbnail}
        uploading={uploading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        rubrics={rubrics}
      />
    </>
  );
};

UpdateHotel.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateHotel;