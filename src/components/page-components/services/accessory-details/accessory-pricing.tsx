import { Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import { TourAccessoryType } from "../../../../types/services";
import { localizationData } from "../../../../utils/locales";
import TourAccessoriesModal from "../../../modal/TourAccessoriesModal";
import { useGlobalContext } from "../../../../context/global-context";

interface Props {
  accessoryDetails: TourAccessoryType;
}

export default function AccessoryPricingTable({ accessoryDetails }: Props) {
  const { pricing } = accessoryDetails;
  const { convertCurrency } = useGlobalContext();
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
          {localData.accessory_pricing_text}
        </p>
        <TableContainer className="tour-price-table bg-white">
          <Table aria-label="tour pricing table">
            <TableHead>
              <TableRow>
                <TableCell className="text-base" align="center"></TableCell>
                <TableCell className="text-base" align="center">
                  {localData.time_duration_text}
                </TableCell>
                <TableCell className="text-base" align="center">
                  {localData.price_text}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pricing.map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.duration}</TableCell>
                  <TableCell align="center">{convertCurrency(row.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex mt-5 justify-end">
          <TourAccessoriesModal buttonText={localData.send_request} />
        </div>
      </div>
    </Container>
  );
}
