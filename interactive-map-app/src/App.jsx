import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./contexts/AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Header, Footer } from "./components/common/index.js";
import {
  Home,
  About,
  Register,
  Login,
  ForgotPassword,
  Dashboard,
  BeaconForm,
  BeaconList,
  MemberList,
} from "./pages/index.js";

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitClick, setSubmitClick] = useState(false);
  const { isAuthenticated } = useAuth();
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [footerModals, setFooterModals] = useState({
    privacyOpen: false,
    accessibilityOpen: false,
  });
  const [beacons, setBeacons] = useState([]);
  const [users, setUsers] = useState([]);

  const updateClick = useCallback(() => {
    setSubmitClick((prevSubmitClick) => !prevSubmitClick);
  }, []);

  // useEffect(() => {
  //   const checkAuthentication = () => {
  //     const userData = Cookies.get("userData");
  //     if (userData) {
  //       setIsAuthenticated(true);
  //     }
  //     setIsCheckingAuth(false);
  //   };

  //   checkAuthentication();
  // }, []);

  useEffect(() => {
    const getBeaconsData = async () => {
      try {
        const beaconsResponse = await axios.get(
          "http://localhost:3000/beacons"
        );
        const usersResponse = await axios.get("http://localhost:3000/users");
        setBeacons(beaconsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching beacon data:", error);
      }
    };
    getBeaconsData();
  }, []);

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
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
          <Route
            path="/auth/register"
            element={<Register updateClick={updateClick} />}
          />
          <Route
            path="/auth/login"
            element={<Login updateClick={updateClick} />}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated || Cookies.get("userData") ? (
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
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
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