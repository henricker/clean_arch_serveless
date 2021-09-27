import { IHasherService } from '@root/src/2-business/services/hasher/iHasher'
import { injectable } from 'inversify'

@injectable()
export class FakeHasherService implements IHasherService {
  async compare(_s: string, _h: string): Promise<boolean> {
    return false
  }

  async create(s: string): Promise<string> {
    return s
  }
}

export const fakeHasherServiceCompare = jest.spyOn(
  FakeHasherService.prototype,
  'compare'
)

export const fakeHasherServiceCreate = jest.spyOn(
  FakeHasherService.prototype,
  'create'
)
