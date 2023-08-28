// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CreateNewTour from '../../../src/components/admin-components/tours/create-tour/create-tour';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import tourClient from '../../../src/rest-api/client/tour-client';
import { getServerSideProps } from '../../../src/rest-api/tours/destination.ssr';
import { TourInputType } from '../../../src/types/input-type';
import { NextPageWithLayout } from '../../../src/types/page-props';
import { DeparturesPricing, IndividualPricing, TourDestinationType, TourRouteType } from '../../../src/types/tour';
import { tourTypes } from '../../../src/utils/data/tours-types';
export { getServerSideProps };

const tabs = [
  { title: 'New Tour Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const CreateTour: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const destinations: TourDestinationType[] = props?.destinationData?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [individualPricing, setIndividualPricing] = useState<IndividualPricing[]>([]);
  const [departuresPricing, setDeparturesPricing] = useState<DeparturesPricing[]>([]);
  const [routes, setRoutes] = useState<TourRouteType[]>([]);
  const [includeServices, setIncludeServices] = useState<any[]>([]);
  const [excludeServices, setExcludeServices] = useState<any[]>([]);
  const [childList, setChildList] = useState<any[]>([]);
  const [inputData, setInputData] = useState<TourInputType>({
    isRu: false,
    isHy: false,
    title: "",
    title_ru: "",
    title_hy: "",
    price: '',
    dayLength: '',
    nightLength: '',
    bestTime: "",
    bestTime_ru: "",
    bestTime_hy: "",
    isFixedDate: false,
    startDate: '',
    endDate: '',
    mainList: "",
    childList: "",
    shortDescription: "",
    shortDescription_ru: "",
    shortDescription_hy: "",
    longDescription: "",
    longDescription_ru: "",
    longDescription_hy: "",
    freeCancellation: '',
    freeCancellation_ru: '',
    freeCancellation_hy: '',
    score: 0,
    activities: '',
    locationImg: "",
    thumbnail: "",
    destinationId: '',
  });
  const router = useRouter();

  const handleImageChange = async (event: any) => {
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
        setImages([...images, data?.Location]);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setUploading(false);
    }
  };

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

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((image, i) => i !== index));
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
      includesServices: includeServices,
      excludeServices: excludeServices,
      images: images,
      routes: routes,
      individualPricing: individualPricing,
      departuresPricing: departuresPricing
    });

    // console.log(payload)

    try {
      const res = await tourClient.tours.create(payload);
      toast.success('Tour created successfully');
      localStorage.removeItem('tourInputData');
      router.push('/admin/tours');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  const saveData = () => {
    const stateData = {
      images,
      individualPricing,
      departuresPricing,
      routes,
      includeServices,
      excludeServices,
      childList,
      inputData,
    };

    localStorage.setItem('tourInputData', JSON.stringify(stateData));
    toast.success('Data saved successfully');
  };

  const loadData = () => {
    const savedData = localStorage.getItem('tourInputData');
    if (savedData) {
      const stateData = JSON.parse(savedData);
      setImages(stateData.images);
      setIndividualPricing(stateData.individualPricing);
      setDeparturesPricing(stateData.departuresPricing);
      setRoutes(stateData.routes);
      setIncludeServices(stateData.includeServices);
      setExcludeServices(stateData.excludeServices);
      setChildList(stateData.childList);
      setInputData(stateData.inputData);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadData();
    }
  }, []);

  useEffect(() => {
    if (inputData.mainList) {
      const find = tourTypes.en.find((type) => type.value === inputData.mainList);
      if (find) {
        setChildList(find.children);
        setInputData((prev) => ({ ...prev, childList: '' }));
      }
    }
  }, [inputData.mainList]);

  return (
    <>
      <CreateNewTour
        currentTab={currentTab}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
        handleTabChange={handleTabChange}
        images={images}
        inputData={inputData}
        setInputData={setInputData}
        tabs={tabs}
        uploadThumbnail={uploadThumbnail}
        uploading={uploading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        individualPricing={individualPricing}
        setIndividualPricing={setIndividualPricing}
        isLoading={isLoading}
        destinations={destinations}
        uploadLocation={uploadLocation}
        departuresPricing={departuresPricing}
        setDeparturesPricing={setDeparturesPricing}
        routes={routes}
        setRoutes={setRoutes}
        includeServices={includeServices}
        setIncludeServices={setIncludeServices}
        excludeServices={excludeServices}
        setExcludeServices={setExcludeServices}
        childList={childList}
        saveData={saveData}
      />
    </>
  );
};

CreateTour.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateTour;