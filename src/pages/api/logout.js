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
        default:
            break;
    }
}


const handleLogout = async (req, res) => {
    const { authorization } = req.headers
    try {
        const decoded = jwt.decode(authorization);
        console.log(decoded?._id);
        if (decoded?._id) {
            const registered = await Register.findOne({ _id: decoded?._id })
            registered.tokens = [];
            await registered.save();
            res.status(200).send({ data: { message: "Logout successfull" } })
        } else {
            throw new TypeError(res.status(401).send({ error: "Unauthorized" }));
        }

    } catch (err) {
        res.status(400).send({ error: err })
    }
    // try {
    //     if (decoded?._id) {
    //         const user = await Register.findOne({ _id: decoded?._id })
    //         console.log(user)
    //     }
    //     //logout individual user
    //     // req.user.tokens = req.user.tokens.filter((currToken) => {
    //     //   return currToken.token !== req.token;
    //     // });

    //     //logout from all devices
    //     // req.user.tokens = [];

    //     // res.clearCookie("utoken");
    //     // console.log("logout");
    //     // await req.user.save();
    //     // res.render("login");
    // } catch (e) {
    //     res.status(500).send(e);
    // }
}



