import Jwt from "jsonwebtoken"
import { AppError } from "../utils/appError.js"
import { userModel } from "../../Database/DatabaseModels/userModel.js"


export const auth = async (req, res, next) => {
    let { token } = req.headers
    if (!token) return next(new AppError('token not provided', 401))
    let decoded = Jwt.verify(token, 'firstkey') //take secrete key from env not work with me (process.env.secrectkey) 
    let user = await userModel.findById(decoded.userID)
    if (!user) return next(new AppError('user not provided', 401))
    if (user.passwordChangedAt) {
        let time = parseInt(user?.passwordChangedAt.getTime() / 1000)
        if (time > decoded.iat) return next(new AppError('invalid token ... login again'))
    }
    req.user = user;
    next()
}