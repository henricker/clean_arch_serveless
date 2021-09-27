import {
  IAuthenticatorService,
  IAuthenticatorServiceToken,
} from '@root/src/2-business/services/authenticator/iAuthenticator'
import {
  IHasherService,
  IHasherServiceToken,
} from '@root/src/2-business/services/hasher/iHasher'
import { IMailServiceToken } from '@root/src/2-business/services/mail/iMail'
import { ITimeServiceToken } from '@root/src/2-business/services/time/iTime'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@root/src/2-business/services/uniqueIdentifier/iUniqueIdentifier'
import { AuthenticatorService } from '@root/src/4-framework/services/authenticator/AuthenticatorService'
import { MailService } from '@root/src/4-framework/services/mail/mail'
import { TimeService } from '@root/src/4-framework/services/time/timeService'
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
