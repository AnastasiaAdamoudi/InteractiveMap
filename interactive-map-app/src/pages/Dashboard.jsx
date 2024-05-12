import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Dashboard = ({
  logout,
  userName,
  formSubmitted,
  setFormSubmitted,
}) => {
  Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
  };

  return (
    <section className="dashboard-container">
        <div className="dashboard-content">
      <h1 className="welcome-message">Welcome, {userName}</h1>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
     
    </section>
  );
};

export default Dashboard;
