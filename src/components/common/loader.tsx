// @flow strict

import { CircularProgress } from '@mui/material';

function Loader() {
  return (
    <div className='w-screen h-[90vh] flex justify-center items-center'>
      <CircularProgress />
    </div>
  );
};

export default Loader;