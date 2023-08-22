// @flow strict
import { Container } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import client from "../../../rest-api/client";
import { destinationFilterData } from "../../../utils/data/homepage-data";
import { localizationData } from "../../../utils/locales";
import SectionTitle from "../../common/section-title";
import RidePlanForm from "./ride-plan-form";
import RidePlanMap from "./ride-plan-map";
import RideSuccess from "./success-page";

function RidePlanUI() {
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    adult: '',
    child: '',
    rideType: '',
    note: '',
  });

  const [destinationCount, setDestinationCount] = useState([1]);
  const [destinationInput, setDestinationInput] = useState([{
    name: '',
    duration: '',
    lat: null,
    lng: null,
    title: '',
  }]);
  const { locale } = useRouter()
  const localData = locale === "ru" ? localizationData.ru :
    (locale === 'hy' ? localizationData.hy : localizationData.en);

  const changeDestinationCount = () => {
    if (destinationInput[destinationInput.length - 1].name === '') return;
    setDestinationCount([...destinationCount, 1]);
    setDestinationInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp.push({
        name: '',
        duration: '',
        lat: null,
        lng: null,
        title: '',
      });
      return temp
    })
  }

  const handleChangeDestination = (name: string, value: string, i: number) => {
    if (name === 'duration') {
      setDestinationInput((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp[i][name] = value;
        return temp;
      })
    } else {
      const findDestination = destinationFilterData.find(destination => destination.value === value)
      setDestinationInput((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp[i][name] = value;
        temp[i].lat = findDestination?.lat;
        temp[i].lng = findDestination?.lng;
        temp[i].title = findDestination?.title;
        return temp;
      })
    }
  }

  const handleOnChangeInputData = (name: string, value: any) => {
    setInputData((prevState: any) => {
      const temp = JSON.parse(JSON.stringify(prevState))
      temp[name] = value;
      return temp;
    })
  }

  const handleRemoveDestination = (index: number) => {
    setDestinationCount(destinationCount.filter((_, i) => i !== index));
    setDestinationInput(destinationInput.filter((_, i) => i !== index));
  }

  const handleSubmit = async () => {
    if (!inputData.name || !inputData.email) {
      toast.warning("At Least Name and Email must be provided!")
      return
    }
    setIsLoading(true);

    const payload = JSON.stringify({
      name: inputData.name,
      email: inputData.email,
      phone: inputData.phoneNumber,
      address: inputData.address,
      date: date?.format('YYYY-MM-DD'),
      adult: inputData.adult,
      child: inputData.child,
      rideType: inputData.rideType,
      note: inputData.note,
      destinations: destinationInput
    });

    try {
      const res = await client.ridePlan.newRidePlan(payload);
      // console.log(res)
      setIsSuccess(true);
    } catch (error) {
      toast.error("Something went wrong");
      // console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = window.localStorage.getItem('ridePlanContact') || false;
      const savedDataObj = JSON.parse(savedData || '{}');
      setInputData(savedDataObj)
    }
  }, [])

  return (
    <>
      {
        !isSuccess ?
          <Container className=' flex flex-col  mb-12 lg:mb-16 py-5'>
            <SectionTitle title={localData.home_plan_title} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-8">
              <RidePlanForm
                inputData={inputData}
                handleOnChangeInputData={handleOnChangeInputData}
                date={date}
                setDate={setDate}
                destinationCount={destinationCount}
                destinationInput={destinationInput}
                handleChangeDestination={handleChangeDestination}
                changeDestinationCount={changeDestinationCount}
                handleRemoveDestination={handleRemoveDestination}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
              <RidePlanMap destinationInput={destinationInput} />
            </div>
          </Container>
          :
          <RideSuccess />
      }
    </>
  );
};

export default RidePlanUI;