// @flow strict

import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateAdminSurrounding from '../../../../src/components/admin-components/surrounding/update-surrounding';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/armenia/surrounding/single-surrounding.ssr';
import client from '../../../../src/rest-api/client';
import armeniaClient from '../../../../src/rest-api/client/armenia-client';
import { ImageType, SurroundingType } from '../../../../src/types';
import { SurroundingInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from '../../../../src/types/page-props';
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'Surrounding Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const Update: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const surrounding: SurroundingType = props?.surroundingDetails?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>(surrounding?.images || []);
  const [inputData, setInputData] = useState<SurroundingInputType>({
    isRu: surrounding?.isRu || false,
    isHy: surrounding?.isHy || false,
    name: surrounding?.name || "",
    name_ru: surrounding?.name_ru || "",
    name_hy: surrounding?.name_hy || "",
    thumbnail: surrounding?.thumbnail || "",
    shortDescription: surrounding?.shortDescription || "",
    shortDescription_ru: surrounding?.shortDescription_ru || "",
    shortDescription_hy: surrounding?.shortDescription_hy || "",
    description: surrounding?.description || "",
    description_ru: surrounding?.description_ru || "",
    description_hy: surrounding?.description_hy || "",
    type: surrounding?.type || "",
    type_ru: surrounding?.type_ru || "",
    type_hy: surrounding?.type_hy || "",
    fromTbilisi: surrounding?.fromTbilisi || "",
    fromTbilisi_ru: surrounding?.fromTbilisi_ru || "",
    fromTbilisi_hy: surrounding?.fromTbilisi_hy || "",
    date: surrounding?.date || "",
    neatestSettlement: surrounding?.neatestSettlement || "",
    neatestSettlement_ru: surrounding?.neatestSettlement_ru || "",
    neatestSettlement_hy: surrounding?.neatestSettlement_hy || "",
    available: surrounding?.available || "",
    available_ru: surrounding?.available_ru || "",
    available_hy: surrounding?.available_hy || "",
    entrance: surrounding?.entrance || "",
    entrance_ru: surrounding?.entrance_ru || "",
    entrance_hy: surrounding?.entrance_hy || "",
    maps: surrounding?.maps || "",
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
          const res: any = await armeniaClient.surrounding.newImage({
            surroundingId: surrounding.id,
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
      "fromTbilisi",
      "date",
      "available",
      "neatestSettlement",
      "entrance"
    ];

    if (inputData.isRu) {
      requiredFields.push("name_ru", "shortDescription_ru", "description_ru", "fromTbilisi_ru", "available_ru", "neatestSettlement_ru", "entrance_ru", "type_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("name_hy", "shortDescription_hy", "description_hy", "fromTbilisi_hy", "available_hy", "neatestSettlement_hy", "entrance_hy", "type_hy");
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
      const res = await armeniaClient.surrounding.updateThing(surrounding.id, inputData);
      toast.success('Surrounding updated successfully');
      router.push('/admin/surrounding');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <UpdateAdminSurrounding
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