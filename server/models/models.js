import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const beaconSchema = new Schema({
    creatorName: {
        type: String,
        required: true,
        minlength: 2,
    },
    creatorEmail: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            // Check if it's an email address
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Email address must be valid"
        }
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    beaconName: {
        type: String,
        required: true,
        minlength: 2,
    },
    beaconLocation: {
        type: String,
        required: true,
        minlength: 2,
    },
    beaconDescription: {
        type: String,
        required: true,
        minlength: 20,
    },
    beaconLatitude: {
        type: String,
        required: true,
    },
    beaconLongitude: {
        type: String,
        required: true,
    },
});

export const BeaconModel = model('beacons', beaconSchema);
