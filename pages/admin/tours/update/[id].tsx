// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UpdateAdminTour from '../../../../src/components/admin-components/tours/update-tour/update-tour';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import tourClient from '../../../../src/rest-api/client/tour-client';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/tours/tour-detaild.ssr';
import { TourInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from '../../../../src/types/page-props';
import { TourDestinationType, TourType } from '../../../../src/types/tour';
import { tourTypes } from '../../../../src/utils/data/tours-types';
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'Tour Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const UpdateTour: NextPageWithLayout<InferGetServerSidePropsType<typeof getStaticProps>> = (props) => {
  const destinations: TourDestinationType[] = props?.destinationData?.data;
  const tourDetails: TourType = props.tourDetails?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [childList, setChildList] = useState<any[]>([]);
  const [inputData, setInputData] = useState<TourInputType>({
    isRu: tourDetails?.isRu || false,
    isHy: tourDetails?.isHy || false,
    title: tourDetails?.title || "",
    title_ru: tourDetails?.title_ru || "",
    title_hy: tourDetails?.title_hy || "",
    price: tourDetails?.price.toString() || '',
    dayLength: tourDetails?.dayLength.toString() || '',
    nightLength: tourDetails?.nightLength.toString() || '',
    bestTime: tourDetails?.bestTime || '',
    bestTime_ru: tourDetails?.bestTime_ru || '',
    bestTime_hy: tourDetails?.bestTime_hy || '',
    isFixedDate: tourDetails?.isFixedDate || false,
    startDate: tourDetails?.startDate || '',
    endDate: tourDetails?.endDate || '',
    mainList: tourDetails?.mainList || '',
    childList: tourDetails?.childList || "",
    shortDescription: tourDetails?.shortDescription || "",
    shortDescription_ru: tourDetails?.shortDescription_ru || "",
    shortDescription_hy: tourDetails?.shortDescription_hy || "",
    longDescription: tourDetails?.longDescription || "",
    longDescription_ru: tourDetails?.longDescription_ru || "",
    longDescription_hy: tourDetails?.longDescription_hy || "",
    freeCancellation: tourDetails?.freeCancellation || '',
    freeCancellation_ru: tourDetails?.freeCancellation_ru || '',
    freeCancellation_hy: tourDetails?.freeCancellation_hy || '',
    score: 0,
    activities: tourDetails?.activities.toString() || '',
    locationImg: tourDetails?.locationImg || "",
    thumbnail: tourDetails?.thumbnail || "",
    destinationId: tourDetails?.destination.id.toString() || "",
    topSuggested: tourDetails?.topSuggested || false,
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

  const uploadLocation = async (event: any) => {
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
        setInputData({ ...inputData, locationImg: data?.Location })
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
      "price",
      "dayLength",
      "nightLength",
      "bestTime",
      "mainList",
      "childList",
      "shortDescription",
      "longDescription",
      "activities",
      "thumbnail",
      "locationImg",
      "destinationId"
    ];

    if (inputData.isRu) {
      requiredFields.push("title_ru", "bestTime_ru", "shortDescription_ru", "longDescription_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("title_hy", "bestTime_hy", "shortDescription_hy", "longDescription_hy");
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
      price: parseInt(inputData.price),
      dayLength: parseInt(inputData.dayLength),
      nightLength: parseInt(inputData.nightLength),
      destinationId: parseInt(inputData.destinationId),
    });


    try {
      const res = await tourClient.tours.update(tourDetails.id, payload);
      toast.success('Tour updated successfully');
      router.push('/admin/tours');
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (inputData.mainList) {
      const find = tourTypes.en.find((type) => type.value === inputData.mainList);
      if (find) {
        setChildList(find.children);
        if (find.value !== inputData.mainList) {
          setInputData((previewData) => {
            return {
              ...previewData,
              childList: ''
            };
          });
        }
      }
    }
  }, [inputData.mainList]);

  return (
    <>
      <UpdateAdminTour
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
        destinations={destinations}
        uploadLocation={uploadLocation}
        childList={childList}
        tourDetails={tourDetails}
      />
    </>
  );
};

UpdateTour.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateTour;