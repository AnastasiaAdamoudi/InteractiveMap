import './App.css'
import { useState, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/common/index.js';
import { Home, BeaconForm } from './pages/index.js';

function App() {

  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [modalState, setModalState] = useState({
    aboutOpen: false,
    guidanceOpen: false,
  });
  const [footerModals, setFooterModals] = useState({
    privacyOpen: false,
    accessibilityOpen: false,
  });

  const [beacons, setBeacons] = useState([]);

  useEffect(() => {
    const getBeaconsData = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/beacons'); // Localhost
        const response = await axios.get('https://interactivemap-1pob.onrender.com/beacons'); // Server deployed on Render
        setBeacons(response.data);
      } catch (error) {
        console.error('Error fetching beacon data:', error);
      }
    }  
    getBeaconsData();
  }, [beacons]);  

  // const updateBeacons = (newBeacon) => {
  //   setBeacons([...beacons, newBeacon]);
  // };  

  const closeModal = () => {
    setModalState({
      aboutOpen: false,
      guidanceOpen: false,
    });
  };  

  const closeFooterModals = () => {
    setFooterModals({
      privacyOpen: false,
      accessibilityOpen: false,
    });
  };

  return (
    <Router>
    <div>
      <Header modalState={modalState} setModalState={setModalState} closeModal={closeModal} burgerMenuOpen={burgerMenuOpen} setBurgerMenuOpen={setBurgerMenuOpen} />
      <Routes>
        <Route path="/" element={<Home beacons={beacons}
       />} />
        <Route path="/beacon-form" element={<BeaconForm beacons={beacons} />} />
      </Routes>
      <Footer footerModals={footerModals} setFooterModals={setFooterModals} closeFooterModals={closeFooterModals} />
    </div>
  </Router>
  )
}

export default App
