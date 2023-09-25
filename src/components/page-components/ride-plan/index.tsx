// @flow strict
import { Container } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import client from "../../../rest-api/client";
import { TourDestinationType } from "../../../types/tour";
import { localizationData } from "../../../utils/locales";
import SectionTitle from "../../common/section-title";
import RidePlanForm from "./ride-plan-form";
import RidePlanMap from "./ride-plan-map";

interface PropsType {
  destinations: TourDestinationType[];
}

function RidePlanUI({ destinations }: PropsType) {
  const [locations, setLocations] = useState<TourDestinationType[]>(destinations);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [isLoading, setIsLoading] = useState(false);
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

  const router = useRouter();
  const { locale } = router;
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

  const handleChangeDestination = (name: string, value: number, i: number) => {
    if (name === 'duration') {
      setDestinationInput((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp[i][name] = value;
        return temp;
      })
    } else {
      const findDestination = locations.find(destination => destination.id === value);
      setDestinationInput((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp[i][name] = value;
        temp[i].lat = findDestination?.lat;
        temp[i].lng = findDestination?.lng;
        temp[i].title = findDestination?.name;
        return temp;
      })
    }
  }

  const filterLocation = (type: string) => {
    const filteredLocation = destinations.filter(
      (destination) => destination.rideType === type);
    setLocations(filteredLocation);
    setDestinationInput([{
      name: '',
      duration: '',
      lat: null,
      lng: null,
      title: '',
    }]);
    setDestinationCount([1]);
  };

  const handleOnChangeInputData = (name: string, value: any) => {
    if (name === 'rideType') {
      filterLocation(value);
    }

    setInputData((prevState: any) => {
      const temp = JSON.parse(JSON.stringify(prevState))
      temp[name] = value;
      return temp;
    })
  }

  const handleRemoveDestination = (index: number) => {
    setDestinationCount((prev: any) => {
      const temp = JSON.parse(JSON.stringify(prev));
      if (temp.length === 1) return temp;

      temp.splice(index, 1);
      return temp;
    });

    setDestinationInput((prev: any) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp.splice(index, 1);
      if (temp.length === 0) {
        temp.push({
          name: '',
          duration: '',
          lat: null,
          lng: null,
          title: '',
        });
      }
      return temp;
    });
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
      await client.ridePlan.newRidePlan(payload);
      // console.log(res)
      router.push('/ride-plan/success');
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
          locations={locations}
        />
        <RidePlanMap destinationInput={destinationInput} />
      </div>
    </Container>
  );
};

export default RidePlanUI;