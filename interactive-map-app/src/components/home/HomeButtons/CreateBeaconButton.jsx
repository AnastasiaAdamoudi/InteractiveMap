import { pinCandle } from '../../../assets/index.js';
import './CreateBeaconButton.css';
import { Link } from 'react-router-dom';

const CreateBeaconButton = () => {

  return (
    <Link to="/beacon-form">
    <div className="create-beacon-button-container">
    <div
    className="create-beacon-button"
    >
        <img src={pinCandle} alt="create-beacon" className="create-beacon-button-img" />
        <p className="create-beacon-button-text">Add Beacon</p>
        
    </div>
    </div>
    </Link>
  )
}

export default CreateBeaconButton;
