// @flow strict

import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { RubricType } from "../../../../types/armenia";
import CreateRubric from "./create";
import SingleRubric from "./single-rubric";

interface PropsType {
  rubrics: RubricType[];
  handleDelete: any;
}

function AdminRubrics({ rubrics, handleDelete }: PropsType) {
  const [openModal, setOpenModal] = useState(false);

  const handleAddModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className='flex justify-center'>
      <div className="w-9/12 my-5 mb-8">
        <div className="flex items-center justify-between">
          <h2>Rubrics</h2>
          <Button
            onClick={handleAddModal}
            variant="contained">
            New Rubric
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
                rubrics?.length > 0 &&
                rubrics.map((rubric) => (
                  <SingleRubric
                    key={rubric.id}
                    rubric={rubric}
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
        <CreateRubric
          handleChangeModal={handleAddModal}
        />
      </Modal>
    </div>
  );
};

export default AdminRubrics;