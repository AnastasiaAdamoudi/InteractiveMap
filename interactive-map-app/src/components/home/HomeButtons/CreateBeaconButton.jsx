import { createButton } from '../../../assets/index.js';
import CreateBeaconForm from '../CreateBeaconForm/CreateBeaconForm.jsx';
import './CreateBeaconButton.css';

const CreateBeaconButton = ({ formOpen, setFormOpen, closeForm }) => {

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
  
    <CreateBeaconForm isOpen={formOpen} onClose={toggleForm} />
    </>
  )
}

export default CreateBeaconButton;
