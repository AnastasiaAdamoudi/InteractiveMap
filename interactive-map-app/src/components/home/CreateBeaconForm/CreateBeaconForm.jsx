import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "./FormPopup.css";
import { useForm } from "react-hook-form";
import { FormContent } from "./index.js";

const CreateBeaconForm = ({ isOpen, onClose }) => {

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const closeIcon = (
    <svg fill="#6227a1" viewBox="0 0 40 40" width={40} height={40}>
      <path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="purple" strokeWidth="3" />
    </svg>
  );

  return (
    <Modal
    open={isOpen}
    onClose={onClose}
    center
    closeIcon={closeIcon}
    classNames={{
      overlay: 'customOverlay',
      modal: 'customModal',
    }}
    >
      <div className="text-popups-container">
        <div className="text-popups-text">
          <FormContent onSubmit={onSubmit} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateBeaconForm;
