import { Button, Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { TourAccessoryType } from '../../../../types';

interface Props {
  accessoryDetails: TourAccessoryType
}

export default function AccessoryPricingTable({ accessoryDetails }: Props) {
  const { pricing } = accessoryDetails;

  return (
    <Container
      className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb]">
      <div className="">
        <p className="text-lg font-medium uppercase">Accessory Pricing</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center"></TableCell>
                <TableCell className="text-base" align="center">Time Duration</TableCell>
                <TableCell className="text-base" align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                pricing.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.duration}</TableCell>
                    <TableCell align="center">{row.price} AMD</TableCell>
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

