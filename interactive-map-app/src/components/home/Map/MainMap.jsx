// import { useState, useEffect } from "react";
// import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MainMap.css";
import { BeaconPopup } from '../MapPopups/index.js';
import { pinCandle, pinShadow } from '../../../assets/index.js';
import { beaconsData } from "../../../data/beaconsData.js";

const MainMap = ({beacons}) => {

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('DRUPAL_BEACONS_API_ENDPOINT'); // This is the endpoint of the Drupal view that returns the beacons data in JSON format
  //       setBeacons(response.data);
  //     } catch (error) {
  //       console.error('Error fetching beacon data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [beacons]);

  const customMarker = new L.icon({
    iconUrl: pinCandle,
    shadowUrl: pinShadow,
    iconSize: [40, 40],
    shadowSize: [40, 55],
    iconAnchor: [20, 40],
    shadowAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  return (
    <div className="map-container">
      <MapContainer
        attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        center={[40.102947, 22.502612]}
        zoom={3}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {beaconsData.map((beacon, index) => (
          <Marker
            key={index}
            position={[beacon.beaconLatitude, beacon.beaconLongitude]}
            icon={customMarker}
          >
            <Popup>
              <BeaconPopup beacon={beacon} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MainMap;
