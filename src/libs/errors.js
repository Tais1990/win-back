/** Ошибка. Bad Request*/
class BadRequestError extends Error {
  /** 
    * Конструктор для создания ошибки Bad Request
    * @constructor
    * @param {string} message - Текст сообщения
    * @param {*} params - Все остальные параметры
  */
  constructor(message, ...params) {
    super(...params)
    this.message = message || 'Bad Request';
    this.argument = message;
    this.name = 'BadRequestError';
    this.stack = (new Error()).stack;
    this.status = 400;
  }
}

/** Ошибка. Not Found*/
class NotFoundError extends Error {
  /** 
    * Конструктор для создания ошибки Not Found
    * @constructor
    * @param {string} message - Текст сообщения
    * @param {*} params - Все остальные параметры
  */
  constructor(message, ...params) {
    super(...params)
    this.message = message || 'Not Found';
    this.argument = message;
    this.name = 'NotFoundError';
    this.stack = (new Error()).stack;
    this.status = 404;
  }
}
/** Ошибка. Unauthorized*/
class UnauthorizedError extends Error {
   /** 
    * Конструктор для создания ошибки Unauthorized
    * @constructor
    * @param {string} message - Текст сообщения
    * @param {*} params - Все остальные параметры
  */
  constructor(message, ...params) {
    super(...params)
    this.message = message || 'Unauthorized';
    this.argument = message;
    this.name = 'UnauthorizedError';
    this.stack = (new Error()).stack;
    this.status = 401;
    this.accessToken = null;
  }
}
/** Ошибка. Forbidden*/
class ForbiddenError extends Error {
   /** 
    * Конструктор для создания ошибки Forbidden
    * @constructor
    * @param {string} message - Текст сообщения
    * @param {*} params - Все остальные параметры
  */
  constructor(message, ...params) {
    super(...params)
    this.message = message || 'Forbidden';
    this.argument = message;
    this.name = 'ForbiddenError';
    this.stack = (new Error()).stack;
    this.status = 403;
  }
}

let myErrors = [NotFoundError.name, UnauthorizedError.name, ForbiddenError.name, BadRequestError.name]

/**
 * Сбор красиво ошибки в response
 * @param {*} res - response
 * @param {*} error - ошибка
 * @returns - respons, с ошибкой
 */
const generateResError = (res, error) => {
  let json = {
    status: error.status || 500,
    message: error.message,
    stack: error.stack,
    detail: error.message 
  }
  if (error.name === UnauthorizedError.name) {
    json = {...json, accessToken: null}
  }
  if (myErrors.includes(error.name)) {
    res.status(error.status).json(json)  
  } else {
    res.status(500).json(json)
  }
  return res;
}
  
export {NotFoundError, UnauthorizedError, ForbiddenError, BadRequestError, generateResError}