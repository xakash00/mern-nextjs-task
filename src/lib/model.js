const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exist"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email");
            }
        },
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    address: {
        type: String,
        required: true,
    },
}
    , {
        timestamps: true
    }
);

//creating a new collection
const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

module.exports = Student;