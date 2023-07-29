// @flow strict

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";
import swal from "sweetalert";
import tourClient from "../../../../rest-api/client/tour-client";
import { TourService, TourType } from "../../../../types/tour";
import ExpandedSectionTitle from "../../../common/expanded-section-title";

interface PropsType {
  tourDetails: TourType;
}

function UpdateTourServices({
  tourDetails
}: PropsType) {
  const [includeServices, setIncludeServices] = useState<TourService[]>(tourDetails.includesServices || []);
  const [excludeServices, setExcludeServices] = useState<TourService[]>(tourDetails.excludeServices || []);

  const [openModal, setOpenModal] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [inputData, setInputData] = useState({
    text: "",
    text_ru: "",
    text_hy: "",
    type: "",
  });
  const theme = useTheme();

  const handleAddModal = () => {
    setOpenModal(!openModal);
  };

  const handleChangeFunction = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = async () => {
    if (!inputData.text || !inputData.text_ru || !inputData.text_hy || !inputData.type) {
      toast.warning("Please fill all the fields");
      return;
    }

    const payload = {
      ...inputData,
      tourId: tourDetails.id,
    }

    try {
      const res: any = await tourClient.services.create(payload);
      if (payload.type === "include") {
        setIncludeServices([...includeServices, res.data]);
      } else {
        setExcludeServices([...excludeServices, res.data]);
      }
      toast.success("Service added successfully");
      setInputData({
        text: "",
        text_ru: "",
        text_hy: "",
        type: "",
      })
      setOpenModal(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (service: TourService) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
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
            await tourClient.services.delete(service.id);
            toast.success('Service deleted successfully!');
            if (service.type === "include") {
              setIncludeServices((prev: TourService[]) => {
                const temp = JSON.parse(JSON.stringify(prev));
                const filtered = temp.filter((item: TourService) => item.id !== service.id);
                return filtered;
              });
            } else {
              setExcludeServices((prev: TourService[]) => {
                const temp = JSON.parse(JSON.stringify(prev));
                const filtered = temp.filter((item: TourService) => item.id !== service.id);
                return filtered;
              });
            }
          } catch (error) {
            // console.log(error);
            toast.error('Something went wrong!');
          }
        }
      });
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
                  <Button
                    color="error"
                    className="min-w-fit px-3"
                    onClick={() => handleDelete(item)}
                    variant="text">
                    <BsTrash />
                  </Button>
                  <AiOutlineCheckCircle className="text-[#00952A]" />
                  <span className="text-sm">
                    {item.text}
                  </span>
                </p>
              )
              )}
              {excludeServices.map((item, index) => (
                <p className="flex gap-4 my-6 items-center" key={index}>
                  <Button
                    color="error"
                    className="min-w-fit px-3"
                    onClick={() => handleDelete(item)}
                    variant="text">
                    <BsTrash />
                  </Button>
                  <RxCrossCircled className="text-[#FF3500]" />
                  <span className="text-sm">
                    {item.text}
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
            sx={{ fontSize: "24px", color: "#004C99", fontWeight: 600 }}>
            Create New Service
          </Typography>
          <Box
            sx={formStyles.gridContainer}>
            <TextField
              label='Title'
              name="text"
              variant='outlined'
              value={inputData?.text}
              onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
            />
            <TextField
              label='Title(Ru)'
              name="text_ru"
              variant='outlined'
              value={inputData?.text_ru}
              onChange={(e) => setInputData({ ...inputData, text_ru: e.target.value })}
            />
            <TextField
              label='Title(Hy)'
              name="text_hy"
              variant='outlined'
              value={inputData?.text_hy}
              onChange={(e) => setInputData({ ...inputData, text_hy: e.target.value })}
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

export default UpdateTourServices;
