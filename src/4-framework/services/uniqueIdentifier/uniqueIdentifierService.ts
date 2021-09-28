import { IUniqueIdentifierService } from '@root/src/2-business/services/uniqueIdentifier/iUniqueIdentifier'
import { v4 } from 'uuid'
import { injectable } from 'inversify'

@injectable()
export class UniqueIdentifierService implements IUniqueIdentifierService {
  create(): string {
    return v4()
  }
}
