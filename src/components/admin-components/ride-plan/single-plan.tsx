// @flow strict

import { Button, ButtonGroup, Modal, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { RidePlanType } from "../../../types";
import ViewRidePlan from "./view-plan";

interface PropsType {
  ridePlan: RidePlanType;
  handleDelete: any;
}

function SingleRidePlan({ ridePlan, handleDelete }: PropsType) {
  const [openModal, setOpenModal] = useState(false);

  const handleViewModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="left">{ridePlan.name}</TableCell>
        <TableCell align="left">{ridePlan.email}</TableCell>
        <TableCell align="left">{ridePlan.phone}</TableCell>
        <TableCell align="left">{ridePlan.date}</TableCell>
        <TableCell align="right">
          <ButtonGroup color="secondary" variant="outlined">
            <Button onClick={handleViewModal}>
              <AiFillEye size={18} />
            </Button>
            <Button onClick={() => handleDelete(ridePlan.id)}>
              <FiTrash2 size={18} />
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <Modal
        open={openModal}
        onClose={handleViewModal}>
        <ViewRidePlan
          ridePlan={ridePlan}
          handleChangeModal={handleViewModal}
        />
      </Modal>
    </>
  );
};

export default SingleRidePlan;