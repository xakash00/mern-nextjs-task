const jwt = require("jsonwebtoken");
const Register = require("../../models/register");

const auth = async (req, res, next) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzYTlkYThlNWUyYzZhODFmMWQ4ODAiLCJpYXQiOjE3MjIyNDk4NDR9.k5uk1Htm7sN-2F37EHB3JDF7MXeScp3_BPah0zsZ4Yc";
        const verifyuser = jwt.verify(token, process.env.KEY);
        console.log(verifyuser);

        const user = await Register.findOne({ _id: verifyuser._id });
        console.log(user);

        req.token = token;
        req.user = user;

        next();
    } catch (e) {
        res.status(401).send(e);
    }
};

module.exports = auth;