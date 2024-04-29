import "./BeaconPopup.css";
import PropTypes from 'prop-types';

const BeaconPopup = ({beacon, index}) => {

BeaconPopup.propTypes = {
  beacon: PropTypes.object.isRequired
};

  return (
    <div className="beacon-popup-container">
     <h2 className="beacon-popup-header">Beacon #{index + 1} created by {beacon.creatorName} ({beacon.creatorEmail})</h2>
      <h1 className="beacon-popup-title">{beacon.beaconName}</h1>
      <h3 className="beacon-popup-subtitle">Created on {beacon.createdOn}</h3>
      <h3 className="beacon-popup-subtitle">{beacon.beaconLocation}</h3>
              <p className="beacon-popup-paragraph">{beacon.beaconDescription}</p>
              {/* <a className="beacon-popup-link" href={beacon.beaconURL}>Click here for more information about this Beacon</a> */}
    </div>
  )
}

export default BeaconPopup;
