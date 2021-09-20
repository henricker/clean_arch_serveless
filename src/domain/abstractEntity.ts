export abstract class AbstractEntity<I> {
	private props: I

	constructor(props: I) {
		this.props = props
	}

	export(): I {
		Object.defineProperty(this, 'id', {
			enumerable: false,
			writable: true,
		})
		return { ...this.props }
	}
}
