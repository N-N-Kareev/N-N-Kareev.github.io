//pk.eyJ1IjoicmljaC1nb3NsZW5nIiwiYSI6ImNsaGFoZ3kxeDBoaXozcGx0ajV4OTRmNjYifQ.qXzNY9j52Qk0u91foSqKPA

"use client";

import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';

const CoffeeShopMap: React.FC = () => {
  const [viewport, setViewport] = useState({
    latitude: 47.2141,
    longitude: 38.9305578,
    zoom: 13,
    width: '100%',
    height: '250px',
  });

  const [popupInfo, setPopupInfo] = useState(null);

  const handleClick = (event: any) => {
    setPopupInfo({
      //@ts-ignore
      latitude: 47.2141,
      longitude: 38.9305578,
    });
  };

  return (
    <div style={{ height: '250px', borderRadius: '10px', overflow: 'hidden' }}>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={'pk.eyJ1IjoicmljaC1nb3NsZW5nIiwiYSI6ImNsaGFoZ3kxeDBoaXozcGx0ajV4OTRmNjYifQ.qXzNY9j52Qk0u91foSqKPA'}
        //@ts-ignore
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
        onClick={handleClick}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={47.2141}
          longitude={38.9305578}
          //@ts-ignore
          offsetLeft={-19}
          offsetTop={-38}
        >
          <img src="/marker.png" alt="Marker" style={{ width: 38, height: 38 }} />
        </Marker>
        {popupInfo && (
          <Popup
          //@ts-ignore
            tipSize={5}
            anchor="top"
            //@ts-ignore
            longitude={popupInfo.longitude}
            //@ts-ignore
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={(event) => setPopupInfo({
              //@ts-ignore
              latitude: 47.2141,
              //@ts-ignore
              longitude: 38.9305578,
            })}
          >
            <div className='marker-wrapper'>
            <Image src={'/coffee.jpg'} width={100} height={100} alt=''/>
            Мока Лайт <br /> Уютная кофейня в центре города.
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default CoffeeShopMap;
