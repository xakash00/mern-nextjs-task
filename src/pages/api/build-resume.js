// import { NextApiRequest, NextApiResponse } from 'next';
const bcrypt = require("bcryptjs");
import dbConnect from '../../lib/dbConnect';
import Register from 'components/models/register';
import auth from 'components/lib/middleware/auth';
export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            handleGET(auth, req, res)
            break;
        default:
            break;
    }
}


const handleGET = async (auth, req, res) => {
    console.log(res)
    res.status(200).send(`ur token is `)
};

