// @flow strict

import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { HotelTypes } from "../../../../types/services";
import CreateHotelType from "./create";
import SingleHotelType from "./single-destination";

interface PropsType {
  types: HotelTypes[];
  handleDelete: any;
}

function AdminHotelTypes({ types, handleDelete }: PropsType) {
  const [openModal, setOpenModal] = useState(false);

  const handleAddModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className='flex justify-center'>
      <div className="w-9/12 my-5 mb-8">
        <div className="flex items-center justify-between">
          <h2>Hotel Types</h2>
          <Button
            onClick={handleAddModal}
            variant="contained">
            New Hotel Type
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Name(Ru)</TableCell>
                <TableCell align="left">Name(Hy)</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                types?.length > 0 &&
                types.map((type) => (
                  <SingleHotelType
                    key={type.id}
                    type={type}
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
        <CreateHotelType
          handleChangeModal={handleAddModal}
        />
      </Modal>
    </div>
  );
};

export default AdminHotelTypes;