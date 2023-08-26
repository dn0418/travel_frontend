// @flow strict

import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateAdminHotel from '../../../../src/components/admin-components/hotels/update-hotel/update-hotel';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import client from '../../../../src/rest-api/client';
import serviceClient from '../../../../src/rest-api/client/service-client';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/hotels/hotel-details.ssr';
import { ImageType } from '../../../../src/types';
import { HotelInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from '../../../../src/types/page-props';
import { HotelDataType, HotelPricingTable, HotelTypes } from '../../../../src/types/services';
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'Hotel Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const UpdateHotel: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const hotelsTypes: HotelTypes[] = props?.hotelsTypesData?.data;
  const hotelDetails: HotelDataType = props?.hotelDetails?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>(hotelDetails?.images || []);
  const [pricing, setPricing] = useState<HotelPricingTable[]>(hotelDetails?.pricingTable || []);
  const [inputData, setInputData] = useState<HotelInputType>({
    isRu: hotelDetails?.isRu || false,
    isHy: hotelDetails?.isHy || false,
    name: hotelDetails?.name || '',
    name_ru: hotelDetails?.name_ru || '',
    name_hy: hotelDetails?.name_hy || '',
    thumbnail: hotelDetails?.thumbnail || '',
    price: hotelDetails?.price.toString() || '',
    fromAirport: hotelDetails?.fromAirport || false,
    country: hotelDetails?.country || '',
    country_ru: hotelDetails?.country_ru || '',
    country_hy: hotelDetails?.country_hy || '',
    city: hotelDetails?.city || '',
    city_ru: hotelDetails?.city_ru || '',
    city_hy: hotelDetails?.city_hy || '',
    freeCancellation: hotelDetails?.freeCancellation || false,
    checkInTime: hotelDetails?.checkInTime || '',
    checkOutTime: hotelDetails?.checkOutTime || '',
    shortDescription: hotelDetails?.shortDescription || '',
    shortDescription_ru: hotelDetails?.shortDescription_ru || '',
    shortDescription_hy: hotelDetails?.shortDescription_hy || '',
    longDescription: hotelDetails?.longDescription || '',
    longDescription_ru: hotelDetails?.longDescription_ru || '',
    longDescription_hy: hotelDetails?.longDescription_hy || '',
    lat: hotelDetails?.lat || null,
    lng: hotelDetails?.lng || null,
    type: hotelDetails?.type.id.toString() || '',
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
          const res: any = await serviceClient.hotels.newImage({
            hotelId: hotelDetails.id,
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
    if (!inputData.lat || !inputData.lng) {
      toast.error('Please select a location');
      return;
    }
    setIsLoading(true);

    try {
      const res = await serviceClient.hotels.updateHotel(hotelDetails.id, inputData);
      toast.success('Hotel updated successfully');
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
      <UpdateAdminHotel
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
        hotel={hotelDetails}
      />
    </>
  );
};

UpdateHotel.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateHotel;