import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ThankYouModal = ({ open, onClose }) => {
  ThankYouModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const closeIcon = (
    <svg fill="#660066" viewBox="0 0 20 20" width={28} height={28}>
      <path
        fillRule="evenodd"
        d="M4,4 L16,16 M4,16 L16,4"
        stroke="#660066"
        strokeWidth="3"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      closeIcon={closeIcon}
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
      aria-labelledby="privacy-policy-modal"
      aria-describedby="info-about-privacy-policy"
    >
      <h2>Thank you for adding your beacon!</h2>
      <div className="thankyou-modal-buttons">
        <Link to="/">
          <p className="text-link">View the map</p>
        </Link>
        <p className="modal-separator">| </p>
        <Link to="/beacon-form">
          <p className="text-link">Add another beacon</p>
        </Link>
      </div>
    </Modal>
  );
};

export default ThankYouModal;
