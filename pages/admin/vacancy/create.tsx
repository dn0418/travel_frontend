// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CreateNewVacancy from '../../../src/components/admin-components/vacancy/create-vacancy';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { getServerSideProps } from '../../../src/rest-api/armenia/blogs/rubrics';
import armeniaClient from '../../../src/rest-api/client/armenia-client';
import { VacancyInputType } from '../../../src/types/input-type';
import { NextPageWithLayout } from '../../../src/types/page-props';
export { getServerSideProps };

const tabs = [
  { title: 'New Vacancy Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const CreateBlog: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState<VacancyInputType>({
    isRu: false,
    isHy: false,
    title: '',
    title_ru: '',
    title_hy: '',
    description: '',
    description_hy: '',
    description_ru: '',
  });
  const router = useRouter();


  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findTab = tabs.find((tab) => tab.value === newValue);

    if (findTab) {
      setCurrentTab(findTab);
    }
  };

  const checkInputValidation = () => {
    const requiredFields = [
      "title",
      "description",
    ];

    if (inputData.isRu) {
      requiredFields.push("title_ru", "description_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("title_hy", "description_hy");
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

    try {
      await armeniaClient.vacancy.create(inputData);
      toast.success('Vacancy created successfully');
      router.push('/admin/vacancy');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <CreateNewVacancy
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        inputData={inputData}
        setInputData={setInputData}
        tabs={tabs}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
      />
    </>
  );
};

CreateBlog.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateBlog;