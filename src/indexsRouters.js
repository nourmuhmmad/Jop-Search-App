
import companyRouter from "./modules/company/companyRouters.js"
import jobRouter from "./modules/job/jobRouters.js"
import userRouter from "./modules/user/userRouters.js"

export const boostrap = (app) => {
    app.use('/user', userRouter)
    app.use('/job', jobRouter),
    app.use('/company', companyRouter)
    // app.use('/application', productRouter)
} 