// @flow strict

import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateWithoutCar from '../../../../src/components/admin-components/transport/update-without-driver/update-car';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import {
  getStaticPaths,
  getStaticProps
} from "../../../../src/rest-api/cars/car-details.ssr";
import client from '../../../../src/rest-api/client';
import serviceClient from '../../../../src/rest-api/client/service-client';
import { ImageType } from '../../../../src/types';
import { CarWithOutType, PriceWithoutDriverType } from '../../../../src/types/car-type';
import { WithoutDriverInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from "../../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'Car Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const UpdateCar: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const carDetails: CarWithOutType = props.carsDetails?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>(carDetails?.images || []);
  const [pricing, setPricing] = useState<PriceWithoutDriverType[]>(carDetails?.priceWithoutDriver || []);
  const [inputData, setInputData] = useState<WithoutDriverInputType>({
    name: carDetails?.name || '',
    name_ru: carDetails?.name_ru || '',
    name_hy: carDetails?.name_hy || '',
    price: carDetails?.price,
    freeCancellation: carDetails?.freeCancellation || '',
    freeCancellation_ru: carDetails?.freeCancellation_ru || '',
    freeCancellation_hy: carDetails?.freeCancellation_hy || '',
    score: carDetails?.score || 0,
    isRu: carDetails?.isRu || false,
    isHy: carDetails?.isHy || false,
    pickup: carDetails?.pickup || '',
    pickup_ru: carDetails?.pickup_ru || '',
    pickup_hy: carDetails?.pickup_hy || '',
    fuel: carDetails?.fuel || '',
    fuel_ru: carDetails?.fuel_ru || '',
    fuel_hy: carDetails?.fuel_hy || '',
    year: carDetails?.year,
    seatNo: carDetails?.seatNo,
    thumbnail: carDetails?.thumbnail || '',
    shortDescription: carDetails?.shortDescription || '',
    shortDescription_ru: carDetails?.shortDescription_ru || '',
    shortDescription_hy: carDetails?.shortDescription_hy || '',
    description: carDetails?.description || '',
    description_ru: carDetails?.description_ru || '',
    description_hy: carDetails?.description_hy || '',
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
        try {
          const res: any = await serviceClient.carWithoutDriver.createNewImage({
            carId: carDetails.id,
            url: data.Location
          });
          if (res?.data) {
            setImages([...images, res?.data]);
          }
        } catch (error) {
          toast.error('Something went wrong!');
        }
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

  const handleRemoveImage = async (id: number) => {
    try {
      const res = await client.images.deleteImage(id);
      // console.log(res)
      setImages(images.filter((image, i) => image.id !== id));
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error)
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
      "name",
      "price",
      "description",
      "pickup",
      "fuel",
      "year",
      "seatNo",
      "thumbnail"
    ];

    if (inputData.isRu) {
      requiredFields.push("name_ru", "pickup_ru", "fuel_ru", "shortDescription_ru", "description_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("name_hy", "pickup_hy", "fuel_hy", "shortDescription_hy", "description_hy");
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
      const res = await serviceClient.carWithoutDriver.update(carDetails.id, inputData);
      toast.success('Car updated successfully');
      router.push('/admin/transports');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <UpdateWithoutCar
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
        carDetails={carDetails}
      />
    </>
  );
};

UpdateCar.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateCar;