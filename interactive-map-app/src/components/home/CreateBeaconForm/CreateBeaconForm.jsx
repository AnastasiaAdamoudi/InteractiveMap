import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./CreateBeaconForm.css";
import axios from "axios";
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
    <svg fill="#6227a1" viewBox="0 0 40 40" width={40} height={40}>
      <path
        d="M 10,10 L 30,30 M 30,10 L 10,30"
        stroke="purple"
        strokeWidth="3"
      />
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
    beaconUrl: z.string(),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = async (formData) => {
    try {
      const newBeacon = {
        number: beaconArrayLength + 1,
        creatorName: formData.creatorName,
        creatorEmail: formData.creatorEmail,
        beaconName: formData.beaconName,
        beaconLocation: formData.beaconLocation,
        beaconLatitude: parseFloat(formData.beaconLatitude),
        beaconLongitude: parseFloat(formData.beaconLongitude),
        beaconDescription: formData.beaconDescription,
        beaconUrl: formData.beaconUrl,
      };

      console.log("Beacons: ", beacons);
      console.log("Form data: ", formData);
      console.log("New beacon created: ", newBeacon);

      // await axios.post('/api/update-beacons-data', newBeacon);

      updateBeacons(newBeacon);

      reset({
        creatorName: "",
        creatorEmail: "",
        beaconName: "",
        beaconLocation: "",
        beaconLatitude: "",
        beaconLongitude: "",
        beaconDescription: "",
        beaconUrl: "",
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
      <div className="text-popups-container">
        <div className="text-popups-text">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="creatorName">Creator Name</label>
              <input
                {...register("creatorName", { required: true })}
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
              />
              <div style={{ color: "red" }}>{errors?.creatorName?.message}</div>
            </div>

            <div className="form-group">
              <label htmlFor="creatorEmail">Creator Email</label>
              <input
                {...register("creatorEmail", { required: true })}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
              <div style={{ color: "red" }}>
                {errors?.creatorEmail?.message}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="beaconName">Beacon Name</label>
              <input
                {...register("beaconName", { required: true })}
                type="text"
                className="form-control"
                id="beaconName"
                placeholder="Enter beacon name"
              />
              <div style={{ color: "red" }}>{errors?.beaconName?.message}</div>
            </div>

            <div className="form-group">
              <label htmlFor="beaconLocation">Beacon Location</label>
              <input
                {...register("beaconLocation", { required: true })}
                type="text"
                className="form-control"
                id="beaconLocation"
                placeholder="Enter beacon location"
              />
              <div style={{ color: "red" }}>
                {errors?.beaconLocation?.message}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="beaconDescription">Beacon Description</label>
              <input
                {...register("beaconDescription", { required: true })}
                type="text"
                className="form-control"
                id="beaconDescription"
                placeholder="Enter beacon description"
              />
              <div style={{ color: "red" }}>
                {errors?.beaconDescription?.message}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="beaconLatitude">Beacon Latitude</label>
              <input
                {...register("beaconLatitude", { required: true })}
                type="number"
                step="any"
                className="form-control"
                id="beaconLatitude"
                placeholder="Enter beacon latitude"
              />
              <div style={{ color: "red" }}>
                {errors?.beaconLatitude?.message}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="beaconLongitude">Beacon Longitude</label>
              <input
                {...register("beaconLongitude", { required: true })}
                type="number"
                step="any"
                className="form-control"
                id="beaconLongitude"
                placeholder="Enter beacon longitude"
              />
              <div style={{ color: "red" }}>
                {errors?.beaconLongitude?.message}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="beaconUrl">Beacon URL</label>
              <input
                {...register("beaconUrl")}
                type="text"
                className="form-control"
                id="beaconUrl"
                placeholder="Enter beacon URL"
              />
              <div style={{ color: "red" }}>{errors?.beaconUrl?.message}</div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateBeaconForm;
