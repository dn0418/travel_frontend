// @flow strict

import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateAdminAccessory from '../../../../src/components/admin-components/accessories/update-accessory/update-accessory';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/accessories/accessory-details';
import client from '../../../../src/rest-api/client';
import serviceClient from '../../../../src/rest-api/client/service-client';
import { ImageType } from '../../../../src/types';
import { AccessoriesInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from '../../../../src/types/page-props';
import { AccessoriesPricingType, AccessoryTypes, TourAccessoryType } from '../../../../src/types/services';
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'Accessory Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const UpdateAccessory: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const accessoryTypes: AccessoryTypes[] = props?.accessoryTypes?.data;
  const accessory: TourAccessoryType = props?.accessoryDetails?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>(accessory?.images || []);
  const [pricing, setPricing] = useState<AccessoriesPricingType[]>(accessory?.pricing || []);
  const [inputData, setInputData] = useState<AccessoriesInputType>({
    isRu: accessory?.isRu || false,
    isHy: accessory?.isHy || false,
    title: accessory?.title || "",
    title_ru: accessory?.title_ru || "",
    title_hy: accessory?.title_hy || "",
    thumbnail: accessory?.thumbnail || "",
    perPax: accessory?.perPax || "",
    perPax_ru: accessory?.perPax_ru || "",
    perPax_hy: accessory?.perPax_hy || "",
    freeCancellation: accessory?.freeCancellation || true,
    rentFrom: accessory?.rentFrom || "",
    rentFrom_ru: accessory?.rentFrom_ru || "",
    rentFrom_hy: accessory?.rentFrom_hy || "",
    available: accessory?.available || "",
    available_ru: accessory?.available_ru || "",
    available_hy: accessory?.available_hy || "",
    shortDescription: accessory?.shortDescription || '',
    shortDescription_ru: accessory?.shortDescription_ru || '',
    shortDescription_hy: accessory?.shortDescription_hy || '',
    longDescription: accessory?.longDescription || '',
    longDescription_ru: accessory?.longDescription_ru || '',
    longDescription_hy: accessory?.longDescription_hy || '',
    price: accessory?.price.toString() || '',
    type: accessory?.type.id.toString() || '',
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
          const res: any = await serviceClient.accessories.newImage({
            accessoryId: accessory.id,
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

    try {
      const res = await serviceClient.accessories.updateAccessory(accessory.id, inputData);
      toast.success('Accessory updated successfully');
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
      <UpdateAdminAccessory
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
        accessoriesTypes={accessoryTypes}
        accessory={accessory}
      />
    </>
  );
};

UpdateAccessory.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateAccessory;