// @flow strict

import { Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination, PaginationItem } from "@mui/material";
import dynamic from "next/dynamic";
import { BiSearch } from "react-icons/bi";
import { HotelType } from "../../../types";
import HotelCard from "../../cards/hotel-card";
import SectionTitle from "../../common/section-title";
const HotelsFilterSection = dynamic(() => import("./hotels-filter-section"))

interface PropsType {
  hotels: HotelType[];
  filterInput: {
    country: string;
    city: string;
    type: string;
  },
  handleChangeFilterData: any;
  handlePageChange: any;
  cities: {
    name: string;
    value: string;
  }[];
  handleClickSearch: () => void;
  handleSerachHotels: (name: string) => void;
  metadata: {
    totalPages: number;
  };
  hotelTypes: {
    id: number;
    name: string;
  }[]
}

function HotelsUI({
  hotels,
  filterInput,
  handleChangeFilterData,
  cities,
  handleClickSearch,
  handleSerachHotels,
  metadata,
  handlePageChange,
  hotelTypes
}: PropsType) {

  return (
    <Container className='my-8 flex flex-col items-center hotels-page'>
      <HotelsFilterSection
        filterInput={filterInput}
        cities={cities}
        handleChangeFilterData={handleChangeFilterData}
        handleClickSearch={handleClickSearch}
        hotelTypes={hotelTypes}
      />
      <div className='my-4 w-full md:my-8'>
        <div className="flex w-full items-center justify-between">
          <SectionTitle title='Special Hotel' />
          <FormControl size="small" className="shadow-sm" variant="outlined">
            <InputLabel>Search your  Need</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <BiSearch className="text-[#EDA592]" />
                </InputAdornment>
              }
              label="Search your Tours"
              onChange={(e) => handleSerachHotels(e.target.value)}
            />
          </FormControl>

        </div>
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {hotels.map((hotel: HotelType, i) => (
              <HotelCard hotel={hotel} key={i} />
            ))}
          </div>
          <div className='flex justify-center my-3 md:my-6'>
            {hotels.length > 0 && (
              <Pagination
                size='large'
                onChange={handlePageChange}
                count={metadata.totalPages}
                shape='rounded'
                renderItem={(item) => (
                  <PaginationItem
                    sx={{ color: "#EDA592", bgcolor: "#ffffff" }}
                    className='pagination'
                    components={{
                      next: (props) => (
                        <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                          Next
                        </span>
                      ),
                      previous: (props) => (
                        <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                          Prev
                        </span>
                      ),
                    }}
                    {...item}
                  />
                )}
                variant='outlined'
              />
            )}
          </div>
        </>
      </div>
    </Container>
  );
};

export default HotelsUI;