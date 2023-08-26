// @flow strict
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateNewMice from '../../../../src/components/admin-components/mice/update-mice';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import client from '../../../../src/rest-api/client';
import serviceClient from '../../../../src/rest-api/client/service-client';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/mice/mice-details.ssr';
import { ImageType } from '../../../../src/types';
import { MiceInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from '../../../../src/types/page-props';
import { MiceTypes } from '../../../../src/types/services';
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'Mice Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const UpdateMice: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const mice: MiceTypes = props?.miceDetails?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>(mice?.images || []);
  const [inputData, setInputData] = useState<MiceInputType>({
    isRu: mice?.isRu || false,
    isHy: mice?.isHy || false,
    name: mice?.name || "",
    name_ru: mice?.name_ru || "",
    name_hy: mice?.name_hy || "",
    thumbnail: mice?.thumbnail || "",
    shortDescription: mice?.shortDescription || "",
    shortDescription_ru: mice?.shortDescription_ru || "",
    shortDescription_hy: mice?.shortDescription_hy || "",
    description: mice?.description || "",
    description_ru: mice?.description_ru || "",
    description_hy: mice?.description_hy || "",
    comportable: mice?.comportable || "",
    comportable_ru: mice?.comportable_ru || "",
    comportable_hy: mice?.comportable_hy || "",
    activities: mice?.activities || "",
    activities_ru: mice?.activities_ru || "",
    activities_hy: mice?.activities_hy || "",
    extra: mice?.extra || "",
    extra_ru: mice?.extra_ru || "",
    extra_hy: mice?.extra_hy || "",
    access24: mice?.access24 || true,
    freeCancellation: mice?.freeCancellation || true,
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
          const res: any = await serviceClient.mice.newImage({
            miceId: mice.id,
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
      "comportable",
      "activities",
      "extra",
      "access24",
    ];

    if (inputData.isRu) {
      requiredFields.push("name_ru", "shortDescription_ru", "description_ru", "comportable_ru", "activities_ru", "extra_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("name_hy", "shortDescription_hy", "description_hy", "comportable_hy", "activities_hy", "extra_hy");
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
      const res = await serviceClient.mice.update(mice.id, inputData);
      toast.success('Mice updated successfully');
      router.push('/admin/mice');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <UpdateNewMice
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

UpdateMice.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateMice;