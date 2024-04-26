import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import "./MainMap.css";
import BeaconPopup from './BeaconPopup';
import { pinCandle, pinShadow } from '../../../assets/index.js';
import PropTypes from 'prop-types';

const MainMap = ({ beacons }) => {

  MainMap.propTypes = {
    beacons: PropTypes.array.isRequired
  };

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

        {/* <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount();
            return L.divIcon({
              html: `<div class="cluster-icon">${count}</div>`,
              className: 'custom-cluster-icon',
              iconSize: [40, 40]
            });
          }}
        > */}
          {beacons.map((beacon, index) => (
            <Marker
              key={index}
              // Offset by a small amount to prevent overlapping markers
              position={[
                beacon.beaconLatitude + (index * 0.001), 
                beacon.beaconLongitude + (index * 0.001) 
              ]}
              icon={customMarker}
            >
              <Popup>
                <BeaconPopup beacon={beacon} />
              </Popup>
            </Marker>
          ))}
        {/* </MarkerClusterGroup> */}

      </MapContainer>
    </div>
  );
};

export default MainMap;
