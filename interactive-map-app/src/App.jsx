import './App.css'
import { useState, useEffect } from 'react';
import axios from "axios";
import DOMPurify from 'dompurify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/common/index.js';
import Home from './pages/Home';

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
  const [formOpen, setFormOpen] = useState(false);
  const [beacons, setBeacons] = useState([]);

  useEffect(() => {
    const getBeaconsData = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/beacons'); // Localhost
        const response = await axios.get('https://interactivemap-1pob.onrender.com/beacons'); // Server deployed on Render
        const sanitizedBeacons = response.data.map(beacon => ({
          ...beacon,
          beaconDescription: DOMPurify.sanitize(beacon.beaconDescription),
        }));
        setBeacons(sanitizedBeacons);
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

  const closeForm = () => {
    setFormOpen(false);
  };

  return (
    <Router>
    <div>
      <Header modalState={modalState} setModalState={setModalState} closeModal={closeModal} burgerMenuOpen={burgerMenuOpen} setBurgerMenuOpen={setBurgerMenuOpen} />
      <Routes>
        <Route path="/" element={<Home formOpen={formOpen} setFormOpen={setFormOpen} closeForm={closeForm} 
        beacons={beacons}
       />} />
      </Routes>
      <Footer footerModals={footerModals} setFooterModals={setFooterModals} closeFooterModals={closeFooterModals} />
    </div>
  </Router>
  )
}

export default App
