import { IPaginatedData } from "../interfaces/IPaginatedData";
import { IPaginationOptions } from "../interfaces/IPaginationOptions";
import { getPaginationMetadata } from "./pagination.helper";
import CustomError from "../error/CustomError";

function filterData<T>(
  data: T[],
  filterBy: Partial<T>,
  filterFn: ((item: T) => boolean) | undefined
): T[] {
  return data.filter((item) => {
    const matchesFilterBy = Object.entries(filterBy).every(
      ([key, value]) => item[key as keyof T] === value
    );

    const matchesFilterFn = filterFn ? filterFn(item) : true;

    return matchesFilterBy && matchesFilterFn;
  });
}

function sortData<T>(
  data: T[],
  sortBy: keyof T | undefined,
  sortOrder: string,
  extractFn: (item: T) => any
): T[] {
  if (!sortBy) {
    return data;
  }

  return data.sort((a, b) => {
    const valueA = extractFn(a)[sortBy];
    const valueB = extractFn(b)[sortBy];
    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      throw new CustomError(
        400,
        `Unsupported type for sorting: ${typeof valueA}`,
        `The field '${String(
          sortBy
        )}' cannot be used for sorting as it is not a number or string.`
      );
    }
  });
}

export function paginate<T>(
  data: T[],
  options: IPaginationOptions<T>,
  extractFn: (item: T) => any
): IPaginatedData<T> {
  const {
    page,
    pageSize,
    sortBy,
    sortOrder = "asc",
    filterBy,
    filterFn,
  } = options;

  let filteredData = filterData(data, filterBy || {}, filterFn);

  let sortedData = sortData(filteredData, sortBy, sortOrder, extractFn);

  const totalCount = sortedData.length;
  const offset = (page - 1) * pageSize;
  const paginatedData = sortedData.slice(offset, offset + pageSize);
  const paginationMetadata = getPaginationMetadata(options, totalCount);

  return { data: paginatedData, totalCount, ...paginationMetadata };
}
