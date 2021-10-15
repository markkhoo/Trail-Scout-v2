import React, { FC, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import './App.css';

type PinPoint = {
  lat: number;
  lng: number;
  text?: string;
}

type TrailData = {
  city?: string;
  country?: string;
  description?: string;
  directions?: string;
  features?: string;
  id: number;
  lat: string;
  length?: string;
  lon: string;
  name: string;
  rating?: number;
  region?: string;
  thumbnail?: string;
  url?: string
}

const LocationPin: FC<PinPoint> = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

function App() {
  const [getCoord, setCoord] = useState<PinPoint>({ lat: 37.42216, lng: -122.08427 });
  const [getTimer, setTimer] = useState<NodeJS.Timeout>(setTimeout(() => { }, 0));
  const [getTrail, setTrail] = useState<TrailData[]>([{ id: 0, lat: '0', lon: '0', name: '' }]);

  useEffect(() => {
    console.log(getTrail);
  }, [getTrail]);

  const searchTrails = (
    lat: number,
    lng: number
  ): Promise<TrailData[]> => fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lng}&per_page=${50}&radius=${50}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
      "x-rapidapi-key": `${''}`
    }
  })
    .then((response) => response.json())
    .then((res) => res.data as TrailData[])

  const searchAfterTime = () => {
    let timer: NodeJS.Timeout = setTimeout(() => {

      searchTrails(getCoord.lat, getCoord.lng).then(res => {
        setTrail(res)
      }).catch(err => console.error(err))

    }, 3000);
    setTimer(timer);
    return
  };

  const clearSearchAfterTime = () => {
    // console.log(typeof getTimer, getTimer);
    clearTimeout(getTimer)
  }

  return (
    <div className="App">
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${''}` }}
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
          {getTrail &&
            getTrail.map(item => {
              return (
                <LocationPin
                  lat={parseFloat(item.lat)}
                  lng={parseFloat(item.lon)}
                  text={item.name}
                />
              )
            })

          }
          <LocationPin
            lat={37.42216}
            lng={-122.08427}
            text={"THE CENTER"}
          />

        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
