import { IRoleEntity } from '@root/src/1-domain/entities/roleEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface IFindAllPaginated {
  count: number
  page: number
  roles: IRoleEntity[]
}

export type IOutputFindAllRoles = Either<IError, IFindAllPaginated>
