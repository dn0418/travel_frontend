// @flow strict

import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import { AiFillEye } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { staticPages } from '../../../utils/data/static-pages';

function StaticPage() {

  return (
    <>
      <TableContainer component={Paper}>
        <h2 className="px-3 text-left uppercase">Static Pages</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Page</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              staticPages.map((page, index) =>
              (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  key={index}
                >
                  <TableCell align="left">{page.title}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup className='gap-2' color="secondary" variant="outlined">
                      <Link href={page.link}>
                        <Button>
                          <AiFillEye size={18} />
                          <span className="ps-1">View</span>
                        </Button>
                      </Link>
                      <Link href={`/admin/update-page/${page.code}`}>
                        <Button>
                          <BiEdit size={18} />
                          <span className="ps-1">Update</span>
                        </Button>
                      </Link>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StaticPage;