import mongoose, { model } from 'mongoose';
import { userModel } from './models.js';

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
        type: Number,
        required: true,
        min: -90,
        max: 90,
    },
    beaconLongitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

export const beaconModel = model('beacons', beaconSchema);
