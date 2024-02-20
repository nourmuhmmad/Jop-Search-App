import mongoose from "mongoose"
import multer from "multer"
import { AppError } from "../../utils/appError.js"

export const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, new mongoose.Types.ObjectId + "-" + file.originalname)
    }
  })

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('pdf')) {
      cb(null, true)
    } else {
      cb(new AppError('pdf only', 401), false)
    }
  }

  const upload = multer({ storage, fileFilter })
  return upload.single('pdfFile')
}

