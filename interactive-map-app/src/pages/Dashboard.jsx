import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const { userData, updateUserData } = useAuth();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (userData) {
      setUserDetails(userData);
      console.log('User data when userData changes:', userData);
    }
  }, [userData]);

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setShowPasswordModal(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserDetails(userData); // Reset userDetails to the initial userData

    console.log('User data after cancel:', userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };

  const handleConfirmSave = async () => {
    try {
      if (userDetails) {
        const userDetailsToSend = {
          userFirstname: userDetails.userFirstname,
          userSurname: userDetails.userSurname,
          username: userDetails.username,
          userEmail: userDetails.userEmail,
          password: passwordInput,
        };
  
        console.log('User details to be sent to the server:', userDetailsToSend);
  
        const response = await axios.put('http://localhost:3000/edit-profile', userDetailsToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Profile update response from the server:', response);
  
        if (response.data.status === 'success') {
          const updatedUserData = response.data.updatedUser;
          console.log('User details updated:', updatedUserData);
          Cookies.set('userData', encodeURIComponent(JSON.stringify(updatedUserData)), { expires: 1 });
          setUserDetails(updatedUserData);
        } else {
          console.error('Error updating profile:', response.data.message);
        }
      } else {
        console.error('User details not available');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  
    setShowPasswordModal(false);
    setIsEditing(false);
  };

  return (
    <section className="dashboard-container">
      <div className="user-details">
        {userDetails && (
          <>
            <h1 className="welcome-message">Welcome, {userDetails.userFirstname}</h1>
            <p>Name: {isEditing ? <input type="text" name="userFirstname" value={userDetails.userFirstname} onChange={handleChange} /> : userDetails.userFirstname}</p>
            <p>Surname: {isEditing ? <input type="text" name="userSurname" value={userDetails.userSurname} onChange={handleChange} /> : userDetails.userSurname}</p>
            <p>Email: {isEditing ? <input type="email" name="userEmail" value={userDetails.userEmail} onChange={handleChange} /> : userDetails.userEmail}</p>
            <p>Username: {isEditing ? <input type="text" name="username" value={userDetails.username} onChange={handleChange} /> : userDetails.username}</p>
          </>
        )}
      </div>
      <div className="edit-profile-button">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit Profile</button>
        )}
      </div>

      <Modal open={showPasswordModal} onClose={handlePasswordModalClose}>
        <h2>Confirm Password</h2>
        <p>Please enter your current password to save changes:</p>
        <input type="password" value={passwordInput} onChange={handlePasswordInputChange} />
        <button onClick={handleConfirmSave}>Confirm</button>
      </Modal>
    </section>
  );
};

export default Dashboard;