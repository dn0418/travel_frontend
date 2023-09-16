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
import { DeparturesPricing } from '../../../../types/tour';

interface PropsType {
  pricing: DeparturesPricing[],
  setPricing: any,
}

function CreateDeparturesPricing({ pricing, setPricing }: PropsType) {
  const [openModal, setOpenModal] = useState(false);
  const [priceInput, setPriceInput] = useState({
    startDate: '',
    endDate: '',
    maxPerson: '',
    price: '',
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
    if (!priceInput.startDate || !priceInput.endDate || !priceInput.maxPerson || !priceInput.price) {
      toast.error("All fields are required!");
      return;
    }

    setPricing((previewData: any) => {
      const temp = JSON.parse(JSON.stringify(previewData));
      temp.push({
        ...priceInput,
        maxPerson: parseInt(priceInput.maxPerson),
        price: parseInt(priceInput.price),
      });
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
        <p className="text-lg font-medium uppercase">Departures Pricing Table</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="Departures Pricing Tabl">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center">Start Date</TableCell>
                <TableCell className="text-base" align="center">End Date</TableCell>
                <TableCell className="text-base" align="center">Max Person</TableCell>
                <TableCell className="text-base" align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                pricing.map((pricing, index: number) => (
                  <TableRow key={index}>
                    <TableCell align="center">{pricing.startDate}</TableCell>
                    <TableCell align="center">{pricing.endDate} </TableCell>
                    <TableCell align="center">{pricing.maxPerson} </TableCell>
                    <TableCell align="center">{pricing.price} </TableCell>
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
    </div>
  );
}

export default CreateDeparturesPricing;