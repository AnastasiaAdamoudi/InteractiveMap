import './App.css'
import { useState, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/common/index.js';
import { Home, About, BeaconForm, BeaconList, MemberList, JoinBeaconForm } from './pages/index.js';

function App() {

  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  // const [modalState, setModalState] = useState({
  //   aboutOpen: false,
  //   guidanceOpen: false,
  // });
  const [footerModals, setFooterModals] = useState({
    privacyOpen: false,
    accessibilityOpen: false,
  });

  const [beacons, setBeacons] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getBeaconsData = async () => {
      try {
        const beaconsResponse = await axios.get('http://localhost:3000/beacons'); // Localhost
        const membersResponse = await axios.get('http://localhost:3000/members');
        // const beaconsResponse = await axios.get('https://interactivemap-1pob.onrender.com/beacons'); // Server deployed on Render
        // const membersResponse = await axios.get('https://interactivemap-1pob.onrender.com/members');
        setBeacons(beaconsResponse.data);
        setMembers(membersResponse.data);
      } catch (error) {
        console.error('Error fetching beacon data:', error);
      }
    }  
    getBeaconsData();
  }, [beacons, members]);


  const closeFooterModals = () => {
    setFooterModals({
      privacyOpen: false,
      accessibilityOpen: false,
    });
  };

  return (
    <Router>
    <div>
      <Header burgerMenuOpen={burgerMenuOpen} setBurgerMenuOpen={setBurgerMenuOpen} />
      <Routes>
        <Route path="/" element={<Home beacons={beacons}
       />} />
        <Route path="/about" element={<About />} />
        <Route path="/beacon-form" element={<BeaconForm beacons={beacons} />} />
        <Route path="/beacon-list" element={<BeaconList beacons={beacons} members={members} />} />
        <Route path="/member-list" element={<MemberList beacons={beacons} members={members} />} />
        <Route path="/join-beacon-form/:beaconId" element={<JoinBeaconForm />} />
      </Routes>
      <Footer footerModals={footerModals} setFooterModals={setFooterModals} closeFooterModals={closeFooterModals} />
    </div>
  </Router>
  )
}

export default App
