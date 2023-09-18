// @flow strict
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateAdminFoodDrink from '../../../../src/components/admin-components/food-and-drink/update-food-drink';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/armenia/food-and-drinks/details.ssr';
import client from '../../../../src/rest-api/client';
import armeniaClient from '../../../../src/rest-api/client/armenia-client';
import { FoodAndDrinksType, ImageType } from '../../../../src/types';
import { FoodAndDrinkInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from '../../../../src/types/page-props';
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'Food and Drink Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const CreateThingTodo: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const foodAndDrink: FoodAndDrinksType = props?.foodAndDrinkDetails?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>(foodAndDrink?.images || []);
  const [inputData, setInputData] = useState<FoodAndDrinkInputType>({
    isRu: foodAndDrink?.isRu || false,
    isHy: foodAndDrink?.isHy || false,
    name: foodAndDrink?.name || "",
    name_ru: foodAndDrink?.name_ru || "",
    name_hy: foodAndDrink?.name_hy || "",
    thumbnail: foodAndDrink?.thumbnail || "",
    shortDescription: foodAndDrink?.shortDescription || "",
    shortDescription_ru: foodAndDrink?.shortDescription_ru || "",
    shortDescription_hy: foodAndDrink?.shortDescription_hy || "",
    description: foodAndDrink?.description || "",
    description_ru: foodAndDrink?.description_ru || "",
    description_hy: foodAndDrink?.description_hy || "",
    type: foodAndDrink?.type || "",
    fromYerevan: foodAndDrink?.fromYerevan || "",
    fromYerevan_ru: foodAndDrink?.fromYerevan_ru || "",
    fromYerevan_hy: foodAndDrink?.fromYerevan_hy || "",
    address: foodAndDrink?.address || "",
    address_ru: foodAndDrink?.address_ru || "",
    address_hy: foodAndDrink?.address_hy || "",
    neatestSettlement: foodAndDrink?.neatestSettlement || "",
    neatestSettlement_ru: foodAndDrink?.neatestSettlement_ru || "",
    neatestSettlement_hy: foodAndDrink?.neatestSettlement_hy || "",
    vegan: foodAndDrink?.vegan || "",
    vegan_ru: foodAndDrink?.vegan_ru || "",
    vegan_hy: foodAndDrink?.vegan_hy || "",
    entrance: foodAndDrink?.entrance || "",
    entrance_ru: foodAndDrink?.entrance_ru || "",
    entrance_hy: foodAndDrink?.entrance_hy || "",
    maps: foodAndDrink?.maps || "",
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
          const res: any = await armeniaClient.foodAndDrinks.newImage({
            foodId: foodAndDrink.id,
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
      "fromYerevan",
      "address",
      "vegan",
      "neatestSettlement",
      "entrance"
    ];

    if (inputData.isRu) {
      requiredFields.push("name_ru", "shortDescription_ru", "description_ru", "fromYerevan_ru", "address_ru", "vegan_ru", "neatestSettlement_ru", "entrance_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("name_hy", "shortDescription_hy", "description_hy", "fromYerevan_hy", "address_hy", "vegan_hy", "neatestSettlement_hy", "entrance_hy");
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
      const res = await armeniaClient.foodAndDrinks.update(foodAndDrink.id, inputData);
      toast.success('Food and drink updated successfully');
      router.push('/admin/food-and-drink');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <UpdateAdminFoodDrink
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