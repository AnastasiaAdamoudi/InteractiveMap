import { aboutText } from '../data/about.js';
import './About.css';

const About = () => {

  return (
    <div className="about-page">

      <h1 className="about-header">What are beacons about</h1>

      {aboutText.map((text, index) => (
        <div className="about-content" key={index}>
          <hr className="text-popup-hr" />
          <h3 className="text-popup-title">{text.title}</h3>
          <p className="about-text">{text.paragraph}</p>
        </div>
      ))}

    </div>
  );
};

export default About;
