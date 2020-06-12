import { db } from '@modules/db'
import { SignUpInput } from '@graphql/types'
import { hashPassword } from '@modules/utils/crypto'
import { AppError, ErrorCode } from '@modules/errors'
import { Status } from '@domain/user/enums'
import { log } from '@modules/logger'

const signUp = async (input: SignUpInput) => {
  const { firstName, lastName, email, password } = input

  // Find existing
  const existingUser = await db.user.findOne({ where: { email } })
  if (existingUser) {
    log.warn({ email }, 'Duplicate user.')
    throw new AppError(ErrorCode.DUPLICATE_USER, 'Duplicate user.')
  }
  
  // Create new
  const hashedPassword = await hashPassword(password)
  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      status: Status.PENDING,
    },
  })

  return {
    user,
  }
}

export {
  signUp
}
