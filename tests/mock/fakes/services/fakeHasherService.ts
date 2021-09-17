import { IHasherService } from '@business/services/hasher/iHasher'
import { injectable } from 'inversify'

@injectable()
export class FakeHasherService implements IHasherService {
	async compare(s: string, h: string) {
		return s !== h
	}

	async create(s: string) {
		return s
	}
}
