import { Button, Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { CarWithOutType } from '../../../../types/car-type';

interface Props {
  car: CarWithOutType
}

export default function CarPricingTable({ car }: Props) {
  const { priceWithoutDriver } = car;

  return (
    <Container
      className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb]">
      <div className="">
        <p className="text-lg font-medium uppercase">Car Pricing</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center"></TableCell>
                <TableCell className="text-base" align="center">Sedan - 3 Seats</TableCell>
                <TableCell className="text-base" align="center">Minivan 7 Seats</TableCell>
                <TableCell className="text-base" align="center">Minibus 18 Seats</TableCell>
                <TableCell className="text-base" align="center">Bus 35 Seats</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                priceWithoutDriver.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.destination}</TableCell>
                    <TableCell align="center">{row.sedan_3seat}</TableCell>
                    <TableCell align="center">{row.minivan_7seat}</TableCell>
                    <TableCell align="center">{row.minibus_18seat}</TableCell>
                    <TableCell align="center">{row.bus_35seat}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex mt-5 justify-end">
          <Link href="/ride-plan">
            <Button className="bg-black text-white" variant='contained'>
              Send Request
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}