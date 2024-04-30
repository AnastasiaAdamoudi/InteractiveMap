import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const JoinBeaconButton = ({ beacons, index }) => {
  JoinBeaconButton.propTypes = {
    beacons: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  };

  const beaconId = beacons[index]._id;

  return (
    <div className="join-beacon-button-container">
      <Link to={`/join-beacon-form/${beaconId}`}>
        <button
          className="join-beacon-button"
          type="button"
          aria-label="Join this beacon"
        >
          Join this beacon
        </button>
      </Link>
    </div>
  );
};

export default JoinBeaconButton;
