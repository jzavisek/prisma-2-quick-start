import { createHmac } from 'crypto'
import { compare, hash } from 'bcrypt'
import { config } from '@modules/config'

const pepperify = (str: string): string =>
  createHmac('sha1', config.auth.pepper)
    .update(str)
    .digest('hex')

const hashPassword = async (password: string): Promise<string> =>
  await hash(pepperify(password), config.auth.saltRounds)

const comparePasswords = async ( plaintext: string, cipherText: string ): Promise<boolean> =>
  await compare(pepperify(plaintext), cipherText)

export {
  hashPassword,
  comparePasswords,
}
