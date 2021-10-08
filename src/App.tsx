import React, { FC } from 'react';
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import './App.css';

interface PinText {
  lat: number;
  lng: number;
  text: string;
}

const LocationPin: FC<PinText> = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

function App() {

  return (
    <div className="App">
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={{ lat: 37.42216, lng: -122.08427 }}
          defaultZoom={17}
        >
          <LocationPin
            lat={37.42216}
            lng={-122.08427}
            text={"THIS ROLLING WALTS OF LIFE NEVER SEEMS TO TIRE THE RESTLESS SOUL"}
          />
          <LocationPin
            lat={37.4}
            lng={-122.1}
            text={"TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
