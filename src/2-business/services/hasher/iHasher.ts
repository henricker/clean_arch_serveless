export const IHasherServiceToken = Symbol.for('IHasherServiceToken')

export interface IHasherService {
  create(s: string): Promise<string>
  compare(s: string, h: string): Promise<boolean>
}
