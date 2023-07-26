// @flow strict

import { Button, ButtonGroup, Modal, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { TourDestinationType } from "../../../../types/tour";
import UpdateDestination from "./update";
import ViewDestination from "./view";

interface PropsType {
  destination: TourDestinationType;
  handleDelete: any;
}

function SingleDestination({ destination, handleDelete }: PropsType) {
  const [updateModal, setUpdateModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChangeModal = () => {
    setUpdateModal(!updateModal);
  };

  const handleViewModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="left">{destination.name}</TableCell>
        <TableCell align="left">{destination.country}</TableCell>
        <TableCell align="right">
          <ButtonGroup color="secondary" variant="outlined">
            <Button onClick={handleViewModal}>
              <AiFillEye size={18} />
            </Button>
            <Button onClick={handleChangeModal}>
              <FiEdit size={18} />
            </Button>
            <Button onClick={() => handleDelete(destination.id)}>
              <FiTrash2 size={18} />
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <Modal
        open={updateModal}
        onClose={handleChangeModal}>
        <UpdateDestination
          destination={destination}
          handleChangeModal={handleChangeModal}
        />
      </Modal>
      <Modal
        open={openModal}
        onClose={handleViewModal}>
        <ViewDestination
          destination={destination}
          handleChangeModal={handleViewModal}
        />
      </Modal>
    </>
  );
};

export default SingleDestination;