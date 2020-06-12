import { ErrorCode } from '@modules/errors/error-codes'

class AppError extends Error {
  public status?: number
  public code: string

  public constructor(code: ErrorCode, message: string, status?: number) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.code = code
    this.status = status
  }
}

const InvalidEmailPasswordError = () =>
  new AppError(ErrorCode.NOT_AUTHORIZED, 'Invalid email/password combination.')

export { ErrorCode, AppError, InvalidEmailPasswordError }
