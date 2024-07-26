const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        requiured: true,
    },
    email: {
        type: String,
        unique: [true, "Email already exist"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email");
            }
        },
        required: true,
    },
    password: {
        type: String,
        required: true,

    },
    confirmpassword: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});



//jsonWebToken

userSchema.methods.generateAuthToken = async function (res) {
    try {
        //console.log(this._id);
        const token = await jwt.sign({ _id: this._id.toString() }, "somepeoplehavecurlyblackhairthroughproperbrushing");
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        //console.log(token);
        return token;
    } catch (e) {
        console.log(e)
    }
};

//converting password into hash
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // console.log(`password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password, 10);
        // console.log(`hash code is ${this.password}`);
    }
    next();
});

const Register = mongoose.models.Register || mongoose.model("Register", userSchema)

module.exports = Register;