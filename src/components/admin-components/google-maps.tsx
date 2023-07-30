import { GoogleMap, MarkerF } from '@react-google-maps/api';
import React from 'react';

interface PropsType {
  setState: any;
  state: any;
}

const AdminGoogleMap: React.FC<PropsType> = ({ state, setState }) => {

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (lat && lng) {
      setState((prevState: any) => {
        const temp = JSON.parse(JSON.stringify(prevState));
        temp.lat = lat;
        temp.lng = lng;
        return temp;
      })
    }
  };

  return (
    <div className='w-full' >
      <p className="text-lg font-medium">Select Location</p>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{
          lat: state?.lat || 40.19983083120599,
          lng: state?.lng || 44.47267456326713,
        }}
        zoom={12}
        onClick={handleMapClick}
      >
        {
          state?.lat && state?.lng &&
          <MarkerF
            position={{
              lat: state?.lat,
              lng: state?.lng,
            }}
          >
          </MarkerF>
        }
      </GoogleMap>
    </div>
  );
};

export default AdminGoogleMap;
