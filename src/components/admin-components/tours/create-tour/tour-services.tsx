// @flow strict

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";
import ExpandedSectionTitle from "../../../common/expanded-section-title";

interface PropsType {
  includeServices: any[];
  excludeServices: any[];
  setIncludeServices: any;
  setExcludeServices: any;
}

function CreateTourServices({
  includeServices,
  excludeServices,
  setIncludeServices,
  setExcludeServices
}: PropsType) {
  const [openModal, setOpenModal] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [inputData, setInputData] = useState({
    en: "",
    ru: "",
    hy: "",
    type: "",
  });
  const theme = useTheme();

  const handleAddModal = () => {
    setOpenModal(!openModal);
  };

  const handleChangeFunction = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = () => {
    if (!inputData.en || !inputData.type) {
      toast.warning("Please fill all the fields");
      return;
    }

    if (inputData.type === "include") {
      setIncludeServices((prev: any) => {
        const temp = [...prev];
        temp.push({
          en: inputData.en,
          ru: inputData.ru,
          hy: inputData.hy,
        });
        return temp;
      });
    } else {
      setExcludeServices((prev: any) => {
        const temp = [...prev];
        temp.push({
          en: inputData.en,
          ru: inputData.ru,
          hy: inputData.hy,
        });
        return temp;
      });
    }
    setInputData({
      en: '',
      ru: '',
      hy: '',
      type: '',
    })
    setOpenModal(false);
  };

  const formStyles = {
    modalContainer: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      bgcolor: "background.paper",
      boxShadow: 24,
      px: '32px',
      py: 5,
      borderRadius: "12px",
      overflowY: "scroll",
      maxHeight: "90vh",
      color: "#5E5E5E",
      [theme.breakpoints.down("md")]: {
        width: "95%",
        p: 3,
      },
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "24px",
      mt: "20px",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "8px",
        mt: "12px"
      },
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "16px",
    },
  };

  return (
    <div className="my-5">
      <ExpandedSectionTitle
        title="Includes and Excludes Services"
        onchange={handleChangeFunction}
      />
      <div
        hidden={!isShow}
        className="transition-all duration-1000 ease-in-out "
      >
        <Container>
          <div className="flex flex-col md:items-center">
            <div>
              {includeServices.map((item, index) => (
                <p className="flex gap-4 my-6 items-center" key={index}>
                  <AiOutlineCheckCircle className="text-[#00952A]" />
                  <span className="text-sm">
                    {item.en}
                  </span>
                </p>
              )
              )}
              {excludeServices.map((item, index) => (
                <p className="flex gap-4 my-6 items-center" key={index}>
                  <RxCrossCircled className="text-[#FF3500]" />
                  <span className="text-sm">
                    {item.en}
                  </span>
                </p>
              )
              )}
            </div>
          </div>
          <div className="flex mt-5 justify-end">
            <Button
              className='bg-black text-white'
              onClick={handleAddModal}
              variant='contained'>
              Add New Service
            </Button>
          </div>
        </Container>
      </div>
      <Modal
        open={openModal}
        onClose={handleAddModal}>
        <Box sx={formStyles.modalContainer}>
          <Typography
            sx={{ fontSize: "24px", color: "#081000", fontWeight: 600 }}>
            Create New Service
          </Typography>
          <Box
            sx={formStyles.gridContainer}>
            <TextField
              label='Title'
              name="en"
              variant='outlined'
              value={inputData?.en}
              onChange={(e) => setInputData({ ...inputData, en: e.target.value })}
            />
            <TextField
              label='Title(Ru)'
              name="ru"
              variant='outlined'
              value={inputData?.ru}
              onChange={(e) => setInputData({ ...inputData, ru: e.target.value })}
            />
            <TextField
              label='Title(Hy)'
              name="hy"
              variant='outlined'
              value={inputData?.hy}
              onChange={(e) => setInputData({ ...inputData, hy: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Service Type</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                value={inputData?.type}
                label='Service Type'
                name="type"
                onChange={(e) => setInputData({ ...inputData, type: e.target.value })}
              >
                <MenuItem value='include'>
                  Include Service
                </MenuItem>
                <MenuItem value='exclude'>
                  Exclude Service
                </MenuItem>
              </Select>
            </FormControl>
            <div style={formStyles.buttonContainer}>
              <Button
                onClick={handleAddModal}
                color="secondary"
                variant="outlined">
                Cancle
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained">
                Create
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateTourServices;
