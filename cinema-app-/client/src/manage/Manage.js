import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updatePassword,
  updateProfile,
  signOut
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Manage = ({ userInfo, handleLogout }) => {
  const [fullName, setFullName] = useState(userInfo?.fullName || '');
  const [username, setUsername] = useState(userInfo?.username || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const nameParts = fullName.trim().split(' ');

    if (nameParts.length < 2 || nameParts.some(part => part.length < 2)) {
      errors.fullName = 'Full name must have at least two parts, each with 2 or more characters.';
    }

    if (username.length < 6) {
      errors.username = 'Username must be at least 6 characters long.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (newPassword && !passwordPattern.test(newPassword)) {
      errors.newPassword = 'Password must be at least 8 characters, with uppercase, lowercase, and a number.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);

      if (fullName !== userInfo?.fullName) {
        await updateProfile(auth.currentUser, { displayName: fullName });
        await updateDoc(doc(db, 'users', auth.currentUser.uid), { fullName });
      }

      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }

      if (username !== userInfo?.username) {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), { username });
      }

      setSuccessMessage('Your information has been successfully updated!');
      await signOut(auth);
      setSuccessMessage('Successfully logged out!');

      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Failed to update profile. Please check your current password and try again.');
    }
  };

  return (
    <div className="wrapper">
      <div className="manage-container">
        <form onSubmit={handleSubmit} className="manage-form">
          <h2>Manage Your Account</h2>

          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <label>Full Name</label>
          <div className="input-box">
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Full Name"
            />
            {formErrors.fullName && <p className="error">{formErrors.fullName}</p>}
          </div>

          <label>Username</label>
          <div className="input-box">
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
            />
            {formErrors.username && <p className="error">{formErrors.username}</p>}
          </div>

          <label>Email</label>
          <div className="input-box">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
            {formErrors.email && <p className="error">{formErrors.email}</p>}
          </div>

          <label>New Password</label>
          <div className="input-box">
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
            {formErrors.newPassword && <p className="error">{formErrors.newPassword}</p>}
          </div>

          <label>Current Password</label>
          <div className="input-box">
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              required
            />
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Manage;
