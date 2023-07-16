import { Button, Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CarWithDriverType } from '../../../../types/car-type';

type Props = { carsWithDriver: CarWithDriverType }

export default function CarWithDriverPricingTable({ carsWithDriver }: Props) {
  const { t } = useTranslation('common');

  return (
    <Container
      className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb] tour-details-page">
      <div className="">
        <p className="text-lg font-medium uppercase">{t('car_price_title')}</p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center"></TableCell>
                <TableCell className="text-base" align="center">
                  {t('duration_title')}
                </TableCell>
                <TableCell className="text-base" align="center">{t('pricing')}</TableCell>
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
        <div className="flex mt-5 justify-end">
          <Link href="/ride-plan">
            <Button className='bg-black text-white' variant='contained'>
              {t('sent_req_btn')}
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}