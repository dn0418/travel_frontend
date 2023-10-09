import { Button, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import { useRouter } from "next/router";
import { TourType } from "../../../../types/tour";
import { localizationData } from "../../../../utils/locales";
import { useGlobalContext } from "../../../../context/global-context";
import TourModal from "../../../modal/TourModal";

const individualColumnsData = {
  en: ["2-3 pax", "4-6 pax", "7-18 pax", "20 or more"],
  ru: ["2-3 чел.", "4-6 чел.", "7-18 чел.", "20 или больше чел."],
  hy: ["2-3 անձ", "4-6 անձ", "7-18 անձ", "20 և ավել անձ"],
};

const departureColumnsData = {
  en: ["Start date", "End date", "Max in the group", "Price"],
  ru: [
    "Дата начала",
    "Дата окончания",
    "Максимальное кол-во участников",
    "Цена",
  ],
  hy: ["Սկզբնա ամսաթիվ", "Ավարտնամսաթիվ", "Խումբի մաքսիմալ քանակ", "Գին"],
};

export default function TourPriceTable({ tour }: { tour: TourType }) {
  const { individualPricing, departuresPricing } = tour;
  const { convertCurrency } = useGlobalContext();
  const { locale } = useRouter();
  const individualColumns =
    locale === "ru"
      ? individualColumnsData.ru
      : locale === "hy"
      ? individualColumnsData.hy
      : individualColumnsData.en;
  const departureColumns =
    locale === "ru"
      ? departureColumnsData.ru
      : locale === "hy"
      ? departureColumnsData.hy
      : departureColumnsData.en;

  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
      ? localizationData.hy
      : localizationData.en;

  return (
    <Container className="bg-[#f7f7f7] px-3 md:px-6 py-3 md:py-8 border-2 border-solid border-[#dbdbdb]">
      <div className="">
        <p className="text-lg font-semibold">{localData.price_per_pax_title}</p>
        <p className="text-base font-semibold">
          {localData.individual_tour_title}
        </p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                {individualColumns.map((col, i) => (
                  <TableCell key={i} align="center">
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {individualPricing.map((row, i) => (
                <TableRow key={i}>
                  {/* <TableCell align="center">{row.pax2_3}</TableCell> */}
                  <TableCell align="center">{convertCurrency(row.pax2_3)}</TableCell>
                  <TableCell align="center">{convertCurrency(row.pax4_6)}</TableCell>
                  <TableCell align="center">{convertCurrency(row.pax7_18)}</TableCell>
                  <TableCell align="center">{convertCurrency(row.pax20_more)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="mt-5">
        <p className="text-base font-semibold">
          {localData.departure_tour_title}
        </p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                {departureColumns.map((col, i) => (
                  <TableCell key={i} align="center">
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {departuresPricing.map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{row.startDate}</TableCell>
                  <TableCell align="center">{row.endDate}</TableCell>
                  <TableCell align="center">{row.maxPerson}</TableCell>
                  <TableCell align="center">{convertCurrency(row.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex mt-5 justify-end">
          <TourModal buttonText={localData.send_request} tour={tour} />
        </div>
      </div>
    </Container>
  );
}
