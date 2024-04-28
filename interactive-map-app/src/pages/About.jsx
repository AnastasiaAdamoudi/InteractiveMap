import { aboutText } from '../data/about.js';

const About = () => {

  return (
      <div className="text-popups-container">

      <h1 className="text-popup-header">What are beacons about</h1>

      {aboutText.map((text, index) => (
        <div className="text-popup" key={index}>
        <hr className="text-popup-hr" />
          <h3 className="text-popup-title">{text.title}</h3>
          <p className="text-popup-paragraph">{text.paragraph}</p>
        </div>
      ))}


      </div>
  );
};

export default About;
