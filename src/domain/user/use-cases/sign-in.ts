import { db } from '@modules/db'
import { InvalidEmailPasswordError } from '@modules/errors'
import { comparePasswords } from '@modules/utils/crypto'
import { generateAccessToken } from '@modules/utils/jwt'
import { SignInInput } from '@graphql/types'
import { log } from '@modules/logger'
import { Status } from '@domain/user/enums'

const signIn = async (input: SignInInput) => {
  const { email, password } = input

  // Find user
  const user = await db.user.findOne({ where: { email } })
  if (!user) {
    log.warn({ email }, 'User not found.')
    throw InvalidEmailPasswordError()
  }

  if (user.status !== Status.ACTIVE) {
    log.warn({ email }, 'User not activated.')
    throw InvalidEmailPasswordError()
  }

  // Validate password
  const passwordValid = await comparePasswords(password, user.password)
  if (!passwordValid) {
    log.warn({ email }, 'Invalid password.')
    throw InvalidEmailPasswordError()
  }

  const { token, expiresAt} = generateAccessToken(user.id)
  return {
    user,
    accessToken: token,
    expiresAt,
  }
}

export {
  signIn
}
