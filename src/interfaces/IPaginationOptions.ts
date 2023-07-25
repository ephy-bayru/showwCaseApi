export type SortOrder = 'asc' | 'desc' | string;

export interface IPaginationOptions<T> {
  page: number;
  pageSize: number;
  sortBy?: keyof T;
  sortOrder: SortOrder;
  filterBy?: Partial<T>;
  filterFn?: (item: T) => boolean;
}
