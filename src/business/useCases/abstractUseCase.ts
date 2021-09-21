export interface IAbstractUseCase<I, O> {
  exec(props: I): Promise<O>
}
