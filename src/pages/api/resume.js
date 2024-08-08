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
        if (decoded?._id) {
            const resume = await Resume.find({ created_by: decoded?._id });
            res.status(200)
            res.send(resume)
        } else {
            throw new TypeError(res.status(401).send({ error: "Unauthorized" }));
        }
    } catch (err) {
        res.status(400)
        res.send(err);
    }
    // try {
    //     const resume = await Resume.find();
    //     res.status(200)
    //     res.send(resume)
    // } catch (err) {
    // }
};

const handlePOST = async (req, res) => {
    const { authorization } = req.headers

    const decoded = jwt.decode(authorization);
    try {
        if (decoded?._id) {
            const resume = new Resume({ ...req.body, ...{ created_by: decoded?._id } });
            await resume.save();
            res.status(201)
            res.send({ data: { message: "Details Created Successfully" } })
        } else {
            throw new TypeError(res.status(401).send({ error: "Unauthorised" }));
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
};

const handleDeleteById = async (req, res) => {
    const { authorization } = req.headers

    const decoded = jwt.decode(authorization);
    try {
        if (decoded?._id) {
            await Resume.findByIdAndDelete(req.body)
            res.status(201);
            res.send({ data: { message: "Successfully deleted" } })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}

const handlePUT = async (req, res) => {

};


