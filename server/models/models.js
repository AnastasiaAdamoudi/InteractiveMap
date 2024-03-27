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
    beaconLatitude: {
        type: Number,
        required: true,
    },
    beaconLongitude: {
        type: Number,
        required: true,
    },
    beaconDescription: {
        type: String,
        required: true,
        minlength: 10,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export const BeaconModel = model('Beacon', beaconSchema);
