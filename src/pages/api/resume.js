// import { NextApiRequest, NextApiResponse } from 'next';
import Resume from 'components/models/resumeModel';
import dbConnect from '../../lib/dbConnect';
const jwt = require("jsonwebtoken");


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            handleGET(req, res)
            break;
        case 'POST':
            handlePOST(req, res)
            break;
        case 'DELETE':
            handleDeleteById(req, res)
            break;
        case 'PUT':
            handlePUT(req, res)
            break;
        default:
            break;
    }
}


const handleGET = async (req, res) => {
    const { authorization } = req.headers
    try {
        const decoded = jwt.decode(authorization);
        const resume = await Resume.find({ created_by: decoded?._id });
        res.status(200)
        res.send(resume)
    } catch (err) {
        console.error('Error decoding token:', err);
    }
    // try {
    //     const resume = await Resume.find();
    //     res.status(200)
    //     res.send(resume)
    // } catch (err) {
    //     // res.status(400)
    //     res.send(err);
    // }
};

const handlePOST = async (req, res) => {
    const { authorization } = req.headers

    const decoded = jwt.decode(authorization);
    try {
        const resume = new Resume({ ...req.body, ...{ created_by: decoded?._id } });
        const createResume = await resume.save();
        res.status(201)
        res.send(createResume)
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
};

const handleDeleteById = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.body)
        res.status(201);
        res.send(resume)
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}

const handlePUT = async (req, res) => {

};


