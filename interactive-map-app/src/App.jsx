import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./contexts/AuthProvider";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Header, Footer } from "./components/common/index.js";
import {
  Home,
  About,
  Register,
  Login,
  Dashboard,
  BeaconForm,
  BeaconList,
  MemberList,
} from "./pages/index.js";

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitClick, setSubmitClick] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {isAuthenticated, setIsAuthenticated} = useAuth();

  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [footerModals, setFooterModals] = useState({
    privacyOpen: false,
    accessibilityOpen: false,
  });
  const [beacons, setBeacons] = useState([]);
  const [users, setUsers] = useState([]);

  const updateClick = useCallback(() => {
    submitClick ? setSubmitClick(false) : setSubmitClick(true);
  }, [submitClick]);

  useEffect(() => {
    const getBeaconsData = async () => {
      try {
        const beaconsResponse = await axios.get(
          "http://localhost:3000/beacons"
        ); // Localhost
        const usersResponse = await axios.get(
          "http://localhost:3000/users"
        );
        // const beaconsResponse = await axios.get('https://interactivemap-1pob.onrender.com/beacons'); // Server deployed on Render
        // const membersResponse = await axios.get('https://interactivemap-1pob.onrender.com/users');
        setBeacons(beaconsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching beacon data:", error);
      }
    };
    getBeaconsData();
  }, [beacons, users]);

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // Call the logout function from the AuthContext
      await logout();

      // Redirect the user to the home page
      Navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
        <Header
          burgerMenuOpen={burgerMenuOpen}
          setBurgerMenuOpen={setBurgerMenuOpen}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                beacons={beacons}
                formSubmitted={formSubmitted}
                setFormSubmitted={setFormSubmitted}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/beacon-form"
            element={
              isAuthenticated ? (
              <BeaconForm
                beacons={beacons}
                formSubmitted={formSubmitted}
                setFormSubmitted={setFormSubmitted}
              />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/auth/login"
            element={<Login updateClick={updateClick} />}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard
                  handleLogout={handleLogout}
                  formSubmitted={formSubmitted}
                  setFormSubmitted={setFormSubmitted}
                />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />
          <Route
            path="/beacon-list"
            element={
              <BeaconList
                beacons={beacons}
                users={users}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/member-list"
            element={
              <MemberList
                beacons={beacons}
                users={users}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
        <Footer
          footerModals={footerModals}
          setFooterModals={setFooterModals}
          closeFooterModals={closeFooterModals}
        />
      </div>
    </Router>
  );
}

export default App;
