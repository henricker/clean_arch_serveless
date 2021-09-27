import { IHasherService } from '@root/src/2-business/services/hasher/iHasher'
import bcrypt, { genSalt } from 'bcrypt'
import { injectable } from 'inversify'

@injectable()
export class HasherService implements IHasherService {
  async create(s: string): Promise<string> {
    const salt = await genSalt(6)

    return bcrypt.hash(s, salt)
  }
  async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed)
  }
}
