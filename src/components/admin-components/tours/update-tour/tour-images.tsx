// @flow strict

import { Button, CircularProgress } from "@mui/material";
import Image from "next/legacy/image";
import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";
import client from "../../../../rest-api/client";
import tourClient from "../../../../rest-api/client/tour-client";
import { ImageType } from "../../../../types";
import { TourType } from "../../../../types/tour";

interface PropsType {
  tourDetails: TourType;
}

function TourImages({ tourDetails }: PropsType) {
  const [images, setImages] = useState<ImageType[]>(tourDetails.images || []);
  const [uploading, setUploading] = useState(false);

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
          const res: any = await tourClient.tours.createNewImage({
            tourId: tourDetails.id,
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

  const handleRemoveImage = async (id: number) => {
    try {
      const res = await client.images.deleteImage(id);
      console.log(res)
      setImages(images.filter((image, i) => image.id !== id));
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error)
    }
  }

  return (
    <div>
      <p className="font-medium uppercase">Tour Images</p>
      <div
        className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-2
             lg:grid-cols-3  gap-4">
        {
          images?.length > 0 &&
          images.map((image: ImageType, i: number) => (
            <div key={i} className="w-full relative">
              <Image
                width={1000}
                height={500}
                src={image.url}
                className="rounded-lg"
                alt="airport transport"
                layout="responsive"
              />
              <Button
                onClick={() => handleRemoveImage(image.id)}
                className="absolute min-w-fit shadow py-0 px-[5px] text-sm
                     -top-1 -right-1 bg-red-600 text-white rounded-full">X</Button>
            </div>
          ))
        }
        <div
          className="border-2 border-[#0000004d] border-dashed flex items-center
           justify-center w-full min-h-[170px] relative bg-[#f1f1f1]  rounded-lg">
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
            className="block border-none absolute top-0 left-0 
                right-0 bottom-0 opacity-0"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TourImages;