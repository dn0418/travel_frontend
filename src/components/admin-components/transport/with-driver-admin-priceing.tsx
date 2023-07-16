import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CarWithDriverType } from '../../../types/car-type';

export default function WithDriverAdminPricing(
  { carsWithDriver }: { carsWithDriver: CarWithDriverType }) {

  return (
    <Container
      className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb] tour-details-page">
      <div className="">
        <p className="text-lg font-medium uppercase">Car Pricing</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center"></TableCell>
                <TableCell className="text-base" align="center">Duration</TableCell>
                <TableCell className="text-base" align="center">Pricing</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                carsWithDriver?.pricing.map((pricing, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index}</TableCell>
                    <TableCell align="center">{pricing.duration}</TableCell>
                    <TableCell align="center">{pricing.price} AMD</TableCell>
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