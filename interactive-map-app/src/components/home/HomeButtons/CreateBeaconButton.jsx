import { pinCandle } from '../../../assets/index.js';
import { CreateBeaconForm } from '../CreateBeaconForm/index.js';
import './CreateBeaconButton.css';

const CreateBeaconButton = ({ formOpen, setFormOpen, beacons, updateBeacons, beaconArrayLength }) => {
  
  const toggleForm = () => {
    setFormOpen(!formOpen);
  }

  return (
    <div className="create-beacon-button-container">
    <div
    className="create-beacon-button"
    onClick={toggleForm}
    >
        <img src={pinCandle} alt="create-beacon" className="create-beacon-button-img" />
        <p className="create-beacon-button-text">Add Beacon</p>
        
    </div>
  
    <CreateBeaconForm isOpen={formOpen} onClose={toggleForm} beacons={beacons} updateBeacons={updateBeacons} beaconArrayLength={beaconArrayLength} />
    </div>
  )
}

export default CreateBeaconButton;
