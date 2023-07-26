// @flow strict

import { Pagination, PaginationItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { RidePlanType } from "../../../types";
import SingleRidePlan from "./single-plan";


interface PropsType {
  ridePlans: RidePlanType[];
  handleDelete: any;
  handlePageChange: any;
}

function AdminRidePlan({ ridePlans, handleDelete, handlePageChange }: PropsType) {

  return (
    <div className='flex justify-center'>
      <div className="w-9/12 my-5 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">User Ride Plan Request</h2>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                ridePlans?.length > 0 &&
                ridePlans.map((ridePlan) => (
                  <SingleRidePlan
                    key={ridePlan.id}
                    ridePlan={ridePlan}
                    handleDelete={handleDelete}
                  />
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div className='flex justify-center my-3 md:my-6'>
          {ridePlans.length > 0 && (
            <Pagination
              size='large'
              onChange={handlePageChange}
              count={Math.ceil(ridePlans.length / 20)}
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
      </div>
    </div>
  );
};

export default AdminRidePlan;