import { Button, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import { useRouter } from "next/router";
import { HotelDataType } from "../../../../types/services";
import { localizationData } from "../../../../utils/locales";
import HotelModal from "../../../modal/HotelModal";

interface Props {
  hotel: HotelDataType;
}

export default function HotelPricingTable({ hotel }: Props) {
  const { pricingTable } = hotel;
  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
      ? localizationData.hy
      : localizationData.en;

  return (
    <Container className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb]">
      <div className="">
        <p className="text-lg font-medium uppercase">
          {localData.hotel_pricing}
        </p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center"></TableCell>
                <TableCell className="text-base" align="center">
                  01.02-30.03
                </TableCell>
                <TableCell className="text-base" align="center">
                  01.04-30.12
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pricingTable.map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="center">
                    {locale === "ru"
                      ? row.name_ru
                      : locale === "hy"
                      ? row.name_hy
                      : row.name}
                  </TableCell>
                  <TableCell align="center">{row.firstPart}</TableCell>
                  <TableCell align="center">{row.lastPart} AMD</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex mt-5 justify-end">
       
        <HotelModal buttonText=  {localData.send_request} hotel={hotel}/>

         
        </div>
      </div>
    </Container>
  );
}
