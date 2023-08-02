import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import { CarWithOutType } from '../../../../types/car-type';
import { localizationData } from '../../../../utils/locales';
import CarModel from '../../../modal/CarModal';

interface Props {
  car: CarWithOutType
}

export default function CarPricingTable({ car }: Props) {
  const { priceWithoutDriver } = car;
  const { locale } = useRouter();
  const localData = locale === "ru" ? localizationData.ru :
    (locale === 'hy' ? localizationData.hy : localizationData.en);


  return (
    <Container
      className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb]">
      <div className="">
        <p className="text-lg font-medium uppercase">
          {localData.transportData.pricing_title}
        </p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center"></TableCell>
                <TableCell className="text-base" align="center">
                  {localData.transportData.sedan_text}
                </TableCell>
                <TableCell className="text-base" align="center">
                  {localData.transportData.minivan_text}
                </TableCell>
                <TableCell className="text-base" align="center">
                  {localData.transportData.minibus_text}
                </TableCell>
                <TableCell className="text-base" align="center">
                  {localData.transportData.bus_text}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                priceWithoutDriver.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">
                      {
                        locale === 'ru' ? row.destination_ru :
                          (locale === 'hy' ? row.destination_hy : row.destination)
                      }
                    </TableCell>
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
          <CarModel buttonText={localData.send_request} type='Car Without Driver' />
        </div>
      </div>
    </Container>
  );
}