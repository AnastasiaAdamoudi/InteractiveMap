import { createButton } from '../../../assets/index.js';
import './CreateBeaconButton.css';

const CreateBeaconButton = () => {
  return (
    <div className="create-beacon-button-container">
        <img src={createButton} alt="create-beacon" className="create-beacon-button-img" />
        <p className="create-beacon-button-text">Create Beacon</p>
    </div>
  )
}

export default CreateBeaconButton;
