import { JoinBeaconButton, DisplayMembersButton } from '../index';

const BeaconPopUp = ({beacon}) => {
  return (
    <div>
      <h2 className="popup-title">{beacon.beaconName}</h2>
              <p className="popup-p">{beacon.causeDescription}</p>
              <JoinBeaconButton />
              <DisplayMembersButton />
    </div>
  )
}

export default BeaconPopUp;
