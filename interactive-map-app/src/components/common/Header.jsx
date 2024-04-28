import './Header.css';
import { beaconEllipse } from '../../assets/index.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ burgerMenuOpen, setBurgerMenuOpen }) => {

  Header.propTypes = {
    burgerMenuOpen: PropTypes.bool.isRequired,
    setBurgerMenuOpen: PropTypes.func.isRequired,
  };

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
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
          <Link to="/about" className="burger-menu-link">
            <div className="burger-menu-link">
              About
            </div>
            </Link>
            <br />
            <Link to="/beacon-list" className="burger-menu-link">
            <div type="button" className="burger-menu-link">
              Beacons
            </div>
            </Link>
          </div>
        )}

        {/* Desktop menu content */}
        <div className="header-popup-button-container" id="about-button">
        <Link to="/about" className="burger-menu-link">
          <button type="button" className="header-popup-button">
            About
          </button>
          </Link>
        </div>

        <div className="header-popup-button-container" id="guidance-button">
        <Link to="/beacon-list" className="burger-menu-link">
          <button type="button" className="header-popup-button">
            Beacons
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
