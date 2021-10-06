import React from 'react';
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import './App.css';

function App() {

  return (
    <div className="App">
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={{ lat: 37.42216, lng: -122.08427 }}
          defaultZoom={17}
        >

        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
