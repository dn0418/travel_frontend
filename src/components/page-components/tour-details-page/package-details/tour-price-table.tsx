import { Button, Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { TourType } from '../../../../types/tour';

const individualColumns = ['2-3 pax', '4-6 pax', '7-18 pax', '20 more'];
const departureColumns = ['Start date', 'End date', 'Max in the group', 'Price']


export default function TourPriceTable({ tour }: { tour: TourType }) {
  const { individualPricing, departuresPricing } = tour;

  return (
    <Container
      className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb]">
      <div className="">
        <p className="text-lg font-semibold">The price per 1 pax</p>
        <p className="text-sm font-semibold">For individual tours, if in the group are:</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                {
                  individualColumns.map((col, i) => (
                    <TableCell key={i} align="center">{col}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                individualPricing.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.pax2_3}</TableCell>
                    <TableCell align="center">{row.pax4_6}</TableCell>
                    <TableCell align="center">{row.pax7_18}</TableCell>
                    <TableCell align="center">{row.pax20_more}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="mt-5">
        <p className="text-base font-semibold">For the tour with guaranteed departure </p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                {
                  departureColumns.map((col, i) => (
                    <TableCell key={i} align="center">{col}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                departuresPricing.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.startDate}</TableCell>
                    <TableCell align="center">{row.endDate}</TableCell>
                    <TableCell align="center">{row.maxPerson}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex mt-5 justify-end">
          <Link href="/ride-plan">
            <Button variant='contained'>
              Send Request
            </Button>
          </Link>
        </div>
      </div>

    </Container>
  );
}

