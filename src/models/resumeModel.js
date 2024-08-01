const mongoose = require("mongoose");
const validator = require("validator");
import { v4 as uuidv4 } from 'uuid';
const short = require('short-uuid');

const resumeSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: short().new,
        unique: [true, "Duplicate Id"],
    },
    document_name: {
        type: String,
        required: true
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
    employment_history: {
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
    },
    created_by: {
        type: String,
        required: true
    }

}
    , {
        timestamps: true,
        _id: false
    }
);

//creating a new collection
const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

module.exports = Resume;