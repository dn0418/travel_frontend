// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CreateNewAccessory from '../../../src/components/admin-components/accessories/create-accessory/create-accessory';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { getServerSideProps } from '../../../src/rest-api/accessories/accessory-type.ssr';
import serviceClient from '../../../src/rest-api/client/service-client';
import { AccessoriesInputType } from '../../../src/types/input-type';
import { NextPageWithLayout } from '../../../src/types/page-props';
import { AccessoriesPricingType, AccessoryTypes } from '../../../src/types/services';
export { getServerSideProps };

const tabs = [
  { title: 'New Accessory Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const CreateAccessory: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const accessoriesTypes: AccessoryTypes[] = props?.accessoryTypeData?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [pricing, setPricing] = useState<AccessoriesPricingType[]>([]);
  const [inputData, setInputData] = useState<AccessoriesInputType>({
    isRu: false,
    isHy: false,
    title: "",
    title_ru: "",
    title_hy: "",
    price: '',
    thumbnail: "",
    perPax: "",
    perPax_ru: "",
    perPax_hy: "",
    type: '',
    freeCancellation: true,
    rentFrom: "",
    rentFrom_ru: "",
    rentFrom_hy: "",
    available: "",
    available_ru: "",
    available_hy: "",
    shortDescription: "",
    shortDescription_ru: "",
    shortDescription_hy: "",
    longDescription: "",
    longDescription_ru: "",
    longDescription_hy: "",
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
      "title",
      "price",
      "perPax",
      "thumbnail",
      "rentFrom",
      "available",
      "shortDescription",
      "longDescription",
      "type"
    ];

    if (inputData.isRu) {
      requiredFields.push("title_ru", "perPax_ru", "rentFrom_ru", "available_ru", "shortDescription_ru", "longDescription_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("title_hy", "perPax_hy", "rentFrom_hy", "available_hy", "shortDescription_hy", "longDescription_hy");
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
      type: parseInt(inputData.type),
      pricing: pricing,
      images: images
    });

    try {
      const res = await serviceClient.accessories.createNewAccessory(payload);
      toast.success('Accessory created successfully');
      router.push('/admin/accessories');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <CreateNewAccessory
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
        pricing={pricing}
        setPricing={setPricing}
        isLoading={isLoading}
        accessoriesTypes={accessoriesTypes}
      />
    </>
  );
};

CreateAccessory.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateAccessory;