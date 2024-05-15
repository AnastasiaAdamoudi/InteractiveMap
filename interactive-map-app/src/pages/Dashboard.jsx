import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { userData } = useAuth();

  const [userFirstname, setUserFirstname] = useState("");

  useEffect(() => {
    if (userData) {
      setUserFirstname(userData.userFirstname);
    }
    console.log("userData", userData); 
  }, [userData]);

  return (
    <section className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="welcome-message">Welcome, {userFirstname}</h1>
      </div>
    </section>
  );
};

export default Dashboard;
