// import { NextApiRequest, NextApiResponse } from 'next';
import Resume, { create } from 'components/models/resumeModel';
import dbConnect from '../../lib/dbConnect';
const jwt = require("jsonwebtoken");

import verifyToken from 'components/lib/middleware/auth';

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
        const resume = new Resume({ ...example, ...{ created_by: decoded?._id } });
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


const example = {
    full_name: "Akash Singh",
    email: "akash@gmail.com",
    phone: 8319025678,
    address: "this street, that city",
    linked_in: "linked_in.com",
    github_id: "github.com",
    professional_summary: "Lorem ipsum",
    employement_history: [{
        company_name: "First",
        duration: "present",
        role: "",
        description: ""
    }],
    education_history: [{
        institute: "",
        year: "",
        gpa: "",
        major: ""
    },
    {
        institute: "",
        year: "",
        gpa: "",
        major: ""
    }
    ],
    skills: ["html", "mjml", "Javscript"],
    languages: ["English", "Hindi"],
    projects: [{
        name: "todo-app",
        description: "lorem ipsum"
    }]
}