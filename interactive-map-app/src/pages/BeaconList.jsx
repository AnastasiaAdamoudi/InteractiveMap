import BeaconListDisplay from "../components/beacon-list/BeaconListDisplay";

const BeaconList = ( {beacons} ) => {
  return (
    <div>

      <BeaconListDisplay beacons={beacons} />
      
    </div>
  )
}

export default BeaconList;
