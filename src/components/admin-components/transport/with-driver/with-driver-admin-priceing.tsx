import { Box, Button, Container, Modal, TextField, Typography, useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import serviceClient from '../../../../rest-api/client/service-client';
import { CarWithDriverType } from '../../../../types/car-type';
import UpdateWithDriverPricing from './update-pricing';

interface PropsType {
  carsWithDriver: CarWithDriverType
}

export default function WithDriverAdminPricing({ carsWithDriver }: PropsType) {
  const router = useRouter();
  const { pathname } = router;
  const [openModal, setOpenModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [priceInput, setPriceInput] = useState({
    duration: '',
    duration_ru: '',
    duration_hy: '',
    price: '',
  });
  const theme = useTheme();

  const changeUpdateModal = (price: any) => {
    setSelectedPrice(price);
    setUpdateModal(!updateModal);
  }

  const closeUpdateModal = () => {
    setUpdateModal(false);
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
    if (!priceInput.duration || !priceInput.price) {
      toast.error("All fields are required!");
      return;
    }
    try {
      await serviceClient.carWithDriver.createPrice({
        ...priceInput,
        carId: carsWithDriver?.id,
      });
      toast.success("Price created successfully!");
      handleAddModal();
      router.push({
        pathname: pathname
      });
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
            await serviceClient.carWithDriver.deletePrice(id);
            toast.success('Price deleted successfully!');
            router.push({
              pathname: pathname
            });
            // setPricing((previewData: any) => {
            //   const temp = JSON.parse(JSON.stringify(previewData));
            //   const filteredData = temp.filter((item: any) => item.id !== id);
            //   return filteredData;
            // })
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
    <Container
      className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb] tour-details-page">
      <div className="">
        <p className="text-lg font-medium uppercase">Car Pricing</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center">Duration</TableCell>
                <TableCell className="text-base" align="center">Pricing</TableCell>
                <TableCell className="text-base" align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                carsWithDriver?.pricing.map((pricing, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{pricing.duration}</TableCell>
                    <TableCell align="center">{pricing.price} AMD</TableCell>
                    <TableCell className='flex gap-2 justify-center'>
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
              label='Duration'
              name="duration"
              value={priceInput?.duration}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Duration(ru)'
              name="duration_ru"
              value={priceInput?.duration_ru}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Duration(hy)'
              name="duration_hy"
              value={priceInput?.duration_hy}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
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
            <div style={formStyles.buttonContainer} className="">
              <Button
                onClick={handleAddModal}
                color="secondary"
                variant="outlined">
                Cancle
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained">
                Submit
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={updateModal && selectedPrice !== null}
        onClose={closeUpdateModal}>
        <UpdateWithDriverPricing
          price={selectedPrice}
          handleCancelModal={closeUpdateModal}
        />
      </Modal>
    </Container>
  );
}