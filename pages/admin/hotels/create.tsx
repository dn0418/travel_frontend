// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CreateNewHotel from '../../../src/components/admin-components/hotels/create-hotel/create-hotel';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import serviceClient from '../../../src/rest-api/client/service-client';
import { getServerSideProps } from '../../../src/rest-api/hotels/hotel-type.ssr';
import { HotelInputType } from '../../../src/types/input-type';
import { NextPageWithLayout } from '../../../src/types/page-props';
import { HotelPricingTable, HotelTypes } from '../../../src/types/services';
export { getServerSideProps };

const tabs = [
  { title: 'New Hotel Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const CreateHotel: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const hotelsTypes: HotelTypes[] = props?.hotelsTypesData?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [pricing, setPricing] = useState<HotelPricingTable[]>([]);
  const [inputData, setInputData] = useState<HotelInputType>({
    name: '',
    name_ru: '',
    name_hy: '',
    thumbnail: '',
    googleMap: '',
    price: '',
    fromAirport: false,
    country: '',
    country_ru: '',
    country_hy: '',
    city: '',
    city_ru: '',
    city_hy: '',
    freeCancellation: false,
    checkInTime: '',
    checkOutTime: '',
    shortDescription: '',
    shortDescription_ru: '',
    shortDescription_hy: '',
    longDescription: '',
    longDescription_ru: '',
    longDescription_hy: '',
    type: '',
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
      "googleMap",
      "country",
      "city",
      "checkInTime",
      "checkOutTime",
      "shortDescription",
      "longDescription",
      "type"
    ];

    if (inputData.isRu) {
      requiredFields.push("name_ru", "country_ru", "city_ru", "shortDescription_ru", "longDescription_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("name_hy", "country_hy", "city_hy", "shortDescription_hy", "longDescription_hy");
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
    // setIsLoading(true);
    const payload = JSON.stringify({
      ...inputData,
      price: parseInt(inputData.price),
      type: parseInt(inputData.type),
      pricingData: pricing,
      images: images
    });

    try {
      const res = await serviceClient.hotels.createNewHotel(payload);
      toast.success('Hotel created successfully');
      router.push('/admin/hotels');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <CreateNewHotel
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
        hotelsTypes={hotelsTypes}
      />
    </>
  );
};

CreateHotel.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateHotel;