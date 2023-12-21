import './App.css'
import { useState, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/common/index.js';
import Home from './pages/Home';
import { beaconsData } from "./data/beaconsData.js";

function App() {

  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [modalState, setModalState] = useState({
    aboutOpen: false,
    guidanceOpen: false,
  });
  const [formOpen, setFormOpen] = useState(false);
  const [beacons, setBeacons] = useState(beaconsData);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('API_ENDPOINT_GET_BEACONS');
  //       setBeacons(response.data);
  //     } catch (error) {
  //       console.error('Error fetching beacon data:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []); // Empty dependency array for initial fetch

  const beaconArrayLength = beaconsData.length;

  // useEffect(() => {
  //   const getUpdatedBeacons = async () => {
  //     try {
  //       const response = await axios.get('API_ENDPOINT_GET_BEACONS');
  //       setBeacons(response.data);
  //     } catch (error) {
  //       console.error('Error fetching beacon data:', error);
  //     }
  //   }
  //   getUpdatedBeacons();
  // }
  // , [beaconArrayLength]); // Dependency array for subsequent fetches when beacons array length changes

  const updateBeacons = (newBeacon) => {
    setBeacons([...beacons, newBeacon]);
  };  

  const closeModal = () => {
    setModalState({
      aboutOpen: false,
      guidanceOpen: false,
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
        beacons={beacons} updateBeacons={updateBeacons} beaconArrayLength={beaconArrayLength} 
       />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  )
}

export default App
