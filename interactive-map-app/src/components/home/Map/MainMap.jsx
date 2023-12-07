import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MainMap.css";
import { beaconsData } from "../../../data/beaconsData.js";
import { CreateBeaconButton, JoinBeaconButton, DisplayMembersButton, BeaconPopup } from '../index.js';

const MainMap = () => {

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
