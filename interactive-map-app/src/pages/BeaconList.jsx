import BeaconListDisplay from "../components/beacon-list/BeaconListDisplay";
import './BeaconList.css';

const BeaconList = ({ beacons, users }) => {
  return (
    <div className="beacon-list-page">

      <h1 className="beacon-list-header">Beacon List</h1>

      <BeaconListDisplay beacons={beacons} />
      
    </div>
  )
}

export default BeaconList;