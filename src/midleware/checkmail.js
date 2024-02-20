import { userModel } from "../../Database/DatabaseModels/userModel.js"


export const checkEmail = async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) return res.json({ message: "user already exists" })
    next()
}