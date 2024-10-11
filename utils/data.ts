import { camelCase, snakeCase } from 'lodash'

export const toCamelCase = (row: object) => {
  if (!row) {
    return null
  }
  const out: { [key: string]: any } = {}
  for (const column in row) {
    if (row.hasOwnProperty(column)) {
      const camelCased = camelCase(column)
      out[camelCased] = (row as any)[column]
    }
  }
  return out
}

export const toSnakeCase = (obj: object) => {
  if (!obj) {
    return null
  }
  const row: { [key: string]: any } = {}
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const snakeCased = snakeCase(prop)
      row[snakeCased] = (obj as any)[prop]
    }
  }
  return row
}
