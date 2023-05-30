// @flow strict

import { Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination, PaginationItem } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import HotelCard from "../../shared/cards/hotel-card";
import SectionTitle from "../../shared/section-title";
const HotelsFilterSection = dynamic(() => import("./hotels-filter-section"))

const toursData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

function HotelsUI() {
  const [page, setPage] = useState(1);

  return (
    <Container className='my-8 flex flex-col items-center hotels-page'>
      <HotelsFilterSection />
      <div className='my-4 md:my-8'>
        <div className="flex items-center justify-between">
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
            />
          </FormControl>

        </div>
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {toursData.slice((page - 1) * 6, page * 6).map((item, i) => (
              <HotelCard key={i} />
            ))}
          </div>
          <div className='flex justify-center my-3 md:my-6'>
            {toursData.length > 0 && (
              <Pagination
                size='large'
                onChange={(_, p) => setPage(p)}
                count={Math.ceil(toursData.length / 6)}
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