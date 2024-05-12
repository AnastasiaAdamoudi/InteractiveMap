import RegisterThankYouModal from "../components/auth/RegisterThankYouModal";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const [openRegisterThankYouModal, setOpenRegisterThankYouModal] = useState(false);

  const { registerUser, error, loading } = useRegister();

  const schema = z.object({
    userFirstname: z.string().min(2, { message: "First name must be at least 2 characters long." }).nonempty("First name is required"),
    userSurname: z.string().min(2, { message: "Surname must be at least 2 characters long." }).nonempty("Surname is required"),
    username: z.string().min(4, { message: "Username must be at least 4 characters long." }).nonempty("Username is required"),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }).nonempty("Password is required"),
    userEmail: z.string().email({ message: "Please enter a valid email address." }).min(8, { message: "Email address must be at least 8 characters long." }).nonempty("Email is required"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = async (formData) => {
    registerUser(formData);
    reset();
    setOpenRegisterThankYouModal(true);
  };

  return (
    <div className="register-user-form-page">
      <h2>Register to create an account and start creating beacons</h2>
      <p>Already have an account? <Link to="/auth/login">Login here</Link></p>
      <div className="register-user-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="userFirstname">First Name<span>*</span>:</label>
          <input
            type="text"
            id="userFirstname"
            {...register("userFirstname")}
            placeholder="Enter your first name"
          />
          {errors.userFirstname && <p>{errors.userFirstname.message}</p>}
          <label htmlFor="userSurname">Surname<span>*</span>:</label>
          <input
            type="text"
            id="userSurname"
            {...register("userSurname")}
            placeholder="Enter your surname"
          />
          {errors.userSurname && <p>{errors.userSurname.message}</p>}
          <label htmlFor="username">Username<span>*</span>:</label>
          <input
            type="text"
            id="username"
            {...register("username")}
            placeholder="Enter your username"
          />
          {errors.username && <p>{errors.username.message}</p>}
          <label htmlFor="password">Password<span>*</span>:</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Enter your password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <label htmlFor="userEmail">Email<span>*</span>:</label>
          <input
            type="email"
            id="userEmail"
            {...register("userEmail")}
            placeholder="Enter your email"
          />
          {errors.userEmail && <p>{errors.userEmail.message}</p>}
          <button type="submit" className="register-user-submit-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="error-message">{error.message || 'An error occurred during registration.'}</p>}

        <Link to="/">
          <button className="register-user-cancel-button">Cancel</button>
        </Link>

        <RegisterThankYouModal open={openRegisterThankYouModal} />
      </div>
    </div>
  );
};

export default Register;