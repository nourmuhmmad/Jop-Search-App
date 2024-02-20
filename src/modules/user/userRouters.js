import express from "express"
import { getAccountData, changePassword, deleteAccount, signin, signup, updateAccount, getAnotherAccountData, getAccountsByRecoveryEmail } from "./userController.js"
import { hashPassword } from "../../midleware/hashpassword.js"
import { checkEmail } from "../../midleware/checkmail.js"
import { auth } from "../../midleware/auth.js"
import { validation } from "../../midleware/validation.js"
import { addUserVal, changePasswordVal, paramIdVal, signinVal, updateAccountVal } from "./userValidation.js"

const userRouter = express.Router()

userRouter
    .route('/') 
    .put(auth,changePassword)
    .delete(auth,validation(changePasswordVal),deleteAccount)
    .get(auth,getAccountData)

userRouter
    .route('/signup') 
    .post(validation(addUserVal),checkEmail,hashPassword,signup)

userRouter
    .route('/signin') 
    .post(validation(signinVal),signin)
    
userRouter
    .route('/updateAccount') 
    .put(auth,validation(updateAccountVal),updateAccount)
    
userRouter
    .route('/:id') 
    .get(validation(paramIdVal),getAnotherAccountData)
    
userRouter
    .route('/getAccountsByRecoveryEmail/:recoveryEmail') 
    .get(getAccountsByRecoveryEmail)

export default userRouter