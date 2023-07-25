// @flow strict

import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { AccessoryTypes } from "../../../../types/services";
import CreateAccessoryType from "./create";
import SingleAccessoryType from "./single-type";

interface PropsType {
  handleDelete: any;
  accessoriesTypes: AccessoryTypes[];
}

function AdminAccessoryTypes({ handleDelete, accessoriesTypes }: PropsType) {
  const [openModal, setOpenModal] = useState(false);

  const handleAddModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className='flex justify-center'>
      <div className="w-9/12 my-5 mb-8">
        <div className="flex items-center justify-between">
          <h2>Accessory Types</h2>
          <Button
            onClick={handleAddModal}
            variant="contained">
            New Accessory Type
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
                accessoriesTypes?.length > 0 &&
                accessoriesTypes.map((type) => (
                  <SingleAccessoryType
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
        <CreateAccessoryType
          handleChangeModal={handleAddModal}
        />
      </Modal>
    </div>
  );
};

export default AdminAccessoryTypes;