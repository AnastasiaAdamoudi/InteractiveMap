import mongoose, { Schema, model } from 'mongoose';
import { beaconModel } from './beacon-model.js';

const userSchema = new Schema({
    userFirstname: {
        type: String,
        required: true,
        minlength: 2,
    },
    userSurname: {
        type: String,
        required: true,
        minlength: 2,
    },
    username: {
        type: String,
        required: true,
        minlength: 4,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    userEmail: {
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
    joinedOn: {
        type: Date,
        default: Date.now
    },
    // Reference to the beacon the user has joined
    beacon: { type: Schema.Types.ObjectId, ref: 'beacons' }
});

export const userModel = model('users', userSchema);
