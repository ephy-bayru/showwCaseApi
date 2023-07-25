import { Request } from "express";
import { IPaginationOptions, SortOrder } from "../interfaces/IPaginationOptions";

export function getPaginationOptions<T extends BaseModel>(req: Request): IPaginationOptions<T> {
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = Math.max(1, Number(req.query.pageSize) || 10);
  const sortBy = req.query.sortBy as keyof T;
  const sortOrder = (req.query.sortOrder as SortOrder) || "asc";
  const filterBy = req.query.filterBy as Partial<T>;

  return { page, pageSize, sortBy, sortOrder, filterBy };
}

export function getPaginationMetadata(options: IPaginationOptions<any>, totalCount: number) {
  const { page, pageSize } = options;
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return {
    totalPages,
    currentPage: page,
    nextPage: hasNext ? page + 1 : null,
    previousPage: hasPrevious ? page - 1 : null,
    pageSize,
    hasPrevious,
    hasNext
  };
}
