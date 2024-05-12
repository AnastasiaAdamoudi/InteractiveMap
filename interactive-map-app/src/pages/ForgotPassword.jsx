import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const errRef = useRef();
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const schema = z.object({
    userEmail: z.string().email({ message: "Invalid email address" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (errRef.current) {
      errRef.current.focus();
    }
  }, []);

  const clearErrors = () => {
    setEmailError("");
    setGeneralError("");
  };

  const onSubmit = async (formData) => {
    clearErrors();

    try {
      const response = await axios.post(
        "http://localhost:3000/forgot-password",
        {
          email: formData.userEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`Server response: ${JSON.stringify(response.data)}`);

      reset();

      // Handle successful response from the server
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 400) {
            setEmailError("Invalid email address.");
          } else {
            setGeneralError(`Server Error: ${err.response.data}`);
          }
        } else {
          setGeneralError("Network error occurred. Please try again later.");
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className="forgot-password-container">
      <div className="forgot-password-form-container">
        <div className="forgot-password-form-content">
          <h2>Enter your email to reset your password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="userEmail" className="form-label">
                User email
              </label>
              <input
                {...register("userEmail", { required: true })}
                type="text"
                className="form-control"
                id="userEmail"
                placeholder="Enter your email address"
                onChange={clearErrors}
              />
              <div className="error-message">{errors?.userEmail?.message}</div>
              <div className="error-message">{emailError}</div>
            </div>

            <div className="submit-button-container">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
            <Link to="/">
              <button className="cancel-button">Cancel</button>
            </Link>
          </form>
          {generalError && (
            <div className="error-message">{generalError}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;