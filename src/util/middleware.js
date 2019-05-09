import jwt from 'jsonwebtoken'
import { sendErrorResponse, ERROR_STATUSES } from '.';

export async function parseJWT(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        try {
            req.decoded = await jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (err) {
            sendErrorResponse(ERROR_STATUSES.AUTH_FAILED, res);
        }
    } else {
        next();
    }
}