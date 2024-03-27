import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const beaconsSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        validate: {
            validator: async function(value) {
                // Check if the email address is already in use
                const existingEmail = await this.constructor.findOne({ email: value });
                return !existingEmail; // Return false if the email already exists
            },
            message: "Email address must be unique" // Custom error message
        }
    }

});

export const BeaconsModel = model('beacons', beaconsSchema);