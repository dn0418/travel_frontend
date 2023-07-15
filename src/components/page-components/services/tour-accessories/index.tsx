// @flow strict

import { Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination, PaginationItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BiSearch } from "react-icons/bi";
import { AccessoriesPageProps } from "../../../../types/page-props";
import AccessoriesCard from "../../../cards/accessories-card";
import SectionTitle from "../../../common/section-title";

function TourAccessoriesUI({
  accessories,
  handleSearch,
  handlePageChange,
  metaData
}: AccessoriesPageProps) {
  const { t } = useTranslation('common');

  return (
    <Container className='my-8 flex flex-col items-center'>
      <div className='my-4 w-full md:my-8'>
        <div className="flex items-center w-full justify-between">
          <SectionTitle title='Tour Accessories' />
          <div className="">
            <FormControl size="small" className="shadow-sm" variant="outlined">
              <InputLabel>{t('search_text')}</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <BiSearch className="text-[#EDA592]" />
                  </InputAdornment>
                }
                label={t('search_text')}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
          </div>
        </div>
        <>
          {
            accessories.length === 0 ?
              <div className="flex justify-center items-center my-5">
                <p className="text-3xl font-medium text-[#000000] py-5">
                  {t('not_found_text')}
                </p>
              </div>
              :
              <div
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                {accessories?.map((accessory, i) => (
                  <AccessoriesCard accessory={accessory} key={i} />
                ))}
              </div>
          }
          <div className='flex justify-center my-3 md:my-6'>
            {accessories.length > 0 && (
              <Pagination
                size='large'
                onChange={handlePageChange}
                count={metaData?.totalPages}
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

export default TourAccessoriesUI;