import JoinThankYouModal from "../components/home/Map/JoinThankYouModal";
import axios from "axios";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const JoinBeaconForm = () => {

  const { beaconId } = useParams();

  const [openJoinThankYouModal, setOpenJoinThankYouModal] = useState(false);

  const schema = z.object({
    memberName: z
      .string()
      .min(2, {
        message: "Beacon member name must be at least 2 characters long.",
      })
      .nonempty(),
    memberEmail: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .min(8, { message: "Email address must be at least 8 characters long." })
      .nonempty(),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = async (formData) => {
    try {
      const newMember = {
        memberName: formData.memberName,
        memberEmail: formData.memberEmail,
      };

      console.log("Beacon ID:", beaconId);
      console.log("Form data:", formData);
      console.log("New member created:", newMember);

      const response = await axios.post(
        `http://localhost:3000/members/${beaconId}/join`,
        newMember,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("This is the response sent to the server: ", response.data);

      reset({
        memberName: "",
        memberEmail: "",
      });

      setOpenJoinThankYouModal(true);

    } catch (error) {
      console.error("Failed to join beacon:", error);
    }
  };

  return (
    <div className="join-beacon-form-page">
      <h2>Complete your details to join this beacon</h2>
      <div className="join-beacon-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="memberName">Your name:</label>
          <input
            type="text"
            id="memberName"
            {...register("memberName")}
            placeholder="Enter your name"
          />
          {errors.memberName && <p>{errors.memberName.message}</p>}
          <label htmlFor="memberEmail">Your email:</label>
          <input
            type="email"
            id="memberEmail"
            {...register("memberEmail")}
            placeholder="Enter your email"
          />
          {errors.memberEmail && <p>{errors.memberEmail.message}</p>}
          <button type="submit" className="join-beacon-submit-button">
            Join this beacon
          </button>
        </form>

        <Link to="/">
          <button className="join-beacon-cancel-button">Cancel</button>
        </Link>

        <JoinThankYouModal
          open={openJoinThankYouModal}
        />
      </div>
    </div>
  );
};

export default JoinBeaconForm;
