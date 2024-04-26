import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { guidanceText } from "../../data/guidance";

const ExpandGuidanceButton = () => {
  const [guidanceExpanded, setGuidanceExpanded] = useState(false);

  return (
    <div>
      <p
        onClick={() => setGuidanceExpanded(!guidanceExpanded)}
        className="text-link instructions-expand"
      >
        {!guidanceExpanded
          ? "Expand instructions for setting up a Beacon"
          : "Collapse instructions"}
      </p>
      <AnimatePresence>
        {guidanceExpanded && (
          <motion.div
            className="email-list-container"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
          >
            {guidanceText.map((text, index) => (
              <div className="text-popup instructions-text" key={index}>
                <h3 className="text-popup-title">{text.title}</h3>
                <p
                  className="text-popup-paragraph guidance-popup-paragraph"
                  dangerouslySetInnerHTML={{ __html: text.paragraph }}
                />
                <hr className="text-popup-hr" />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandGuidanceButton;
