import React, { FC, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import './App.css';
import { clear } from 'console';

interface PinPoint {
  lat: number;
  lng: number;
  text?: string;
}

const LocationPin: FC<PinPoint> = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

function App() {
  const [getCoord, setCoord] = useState<PinPoint>({ lat: 37.42216, lng: -122.08427 });

  //
  let timer: NodeJS.Timeout;

  const searchAfterTime = () => {
    timer = setTimeout(() => {
      console.log(timer)
    }, 3000);
    return () => clearTimeout(timer)
  };

  const clearSearchAfterTime = () => {
    clearTimeout(timer)
  }

  useEffect(() => {
    console.log(getCoord);
  }, [getCoord]);

  return (
    <div className="App">
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={{ lat: 37.42216, lng: -122.08427 }}
          defaultZoom={17}
          onDragEnd={(map) => {
            setCoord({
              lat: parseFloat(map.center.lat().toFixed(5)),
              lng: parseFloat(map.center.lng().toFixed(5))
            });

            clearSearchAfterTime();
            searchAfterTime();

          }}

        >
          <LocationPin
            lat={37.42216}
            lng={-122.08427}
            text={"THIS ROLLING WALTS OF LIFE"}
          />
          <LocationPin
            lat={37.4}
            lng={-122.1}
            text={"TTTTTTTTTTT TTTTTTTTTTTT"}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
