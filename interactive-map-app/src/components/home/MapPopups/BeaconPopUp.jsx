// import { JoinBeaconButton, DisplayMembersButton } from './index.js';

const BeaconPopup = ({beacon}) => {
  return (
    <div>
    <h2 className="popup-title">Beacon #{beacon.number} created by {beacon.creatorName} ({beacon.creatorEmail}) </h2>
      <h1 className="popup-subtitle">Name of {beacon.beaconName}</h1>
              <p className="popup-text">{beacon.beaconDescription}</p>
              <a className="popup-link" href={beacon.beaconURL}>More about this beacon</a>
              {/* <JoinBeaconButton />
              <DisplayMembersButton /> */}
    </div>
  )
}

export default BeaconPopup;
