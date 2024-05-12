import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RegisterThankYouModal = ({ open }) => {
  
  RegisterThankYouModal.propTypes = {
    open: PropTypes.bool.isRequired,
  };

  return (
    <Modal
      open={open}
      center
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
      aria-labelledby="privacy-policy-modal"
      aria-describedby="info-about-privacy-policy"
    >
      <h2>Thank you for registering!</h2>

      <Link to="/auth/login">
      <button className="join-thank-you-button" type="button">
        Log in to your account to create and join beacons
      </button>
      </Link>
      
    </Modal>
  );
};

export default RegisterThankYouModal;
