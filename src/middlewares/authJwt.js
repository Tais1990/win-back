import jwt from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError, generateResError } from "../libs/errors.js";
const config = (await import(`../config.js`)).default(process.env.NODE_ENV)

/**
 * Middleware, в котором проверяем, что токен корректен
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - callback
 * @returns
 */
const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    if (!token) {
      throw new ForbiddenError("No token provided!")
    }

    jwt.verify(
      token,
      config.auth.secret,
      (err, decoded) => {
        if (err) {
          throw new UnauthorizedError("Unauthorized!")
        }
        req.userId = decoded.id;
        next();
      });
  } catch (error) {
    return generateResError(res, error);
  }  
};

const authJwt = {
  verifyToken
};

export default authJwt;
