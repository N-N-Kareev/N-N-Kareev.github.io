import React, { useEffect } from 'react';
import Image from 'next/image';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const CoffeeShopMap = () => {
  const position:  L.LatLngExpression  = [47.2220375, 38.9184931];
  const coffeeIcon = new L.Icon({
    iconUrl: '/marker.png', 
    iconSize: [38, 38], 
    iconAnchor: [19, 38], 
    popupAnchor: [0, -38], 
  });


  return (
<div  style={{ height: '250px', borderRadius: '10px', overflow: 'hidden' }}>
    <MapContainer center={position} zoom={22} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=''
      />
      <Marker position={position} icon={coffeeIcon}>
        <Popup>
         <div className='marker-wrapper'>
         <Image src={'/coffee.jpg'} width={100} height={100} alt={''}/>

          Coffee Break <br /> Уютная кофейня в центре города.
         </div>
        </Popup>
      </Marker>
    </MapContainer>
</div>
  );
};

export default CoffeeShopMap;
