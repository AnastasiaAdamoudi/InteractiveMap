import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

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
});

export const MemberModel = model('members', memberSchema);