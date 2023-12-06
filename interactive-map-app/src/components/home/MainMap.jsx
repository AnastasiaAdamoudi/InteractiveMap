import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { beaconsData } from "../../data/beaconsData.js";

const MainMap = () => {

  return (
    <div style = {{display: "flex", justifyContent: "center", width: "100%"}}>
      <MapContainer
        attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        center={[40.102947, 22.502612]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: "800px", width: "2000px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {beaconsData.map((beacon, index) => (
          <Marker
            key={index}
            position={[beacon.latitude, beacon.longitude]}
          >
            <Popup>
              <h2 className="popup-title">{beacon.beaconName}</h2>
              <p className="popup-p">{beacon.causeDescription}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MainMap;
