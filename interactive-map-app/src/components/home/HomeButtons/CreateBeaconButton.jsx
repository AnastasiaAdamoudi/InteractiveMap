import { pinCandle } from '../../../assets/index.js';
import { CreateBeaconForm } from '../CreateBeaconForm/index.js';
import './CreateBeaconButton.css';
import PropTypes from 'prop-types';

const CreateBeaconButton = ({ formOpen, setFormOpen, beacons }) => {

  CreateBeaconButton.propTypes = {
    formOpen: PropTypes.bool.isRequired,
    setFormOpen: PropTypes.func.isRequired,
    beacons: PropTypes.array.isRequired,
  };
  
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
  
    <CreateBeaconForm isOpen={formOpen} onClose={toggleForm} beacons={beacons} />
    </div>
  )
}

export default CreateBeaconButton;
