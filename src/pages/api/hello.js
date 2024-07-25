// import { NextApiRequest, NextApiResponse } from 'next';
import Student from 'components/lib/model';
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
    default:
      break;
  }
}


const handleGET = async (req, res) => {
  // const currentUser = await (req);
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (err) {
    res.send(err);
  }
};

const handlePOST = async (req, res) => {
  const { image } = req.body
  // try {
  //   if (image) {
  //     let response = await axios.get(image, { responseType: 'arraybuffer' });
  //     let returnedB64 = Buffer.from(response.data).toString('base64');
  //     const result = `data:image/png;base64,${returnedB64}`
  //     res.status(200).json({
  //       data: result,
  //     });
  //   }
  // } catch (err) {
  //   console.log(err)
  //   res.status(200).json({
  //     data: err,
  //   });
  // }

  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};