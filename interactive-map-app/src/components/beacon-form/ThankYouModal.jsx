import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import PropTypes from "prop-types";

const ThankYouModal = ({ open, onClose }) => {
  ThankYouModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <Modal open={open} onClose={onClose} center>
      <h2>Thank you for adding your beacon!</h2>
    </Modal>
  );
};

export default ThankYouModal;
