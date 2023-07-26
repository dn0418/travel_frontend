// @flow strict

import { Button, ButtonGroup, Modal, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { CallbackType } from "../../../types";
import { countries } from "../../../utils/data/countries";
import ViewCallBack from "./view-callback";

interface PropsType {
  callback: CallbackType;
  handleDelete: any;
}

function SingleCallBack({ callback, handleDelete }: PropsType) {
  const [openModal, setOpenModal] = useState(false);

  const getCountry = (code: string) => {
    const find = countries.find(country => country.code === code);
    return find ? find.name : '';
  }

  const handleViewModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="left">{callback.firstName + ' ' + callback.lastName}</TableCell>
        <TableCell align="left">{callback.email}</TableCell>
        <TableCell align="left">{getCountry(callback.country)}</TableCell>
        <TableCell align="left">{callback.phone}</TableCell>
        <TableCell align="right">
          <ButtonGroup color="secondary" variant="outlined">
            <Button onClick={handleViewModal}>
              <AiFillEye size={18} />
            </Button>
            <Button onClick={() => handleDelete(callback.id)}>
              <FiTrash2 size={18} />
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <Modal
        open={openModal}
        onClose={handleViewModal}>
        <ViewCallBack
          callback={callback}
          handleChangeModal={handleViewModal}
        />
      </Modal>
    </>
  );
};

export default SingleCallBack;