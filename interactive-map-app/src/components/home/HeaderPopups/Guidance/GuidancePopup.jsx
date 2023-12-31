import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "../HeaderPopups.css";

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
    >
      <div className="text-popups-container">

<h1 className="text-popup-header">How to set up a Beacon</h1>

  <div className="text-popup">

  <hr className="text-popup-hr" />

    <h3 className="text-popup-title">Step 1</h3>
    <p className="text-popup-paragraph guidance-popup-paragraph">
    Navigate to <a href="https://www.latlong.net/" target="_blank" rel="noreferrer">latlong.net</a> and enter the location of your Beacon in the search bar.
    </p>
    <hr className="text-popup-hr" />
    <h3 className="text-popup-title">Step 2</h3>
    <p className="text-popup-paragraph guidance-popup-paragraph">
    Click on each of the coordinates (Latitude and Longitude) and copy them to your clipboard.
    </p>
    <hr className="text-popup-hr" />
    <h3 className="text-popup-title">Step 3</h3>
    <p className="text-popup-paragraph guidance-popup-paragraph">
      Return to the Light A Beacon website and click on the "Create Beacon" button in the right bottom corner of the screen.
    </p>
    <hr className="text-popup-hr" />
    <h3 className="text-popup-title">Step 4</h3>
    <p className="text-popup-paragraph guidance-popup-paragraph">
      Paste the coordinates into the Latitude and Longitude fields, and complete the rest of the form.
    </p>
    <hr className="text-popup-hr" />
    <h3 className="text-popup-title">Step 5</h3>
    <p className="text-popup-paragraph guidance-popup-paragraph">
      Click on the "Create Beacon" button. Your Beacon will now be visible on the map.
    </p>
  </div>

</div>
    </Modal>
  );
};

export default GuidancePopup;
