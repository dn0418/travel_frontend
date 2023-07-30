// @flow strict

import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import serviceClient from '../../../../rest-api/client/service-client';
import { HotelDataType, HotelPricingTable } from '../../../../types/services';
import UpdatePricing from './update-pricing';

interface PropsType {
  pricing: HotelPricingTable[],
  setPricing: any,
  hotel?: HotelDataType
}

function UpdateHotelPricing({ pricing, setPricing, hotel }: PropsType) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [priceInput, setPriceInput] = useState({
    name: '',
    name_ru: '',
    name_hy: '',
    firstPart: '',
    lastPart: '',
  });
  const theme = useTheme();
  // console.log(hotel)

  const closeUpdateModal = () => {
    setUpdateModal(false);
  }

  const changeUpdateModal = (price: any) => {
    setSelectedPrice(price);
    setUpdateModal(true);
  }

  const handleAddModal = () => {
    setOpenModal(!openModal);
  };

  const handleChangeInput = (name: string, value: string) => {
    setPriceInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return temp;
    })
  }

  const handleSubmit = async () => {
    if (!priceInput.name || !priceInput.name_ru || !priceInput.name_hy || !priceInput.firstPart || !priceInput.lastPart) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const res: any = await serviceClient.hotels.createNewPrice({
        ...priceInput,
        hotelId: hotel?.id,
      });
      setPricing((previewData: any) => {
        const temp = JSON.parse(JSON.stringify(previewData));
        temp.push(res.data);
        return temp;
      })
      toast.success("Price created successfully!");
      handleAddModal();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  const handleDeletePrice = async (id: number) => {
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
            const res = await serviceClient.hotels.deleteHotelPrice(id);
            toast.success('Price deleted successfully!')
            setPricing((previewData: any) => {
              const temp = JSON.parse(JSON.stringify(previewData));
              const filteredData = temp.filter((item: any) => item.id !== id);
              return filteredData;
            })
          } catch (error) {
            toast.error('Something went wrong!')
          }
        }
      });
  }

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
      gap: "16px",
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
    <div
      className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb] tour-details-page">
      <div className="">
        <p className="text-lg font-medium uppercase">Hotel Pricing Table</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center">
                  Name
                </TableCell>
                <TableCell className="text-base" align="center">Name(Ru)</TableCell>
                <TableCell className="text-base" align="center">Name(Hy)</TableCell>
                <TableCell className="text-base" align="center">First Part</TableCell>
                <TableCell className="text-base" align="center">Last Part</TableCell>
                <TableCell className="text-base" align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                pricing.map((pricing, index: number) => (
                  <TableRow key={index}>
                    <TableCell align="center">{pricing.name}</TableCell>
                    <TableCell align="center">{pricing.name_ru} </TableCell>
                    <TableCell align="center">{pricing.name_hy} </TableCell>
                    <TableCell align="center">{pricing.firstPart} </TableCell>
                    <TableCell align="center">{pricing.lastPart} </TableCell>
                    <TableCell className='flex gap-2' align="center">
                      <Button
                        variant='text'
                        color='secondary'
                        onClick={() => changeUpdateModal(pricing)}
                        className='shadow text-xs'>Edit</Button>
                      <Button
                        variant='text'
                        color='secondary'
                        onClick={() => handleDeletePrice(pricing.id)}
                        className='shadow text-xs'>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex mt-5 justify-end">
          <Button
            className='bg-black text-white'
            onClick={handleAddModal}
            variant='contained'>
            Add New Price
          </Button>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={handleAddModal}>
        <Box sx={formStyles.modalContainer}>
          <Typography
            sx={{ fontSize: "24px", color: "#004C99", fontWeight: 600 }}>
            Create New Price
          </Typography>
          <Box
            sx={formStyles.gridContainer}>
            <TextField
              label='Name'
              name="name"
              value={priceInput?.name}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Name Ru'
              name="name_ru"
              value={priceInput?.name_ru}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Name Hy'
              name="name_hy"
              value={priceInput?.name_hy}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='01.02-30.03'
              name="firstPart"
              value={priceInput?.firstPart}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
              type='number'
            />
            <TextField
              label='01.04-30.12'
              name="lastPart"
              value={priceInput?.lastPart}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
              type='number'
            />
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
      <Modal
        open={updateModal && selectedPrice !== null}
        onClose={closeUpdateModal}>
        <UpdatePricing
          price={selectedPrice}
          handleCancelModal={closeUpdateModal}
          setPricing={setPricing}
        />
      </Modal>
    </div>
  );
}

export default UpdateHotelPricing;