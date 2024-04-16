import "./Footer.css";
import { PrivacyPopup, AccessibilityPopup } from "./FooterPopups";

const Footer = ({ footerModals, setFooterModals }) => {
  const { privacyOpen, accessibilityOpen } = footerModals;

  const togglePrivacyModal = () => {
    setFooterModals({
      privacyOpen: !privacyOpen,
      accessibilityOpen,
    });
  };

  const toggleAccessibilityModal = () => {
    setFooterModals({
      privacyOpen,
      accessibilityOpen: !accessibilityOpen,
    });
  };

  return (
    <div className="footer-container">

<div className="copyright-container">
        <p className="footer-text">
          © 2024 <a href="https://campfireconvention.network/" alt="Campfire Convention" target="_blank" rel="noreferrer" className="text-link">
          Campfire Convention</a>
        </p>
      </div>

      <div className="join-button-container">
      <a href="https://campfireconvention.network/" alt="Campfire Convention" target="_blank" rel="noreferrer" className="text-link">
        <button className="join-button">Join the Campfire Convention</button>
      </a>
      </div>

      <div className="credits-popupbuttons-container">
        <div className="credits-container">
          <p className="footer-text">
            Developed by{" "}
            <a
              href="https://www.anastasiaadamoudi.com/"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Anastasia
            </a>, Jon & Tim
          </p>
        </div>
        <div className="popup-buttons-container">
          <p type="button" onClick={togglePrivacyModal} className="text-link">
            Privacy Policy
          </p>
          <span className="footer-separator">|</span>
          <p
            type="button"
            onClick={toggleAccessibilityModal}
            className="text-link"
          >
            Web Accessibility Statement
          </p>
        </div>
      </div>

      {/* Popups */}
      <div className="menu-container">
        <PrivacyPopup isOpen={privacyOpen} onClose={togglePrivacyModal} />
        <AccessibilityPopup
          isOpen={accessibilityOpen}
          onClose={toggleAccessibilityModal}
        />
      </div>
    </div>
  );
};

export default Footer;
