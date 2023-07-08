// @flow strict

import { Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination, PaginationItem, Tab, Tabs } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { FoodAndDrinkPageProps } from "../../../../types/page-props";
import FoodAndDrinkCard from "../../../cards/food-and-drink-card";
import SectionTitle from "../../../common/section-title";

function FoodAndDrinksUI({
  handleTabChange,
  currentTab,
  tabs,
  foodAndDrinks,
  handleSearch,
  handlePageChange,
  metaData
}: FoodAndDrinkPageProps) {

  return (
    <Container className='my-8 flex flex-col items-center'>
      <div className='py-3 px-6 regular-shadow rounded-lg'>
        <Tabs
          value={currentTab?.value || ''}
          onChange={handleTabChange}
          className='armenia-tabs gap-5'
          TabIndicatorProps={{
            style: { display: "none" },
          }}>
          {
            tabs.map((tab, i) => (
              <Tab
                key={i}
                value={tab.value}
                className=""
                label={
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-xl lg:text-2xl text-[#6F7531]">
                      {tab.icon}
                    </span>
                    <span>{tab.title}</span>
                  </div>
                }
              />
            ))
          }
        </Tabs>
      </div>

      <div className='my-4 w-full md:my-8'>
        <div className="flex flex-col md:flex-row items-center w-full justify-between">
          <SectionTitle title={currentTab?.title || "Food And Drinks"} />
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
            foodAndDrinks.length === 0 ?
              <div className="flex justify-center items-center my-5">
                <p className="text-3xl font-medium text-[#000000] py-5">
                  Data not found!
                </p>
              </div>

              :
              <div
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                {foodAndDrinks?.map((foodDrink, i) => (
                  <FoodAndDrinkCard foodDrink={foodDrink} key={i} />
                ))}
              </div>
          }
          <div className='flex justify-center my-3 md:my-6'>
            {foodAndDrinks.length > 0 && (
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

export default FoodAndDrinksUI;