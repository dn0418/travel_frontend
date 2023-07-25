// @flow strict

import { Button, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { ThingToSeeType } from "../../../types";
import ThingToDoAdminCard from "../../admin-cards/thing-todo-admin-card";
import SectionTitle from "../../common/section-title";

export interface ThingToDoProps {
  things: ThingToSeeType[];
  handleSearch: any;
  handlePageChange: any;
  metaData: any;
}

function ThingToDoDashboard({
  things,
  handleSearch,
  handlePageChange,
  metaData
}: ThingToDoProps) {

  return (
    <Container className='flex flex-col items-center'>
      <div className='my-4 w-full md:my-8'>
        <div className="flex justify-end">
          <Link href='/admin/thing-todo/create'>
            <Button color="secondary" variant="contained">
              Create New Thing To Do
            </Button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center w-full justify-between">
          <SectionTitle title="Thing Todo" />
          <div className="">
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
        </div>
        <>
          {
            things.length === 0 ?
              <div className="flex justify-center items-center my-5">
                <p className="text-3xl font-medium text-[#000000] py-5">
                  Data not found!
                </p>
              </div>

              :
              <div
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                {things?.map((thing, i) => (
                  <ThingToDoAdminCard thing={thing} key={i} />
                ))}
              </div>
          }
          <div className='flex justify-center my-3 md:my-6'>
            {things.length > 0 && (
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

export default ThingToDoDashboard;