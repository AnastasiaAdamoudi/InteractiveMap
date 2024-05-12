import MemberListDisplay from "../components/member-list/MemberListDisplay";
import './BeaconList.css';

const MemberList = ({ beacons, users }) => {
  return (
    <div className="member-list-page">

      <h1 className="member-list-header">Member List</h1>

      <MemberListDisplay beacons={beacons} users={users} />
      
    </div>
  )
}

export default MemberList;