import { Link } from 'react-router-dom';

const MemberListDisplay = ({ beacons, users }) => {

  return (
    <div className="beacon-page">
      {users.length === 0 ? (
        <p>
          No members have joined yet. Click <Link to="/">here</Link> to
          return to the map and check out the beacons.
        </p>
      ) : (
        <div className="beacon-list-container">
          <ol className="beacon-list-items">
            {users.map((user, index) => (
              <li key={index}>
                <h2>Member #{index+1}</h2>
                <h3>{user.userName}</h3>
                <p>{user.userEmail}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default MemberListDisplay;
