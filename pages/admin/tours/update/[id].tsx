// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateTourData from '../../../../src/components/admin-components/tours/update-tour/update-tour';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import tourClient from '../../../../src/rest-api/client/tour-client';
import { getStaticPaths, getStaticProps } from '../../../../src/rest-api/tours/tour-detaild.ssr';
import { TourInputType } from '../../../../src/types/input-type';
import { NextPageWithLayout } from '../../../../src/types/page-props';
import { DeparturesPricing, IndividualPricing, TourDestinationType, TourRouteType } from '../../../../src/types/tour';
export { getStaticPaths, getStaticProps };

const tabs = [
  { title: 'New Tour Data', value: 'en' },
  { title: 'Russian Data', value: 'ru' },
  { title: 'Armenian Data', value: 'hy' },
];

const UpdateTour: NextPageWithLayout<InferGetServerSidePropsType<typeof getStaticProps>> = (props) => {
  const destinations: TourDestinationType[] = props?.destinationData?.data;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [individualPricing, setIndividualPricing] = useState<IndividualPricing[]>([]);
  const [departuresPricing, setDeparturesPricing] = useState<DeparturesPricing[]>([]);
  const [routes, setRoutes] = useState<TourRouteType[]>([]);
  const [includeServices, setIncludeServices] = useState<string[]>([]);
  const [excludeServices, setExcludeServices] = useState<string[]>([]);
  const [inputData, setInputData] = useState<TourInputType>({
    isRu: false,
    isHy: false,
    title: "",
    title_ru: "",
    title_hy: "",
    price: '',
    dayLength: '',
    nightLength: '',
    bestTime: "",
    bestTime_ru: "",
    bestTime_hy: "",
    isFixedDate: false,
    startDate: '',
    endDate: '',
    mainList: "",
    childList: "",
    shortDescription: "",
    shortDescription_ru: "",
    shortDescription_hy: "",
    longDescription: "",
    longDescription_ru: "",
    longDescription_hy: "",
    freeCancelation: true,
    activities: '',
    locationImg: "",
    thumbnail: "",
    destinationId: '',
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
        setImages([...images, data?.Location]);
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

  const uploadLocation = async (event: any) => {
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
        setInputData({ ...inputData, locationImg: data?.Location })
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setUploading(false);
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((image, i) => i !== index));
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
      "dayLength",
      "nightLength",
      "bestTime",
      "mainList",
      "childList",
      "shortDescription",
      "longDescription",
      "activities",
      "thumbnail",
      "locationImg",
      "destinationId"
    ];

    if (inputData.isRu) {
      requiredFields.push("title_ru", "bestTime_ru", "shortDescription_ru", "longDescription_ru");
    }

    if (inputData.isHy) {
      requiredFields.push("title_hy", "bestTime_hy", "shortDescription_hy", "longDescription_hy");
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

    const payload = JSON.stringify({
      ...inputData,
      price: parseInt(inputData.price),
      dayLength: parseInt(inputData.dayLength),
      nightLength: parseInt(inputData.nightLength),
      destinationId: parseInt(inputData.destinationId),
      includesServices: includeServices,
      excludeServices: excludeServices,
      images: images,
      routes: routes,
      individualPricing: individualPricing,
      departuresPricing: departuresPricing
    });

    try {
      const res = await tourClient.tours.create(payload);
      toast.success('Tour created successfully');
      router.push('/admin/tours');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <UpdateTourData
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
        individualPricing={individualPricing}
        setIndividualPricing={setIndividualPricing}
        isLoading={isLoading}
        destinations={destinations}
        uploadLocation={uploadLocation}
        departuresPricing={departuresPricing}
        setDeparturesPricing={setDeparturesPricing}
        routes={routes}
        setRoutes={setRoutes}
        includeServices={includeServices}
        setIncludeServices={setIncludeServices}
        excludeServices={excludeServices}
        setExcludeServices={setExcludeServices}
      />
    </>
  );
};

UpdateTour.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateTour;