import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../../../context/global-context';
import { CarWithDriverType } from '../../../../types/car-type';
import { localizationData } from '../../../../utils/locales';
import CarModel from '../../../modal/CarModal';

type Props = { carsWithDriver: CarWithDriverType }

export default function CarWithDriverPricingTable({ carsWithDriver }: Props) {
  const { convertCurrency } = useGlobalContext();

  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

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
                    <TableCell align="center">
                      {
                        locale === 'ru' ? pricing.duration_ru :
                          (locale === 'hy' ? pricing.duration_hy : pricing.duration)
                      }
                    </TableCell>
                    <TableCell align="center">
                      {convertCurrency(pricing.price)}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex mt-5 justify-end">
          <CarModel buttonText={localData.send_request} type='Car With Driver' />
        </div>
      </div>
    </Container>
  );
}