import { Link } from "react-router-dom";

const BeaconListDisplay = ({ beacons }) => {
  return (
    <div className="beacon-page">
      {beacons.length === 0 ? (
        <p>
          No beacons have been created yet. Click <Link to="/">here</Link> to
          return to the map and create a beacon.
        </p>
      ) : (
        <div className="beacon-list-container">
          <ol className="beacon-list-items">
            {beacons.map((beacon, index) => (
              <li key={index}>
                <h2>Beacon #{index + 1}</h2>
                <h3>{beacon.beaconName}</h3>
                <p>{beacon.creatorName}</p>
                <p>{beacon.createdOn}</p>
                <p>{beacon.beaconDescription}</p>
                <p>{beacon.beaconLocation}</p>
                <ul>
                  {beacon.members.map((member, memberIndex) => (
                    <li key={memberIndex}>
                      <p>{member.memberName}</p>
                      <p>{member.memberEmail}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default BeaconListDisplay;
