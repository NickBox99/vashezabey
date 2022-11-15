function filterIncludeQuery<T>(array: T[], query: (keyof T)[], search: string): T[] {
  const searchLower = search.toLowerCase();
  return array.filter(data =>
    !search ||
    query.map(key => data[key]).join('').toLowerCase().includes(searchLower));
}

export { filterIncludeQuery }
