// import { NextApiRequest, NextApiResponse } from 'next';
const bcrypt = require("bcryptjs");
import dbConnect from '../../lib/dbConnect';
import Register from 'components/models/register';
export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            handlePOST(req, res)
            break;
        default:
            break;
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
            throw new TypeError(res.send({ message: "Invalid email or password" }));
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({ data: e })
    }
};

