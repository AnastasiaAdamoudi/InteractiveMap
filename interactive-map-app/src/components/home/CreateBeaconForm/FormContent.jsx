import "./FormPopup.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { beaconsData } from "../../../data/beaconsData.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    creatorName: z.string().nonempty({ message: "Creator name is required" }),
    creatorEmail: z.string().email({ message: "Invalid email address" }),
    beaconName: z.string().nonempty({ message: "Beacon name is required" }),
    beaconLocation: z.string().nonempty({ message: "Beacon location is required" }),
    beaconLatitude: z.string().nonempty({ message: "Beacon latitude is required" }),
    beaconLongitude: z.string().nonempty({ message: "Beacon longitude is required" }),
    beaconDescription: z.string().nonempty({ message: "Beacon description is required" }),
    beaconUrl: z.string().url({ message: "Invalid URL" }),
});

const FormContent = ({ onSubmit }) => {

    const { register, handleSubmit, setValue, formState } = useForm({ resolver: zodResolver(schema) });
    const [beacons, setBeacons] = useState(beaconsData);

    const submitBeaconData = (formData) => {
        const newBeacon = {
            number: (beacons.length + 1).toString(),
            creatorName: formData.creatorName,
            creatorEmail: formData.creatorEmail,
            beaconName: formData.beaconName,
            beaconLocation: formData.beaconLocation,
            beaconLatitude: parseFloat(formData.beaconLatitude),
            beaconLongitude: parseFloat(formData.beaconLongitude),
            beaconDescription: formData.beaconDescription,
            beaconUrl: formData.beaconUrl,
        };

        setBeacons([...beacons, newBeacon]);

        console.log("Updated Beacons Data:", beacons);

        setValue("name", "");
        setValue("email", "");
        setValue("beaconName", "");
        setValue("beaconLocation", "");
        setValue("beaconDescription", "");
        setValue("beaconLatitude", "");
        setValue("beaconLongitude", "");
        setValue("beaconUrl", "");

        onSubmit(formData);
    }

    const { errors } = formState;

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(submitBeaconData)}>

                <div className="form-group">
                    <label htmlFor="creatorName">Creator Name</label>
                    <input {...register("creatorName", { required: true })} type="text" className="form-control" id="name" placeholder="Enter your name" />
                    <div style={{ color: "red" }}>{errors?.creatorName?.message}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="creatorEmail">Creator Email</label>
                    <input {...register("creatorEmail", { required: true })} type="email" className="form-control" id="email" placeholder="Enter your email" />
                    <div style={{ color: "red" }}>{errors?.creatorEmail?.message}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="beaconName">Beacon Name</label>
                    <input {...register("beaconName", { required: true })} type="text" className="form-control" id="beaconName" placeholder="Enter beacon name" />
                    <div style={{ color: "red" }}>{errors?.beaconName?.message}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="beaconLocation">Beacon Location</label>
                    <input {...register("beaconLocation", { required: true })} type="text" className="form-control" id="beaconLocation" placeholder="Enter beacon location" />
                    <div style={{ color: "red" }}>{errors?.beaconLocation?.message}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="beaconDescription">Beacon Description</label>
                    <input {...register("beaconDescription", { required: true })} type="text" className="form-control" id="beaconDescription" placeholder="Enter beacon description" />
                    <div style={{ color: "red" }}>{errors?.beaconDescription?.message}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="beaconLatitude">Beacon Latitude</label>
                    <input {...register("beaconLatitude", { required: true })} type="number" step="any" className="form-control" id="beaconLatitude" placeholder="Enter beacon latitude" />
                    <div style={{ color: "red" }}>{errors?.beaconLatitude?.message}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="beaconLongitude">Beacon Longitude</label>
                    <input {...register("beaconLongitude", { required: true })} type="number" step="any" className="form-control" id="beaconLongitude" placeholder="Enter beacon longitude" />
                    <div style={{ color: "red" }}>{errors?.beaconLongitude?.message}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="beaconUrl">Beacon URL</label>
                    <input {...register("beaconUrl")} type="text" className="form-control" id="beaconUrl" placeholder="Enter beacon URL" />
                    <div style={{ color: "red" }}>{errors?.beaconUrl?.message}</div>
                </div>
                
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default FormContent;