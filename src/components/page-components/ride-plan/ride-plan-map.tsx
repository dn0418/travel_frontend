// @flow strict
import { GoogleMap, MarkerF } from "@react-google-maps/api";

function RidePlanMap({ destinationInput }: any) {
  console.log(destinationInput)

  return (
    <div className="p-4 regular-shadow rounded-xl">
      <GoogleMap
        mapContainerStyle={{ borderRadius: "8px", width: "100%", height: "100%" }}
        center={{ lat: 40.19983083120599, lng: 44.47267456326713 }}
        zoom={8}
      >
        {destinationInput.length > 0 &&
          destinationInput.map((item: { lat: number, lng: number }, i: number) => (
            (item.lat && item.lng) &&
            <MarkerF key={i} position={{
              lat: item.lat,
              lng: item.lng
            }} />
          ))
        }
      </GoogleMap>
    </div>
  );
};

export default RidePlanMap;