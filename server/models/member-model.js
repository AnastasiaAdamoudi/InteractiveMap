import mongoose, { Schema, model } from 'mongoose';

const memberSchema = new Schema({
    memberName: {
        type: String,
        required: true,
        minlength: 2,
    },
    memberEmail: {
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
    // Reference to the beacon the member has joined
    beacon: { type: Schema.Types.ObjectId, ref: 'beacons' }
});

export const memberModel = model('members', memberSchema);
