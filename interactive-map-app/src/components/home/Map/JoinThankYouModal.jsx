import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const JoinThankYouModal = ({ open }) => {
  
  JoinThankYouModal.propTypes = {
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
      <h2>Thank you for joining this beacon!</h2>

      <Link to="/">
      <button className="join-thank-you-button" type="button">
        Back to the map
      </button>
      </Link>
      
    </Modal>
  );
};

export default JoinThankYouModal;
