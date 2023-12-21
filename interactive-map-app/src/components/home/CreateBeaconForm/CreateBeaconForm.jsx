import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./CreateBeaconForm.css";
// import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const CreateBeaconForm = ({
  isOpen,
  onClose,
  beacons,
  updateBeacons,
  beaconArrayLength,
}) => {
  const closeIcon = (
    <svg fill="#660066" viewBox="0 0 20 20" width={28} height={28}>
      <path
        fillRule="evenodd"
        d="M4,4 L16,16 M4,16 L16,4"
        stroke="#660066"
        strokeWidth="3"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const schema = z.object({
    creatorName: z.string().nonempty({ message: "Creator name is required" }),
    creatorEmail: z.string().email({ message: "Invalid email address" }),
    beaconName: z.string().nonempty({ message: "Beacon name is required" }),
    beaconLocation: z
      .string()
      .nonempty({ message: "Beacon location is required" }),
    beaconLatitude: z
      .string()
      .nonempty({ message: "Beacon latitude is required" }),
    beaconLongitude: z
      .string()
      .nonempty({ message: "Beacon longitude is required" }),
    beaconDescription: z
      .string()
      .nonempty({ message: "Beacon description is required" }),
    // beaconUrl: z.string()
    //   .url({ message: "Invalid URL" })
    //   .optional(),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const formatToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentDate = new Date();
  const formattedDate = formatToDDMMYYYY(currentDate.toISOString());

  const onSubmit = async (formData) => {
    try {
      const newBeacon = {
        number: beaconArrayLength > 0 ? beaconArrayLength + 1 : 1,
        creatorName: formData.creatorName,
        creatorEmail: formData.creatorEmail,
        createdOn: formattedDate,
        beaconName: formData.beaconName,
        beaconLocation: formData.beaconLocation,
        beaconLatitude: parseFloat(formData.beaconLatitude),
        beaconLongitude: parseFloat(formData.beaconLongitude),
        beaconDescription: formData.beaconDescription,
        // beaconUrl: formData.beaconUrl,
      };

      console.log("Beacons: ", beacons);
      console.log("Form data: ", formData);
      console.log("New beacon created: ", newBeacon);

      // await axios.post('API_ENDPOINT_ADD_BEACON', newBeacon);

      updateBeacons(newBeacon);

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

      onClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      center
      closeIcon={closeIcon}
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
    >
      <div className="form-container">
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
              <div className="error-message">
                {errors?.creatorName?.message}
              </div>
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
              <div className="error-message">
                {errors?.creatorEmail?.message}
              </div>
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
              <div className="error-message">
                {errors?.beaconLocation?.message}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="beaconDescription" className="form-label">
                Beacon Description
              </label>
              <textarea
                {...register("beaconDescription", { required: true })}
                className="form-control"
                id="beaconDescription"
                placeholder="Enter beacon description"
              ></textarea>
              <div className="error-message">
                {errors?.beaconDescription?.message}
              </div>

              <div className="error-message">
                {errors?.beaconDescription?.message}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="beaconLatitude" className="form-label">
                Beacon Latitude
              </label>
              <input
                {...register("beaconLatitude", { required: true })}
                type="number"
                step="any"
                className="form-control"
                id="beaconLatitude"
                placeholder="Enter beacon latitude"
              />
              <div className="error-message">
                {errors?.beaconLatitude?.message}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="beaconLongitude" className="form-label">
                Beacon Longitude
              </label>
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
        </div>
      </div>
    </Modal>
  );
};

export default CreateBeaconForm;
