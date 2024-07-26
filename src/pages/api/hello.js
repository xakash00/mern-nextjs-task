// import { NextApiRequest, NextApiResponse } from 'next';
import Student from 'components/models/model';
import dbConnect from '../../lib/dbConnect';

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
  // const currentUser = await (req);
  try {
    const studentsData = await Student.find().sort({ createdAt: -1 });
    res.send(studentsData);
  } catch (err) {
    res.send(err);
  }
};

const handlePOST = async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (error) {
    console.log(error)
    res.status(400)
    res.send("error");
  }
};

const handleDeleteById = async (req, res) => {
  try {
    const user = await Student.findByIdAndDelete(req.body)
    res.status(201);
    res.send(user)
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
}

const handlePUT = async (req, res) => {
  const { id, name, email, phone, address } = req.body
  try {
    const user = await Student.findByIdAndUpdate(id, { name, email, phone, address });
    // const createUser = await user.save();
    res.status(201)
    res.send(user);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};