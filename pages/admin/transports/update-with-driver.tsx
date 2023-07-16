// @flow strict

import { Button, CircularProgress, Container, Tab, Tabs, TextField } from "@mui/material";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";
import AdminImage from "../../../src/components/admin-cards/admin-image";
import SectionTitle from "../../../src/components/common/section-title";
import DashboardLayout from "../../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../../src/rest-api/cars/cars.ssr";
import client from "../../../src/rest-api/client";
import { ImageType } from "../../../src/types";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getServerSideProps };

const UpdateWithDriver: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const withdriver = props.carWithDriverData?.data[0] || {};
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>(withdriver?.images || []);
  const [activeTab, setActiveTab] = useState('all');
  const [inputData, setInputData] = useState({
    title: withdriver?.title,
    title_ru: withdriver?.title_ru,
    title_hy: withdriver?.title_hy,
    description: withdriver?.description,
    description_ru: withdriver?.description_ru,
    description_hy: withdriver?.description_hy,
  })
  console.log(withdriver)

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
          const res: any = await client.carWithDriver.newImage({
            id: withdriver.id,
            url: data.Location,
          })
          setImages([...images, res?.data]);
          toast.success('Image uploaded successfully!');
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong!');
        }
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setUploading(false);
    }
  };

  const handleChangeInput = (name: string, value: string) => {
    setInputData({
      ...inputData,
      [name]: value,
    })
  }

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await client.carWithDriver.update(
        withdriver.id,
        { ...inputData }
      );
      toast.success('Car With driver updated successfully!');
      router.back();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container className='my-5 w-full lg:my-8 pb-5'>
      <div className="flex items-center w-full justify-center">
        <div className='text-center w-fit py-3 px-6 regular-shadow rounded-lg'>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            className='pages-tabs gap-8 lg:gap-16'
            TabIndicatorProps={{
              style: { display: "none" },
            }}>
            <Tab value='all' className="" label='With Driver Data' />
            <Tab value='price' className="" label='With Driver Pricing' />
          </Tabs>
        </div>
      </div>
      <div className="flex items-center w-full justify-between">
        <SectionTitle title="Update Car With Driver" />
        <Button onClick={() => router.back()} className="shadow">
          Back
        </Button>
      </div>
      <div hidden={activeTab !== 'all'}>
        <h2 className="mb-2">Images</h2>
        <div
          className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {
            images?.length &&
            images.map((image: ImageType, i: number) => (
              <AdminImage
                key={i}
                image={image}
                setImages={setImages}
              />
            ))
          }
          <div
            className="border-2 border-[#0000004d] border-dashed flex items-center
           justify-center w-full h-full relative bg-[#f1f1f1] rounded-lg">
            {
              uploading ?
                <div className="w-16 h-16"><CircularProgress /></div> :
                <div className="flex items-center justify-center flex-col py-8">
                  <MdCloudUpload className="text-2xl" />
                  <p className="my-2">
                    Choose an <span className="text-[#6f7531]">Image</span> to upload.
                  </p>
                </div>
            }
            <input
              type="file"
              className="block border-none absolute top-0 left-0 right-0 bottom-0 opacity-0"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="">
          <h2 className="mb-2">Title</h2>
          <div className="w-full flex flex-col gap-5">
            <TextField
              className="w-full"
              value={inputData.title}
              label="English Title"
              onChange={(e) => handleChangeInput('title', e.target.value)}
            />
            <TextField
              className="w-full"
              value={inputData.title_hy}
              onChange={(e) => handleChangeInput('title_hy', e.target.value)}
              label="Armenian Title"
            />
            <TextField
              className="w-full"
              value={inputData.title_ru}
              onChange={(e) => handleChangeInput('title_ru', e.target.value)}
              label="Russian Title"
            />
          </div>
        </div>
        <div className="">
          <h2 className="mb-2">Description</h2>
          <div className="w-full flex flex-col gap-5">
            <TextField
              className="w-full"
              value={inputData.description}
              label="English Description"
              multiline
              maxRows={8}
              minRows={6}
              onChange={(e) => handleChangeInput('description', e.target.value)}
            />
            <TextField
              className="w-full"
              value={inputData.description_hy}
              multiline
              maxRows={8}
              minRows={6}
              onChange={(e) => handleChangeInput('description_hy', e.target.value)}
              label="Armenian Description"
            />
            <TextField
              className="w-full"
              value={inputData.description_ru}
              multiline
              maxRows={8}
              minRows={6}
              onChange={(e) => handleChangeInput('description_ru', e.target.value)}
              label="Russian Description"
            />
          </div>
        </div>
        <div className="my-5 md:my-8 flex justify-start">
          <Button
            onClick={handleUpdate}
            className="bg-black text-white shadow px-8"
            disabled={isLoading}>
            {isLoading ? <CircularProgress size={16} /> : 'Update Now'}
          </Button>
        </div>
      </div>
    </Container >
  );
};

UpdateWithDriver.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateWithDriver;