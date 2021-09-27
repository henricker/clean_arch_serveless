import { IUniqueIdentifierService } from '@root/src/2-business/services/uniqueIdentifier/iUniqueIdentifier'
import { injectable } from 'inversify'

@injectable()
export class FakeUniqueIdentifierService implements IUniqueIdentifierService {
  create(): string {
    return 'uuid-1234-rfc-4122'
  }
}
