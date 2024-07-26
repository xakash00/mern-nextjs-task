const mongoose = require("mongoose");
const validator = require("validator");
import { v4 as uuidv4 } from 'uuid';

const resumeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: () => uuidv4(),
        unique: [true, "Duplicate Id"],
    },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    address: {
        type: String,
    },
    linked_in: {
        type: String,
    },
    github_id: {
        type: String,
    },
    professional_summary: {
        type: String,
        required: true
    },
    education_history: {
        type: Array,
        required: true
    },
    employement_history: {
        type: Array,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    languages: {
        type: Array,
        required: true
    },
    projects: {
        type: Array,
        required: true
    }

}
    , {
        timestamps: true
    }
);

//creating a new collection
const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

module.exports = Resume;