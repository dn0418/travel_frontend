import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const paxTableColumns = ['2-3 pax', '', '17-30 pax', '30 more'];
const tourTableColumns = ['Start date', 'End date', 'Max in the group', 'Price']

const paxPriceData = [
  {
    pax_2_3: 50000,
    pax_empty: 40000,
    pax_17_30: 20000,
    pax_30_more: 10000,
  }
]

const tourPriceData = [
  {
    startDate: '1 April',
    endDate: '8 April',
    maxMember: '16 pax',
    price: '100 000 AMD',
  },
  {
    startDate: '1 April',
    endDate: '8 April',
    maxMember: '16 pax',
    price: '100 000 AMD',
  },
]


export default function TourPriceTable() {
  return (
    <Container
      className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb]">
      <div className="">
        <p className="text-lg font-semibold">The price per 1 pax</p>
        <p className="text-sm font-semibold">For individual tours, if in the group are:</p>
        <TableContainer className="tour-price-table lg:w-4/5 bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                {
                  paxTableColumns.map((col, i) => (
                    <TableCell key={i} align="center">{col}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                paxPriceData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.pax_2_3}</TableCell>
                    <TableCell align="center">{row.pax_empty}</TableCell>
                    <TableCell align="center">{row.pax_17_30}</TableCell>
                    <TableCell align="center">{row.pax_30_more}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="mt-5">
        <p className="text-base font-semibold">For the tour with guaranteed departure </p>
        <TableContainer className="tour-price-table lg:w-3/5 bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                {
                  tourTableColumns.map((col, i) => (
                    <TableCell key={i} align="center">{col}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                tourPriceData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.startDate}</TableCell>
                    <TableCell align="center">{row.endDate}</TableCell>
                    <TableCell align="center">{row.maxMember}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </Container>
  );
}

