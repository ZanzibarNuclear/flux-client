export const snakeToCamel = (str: string): string => {
  return str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
}

export const camelToSnake = (str: string): string => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export const toCamelCase = <T extends object>(obj: T): { [K in keyof T]: any } => {
  if (!obj) return obj;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [snakeToCamel(key), value])
  ) as { [K in keyof T]: any };
}

export const toSnakeCase = <T extends object>(obj: T): { [key: string]: any } => {
  if (!obj) return obj;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [camelToSnake(key), value])
  );
}
