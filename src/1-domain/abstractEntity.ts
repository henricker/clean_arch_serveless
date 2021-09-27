export abstract class AbstractEntity<I> {
  private props: I

  constructor(props: I) {
    this.props = props
  }

  export(): I {
    return { ...this.props }
  }
}
