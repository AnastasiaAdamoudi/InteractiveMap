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
      <div className="header-container">
      <div className="left-side-header-container">
        <img src={beaconEllipse} alt="beacon" className="beacon-image" />

        <div className="header-title-container">
        <h1 className="header-title">Light A Beacon</h1>
        <h2 className="header-subtitle">How we light up the world</h2>
        </div>

        </div>

        <div className="right-side-header-container">
        <div className="header-popup-button-container"
        id="about-button"
        >
        <button
          type="button"
          onClick={toggleAboutModal}
          className="header-popup-button"
        >
          About
        </button>
        </div>

        <div className="header-popup-button-container"
        id="guidance-button"
        >
        <button
          type="button"
          onClick={toggleGuidanceModal}
          className="header-popup-button"
        >
          Guidance
        </button>
        </div>

        <AboutPopup isOpen={aboutOpen} onClose={toggleAboutModal} />
        <GuidancePopup isOpen={guidanceOpen} onClose={toggleGuidanceModal} />
        </div>
      </div>
  );
};

export default Header;
