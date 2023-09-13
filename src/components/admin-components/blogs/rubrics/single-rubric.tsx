// @flow strict

import { Button, ButtonGroup, Modal, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { RubricType } from "../../../../types/armenia";
import UpdateHotelType from "./update";

interface PropsType {
  rubric: RubricType;
  handleDelete: any;
}

function SingleRubric({ rubric, handleDelete }: PropsType) {
  const [updateModal, setUpdateModal] = useState(false);

  const handleChangeModal = () => {
    setUpdateModal(!updateModal);
  };

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="left">{rubric.name}</TableCell>
        <TableCell align="left">{rubric.name_ru}</TableCell>
        <TableCell align="left">{rubric.name_hy}</TableCell>
        <TableCell align="center">
          <ButtonGroup color="secondary" variant="outlined">
            <Button onClick={handleChangeModal}>
              <FiEdit size={18} />
            </Button>
            <Button onClick={() => handleDelete(rubric.id)}>
              <FiTrash2 size={18} />
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <Modal
        open={updateModal}
        onClose={handleChangeModal}>
        <UpdateHotelType
          rubric={rubric}
          handleChangeModal={handleChangeModal}
        />
      </Modal>
    </>
  );
};

export default SingleRubric;