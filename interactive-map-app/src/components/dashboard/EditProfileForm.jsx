import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-responsive-modal';

const EditProfileForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    userFirstname: "",
    userSurname: "",
    username: "",
    userEmail: "",
    currentPassword: "",
    newPassword: ""
  });

  useEffect(() => {
    // Fetch current user data and pre-fill the form
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/edit-profile", { withCredentials: true });
        const { userFirstname, userSurname, username, userEmail } = response.data;
        setFormData({ ...formData, userFirstname, userSurname, username, userEmail });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/edit-profile", formData, {
        withCredentials: true
      });
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error.response.data);
    }
  };

  return (
    <Modal open={open} onClose={onClose} center>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userFirstname"
          value={formData.userFirstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="userSurname"
          value={formData.userSurname}
          onChange={handleChange}
          placeholder="Surname"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {/* Password fields are not pre-filled */}
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
          required
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button type="submit">Save Changes</button>
      </form>
    </Modal>
  );
};

export default EditProfileForm;
