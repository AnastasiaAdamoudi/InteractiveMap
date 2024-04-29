import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { tooltipIcon } from "../../assets";
import ThankYouModal from "./ThankYouModal";
import PropTypes from "prop-types";

const BeaconForm = ({ beacons }) => {
  BeaconForm.propTypes = {
    beacons: PropTypes.array.isRequired,
  };

  const [openModal, setOpenModal] = useState(false);

  const schema = z.object({
    creatorName: z
    .string()
    .min(2, { message: "Creator name must be at least 2 characters long" })
    .nonempty({ message: "Creator name is required" }),
    creatorEmail: z
      .string()
      .email({ message: "Invalid email address" })
      .min(8, { message: "Creator email must be at least 8 characters long" })
      .nonempty({ message: "Creator email is required" }),
    beaconName: z
    .string()
    .min(2, { message: "Beacon name must be at least 2 characters long" })
    .nonempty({ message: "Beacon name is required" }),
    beaconLocation: z
      .string()
      .min(2, { message: "Beacon location must be at least 2 characters long" })
      .nonempty({ message: "Beacon location is required" }),
    beaconDescription: z
      .string()
      .min(20, { message: "Description must be at least 20 characters long" })
      .nonempty({ message: "Beacon description is required" }),
    beaconLatitude: z
      .string()
      .min(1, { message: "Latitude is required" })
      .refine((val) => !isNaN(parseFloat(val)), {
        message: "Latitude must be a valid number",
      })
      .refine((val) => parseFloat(val) >= -90 && parseFloat(val) <= 90, {
        message: "Latitude must be between -90 and 90",
      }),
    beaconLongitude: z
      .string()
      .min(1, { message: "Longitude is required" })
      .refine((val) => !isNaN(parseFloat(val)), {
        message: "Longitude must be a valid number",
      })
      .refine((val) => parseFloat(val) >= -180 && parseFloat(val) <= 180, {
        message: "Longitude must be between -180 and 180",
      }), 
      // beaconUrl: z.string()
      //   .url({ message: "Invalid URL" })
      //   .optional(),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  // const formatToDDMMYYYY = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  // const currentDate = new Date();
  // const formattedDate = formatToDDMMYYYY(currentDate.toISOString());

  const onSubmit = async (formData) => {

    try {

    // if a pair of latitude and longitude already exists, add a small offset to the new latitude and longitude to prevent overlapping markers
    const isDuplicateCoordinates = beacons.some(
      (beacon) =>
        beacon.beaconLatitude === parseFloat(formData.beaconLatitude) &&
        beacon.beaconLongitude === parseFloat(formData.beaconLongitude)
    );

    let newLatitude = parseFloat(formData.beaconLatitude);
    let newLongitude = parseFloat(formData.beaconLongitude);

    if (isDuplicateCoordinates) {
      newLatitude += 0.001; 
      newLongitude += 0.001;
    }

    const newBeacon = {
      id: response.data.id,
      creatorName: formData.creatorName,
      creatorEmail: formData.creatorEmail,
      createdOn: new Date().toISOString(),
      beaconName: formData.beaconName,
      beaconLocation: formData.beaconLocation,
      beaconDescription: formData.beaconDescription,
      beaconLatitude: newLatitude,
      beaconLongitude: newLongitude,
      // beaconUrl: formData.beaconUrl,
    };

      console.log("Beacons: ", beacons);
      console.log("Form data: ", formData);
      console.log("New beacon created: ", newBeacon);

      // const response = await axios.post(
      //   "http://localhost:3000/beacons",
      //   newBeacon
      // );

      const response = await axios.post(
        "https://interactivemap-1pob.onrender.com/beacons",
        newBeacon,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("This is the response sent to the server: ", response.data);

      reset({
        creatorName: "",
        creatorEmail: "",
        beaconName: "",
        beaconLocation: "",
        beaconLatitude: "",
        beaconLongitude: "",
        beaconDescription: "",
        // beaconUrl: "",
      });

      setOpenModal(true);

    } catch (error) {
      console.error("Error creating new beacon: ", error);
    }
  };

  return (
    <div className="form-content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="creatorName" className="form-label">
            Creator Name
          </label>
          <input
            {...register("creatorName", { required: true })}
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
          />
          <div className="error-message">{errors?.creatorName?.message}</div>
        </div>

        <div className="form-group">
          <label htmlFor="creatorEmail" className="form-label">
            Creator Email
          </label>
          <input
            {...register("creatorEmail", { required: true })}
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
          />
          <div className="error-message">{errors?.creatorEmail?.message}</div>
        </div>

        <div className="form-group">
          <label htmlFor="beaconName" className="form-label">
            Beacon Name
          </label>
          <input
            {...register("beaconName", { required: true })}
            type="text"
            className="form-control"
            id="beaconName"
            placeholder="Enter beacon name"
          />
          <div className="error-message">{errors?.beaconName?.message}</div>
        </div>

        <div className="form-group">
          <label htmlFor="beaconLocation" className="form-label">
            Beacon Location
          </label>
          <input
            {...register("beaconLocation", { required: true })}
            type="text"
            className="form-control"
            id="beaconLocation"
            placeholder="Enter beacon location"
          />
          <div className="error-message">{errors?.beaconLocation?.message}</div>
        </div>

        <div className="form-group">
          <label htmlFor="beaconDescription" className="form-label">
            Beacon Description
          </label>
          <textarea
            {...register("beaconDescription", { required: true })}
            className="form-control"
            id="beaconDescription"
            placeholder="This Beacon will be aiming to connect people locally, to bring people together around iconic times of seasonal transition such as Solstices and Equinoxes.

Our immediate mission will be to meet regularly and discuss what we can do to further world harmony and societal change.

(Please edit text specifically for your Beacon.)"
          ></textarea>
          <div className="error-message">
            {errors?.beaconDescription?.message}
          </div>
        </div>

        <div className="form-group">
          <div className="title-line">
            <div className="input-title">
              <label htmlFor="beaconLatitude" className="form-label">
                Beacon Latitude
              </label>
            </div>
            <div className="tooltip-icon-container">
              <a
                data-tooltip-id="latitudeTip"
                data-tooltip-content={
                  "Latitude is a geographic coordinate that specifies the north-south position of a point on the Earth's surface. To make sure your Latitude input is the one that shows the north-south position (N/S)."
                }
                data-tooltip-place="top"
                className="tooltip-icon"
              >
                <img
                  src={tooltipIcon}
                  alt="tooltip-icon"
                  className="tooltip-icon"
                />
              </a>
            </div>
            <Tooltip
              id="latitudeTip"
              place="top"
              effect="solid"
              className="tooltip"
            />
          </div>
          <input
            {...register("beaconLatitude", { required: true })}
            type="number"
            step="any"
            className="form-control"
            id="beaconLatitude"
            placeholder="Enter beacon latitude"
          />
          <div className="error-message">{errors?.beaconLatitude?.message}</div>
        </div>

        <div className="form-group">
          <div className="title-line">
            <div className="input-title">
              <label htmlFor="beaconLongitude" className="form-label">
                Beacon Longitude
              </label>
            </div>
            <div className="tooltip-icon-container">
              <a
                data-tooltip-id="longitudeTip"
                data-tooltip-content={
                  "Longitude is a geographic coordinate that specifies the east-west position of a point on the Earth's surface. To make sure your Longitude input is the one that shows the east-west position (E/W)."
                }
                data-tooltip-place="top"
                className="tooltip-icon"
              >
                <img
                  src={tooltipIcon}
                  alt="tooltip-icon"
                  className="tooltip-icon"
                />
              </a>
            </div>
            <Tooltip
              id="longitudeTip"
              place="top"
              effect="solid"
              className="tooltip"
            />
          </div>
          <input
            {...register("beaconLongitude", { required: true })}
            type="number"
            step="any"
            className="form-control"
            id="beaconLongitude"
            placeholder="Enter beacon longitude"
          />
          <div className="error-message">
            {errors?.beaconLongitude?.message}
          </div>
        </div>

        {/* <div className="form-group">
              <label htmlFor="beaconUrl" className="form-label">Beacon URL</label>
              <input
                {...register("beaconUrl")}
                type="text"
                className="form-control"
                id="beaconUrl"
                placeholder="Enter beacon URL"
              />
              <div className="error-message">{errors?.beaconUrl?.message}</div>
            </div> */}

        <div className="submit-button-container">
          <button type="submit" className="submit-button">
            Create Beacon
          </button>
        </div>
      </form>

      <ThankYouModal open={openModal} onClose={() => setOpenModal(false)} />

    </div>
  );
};

export default BeaconForm;
