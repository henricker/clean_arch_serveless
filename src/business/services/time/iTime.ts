export const ITimeServiceToken = Symbol.for('ITimeServiceToken')

export interface ITimeService {
  add(miliseconds: number, baseDate?: Date): Date
  toMilliseconds(prop: string): number
}
