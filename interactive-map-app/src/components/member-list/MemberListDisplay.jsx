import { Link } from 'react-router-dom';

const MemberListDisplay = ({ beacons, members }) => {

  return (
    <div className="beacon-page">
      {members.length === 0 ? (
        <p>
          No members have joined yet. Click <Link to="/">here</Link> to
          return to the map and check out the beacons.
        </p>
      ) : (
        <div className="beacon-list-container">
          <ol className="beacon-list-items">
            {members.map((member, index) => (
              <li key={index}>
                <h2>Member #{index+1}</h2>
                <h3>{member.memberName}</h3>
                <p>{member.memberEmail}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default MemberListDisplay;
