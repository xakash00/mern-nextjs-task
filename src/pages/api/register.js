// import { NextApiRequest, NextApiResponse } from 'next';
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
    const { password, confirmpassword } = req.body

    try {
        if (password === confirmpassword) {
            const registerUser = new Register(req.body);

            // console.log(`the success part ${registerUser}`);

            const token = await registerUser.generateAuthToken(res); //middleware

            // cookies().set("x23", token, {
            //     expires: new Date(Date.now() + 60000),
            //     httpOnly: true,
            // });

            const registered = await registerUser.save();
            res.status(201);
            //console.log(registerUser);
            res.send({ message: "Registration Successful", token: token })
        } else {
            throw new TypeError(res.status(401).send({ error: "password are not matching" }));

        }
    } catch (e) {
        res.status(400).send({ data: e })
    }
};

