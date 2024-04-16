import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "../HeaderPopups.css";
import { guidanceText } from '../../../../data/guidance.js';

const GuidancePopup = ({ isOpen, onClose }) => {
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
      aria-labelledby="guidance-modal"
      aria-describedby="a-modal-guidance"
    >
      <div className="text-popups-container">
        <h1 className="text-popup-header">How to set up a Beacon</h1>
        {guidanceText.map((text, index) => (
          <div className="text-popup" key={index}>
            <hr className="text-popup-hr" />
            <h3 className="text-popup-title">{text.title}</h3>
            <p className="text-popup-paragraph guidance-popup-paragraph" dangerouslySetInnerHTML={{ __html: text.paragraph }} />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default GuidancePopup;
