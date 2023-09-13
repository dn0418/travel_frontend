// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CreateNewBlog from '../../../src/components/admin-components/blogs/create-blog';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { getServerSideProps } from '../../../src/rest-api/armenia/blogs/rubrics';
import armeniaClient from '../../../src/rest-api/client/armenia-client';
import { RubricType } from '../../../src/types/armenia';
import { BlogInputType } from '../../../src/types/input-type';
import { NextPageWithLayout } from '../../../src/types/page-props';
export { getServerSideProps };

const tabs = [
  { title: 'New Blog Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const CreateBlog: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const rubrics: RubricType[] = props?.rubricsData?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState<BlogInputType>({
    isRu: false,
    isHy: false,
    title: '',
    title_ru: '',
    title_hy: '',
    thumbnail: '',
    author: '',
    author_hy: '',
    author_ru: '',
    description: '',
    description_hy: '',
    description_ru: '',
    short_description: '',
    short_description_hy: '',
    short_description_ru: '',
    rubric: ''
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
      await armeniaClient.blogs.createNewBlog(payload);
      toast.success('Travel Blog created successfully');
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
      <CreateNewBlog
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

CreateBlog.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateBlog;