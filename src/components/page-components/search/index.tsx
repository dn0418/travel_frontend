// @flow strict

import { Card, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination, PaginationItem } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { SearchPageProps } from "../../../types/page-props";
import TourCard from "../../cards/tour-card";
import SectionTitle from "../../common/section-title";
import SearchFilterSection from "./filter-section";

function SearchPage({
  tours: toursData,
  handlePageChange,
  meta,
  handleSearch,
  destinations,
  typeItems
}: SearchPageProps) {

  // console.log(meta)

  return (
    <Container className='my-8 flex flex-col items-center'>
      <div className='w-full my-4 md:my-8'>
        <div className="">
          <SearchFilterSection typeItems={typeItems} destinations={destinations} />
        </div>
        <div className="w-full flex items-center justify-between">
          <SectionTitle title="Top Suggestion for you" />
          <FormControl size="small" className="shadow-sm" variant="outlined">
            <InputLabel>Search your Need</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <BiSearch className="text-[#EDA592]" />
                </InputAdornment>
              }
              label='Search your Need'
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
        </div>
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {toursData?.map((item: any, i: number) => (
              <Card key={i} className="regular-shadow rounded-lg">
                <TourCard tour={item} />
              </Card>
            ))}
          </div>
          <div className='flex justify-center my-3 md:my-6'>
            {toursData?.length > 0 && (
              <Pagination
                size='large'
                onChange={handlePageChange}
                count={meta?.totalPages}
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
}

export default SearchPage;
