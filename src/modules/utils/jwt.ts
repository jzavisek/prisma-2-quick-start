import * as jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import { promisify } from 'util'
import { config } from '@modules/config'

interface AccessToken {
  token: string
  expiresAt: Date
}

interface IAccessTokenPayload {
  userId: number
}

const BEARER_PREFIX = 'Bearer '

const generateJWT = (userId: number): string =>
  jwt.sign({ userId }, config.auth.pepper, {
    expiresIn: config.auth.accessTokenExpiration,
    algorithm: config.auth.jwtOpts.algorithm as jwt.Algorithm,
    issuer: config.auth.jwtOpts.issuer,
  })

const generateAccessToken = (userId: number): AccessToken => ({
  token: generateJWT(userId),
  expiresAt: dayjs().add(config.auth.accessTokenExpiration, 'second').toDate(),
})

const verifyAccessToken = async (accessToken: string) =>
  await promisify(jwt.verify)(accessToken, config.auth.pepper)

export const verifyUser = async (authHeader: string) => {
  if (!authHeader) {
    return null
  }

  const authPayload =
    await verifyAccessToken(authHeader.replace(BEARER_PREFIX, '')) as IAccessTokenPayload

  return authPayload.userId
}

export {
  AccessToken,
  generateAccessToken,
}
