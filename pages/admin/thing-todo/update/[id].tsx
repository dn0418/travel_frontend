// @flow strict

import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateNewThingTodo from '../../../../src/components/admin-components/thing-todo/update-thing-todo';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/armenia/thing-to-do/single-thing-to-do.ssr';
import client from '../../../../src/rest-api/client';
import armeniaClient from '../../../../src/rest-api/client/armenia-client';
import { ImageType, ThingToSeeType } from '../../../../src/types';
import { ThingToDoInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from '../../../../src/types/page-props';
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'Thing To Do Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const CreateThingTodo: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const thingTodo: ThingToSeeType = props?.thingDetails?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>(thingTodo?.images || []);
  const [inputData, setInputData] = useState<ThingToDoInputType>({
    isRu: thingTodo?.isRu || false,
    isHy: thingTodo?.isHy || false,
    name: thingTodo?.name || "",
    name_ru: thingTodo?.name_ru || "",
    name_hy: thingTodo?.name_hy || "",
    thumbnail: thingTodo?.thumbnail || "",
    shortDescription: thingTodo?.shortDescription || "",
    shortDescription_ru: thingTodo?.shortDescription_ru || "",
    shortDescription_hy: thingTodo?.shortDescription_hy || "",
    description: thingTodo?.description || "",
    description_ru: thingTodo?.description_ru || "",
    description_hy: thingTodo?.description_hy || "",
    type: thingTodo?.type || "",
    fromYerevan: thingTodo?.fromYerevan || "",
    fromYerevan_ru: thingTodo?.fromYerevan_ru || "",
    fromYerevan_hy: thingTodo?.fromYerevan_hy || "",
    date: thingTodo?.date || "",
    neatestSettlement: thingTodo?.neatestSettlement || "",
    neatestSettlement_ru: thingTodo?.neatestSettlement_ru || "",
    neatestSettlement_hy: thingTodo?.neatestSettlement_hy || "",
    available: thingTodo?.available || "",
    available_ru: thingTodo?.available_ru || "",
    available_hy: thingTodo?.available_hy || "",
    entrance: thingTodo?.entrance || "",
    entrance_ru: thingTodo?.entrance_ru || "",
    entrance_hy: thingTodo?.entrance_hy || "",
    lat: thingTodo?.lat || null,
    lng: thingTodo?.lng || null,
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
        try {
          const res: any = await armeniaClient.thingToDo.newImage({
            thingId: thingTodo.id,
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
      "fromYerevan",
      "date",
      "available",
      "neatestSettlement",
      "entrance"
    ];

    if (inputData.isRu) {
      requiredFields.push("name_ru", "shortDescription_ru", "description_ru", "fromYerevan_ru", "available_ru", "neatestSettlement_ru", "entrance_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("name_hy", "shortDescription_hy", "description_hy", "fromYerevan_hy", "available_hy", "neatestSettlement_hy", "entrance_hy");
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
      const res = await armeniaClient.thingToDo.updateThing(thingTodo.id, inputData);
      toast.success('Thing to do updated successfully');
      router.push('/admin/thing-todo');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <UpdateNewThingTodo
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

CreateThingTodo.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateThingTodo;