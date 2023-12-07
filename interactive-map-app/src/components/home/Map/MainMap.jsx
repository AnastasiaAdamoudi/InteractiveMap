import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { beaconsData } from "../../../data/beaconsData.js";
import { CreateBeaconButton, JoinBeaconButton, DisplayMembersButton, BeaconPopup } from '../index.js';

const MainMap = () => {

  return (
    <div style = {{display: "flex", justifyContent: "center", width: "100%"}}>
      <MapContainer
        attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        center={[40.102947, 22.502612]}
        zoom={3}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: "0", position: "fixed", top: "0", left: "0", right: "0", bottom: "0", margin: "auto" }}
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
