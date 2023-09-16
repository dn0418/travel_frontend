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
import { PriceWithoutDriverType } from '../../../../types/car-type';

interface PropsType {
  pricing: PriceWithoutDriverType[],
  setPricing: any,
}

function CreateCarPricing({ pricing, setPricing }: PropsType) {
  const [openModal, setOpenModal] = useState(false);
  const [priceInput, setPriceInput] = useState({
    destination: '',
    destination_ru: '',
    destination_hy: '',
    sedan_3seat: '',
    minivan_7seat: '',
    minibus_18seat: '',
    bus_35seat: '',
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

  const handleSubmit = async () => {
    if (!priceInput.destination || !priceInput.destination_ru || !priceInput.destination_hy || !priceInput.sedan_3seat || !priceInput.minivan_7seat || !priceInput.minibus_18seat || !priceInput.bus_35seat) {
      toast.error("All fields are required!");
      return;
    }
    setPricing((previewData: any) => {
      const temp = JSON.parse(JSON.stringify(previewData));
      temp.push(priceInput);
      return temp;
    })
    handleAddModal();
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
        <p className="text-lg font-medium uppercase">Car Without Driver Pricing</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center">
                  Destination
                </TableCell>
                <TableCell className="text-base" align="center">Sedan - 3 Seats</TableCell>
                <TableCell className="text-base" align="center">Minivan 7 Seats</TableCell>
                <TableCell className="text-base" align="center">Minibus 18 Seats</TableCell>
                <TableCell className="text-base" align="center">Bus 35 Seats</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                pricing.map((pricing, index: number) => (
                  <TableRow key={index}>
                    <TableCell align="center">{pricing.destination}</TableCell>
                    <TableCell align="center">{pricing.sedan_3seat} AMD</TableCell>
                    <TableCell align="center">{pricing.minivan_7seat} AMD</TableCell>
                    <TableCell align="center">{pricing.minibus_18seat} AMD</TableCell>
                    <TableCell align="center">{pricing.bus_35seat} AMD</TableCell>
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
              label='Destination'
              name="destination"
              value={priceInput?.destination}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Destination Ru'
              name="destination_ru"
              value={priceInput?.destination_ru}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Destination Hy'
              name="destination_hy"
              value={priceInput?.destination_hy}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Sedan 3 Seat'
              name="sedan_3seat"
              value={priceInput?.sedan_3seat}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
              type='number'
            />
            <TextField
              label='Minivan 7 Seat'
              name="minivan_7seat"
              value={priceInput?.minivan_7seat}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
              type='number'
            />
            <TextField
              label='Minibus 18 seat'
              name="minibus_18seat"
              value={priceInput?.minibus_18seat}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
              type='number'
            />
            <TextField
              label='Bus 35 seat'
              name="bus_35seat"
              value={priceInput?.bus_35seat}
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
                Create
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateCarPricing;