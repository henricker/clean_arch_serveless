export interface IAbstractUseCase<I, O> {
  exec(props: I, ...args: unknown[]): Promise<O>
}
