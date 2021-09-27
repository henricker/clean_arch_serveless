export const removeNullish = (
  prop: unknown[] | { [index: string]: unknown }
): unknown[] | { [index: string]: unknown } => {
  if (prop instanceof Array) {
    return prop.filter(
      (value) => (value !== undefined && value !== null) || Number.isNaN(value)
    )
  }
  return Object.entries(prop).reduce((acc, [key, value]) => {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return acc
    }

    return { ...acc, [key]: value }
  }, {})
}
