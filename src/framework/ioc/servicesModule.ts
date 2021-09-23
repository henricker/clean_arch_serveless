import {
  IAuthenticatorService,
  IAuthenticatorServiceToken,
} from '@business/services/authenticator/iAuthenticator'
import {
  IHasherService,
  IHasherServiceToken,
} from '@business/services/hasher/iHasher'
import { IMailServiceToken } from '@business/services/mail/iMail'
import { ITimeServiceToken } from '@business/services/time/iTime'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { AuthenticatorService } from '@framework/services/authenticator/AuthenticatorService'
import { MailService } from '@framework/services/mail/mail'
import { TimeService } from '@framework/services/time/timeService'
import { ContainerModule, interfaces } from 'inversify'
import { HasherService } from '../services/hasher/hasherService'
import { UniqueIdentifierService } from '../services/uniqueIdentifier/uniqueIdentifierService'

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IHasherService>(IHasherServiceToken).to(HasherService)
  bind<IUniqueIdentifierService>(IUniqueIdentifierServiceToken).to(
    UniqueIdentifierService
  )
  bind<IAuthenticatorService>(IAuthenticatorServiceToken).to(
    AuthenticatorService
  )
  bind(IMailServiceToken).to(MailService)
  bind(ITimeServiceToken).to(TimeService)
})
