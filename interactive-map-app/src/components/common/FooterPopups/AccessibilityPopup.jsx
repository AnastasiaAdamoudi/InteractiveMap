import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "../../home/HeaderPopups/HeaderPopups.css";

const AccessibilityPopup = ({ isOpen, onClose }) => {

  const closeIcon = (
    <svg fill="#660066" viewBox="0 0 20 20" width={28} height={28}>
      <path
        fillRule="evenodd"
        d="M4,4 L16,16 M4,16 L16,4" stroke="#660066" strokeWidth="3"
        clipRule="evenodd"
      ></path>
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
    aria-labelledby="accessibility-modal"
    aria-describedby="accessibility-statement"
    >
      <div className="text-popup-container">

      <h2 className="text-popup-header">Web Accessibility Statement</h2>

      <p className="text-popup-paragraph">
        This website is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
      </p>
      </div>
    </Modal>
  );
};

export default AccessibilityPopup;
