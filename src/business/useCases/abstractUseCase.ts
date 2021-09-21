export interface AbstractUseCase<I, O> {
  exec(props: I): Promise<O>
}
