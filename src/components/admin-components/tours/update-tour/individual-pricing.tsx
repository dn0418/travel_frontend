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
import { IndividualPricing, TourType } from '../../../../types/tour';
import UpdateIndividualPrice from './update-individual';

interface PropsType {
  tourDetails: TourType,
}

function UpdateIndividualPricing({ tourDetails }: PropsType) {
  const [individualPricing, setIndividualPricing] = useState<IndividualPricing[]>(tourDetails.individualPricing || []);
  const [openModal, setOpenModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [priceInput, setPriceInput] = useState({
    pax2_3: '',
    pax4_6: '',
    pax7_18: '',
    pax20_more: '',
  });
  const theme = useTheme();

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

  const closeUpdateModal = () => {
    setUpdateModal(false);
  }

  const changeUpdateModal = (price: any) => {
    setSelectedPrice(price);
    setUpdateModal(true);
  }

  const handleSubmit = async () => {
    if (!priceInput.pax2_3 || !priceInput.pax4_6 || !priceInput.pax7_18 || !priceInput.pax20_more) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res: any = await tourClient.individualPricing.create({
        ...priceInput,
        tourId: tourDetails?.id,
      });
      setIndividualPricing((previewData: any) => {
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
            const res = await tourClient.individualPricing.delete(id);
            toast.success('Price deleted successfully!')
            setIndividualPricing((previewData: any) => {
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
        <p className="text-lg font-medium uppercase">Individual Pricing Table</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="Individual Pricing Tabl">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center">Pax 2-3</TableCell>
                <TableCell className="text-base" align="center">Pax 4-6</TableCell>
                <TableCell className="text-base" align="center">Pax 7-18</TableCell>
                <TableCell className="text-base" align="center">Pax 20 More</TableCell>
                <TableCell className="text-base" align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                individualPricing.map((pricing, index: number) => (
                  <TableRow key={index}>
                    <TableCell align="center">{pricing.pax2_3}</TableCell>
                    <TableCell align="center">{pricing.pax4_6} </TableCell>
                    <TableCell align="center">{pricing.pax7_18} </TableCell>
                    <TableCell align="center">{pricing.pax20_more} </TableCell>
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
            sx={{ fontSize: "24px", color: "#081000", fontWeight: 600 }}>
            Create New Price
          </Typography>
          <Box
            sx={formStyles.gridContainer}>
            <TextField
              label='Pax 2-3'
              name="pax2_3"
              value={priceInput?.pax2_3}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              type='number'
              variant='outlined'
            />
            <TextField
              label='Pax 4-6'
              name="pax4_6"
              value={priceInput?.pax4_6}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              type='number'
              variant='outlined'
            />
            <TextField
              label='Pax 7-18'
              name="pax7_18"
              value={priceInput?.pax7_18}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              type='number'
              variant='outlined'
            />
            <TextField
              label='Pax 20 More'
              name="pax20_more"
              value={priceInput?.pax20_more}
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
        <UpdateIndividualPrice
          price={selectedPrice}
          handleCancelModal={closeUpdateModal}
          setPricing={setIndividualPricing}
        />
      </Modal>
    </div>
  );
}

export default UpdateIndividualPricing;