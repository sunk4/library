import { StatusCodes } from 'http-status-codes'
import CustomApiError from './custom-api-error.js'

class NotFoundError extends CustomApiError {
  statusCode = StatusCodes.NOT_FOUND
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}



export default NotFoundError
