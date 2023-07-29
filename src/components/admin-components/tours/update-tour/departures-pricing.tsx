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
import tourClient from '../../../../rest-api/client/tour-client';
import { DeparturesPricing, TourType } from '../../../../types/tour';
import UpdateDeparturePrice from './update-departures';

interface PropsType {
  tourDetails: TourType,
}

function UpdateDeparturesPricing({ tourDetails }: PropsType) {
  const [departuresPricing, setDeparturesPricing] = useState<DeparturesPricing[]>(tourDetails.departuresPricing || []);
  const [openModal, setOpenModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [priceInput, setPriceInput] = useState({
    startDate: '',
    endDate: '',
    maxPerson: '',
    price: '',
  });
  const theme = useTheme();

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
    if (!priceInput.startDate || !priceInput.endDate || !priceInput.maxPerson || !priceInput.price) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res: any = await tourClient.departures.create({
        ...priceInput,
        tourId: tourDetails?.id,
      });
      setDeparturesPricing((previewData: any) => {
        const temp = JSON.parse(JSON.stringify(previewData));
        temp.push(res.data);
        return temp;
      })
      toast.success(res.message);
      handleAddModal();
    } catch (error: any) {
      toast.error(error.message);
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
            const res = await tourClient.departures.delete(id);
            toast.success('Price deleted successfully!')
            setDeparturesPricing((previewData: any) => {
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
        <p className="text-lg font-medium uppercase">Departures Pricing Table</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="Departures Pricing Tabl">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center">Start Date</TableCell>
                <TableCell className="text-base" align="center">End Date</TableCell>
                <TableCell className="text-base" align="center">Max Person</TableCell>
                <TableCell className="text-base" align="center">Price</TableCell>
                <TableCell className="text-base" align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                departuresPricing.map((pricing, index: number) => (
                  <TableRow key={index}>
                    <TableCell align="center">{pricing.startDate}</TableCell>
                    <TableCell align="center">{pricing.endDate} </TableCell>
                    <TableCell align="center">{pricing.maxPerson} </TableCell>
                    <TableCell align="center">{pricing.price} </TableCell>
                    <TableCell className='flex justify-center gap-2' align="center">
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
              label='Start Date'
              name="startDate"
              value={priceInput?.startDate}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='End Date'
              name="endDate"
              value={priceInput?.endDate}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Max Person'
              name="maxPerson"
              value={priceInput?.maxPerson}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              type='number'
              variant='outlined'
            />
            <TextField
              label='Price'
              name="price"
              value={priceInput?.price}
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
        <UpdateDeparturePrice
          price={selectedPrice}
          handleCancelModal={closeUpdateModal}
          setPricing={setDeparturesPricing}
        />
      </Modal>
    </div>
  );
}

export default UpdateDeparturesPricing;