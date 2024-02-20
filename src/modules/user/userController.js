import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../../../Database/DatabaseModels/userModel.js";
import { catchError } from "../../midleware/catchError.js";

const signup = catchError(async (req, res) => {
    let user = new userModel(req.body)
    await user.save()
    res.json({ message: "Sign up succsufly" })
})

const signin = catchError(async (req, res) => {
    let user;
    if (req.body.email) {
        user = await userModel.findOne({ email: req.body.email });
    } else {
        user = await userModel.findOne({ mobile: req.body.mobile });
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = Jwt.sign({ userID: user._id, role: user.role }, "firstkey");
        await userModel.findByIdAndUpdate(user._id, { status: "online" });
        return res.json({ message: "login successfully", token });
    }
    res.json({ message: "email or password incorrect" });
})

const changePassword = catchError(async (req, res) => {
    const user = req.user;
    const { currntpassword, newpassword } = req.body;
    if (user && bcrypt.compareSync(currntpassword, user.password)) {
        const hashedPassword = bcrypt.hashSync(newpassword, 8);
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword, passwordChangedAt: Date.now() });
        return res.json({ message: "Password changed successfully" });
    }
    res.json({ message: "Current password is incorrect" });
})

const deleteAccount = catchError(async (req, res) => {
    const user = req.user;
    await userModel.findByIdAndDelete(user._id);
    res.json({ message: "User deleted successfully", user });
})

const updateAccount = catchError(async (req, res) => {
  const userId = req.user._id;
  const user = await userModel.findById(userId);
  if (user) {
    await userModel.findByIdAndUpdate(userId,req.body );
    return res.json({ message: "User updated successfully", user });
  }
  res.json({ message: "error" });
})

const getAccountData =catchError( async(req,res,next)=>{
    let Data = await userModel.findById(req.user._id).select('-password -createdAt -__v -updatedAt');
    res.json({message:"Success",Data})
})

const getAnotherAccountData = catchError( async(req,res,next)=>{
    let Data = await userModel.findById(req.params.id).select('-password -createdAt -__v -updatedAt');
    res.json({message:"Success",Data})
})

const getAccountsByRecoveryEmail = catchError(async (req, res) => {
        const recoveryEmail = req.params.recoveryEmail;
        const accounts = await userModel.find({ recoverEmail: recoveryEmail }).select('-password -createdAt -updatedAt');
        res.json({ message: "Success", accounts });
    })

export {
    signup,
    signin,
    changePassword,
    deleteAccount,
    updateAccount,
    getAccountData,
    getAnotherAccountData,
    getAccountsByRecoveryEmail,
}

/*8. Forget password ( without sending any email , make sure of your data security specially the OTP and the newPassword )*/
