// @flow strict

import { Button } from "@mui/material";
import Image from "next/legacy/image";
import { toast } from "react-toastify";
import swal from "sweetalert";
import client from "../../rest-api/client";
import { ImageType } from "../../types";


function AdminImage({ image, setImages }: { image: ImageType, setImages: any }) {
  const handleDeleteImage = async (image: ImageType) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this image!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Delete",
          value: true,
          visible: true,
          closeModal: true
        }
      }
    })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            const res = await client.images.deleteImage(image.id);
            setImages((prev: any) => {
              const temp = JSON.parse(JSON.stringify(prev));
              const filtered = temp.filter((img: ImageType) => img.id !== image.id);
              return filtered;
            })
            toast.success('Image deleted successfully!');
          } catch (error) {
            // console.log(error);
            toast.error('Something went wrong!');
          }
        }
      });
  }

  return (
    <div className="w-full relative">
      <Image
        width={1000}
        height={500}
        src={image?.url}
        className="rounded-lg"
        alt="airport transport"
        layout="responsive"
      />
      <Button
        onClick={() => handleDeleteImage(image)}
        className="absolute min-w-fit shadow py-0 px-[5px] text-sm -top-1 -right-1 bg-red-600 text-white rounded-full">X</Button>
    </div>
  );
};

export default AdminImage;