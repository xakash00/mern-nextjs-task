// import { NextApiRequest, NextApiResponse } from 'next';

const bcrypt = require("bcryptjs");
import Cookies from 'js-cookie';
import dbConnect from '../../lib/dbConnect';
import Register from 'components/models/register';

const jwt = require("jsonwebtoken")

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            handleLogout(req, res)
            break;
        case 'POST':
            handlePOST(req, res)
            break;
        default:
            break;
    }
}


const handleLogout = async (req, res) => {
    const { authorization } = req.headers
    try {
        const decoded = jwt.decode(authorization);
        if (decoded?._id) {
            const user = await Register.findOne({ _id: decoded?._id })
            console.log(user)
        }
        //logout individual user
        // req.user.tokens = req.user.tokens.filter((currToken) => {
        //   return currToken.token !== req.token;
        // });

        //logout from all devices
        // req.user.tokens = [];

        // res.clearCookie("utoken");
        // console.log("logout");
        // await req.user.save();
        // res.render("login");
    } catch (e) {
        res.status(500).send(e);
    }
}



const handlePOST = async (req, res) => {
    const { password, email } = req.body

    try {

        const user = await Register.findOne({ email });

        const isMatch = await bcrypt.compare(password, user.password);

        const token = await user.generateAuthToken();


        if (isMatch) {
            res.status(201).send({ message: "Login Successful", data: { accessToken: token, email: user.email, id: user.id } });
        } else {
            throw new TypeError(res.status(403).send({ message: "Invalid email or password" }));

        }
    } catch (e) {
        console.log(e)
        res.status(400).send({ data: e })
    }
};

