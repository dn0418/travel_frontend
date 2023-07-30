import { ReactNode, useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  country: "",
  timezone: "Asia/Yerevan",
  firstName: "",
  email: "",
};

const ModalHOC = (Children: any) => {
  const [openContactModal, setOpenContactModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState(initialState);

  const handleChangeInput = (name: string, value: string): void => {
    setInputData((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return temp;
    });
  };

  const handleChangeModal = () => {
    setOpenContactModal(!openContactModal);
  };

  const handleSubmit = async () => {
    if (!inputData.email) {
      toast.error("First name, email and country are required");
      return;
    }
    setIsLoading(true);
    console.log(inputData);
    setOpenContactModal(false);

    return (
      <Children
        handleChangeModal={handleChangeModal}
        handleSubmit={handleSubmit}
        handleChangeInput={handleChangeInput}
      />
    );
  };
};

export default ModalHOC;
