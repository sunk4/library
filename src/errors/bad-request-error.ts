import { StatusCodes } from 'http-status-codes'
import CustomApiError from './custom-api-error.js'

class BadRequestError extends CustomApiError {
  statusCode = StatusCodes.BAD_REQUEST
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export default BadRequestError
