import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./login.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDocs, query, where, collection } from "firebase/firestore";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const AuthForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isLogin, setIsLogin] = useState(true); // Start with login form
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    fullName: "",
  });
  const [error, setError] = useState("");

  const toggleForm = () => {
    setError("");
    setForm({ email: "", password: "", confirmPassword: "", username: "", fullName: "" });
    setIsLogin(!isLogin); // Toggle between login and signup
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let emailToLogin = form.email;

    // If username is provided, fetch the email associated with the username
    if (form.username) {
      try {
        const usernameQuery = query(
          collection(db, "users"),
          where("username", "==", form.username)
        );
        const usernameSnapshot = await getDocs(usernameQuery);
        if (!usernameSnapshot.empty) {
          const userDoc = usernameSnapshot.docs[0];
          emailToLogin = userDoc.data().email; // Get the associated email
        } else {
          setError("Username not found.");
          return;
        }
      } catch (err) {
        setError("Error fetching user by username.");
        return;
      }
    }

    try {
      // Attempt to sign in with the email and password
      const userCredential = await signInWithEmailAndPassword(auth, emailToLogin, form.password);
      const user = userCredential.user;

      // Check if email is verified after login
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        await signOut(auth); // Log the user out if not verified
        return;
      }

      // If login is successful and email is verified
      alert("Logged in successfully!");

      // Redirect to home page
      navigate("/"); // Redirect to the home page (http://localhost:3000/)

    } catch (err) {
      setError("Invalid username/email or password.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!form.fullName.trim()) {
      setError("Full Name is required.");
      return;
    }

    try {
      const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", form.username)
      );
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        setError("Username already exists.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // Add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
      });

      // Send email verification
      await sendEmailVerification(user);
      alert("Account created successfully! Please check your email to verify your account.");

      // Log the user out immediately after sign-up
      await signOut(auth);

      // Reset form fields
      setForm({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        fullName: "",
      });

    } catch (err) {
      setError("Error: " + err.message); // Enhanced error reporting
    }
  };

  return (
    <div className={`wrapper ${isLogin ? "login-mode" : "signup-mode"}`}>
      {isLogin ? (
        <div className="form-box">
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username (or Email)"
                value={form.username}
                onChange={handleChange}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <FaLock className="icon" />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <p>
              Don’t have an account?{" "}
              <a href="#" onClick={toggleForm}>
                Sign Up
              </a>
            </p>
          </form>
        </div>
      ) : (
        <div className="form-box">
          <form onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <div className="input-box">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <FaLock className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <FaLock className="icon" />
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <a href="#" onClick={toggleForm}>
                Login
              </a>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
