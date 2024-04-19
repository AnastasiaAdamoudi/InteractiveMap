import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MainMap.css";
import BeaconPopup from 'src/components/home/MapPopups/BeaconPopup.jsx';
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

        {beacons.map((beacon, index) => (
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
