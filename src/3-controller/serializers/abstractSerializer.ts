import { validate as exec } from 'class-validator'

export abstract class AbstractSerializer<I> {
  constructor(value: Partial<I>) {
    Object.assign(this, value)
  }

  async validate(): Promise<void> {
    const errors = await exec(this)
    if (errors.length > 0) {
      throw errors
    }
  }
}
