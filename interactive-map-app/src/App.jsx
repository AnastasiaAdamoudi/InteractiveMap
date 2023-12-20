import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/common/index.js';
import Home from './pages/Home';
import { beaconsData } from './data/beaconsData';

function App() {

  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [modalState, setModalState] = useState({
    aboutOpen: false,
    guidanceOpen: false,
  });
  const [formOpen, setFormOpen] = useState(false);
  const [beacons, setBeacons] = useState(beaconsData);

  const closeModal = () => {
    setModalState({
      aboutOpen: false,
      guidanceOpen: false,
    });
  };  

  const closeForm = () => {
    setFormOpen(false);
  };

  const beaconArrayLength = beacons.length;

  const updateBeacons = (newBeacon) => {
    setBeacons([...beacons, newBeacon]);
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
