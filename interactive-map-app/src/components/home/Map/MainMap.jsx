import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MainMap.css";
import { beaconsData } from "../../../data/beaconsData.js";
import { BeaconPopup } from '../MapPopups/index.js';
import { pinCandle, pinShadow } from '../../../assets/index.js';

const MainMap = () => {

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
            position={[beacon.latitude, beacon.longitude]}
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
