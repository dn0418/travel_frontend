// @flow strict

import { Button, Card, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import TourAdminCard from "../../admin-cards/tour-admin-card";
import SectionTitle from "../../common/section-title";

function ToursDashboard({
  title,
  tours,
  handlePageChange,
  meta,
  handleSearch
}: any) {

  return (
    <Container className='flex flex-col items-center'>
      <div className='w-full my-4 md:my-8'>
        <div className="flex justify-end">
          <Link href='/admin/tours/create'>
            <Button color="secondary" variant="contained">
              Create New Tour
            </Button>
          </Link>
        </div>
        <div className="w-full flex items-center justify-between">
          <SectionTitle title={title} />
          <FormControl size="small" className="shadow-sm" variant="outlined">
            <InputLabel>Search your  Need</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <BiSearch className="text-[#EDA592]" />
                </InputAdornment>
              }
              label="Search your Tours"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
        </div>
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {tours?.map((item: any, i: number) => (
              <Card key={i} className="regular-shadow rounded-lg">
                <TourAdminCard tour={item} />
              </Card>
            ))}
          </div>
          <div className='flex justify-center my-3 md:my-6'>
            {tours?.length > 0 && (
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

export default ToursDashboard;
