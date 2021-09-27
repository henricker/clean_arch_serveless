import { ITimeService } from '@root/src/2-business/services/time/iTime'
import { injectable } from 'inversify'

@injectable()
export class FakeTimeService implements ITimeService {
  add(_miliseconds: number, _baseDate?: Date): Date {
    return new Date()
  }
  toMilliseconds(_prop: string): number {
    return 0
  }
}
