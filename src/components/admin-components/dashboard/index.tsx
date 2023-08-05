// @flow strict
import { Button, ButtonGroup, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import UpdateCurrency from "./update-rate";

interface PropsType {
  findRate: (currency: string) => number;
}

function DashboardUI({ findRate }: PropsType) {
  const [updateModal, setUpdateModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  return (
    <div>
      <h1 className="text-center">Welcome to Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <TableContainer component={Paper}>
          <h2 className="px-3 text-left">Currency Rates</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Currency</TableCell>
                <TableCell align="center">Base Rate</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">AMD</TableCell>
                <TableCell align="center">{findRate('amd')}</TableCell>
                <TableCell align="right">
                  <ButtonGroup color="secondary" variant="outlined">
                    <Button disabled>
                      <BiEdit size={18} />
                      <span className="ps-1">Update</span>
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">USD</TableCell>
                <TableCell align="center">{findRate('usd')}</TableCell>
                <TableCell align="right">
                  <ButtonGroup color="secondary" variant="outlined">
                    <Button
                      onClick={() => {
                        setSelected({
                          currency: 'USD',
                          code: 'usd',
                          rate: findRate('usd'),
                        })
                        setUpdateModal(true);
                      }}
                    >
                      <BiEdit size={18} />
                      <span className="ps-1">Update</span>
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">Ruble</TableCell>
                <TableCell align="center">{findRate('ruble')}</TableCell>
                <TableCell align="right">
                  <ButtonGroup color="secondary" variant="outlined">
                    <Button onClick={() => {
                      setSelected({
                        currency: 'Ruble',
                        code: 'ruble',
                        rate: findRate('ruble'),
                      })
                      setUpdateModal(true);
                    }}
                    >
                      <BiEdit size={18} />
                      <span className="ps-1">Update</span>
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={updateModal && selected !== null}
          onClose={() => setUpdateModal(false)}
        >
          <UpdateCurrency
            selected={selected}
            handleCancelModal={() => setUpdateModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default DashboardUI;