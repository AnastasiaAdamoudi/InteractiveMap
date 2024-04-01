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

      <div className="copyright-container">
        <p className="footer-text">© 2024 Light A Beacon</p>
      </div>

      <div className="credits-container">
        <p className="footer-text">
          Developed by{" "}
          <a
            href="https://www.anastasiaadamoudi.com/"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Anastasia Adamoudi
          </a>
        </p>
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
