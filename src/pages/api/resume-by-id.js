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
        default:
            break;
    }
}
const handleGET = async (req, res) => {
    const { authorization } = req.headers
    try {
        const decoded = jwt.decode(authorization);
        if (decoded?._id) {
            const resume = await Resume.findById({ _id: "wUDa96UojW43JNgMdTt7Q6" });
            res.status(200)
            res.send(resume)
        } else {
            throw new TypeError(res.status(401).send({ error: "Unauthorised" }));
        }
    } catch (err) {
        res.status(400)
        res.send(err);
        console.log(err)
    }
    // try {
    //     const resume = await Resume.find();
    //     res.status(200)
    //     res.send(resume)
    // } catch (err) {
    // }
};