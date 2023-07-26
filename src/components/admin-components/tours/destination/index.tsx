// @flow strict

import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { TourDestinationType } from "../../../../types/tour";
import CreateDestination from "./create";
import SingleDestination from "./single-destination";

interface PropsType {
  destinations: TourDestinationType[];
  handleDelete: any;
}

function AdminDestination({ destinations, handleDelete }: PropsType) {
  const [openModal, setOpenModal] = useState(false);


  const handleAddModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className='flex justify-center'>
      <div className="w-9/12 my-5 mb-8">
        <div className="flex items-center justify-between">
          <h2>Tour Destinations</h2>
          <Button
            onClick={handleAddModal}
            variant="contained">
            Create Destination
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Country</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                destinations?.length > 0 &&
                destinations.map((destination) => (
                  <SingleDestination
                    key={destination.id}
                    destination={destination}
                    handleDelete={handleDelete}
                  />
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal
        open={openModal}
        onClose={handleAddModal}>
        <CreateDestination
          handleChangeModal={handleAddModal}
        />
      </Modal>
    </div>
  );
};

export default AdminDestination;