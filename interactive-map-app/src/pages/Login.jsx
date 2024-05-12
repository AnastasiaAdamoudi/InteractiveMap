import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthProvider";
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = ({ updateClick }) => {
  Login.propTypes = {
    updateClick: PropTypes.func.isRequired,
  };

  const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

  const { login } = useAuth(); 
  const navigate = useNavigate();

  const errRef = useRef();

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const schema = z.object({
    username: z.string().nonempty({ message: "Username is required" }),
    password: z.string().nonempty({ message: "Password is required" }),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  useEffect(() => {
    if (errRef.current) {
      errRef.current.focus();
    }
  }, []);

  const clearErrors = () => {
    setUsernameError("");
    setPasswordError("");
    setGeneralError("");
  };

  const onSubmit = async (formData) => {
    clearErrors();

    try {
      const userDetails = {
        username: formData.username,
        password: formData.password,
      };

      console.log(`User details: ${JSON.stringify(userDetails)}`);
      console.log(`Form data to be sent to the server: ${JSON.stringify(formData)}`);

      const response = await axios.post(
        "http://localhost:3000/login",
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, userData } = response.data;

      console.log(`Token response from server: ${token}`);
      console.log(`User data response from server: ${JSON.stringify(userData)}`);

      login(token, userData); 
      navigate("/");

      updateClick();

      reset({
        username: "",
        password: "",
      });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setGeneralError("Wrong password. Please check your password and try again.");
        } else if (err.response.status === 404) {
          setGeneralError("User not found. Please check your username and try again. If you don't have an account, please register.");
        } else if (err.response.status === 400) {
          setGeneralError("Missing username or password.");
        } else {
          setGeneralError(`Server Error: ${err.response.data}`);
        }
      } else if (err.name === "ValidationError") {
        err.errors.forEach((validationError) => {
          if (validationError.path === "username") {
            setUsernameError(validationError.message);
          } else if (validationError.path === "password") {
            setPasswordError(validationError.message);
          }
        });
      } else if (axios.isAxiosError(err)) {
        setGeneralError("Network error occurred. Please try again later.");
      } else {
        setGeneralError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className="login-container">
      <div className="logo-container"></div>
      <div className="login-form-container">
        <div className="login-form-content">
          <h2>Log in to your account to access your beacons and create new beacons</h2>
          <p>Don't have an account? <Link to="/auth/register">Register here</Link></p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter the username"
                onChange={clearErrors}
              />
              <div className="error-message">{errors?.username?.message || usernameError}</div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="form-control"
          {...register("password")}
          placeholder="Enter your password"
          onChange={clearErrors}
        />
        {showPassword ? (
          <FiEyeOff onClick={togglePasswordVisibility} className="eye-icon" />
        ) : (
          <FiEye onClick={togglePasswordVisibility} className="eye-icon" />
        )}
      </div>
              <div className="error-message">{errors?.password?.message || passwordError}</div>
            </div>

            <div className="submit-button-container">
              <button type="submit" className="submit-button">
                Log in
              </button>
            </div>
            <Link to="/">
              <button className="register-user-cancel-button">Cancel</button>
            </Link>
            <div className="forgot-password-container">
              <Link to="/auth/forgot-password">Forgot your password?</Link>
            </div>
          </form>
          {generalError && (
            <div className="error-message">{generalError}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;