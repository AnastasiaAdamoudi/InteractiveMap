import './Header.css';
import { beaconEllipse } from '../../assets/index.js';
import AboutPopup from "../home/HeaderPopups/About/index.js";
import GuidancePopup from "../home/HeaderPopups/Guidance/index.js";

const Header = ({ modalState, setModalState }) => {

  const { aboutOpen, guidanceOpen } = modalState;

  const toggleAboutModal = () => {
    setModalState({
      aboutOpen: !aboutOpen,
      guidanceOpen,
    });
  };

  const toggleGuidanceModal = () => {
    setModalState({
      aboutOpen,
      guidanceOpen: !guidanceOpen,
    });
  };

  return (
    <>
      <div className="header-container">
        <img src={beaconEllipse} alt="beacon" className="beacon-image" />
        <h1 className="header-title">Light A Beacon</h1>

        <button
          type="button"
          onClick={toggleAboutModal}
          className="header-popup-button"
        >
          About
        </button>

        <button
          type="button"
          onClick={toggleGuidanceModal}
          className="header-popup-button"
        >
          Guidance
        </button>

        <AboutPopup isOpen={aboutOpen} onClose={toggleAboutModal} />
        <GuidancePopup isOpen={guidanceOpen} onClose={toggleGuidanceModal} />

      </div>
    </>
  );
};

export default Header;
