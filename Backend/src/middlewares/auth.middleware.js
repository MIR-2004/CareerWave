import jwt from 'jsonwebtoken';
import { Company } from '../models/company.model.js';
import { ApiError } from '../utils/ApiError.js';

const companyAuthMiddleware = async (req, res, next) => {
    const token = req.headers.token

    if(!token){
        throw new ApiError(401, "Unauthorized access")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.company = await Company.findById(decoded.id).select("-password")

        next()
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default companyAuthMiddleware;