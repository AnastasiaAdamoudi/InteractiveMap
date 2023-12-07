import './Header.css'
import { torch } from '../../assets/index.js';

const Header = () => {
  return (
    <>
    <div className="header-container">

      <img src={torch} alt="torch" className="torch-image" />
      <h1 className="header-title">Light A Beacon</h1>
      
    </div>
    </>
  )
}

export default Header;
