import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const { userData, updateUserData, logout } = useAuth();

  const [userDetails, setUserDetails] = useState(null);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData) {
      setUserDetails(userData);
      console.log('User data when userData changes:', userData);
    }
  }, [userData]);

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (validateForm()) {
      setShowPasswordModal(true);
    }
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
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userDetails.userFirstname || userDetails.userFirstname.length < 2) {
      newErrors.userFirstname = 'First name must be at least 2 characters long.';
    }
    if (!userDetails.userSurname || userDetails.userSurname.length < 2) {
      newErrors.userSurname = 'Surname must be at least 2 characters long.';
    }
    if (!userDetails.username || userDetails.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters long.';
    }
    if (!userDetails.userEmail || userDetails.userEmail.length < 8 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.userEmail)) {
      newErrors.userEmail = 'Email address must be valid and at least 8 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
    setShowPasswordError(false); // Reset password error when the input changes
    setPasswordErrorMessage('');
  };

  const handleDeleteProfile = () => {
    setShowDeleteModal(true);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPasswordInput('');
    setShowPasswordError(false);
    setPasswordErrorMessage('');
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setPasswordInput('');
    setShowPasswordError(false);
    setPasswordErrorMessage('');
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

        const response = await axios.put('http://localhost:3000/edit-profile', userDetailsToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.status === 'success') {
          const updatedUserData = response.data.updatedUser;
          Cookies.set('userData', encodeURIComponent(JSON.stringify(updatedUserData)), { expires: 1 });
          setUserDetails(updatedUserData);
          setShowPasswordModal(false);
          setIsEditing(false);
        } else {
          setShowPasswordError(true);
          setPasswordErrorMessage(response.data.message || 'Incorrect password. Please try again.');
        }
      } else {
        console.error('User details not available');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setShowPasswordError(true);
      setPasswordErrorMessage('Incorrect password. Please try again.');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/delete-profile', {
        data: { password: passwordInput },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'success') {
        Cookies.remove('userData');
        Cookies.remove('token');
        logout();
        Navigate('/');
      } else {
        setShowPasswordError(true);
        setPasswordErrorMessage(response.data.message || 'Incorrect password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setShowPasswordError(true);
      setPasswordErrorMessage('Incorrect password. Please try again.');
    }
  };

  return (
    <section className="dashboard-container">
      <div className="user-details">
        {userDetails && (
          <>
            <h1 className="welcome-message">Welcome, {userDetails.userFirstname}</h1>
            <p>
              Name: {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="userFirstname"
                    value={userDetails.userFirstname}
                    onChange={handleChange}
                  />
                  {errors.userFirstname && <span className="error">{errors.userFirstname}</span>}
                </div>
              ) : (
                userDetails.userFirstname
              )}
            </p>
            <p>
              Surname: {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="userSurname"
                    value={userDetails.userSurname}
                    onChange={handleChange}
                  />
                  {errors.userSurname && <span className="error">{errors.userSurname}</span>}
                </div>
              ) : (
                userDetails.userSurname
              )}
            </p>
            <p>
              Email: {isEditing ? (
                <div>
                  <input
                    type="email"
                    name="userEmail"
                    value={userDetails.userEmail}
                    onChange={handleChange}
                  />
                  {errors.userEmail && <span className="error">{errors.userEmail}</span>}
                </div>
              ) : (
                userDetails.userEmail
              )}
            </p>
            <p>
              Username: {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                  />
                  {errors.username && <span className="error">{errors.username}</span>}
                </div>
              ) : (
                userDetails.username
              )}
            </p>
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
          <>
            <button onClick={handleEdit}>Edit Profile</button>
            <button onClick={handleDeleteProfile}>Delete Profile</button>
          </>
        )}
      </div>

      <Modal open={showPasswordModal} onClose={handlePasswordModalClose}>
        <h2>Confirm Password</h2>
        {showPasswordError && <div className="error-message">{passwordErrorMessage}</div>}
        <p>Please enter your current password to save changes:</p>
        <input type="password" value={passwordInput} onChange={handlePasswordInputChange} />
        <button onClick={handleConfirmSave}>Confirm</button>
      </Modal>

      <Modal open={showDeleteModal} onClose={handleDeleteModalClose}>
        <h2>Confirm Delete Profile</h2>
        {showPasswordError && <div className="error-message">{passwordErrorMessage}</div>}
        <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
        <p>Please enter your current password to confirm:</p>
        <input type="password" value={passwordInput} onChange={handlePasswordInputChange} />
        <button onClick={handleConfirmDelete}>Confirm Delete</button>
      </Modal>
    </section>
  );
};

export default Dashboard;
