// @flow strict

import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { qualitiesData } from '../../../utils/data/homepage-data';

function Qualities() {
  const [qualities, setQualities] = useState(qualitiesData.en)
  const { locale } = useRouter();

  useEffect(() => {
    if (locale && locale === 'ru') {
      setQualities(qualitiesData.ru);
    } else if (locale && locale === 'hy') {
      setQualities(qualitiesData.hy);
    } else {
      setQualities(qualitiesData.en);
    }
  }, [locale]);

  return (
    <div className='w-screen'>
      <Container className='py-8 md:py-12'>
        <div className='w-full md:w-3/4 mx-auto rounded-lg home-quality-section gap-y-2 grid grid-cols-2 md:grid-cols-4'>
          {qualities.map((quality, index) => (
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