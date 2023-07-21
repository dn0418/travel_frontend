// @flow strict

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { PriceWithoutDriverType } from '../../../types/car-type';

function CreateCarPricing({ pricing }: { pricing: PriceWithoutDriverType[] }) {

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
          <Button className='bg-black text-white' variant='contained'>
            Add New Price
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCarPricing;