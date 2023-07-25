// @flow strict

import { Button, ButtonGroup, Modal, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AccessoryTypes } from "../../../../types/services";
import UpdateAccessoryType from "./update";

interface PropsType {
  type: AccessoryTypes;
  handleDelete: any;
}

function SingleAccessoryType({ type, handleDelete }: PropsType) {
  const [updateModal, setUpdateModal] = useState(false);

  const handleChangeModal = () => {
    setUpdateModal(!updateModal);
  };

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="left">{type.name}</TableCell>
        <TableCell align="left">{type.name_ru}</TableCell>
        <TableCell align="left">{type.name_hy}</TableCell>
        <TableCell align="center">
          <ButtonGroup color="secondary" variant="outlined">
            <Button onClick={handleChangeModal}>
              <FiEdit size={18} />
            </Button>
            <Button onClick={() => handleDelete(type.id)}>
              <FiTrash2 size={18} />
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <Modal
        open={updateModal}
        onClose={handleChangeModal}>
        <UpdateAccessoryType
          type={type}
          handleChangeModal={handleChangeModal}
        />
      </Modal>
    </>
  );
};

export default SingleAccessoryType;