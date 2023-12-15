import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "../HeaderPopups.css";

const AboutPopup = ({ isOpen, onClose }) => {

  const closeIcon = (
    <svg fill="#6227a1" viewBox="0 0 20 20" width={28} height={28}>
      <path
        fillRule="evenodd"
        d="M4,4 L16,16 M4,16 L16,4" stroke="#6227a1" strokeWidth="3"
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
    aria-labelledby="about-modal"
  aria-describedby="a-modal-about-light-a-beacon"
    >
      <div className="text-popups-container">
        <p className="text-popups-text">
          Light a Beacon is a web application that aims to help people in need
          of support. By creating a beacon, you can share your story and
          location with others. You can also view other beacons and reach out to
          those in need.
        </p>
      </div>
    </Modal>
  );
};

export default AboutPopup;
