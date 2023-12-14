import Popup from "reactjs-popup";
import "../HeaderPopups.css";

const AboutPopup = ({ isOpen, onClose }) => {
  return (
    <Popup open={isOpen} closeOnDocumentClick onClose={onClose}>
      <div className="text-popups-container">
        <p className="text-popups-text">
          Light a Beacon is a web application that aims to help people in need
          of support. By creating a beacon, you can share your story and
          location with others. You can also view other beacons and reach out to
          those in need.
        </p>
      </div>
    </Popup>
  );
};

export default AboutPopup;
