// @flow strict

import { Container } from '@mui/material';
import { qualitiesData } from '../../../utils/data/homepage-data';

function Qualities() {
  return (
    <div className='w-screen'>
      <Container className='py-8 md:py-12'>
        <div className='w-full md:w-3/4 mx-auto rounded-lg home-quality-section gap-y-2 grid grid-cols-2 md:grid-cols-4'>
          {qualitiesData.map((quality, index) => (
            <div key={index} className='text-center p-4'>
              <p className='text-4xl text-[#EDA592] my-0'>
                {quality.quantity}
              </p>
              <p>{quality.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Qualities;