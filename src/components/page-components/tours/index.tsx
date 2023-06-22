// @flow strict

import { Card, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination, PaginationItem, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ToursPageProps } from "../../../types/page-props";
import TourCard from "../../cards/tour-card";
import SectionTitle from "../../common/section-title";

const toursData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

function ToursPage({
  handleTabChange,
  tabIndex,
  tabs,
  title,
  tours
}: ToursPageProps) {
  const [page, setPage] = useState(1);

  return (
    <Container className='my-8 flex flex-col items-center'>
      <div className='w-full  text-center py-3 px-6 regular-shadow rounded-lg'>
        <Tabs
          value={parseInt(tabIndex)}
          onChange={handleTabChange}
          className='pages-tabs'
          TabIndicatorProps={{
            style: { display: "none" },
          }}>
          {
            tabs.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                className=""
                label={tab.name} />
            ))
          }
        </Tabs>
      </div>
      <div className='w-full my-4 md:my-8'>
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
            />
          </FormControl>
        </div>
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {tours?.tours.map((item, i) => (
              <Card key={i} className="regular-shadow rounded-lg">
                <TourCard tour={item} />
              </Card>
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
}

export default ToursPage;
