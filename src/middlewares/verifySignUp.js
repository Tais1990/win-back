import { BadRequestError, generateResError } from '../libs/errors.js';
import Users from '../models/users.js'

/**
 * Middleware, в котором проверяем, что пользователя с таким emil ещё не существует
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - callback
 * @returns 
 */
const checkDuplicateEmail = async (req, res, next) => {
  try {
    const user = await Users.findOne({email: req.body.email })      
    if (user) {
      throw new BadRequestError("Failed! Email is already in use!")
    }
    next();
  } catch(error) {
    return generateResError(res, error);
  }  
};

const verifySignUp = {
    checkDuplicateEmail
};

export default verifySignUp;