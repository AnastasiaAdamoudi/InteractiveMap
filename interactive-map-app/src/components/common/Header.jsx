import './Header.css';
import { beaconEllipse } from '../../assets/index.js';
import { AboutPopup, GuidancePopup } from '../home/HeaderPopups/index.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ modalState, setModalState, burgerMenuOpen, setBurgerMenuOpen }) => {

  Header.propTypes = {
    modalState: PropTypes.object.isRequired,
    setModalState: PropTypes.func.isRequired,
    burgerMenuOpen: PropTypes.bool.isRequired,
    setBurgerMenuOpen: PropTypes.func.isRequired,
  };

  const { aboutOpen, guidanceOpen } = modalState;

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  const toggleAboutModal = () => {
    setModalState({
      aboutOpen: !aboutOpen,
      guidanceOpen,
    });
    setBurgerMenuOpen(false);
  };

  const toggleGuidanceModal = () => {
    setModalState({
      aboutOpen,
      guidanceOpen: !guidanceOpen,
    });
    setBurgerMenuOpen(false);
  };

  return (
    <div className="header-container">
      <div className="left-side-header-container">
        <Link to="/" className="header-logo">
        <img src={beaconEllipse} alt="beacon" className="beacon-image" />
        </Link>
        <div className="header-title-container">
          <h1 className="header-title">Light A Beacon</h1>
          <h2 className="header-subtitle">How we light up the world</h2>
        </div>
      </div>

      <div className="right-side-header-container">
        <div className={`burger-menu ${burgerMenuOpen ? "open" : ""}`}
            onClick={toggleBurgerMenu}>
          <div className="bar" id="bar1"></div>
          <div className="bar" id="bar2"></div>
          <div className="bar" id="bar3"></div>
        </div>

        {/* Burger menu content */}
        {burgerMenuOpen && (
          <div className="burger-menu-content">
            <div onClick={toggleAboutModal} className="burger-menu-link">
              About
            </div>
            <br />
            <div type="button" onClick={toggleGuidanceModal} className="burger-menu-link">
              Guidance
            </div>
          </div>
        )}

        {/* Desktop menu content */}
        <div className="header-popup-button-container" id="about-button">
          <button type="button" onClick={toggleAboutModal} className="header-popup-button">
            About
          </button>
        </div>

        <div className="header-popup-button-container" id="guidance-button">
          <button type="button" onClick={toggleGuidanceModal} className="header-popup-button">
            Guidance
          </button>
        </div>

        <div className="menu-container">
          <AboutPopup isOpen={aboutOpen} onClose={toggleAboutModal} />
          <GuidancePopup isOpen={guidanceOpen} onClose={toggleGuidanceModal} />
        </div>
      </div>
    </div>
  );
};

export default Header;
