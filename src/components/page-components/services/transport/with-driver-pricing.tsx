import { Button, Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CarWithDriverType } from '../../../../types/car-type';

type Props = { carsWithDriver: CarWithDriverType }

export default function CarWithDriverPricingTable({ carsWithDriver }: Props) {
  const { locale } = useRouter();

  return (
    <Container
      className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb] tour-details-page">
      <div className="">
        <p className="text-lg font-medium uppercase">
          {
            locale === 'ru' ? 'Цены на автомобили' :
              (locale === 'hy' ? 'Մեքենայի գնագոյացում' : 'Car Pricing')
          }
        </p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center"></TableCell>
                <TableCell className="text-base" align="center">
                  {
                    locale === 'ru' ? 'продолжительность' :
                      (locale === 'hy' ? 'տեւողությունը' : 'Duration')
                  }
                </TableCell>
                <TableCell className="text-base" align="center">

                  {
                    locale === 'ru' ? 'Цены' :
                      (locale === 'hy' ? 'Գնագոյացում' : 'Pricing')
                  }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                carsWithDriver?.pricing.map((pricing, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index}</TableCell>
                    <TableCell align="center">{pricing.duration}</TableCell>
                    <TableCell align="center">
                      {pricing.price + ' ' + (locale === 'ru' ? 'амд' :
                        (locale === 'hy' ? 'դրամ' : 'AMD'))}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex mt-5 justify-end">
          <Link href="/ride-plan">
            <Button className='bg-black text-white' variant='contained'>
              {
                locale === 'ru' ? 'Послать запрос' :
                  (locale === 'hy' ? 'Հարցում ուղարկել' : 'Send Request')
              }
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}