import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "../../home/HeaderPopups/HeaderPopups.css";

const PrivacyPopup = ({ isOpen, onClose }) => {

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
    aria-labelledby="privacy-policy-modal"
    aria-describedby="info-about-privacy-policy"
    >
      <div className="text-popup-container">

      <h2 className="text-popup-header">Privacy Policy</h2>

      <p className="text-popup-paragraph">
      If you create a beacon, your name and email will only be used to contact you about your beacon or for other beacon enthusiasts to contact you. We will not share your information with any third parties. Please keep in mind that other people with an interest in Light A Beacon will be able to see your beacon and contact you.
      </p>

      </div>
    </Modal>
  );
};

export default PrivacyPopup;
