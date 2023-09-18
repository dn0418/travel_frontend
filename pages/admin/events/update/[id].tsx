// @flow strict

import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateAdminEvent from '../../../../src/components/admin-components/events/update-event';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/armenia/events/single-events.ssr';
import client from '../../../../src/rest-api/client';
import armeniaClient from '../../../../src/rest-api/client/armenia-client';
import { ImageType } from '../../../../src/types';
import { EventType } from '../../../../src/types/armenia';
import { EventInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from '../../../../src/types/page-props';
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'Event Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const Update: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const event: EventType = props?.eventDetails?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>(event?.images || []);
  const [inputData, setInputData] = useState<EventInputType>({
    isRu: event?.isRu || false,
    isHy: event?.isHy || false,
    name: event?.name || "",
    name_ru: event?.name_ru || "",
    name_hy: event?.name_hy || "",
    thumbnail: event?.thumbnail || "",
    shortDescription: event?.shortDescription || "",
    shortDescription_ru: event?.shortDescription_ru || "",
    shortDescription_hy: event?.shortDescription_hy || "",
    description: event?.description || "",
    description_ru: event?.description_ru || "",
    description_hy: event?.description_hy || "",
    type: event?.type || "",
    type_ru: event?.type_ru || "",
    type_hy: event?.type_hy || "",
    address: event?.address || "",
    address_ru: event?.address_ru || "",
    address_hy: event?.address_hy || "",
    date: event?.date || "",
    neatestSettlement: event?.neatestSettlement || "",
    neatestSettlement_ru: event?.neatestSettlement_ru || "",
    neatestSettlement_hy: event?.neatestSettlement_hy || "",
    language: event?.language || "",
    language_ru: event?.language_ru || "",
    language_hy: event?.language_hy || "",
    entrance: event?.entrance || "",
    entrance_ru: event?.entrance_ru || "",
    entrance_hy: event?.entrance_hy || "",
    maps: event?.maps || "",
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
          const res: any = await armeniaClient.events.newImage({
            eventId: event.id,
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

    setIsLoading(true);

    try {
      await armeniaClient.events.updateEvent(event.id, inputData);
      toast.success('Event updated successfully');
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
      <UpdateAdminEvent
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

Update.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Update;