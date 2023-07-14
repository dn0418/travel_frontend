// @flow strict

import { Button, CircularProgress, Container } from "@mui/material";
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


const UpdateAirportTransport: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const airportTransport = props.airportTransportData?.data[0] || {};
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<ImageType[]>(airportTransport?.images || []);

  console.log(airportTransport)

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
          const res: any = await client.airportTransport.newImage({
            id: airportTransport.id,
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

  return (
    <Container className='flex my-5 lg:mt-8 flex-col items-center'>
      <div className="flex items-center w-full justify-between">
        <SectionTitle title="Update Airport Transfers" />
        <Button onClick={() => router.back()} className="shadow">
          Back
        </Button>
      </div>

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
              <div className="flex items-center justify-center flex-col">
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

    </Container >
  );
};

UpdateAirportTransport.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateAirportTransport;