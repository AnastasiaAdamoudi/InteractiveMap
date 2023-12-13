import Popup from "reactjs-popup";

const GuidancePopup = ({ isOpen, onClose }) => {
  return (
    <Popup open={isOpen} closeOnDocumentClick onClose={onClose}>
      <div className="text-popups-container">
        <p className="text-popups-text">
          Here are some tips to help you create a beacon:
        </p>
      </div>
    </Popup>
  );
};

export default GuidancePopup;
