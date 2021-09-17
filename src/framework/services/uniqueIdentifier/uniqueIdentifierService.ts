import { IUniqueIdentifierService } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { randomUUID } from 'crypto'
import { injectable } from 'inversify'

@injectable()
export class UniqueIdentifierService implements IUniqueIdentifierService {
	create(): string {
		return randomUUID()
	}
}
