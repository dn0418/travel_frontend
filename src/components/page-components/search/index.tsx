// @flow strict

import { Card, Container, Pagination, PaginationItem } from "@mui/material";
import { useRouter } from "next/router";
import { SearchPageProps } from "../../../types/page-props";
import { localizationData } from "../../../utils/locales";
import TourCard from "../../cards/tour-card";
import SearchFilterSection from "./filter-section";

function SearchPage({
  tours: toursData,
  handlePageChange,
  meta,
  handleSearch,
  destinations,
  typeItems
}: SearchPageProps) {
  const { locale } = useRouter();

  const localData = locale === "ru" ? localizationData.ru :
    (locale === 'hy' ? localizationData.hy : localizationData.en);

  // console.log(meta)

  return (
    <Container className='my-8 flex flex-col items-center'>
      <div className='w-full my-4 md:my-8'>
        <div className="">
          <SearchFilterSection typeItems={typeItems} destinations={destinations} />
        </div>
        {/* <div className="w-full flex items-center justify-between">
          <SectionTitle title={localData.top_suggested_title} />
          <FormControl size="small" className="shadow-sm" variant="outlined">
            <InputLabel>{localData.search_your_need}</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <BiSearch className="text-[#EDA592]" />
                </InputAdornment>
              }
              label={localData.search_your_need}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
        </div> */}
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8 md:gap-6'>
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
                          {localData.next_text}
                        </span>
                      ),
                      previous: (props) => (
                        <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                          {localData.prev_text}
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
