// @flow strict
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateBrochureUi from '../../../../src/components/admin-components/brochure/update';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/armenia/brochure/single-brochure.ssr';
import armeniaClient from '../../../../src/rest-api/client/armenia-client';
import { NextPageWithLayout } from '../../../../src/types/page-props';
export { getStaticPaths, getStaticProps };


const UpdateBrochure: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const brochure = props?.brochureDetails?.data;
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({
    title: brochure?.title || "",
    title_ru: brochure?.title_ru || "",
    title_hy: brochure?.title_hy || "",
    url: brochure?.url || "",
    name: "",
  });
  const router = useRouter();


  const uploadFile = async (event: any) => {
    setUploading(true);
    const formData = new FormData();

    const file = event.target.files[0];

    formData.append("file", file);

    setInputData({ ...inputData, name: file?.name });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/file/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data?.Location) {
        setInputData({
          ...inputData,
          url: data?.Location,
          name: file?.name
        })
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setUploading(false);
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setInputData((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return { ...temp };
    })
  }

  const handleSubmit = async () => {
    if (!inputData.title || !inputData.url) {
      toast.error('Please fill all the fields');
      return;
    }

    setIsLoading(true);
    const payload = JSON.stringify({
      title: inputData.title,
      title_ru: inputData.title_ru,
      title_hy: inputData.title_hy,
      url: inputData.url,
    });

    try {
      await armeniaClient.brochure.update(brochure.id, payload);
      toast.success('Brochure updated successfully');
      router.push('/admin/brochure');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <UpdateBrochureUi
        inputData={inputData}
        uploadFile={uploadFile}
        uploading={uploading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
      />
    </>
  );
};

UpdateBrochure.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateBrochure;