// @flow strict

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CreateNewEvent from '../../../src/components/admin-components/events/create-event';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import armeniaClient from '../../../src/rest-api/client/armenia-client';
import { EventInputType } from '../../../src/types/input-type';
import { NextPageWithLayout } from '../../../src/types/page-props';

const tabs = [
  { title: 'New Event Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const CreateSurrounding: NextPageWithLayout = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [inputData, setInputData] = useState<EventInputType>({
    isRu: false,
    isHy: false,
    name: "",
    name_ru: "",
    name_hy: "",
    thumbnail: "",
    shortDescription: "",
    shortDescription_ru: "",
    shortDescription_hy: "",
    description: "",
    description_ru: "",
    description_hy: "",
    type: "",
    type_ru: "",
    type_hy: "",
    date: "",
    neatestSettlement: "",
    neatestSettlement_ru: "",
    neatestSettlement_hy: "",
    entrance: "",
    entrance_ru: "",
    entrance_hy: "",
    lat: null,
    lng: null,
    address: "",
    address_ru: "",
    address_hy: "",
    language: "",
    language_ru: "",
    language_hy: "",
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
      "name",
      "thumbnail",
      "shortDescription",
      "description",
      "type",
      "address",
      "date",
      "language",
      "neatestSettlement",
      "entrance"
    ];

    if (inputData.isRu) {
      requiredFields.push("name_ru", "shortDescription_ru", "description_ru", "address_ru", "language_ru", "neatestSettlement_ru", "entrance_ru", "type_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("name_hy", "shortDescription_hy", "description_hy", "address_hy", "language_hy", "neatestSettlement_hy", "entrance_hy", "type_hy");
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
    if (!inputData.lat || !inputData.lng) {
      toast.error('Please select a location');
      return;
    }
    setIsLoading(true);

    const payload = JSON.stringify({
      ...inputData,
      images: images
    });

    try {
      const res = await armeniaClient.events.createNewEvent(payload);
      toast.success('Event created successfully');
      router.push('/admin/events');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <CreateNewEvent
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
        isLoading={isLoading}
      />
    </>
  );
};

CreateSurrounding.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateSurrounding;