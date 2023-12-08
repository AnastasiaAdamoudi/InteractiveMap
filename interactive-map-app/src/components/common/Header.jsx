import './Header.css'
import { beaconEllipse } from '../../assets/index.js';

const Header = () => {
  return (
    <>
    <div className="header-container">

      <img src={beaconEllipse} alt="beacon" className="beacon-image" />
      <h1 className="header-title">Light A Beacon</h1>
      
    </div>
    </>
  )
}

export default Header;
