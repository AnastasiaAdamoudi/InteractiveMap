import './Header.css';
import { beaconEllipse } from '../../assets/index.js';
import { useState } from "react";
import AboutPopup from "../home/About";
import GuidancePopup from "../home/Guidance";

const Header = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [guidanceOpen, setGuidanceOpen] = useState(false);

  return (
    <>
      <div className="header-container">
        <img src={beaconEllipse} alt="beacon" className="beacon-image" />
        <h1 className="header-title">Light A Beacon</h1>

        <button
          type="button"
          onClick={() => setAboutOpen((o) => !o)}
          className="header-popup-button"
        >
          About
        </button>

        <button
          type="button"
          onClick={() => setGuidanceOpen((o) => !o)}
          className="header-popup-button"
        >
          Guidance
        </button>

        <AboutPopup isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
        <GuidancePopup isOpen={guidanceOpen} onClose={() => setGuidanceOpen(false)} />

      </div>
    </>
  );
};

export default Header;
