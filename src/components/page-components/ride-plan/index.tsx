// @flow strict

import { Container } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import client from "../../../rest-api/client";
import SectionTitle from "../../common/section-title";
import RidePlanForm from "./ride-plan-form";
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
    duration: ''
  }]);

  const changeDestinationCount = () => {
    if (destinationInput[destinationInput.length - 1].name === '') return;
    setDestinationCount([...destinationCount, 1]);
    setDestinationInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp.push({
        name: '',
        duration: ''
      });
      return temp
    })
  }

  const handleChangeDestination = (name: string, value: string, i: number) => {
    setDestinationInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[i][name] = value;
      return temp;
    })
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

  const incrementCount = (name: string) => {
    setInputData((prevState: any) => {
      const temp = JSON.parse(JSON.stringify(prevState));
      temp[name] = parseInt(temp[name]) + 1;
      return temp;
    })
  }
  const decrementCount = (name: string) => {
    setInputData((prevState: any) => {
      const temp = JSON.parse(JSON.stringify(prevState));
      if (parseInt(temp[name]) <= 0) return temp;
      temp[name] = parseInt(temp[name]) - 1;
      return temp;
    })
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
      console.log(res)
      setIsSuccess(true);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error)
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
            <SectionTitle title='Make your own ride plan with us' />
            <div className="grid grid-cols-1">
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
                incrementCount={incrementCount}
                decrementCount={decrementCount}
                isLoading={isLoading}
              />
              {/* <RidePlanMap /> */}
            </div>
          </Container>
          :
          <RideSuccess />
      }
    </>
  );
};

export default RidePlanUI;