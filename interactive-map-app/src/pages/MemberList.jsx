import MemberListDisplay from "../components/member-list/MemberListDisplay";
import './BeaconList.css';

const MemberList = ({ beacons, members }) => {
  return (
    <div className="member-list-page">

      <h1 className="member-list-header">Member List</h1>

      <MemberListDisplay beacons={beacons} members={members} />
      
    </div>
  )
}

export default MemberList;