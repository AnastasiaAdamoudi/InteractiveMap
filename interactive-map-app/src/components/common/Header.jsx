import './Header.css';
import { beaconEllipse } from '../../assets/index.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ burgerMenuOpen, setBurgerMenuOpen, isAuthenticated, handleLogout }) => {

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
        <div
          className={`burger-menu ${burgerMenuOpen ? "open" : ""}`}
          onClick={toggleBurgerMenu}
        >
          <div className="bar" id="bar1"></div>
          <div className="bar" id="bar2"></div>
          <div className="bar" id="bar3"></div>
        </div>
        {burgerMenuOpen && (
          <div className="burger-menu-content">
            <Link to="/about" className="burger-menu-link">
              <div className="burger-menu-link">About</div>
            </Link>
            <Link to="/beacon-list" className="burger-menu-link">
              <div type="button" className="burger-menu-link">
                Beacons
              </div>
            </Link>
            <Link to="/member-list" className="burger-menu-link">
              <div type="button" className="burger-menu-link">
                Members
              </div>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="burger-menu-link">
                  <div type="button" className="burger-menu-link">
                    Dashboard
                  </div>
                </Link>
                <div type="button" className="burger-menu-link" onClick={handleLogout}>
                  Logout
                </div>
              </>
            ) : (
              <Link to="/auth/login" className="burger-menu-link">
                <div type="button" className="burger-menu-link">
                  Login
                </div>
              </Link>
            )}
          </div>
        )}
        <div className="header-links-container">
          <Link to="/about" className="header-link">
            <button type="button" className="header-link">
              About
            </button>
          </Link>
          <Link to="/beacon-list" className="header-link">
            <button type="button" className="header-link">
              Beacons
            </button>
          </Link>
          <Link to="/member-list" className="header-link">
            <button type="button" className="header-link">
              Members
            </button>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="header-link">
                <button type="button" className="header-link">
                  Dashboard
                </button>
              </Link>
              <button
                type="button"
                className="header-link"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth/login" className="header-link">
              <button type="button" className="header-link">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
