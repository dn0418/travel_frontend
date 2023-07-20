// @flow strict

import { useState } from 'react';
import { toast } from 'react-toastify';
import CreateNewCar from '../../../src/components/admin-components/transport/create-new-car';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { NextPageWithLayout } from '../../../src/types/page-props';

const tabs = [
  { title: 'New Car Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
  { title: 'Pricing Table', value: 'pricing' },
];

const CreateCar: NextPageWithLayout = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [inputData, setInputData] = useState({
    name: "",
    name_ru: "",
    name_hy: "",
    price: '',
    freeCancellation: true,
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
  })

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
      />
    </>
  );
};

CreateCar.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateCar;