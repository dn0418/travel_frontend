// @flow strict

import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CreateNewCar from '../../../src/components/admin-components/transport/create-without-driver/create-new-car';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import serviceClient from '../../../src/rest-api/client/service-client';
import { PriceWithoutDriverType } from '../../../src/types/car-type';
import { NextPageWithLayout } from '../../../src/types/page-props';

interface WithoutInputDataType {
  [key: string]: any; // Add this line to indicate that a string can be used as an index
  name: string;
  name_ru: string;
  name_hy: string;
  price: string;
  freeCancellation: boolean;
  isRu: boolean;
  isHy: boolean;
  pickup: string;
  pickup_ru: string;
  pickup_hy: string;
  fuel: string;
  fuel_ru: string;
  fuel_hy: string;
  year: string;
  seatNo: string;
  thumbnail: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  description: string;
  description_ru: string;
  description_hy: string;
}

const tabs = [
  { title: 'New Car Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const CreateCar: NextPageWithLayout = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [pricing, setPricing] = useState<PriceWithoutDriverType[]>([]);
  const [inputData, setInputData] = useState<WithoutInputDataType>({
    name: "",
    name_ru: "",
    name_hy: "",
    price: '',
    freeCancellation: false,
    isRu: false,
    isHy: false,
    pickup: "",
    pickup_ru: "",
    pickup_hy: "",
    fuel: "",
    fuel_ru: "",
    fuel_hy: "",
    year: '',
    seatNo: '',
    thumbnail: "",
    shortDescription: "",
    shortDescription_ru: "",
    shortDescription_hy: "",
    description: "",
    description_ru: "",
    description_hy: "",
  });
  const router = useRouter();

  const handleImageChange = async (event: any) => {
    setUploading(true);
    const formData = new FormData();

    const file = event.target.files[0];
    formData.append("file", file);

    try {
      const response = await fetch('http://localhost:5000/file/upload', {
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
      const response = await fetch('http://localhost:5000/file/upload', {
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
    const payload = JSON.stringify({
      ...inputData,
      pricing: pricing,
      images: images
    });

    try {
      const res = await serviceClient.carWithoutDriver.create(payload);
      toast.success('Car created successfully');
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
      <CreateNewCar
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
      />
    </>
  );
};

CreateCar.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateCar;