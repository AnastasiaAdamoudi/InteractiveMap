import { createButton } from '../../../assets/index.js';
import { CreateBeaconForm } from '../CreateBeaconForm/index.js';
import './CreateBeaconButton.css';

const CreateBeaconButton = ({ formOpen, setFormOpen, beacons, updateBeacons, beaconArrayLength }) => {
  
  const toggleForm = () => {
    setFormOpen(!formOpen);
  }

  return (
    <>
    <div
    className="create-beacon-button-container"
    onClick={toggleForm}
    >
        <img src={createButton} alt="create-beacon" className="create-beacon-button-img" />
        <p className="create-beacon-button-text">Create Beacon</p>
    </div>
  
    <CreateBeaconForm isOpen={formOpen} onClose={toggleForm} beacons={beacons} updateBeacons={updateBeacons} beaconArrayLength={beaconArrayLength} />
    </>
  )
}

export default CreateBeaconButton;
