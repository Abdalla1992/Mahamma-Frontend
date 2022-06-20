export interface SearchModel {
  filter: {};
  paginator: PaginatorState;
  sorting: SortState;
  //grouping: GroupingState;
  entityId: number | undefined;
}

export class PaginatorState implements IPaginatorState {
  page = 1;
  pageSize = PageSizes[2];
  total = 0;
  pageSizes: number[] = [];

//   recalculatePaginator(total: number): PaginatorState {
//     this.total = total;
//     return this;
//   }
}

export const PageSizes = [3, 5, 10, 15, 50, 100];

export interface IPaginatorState {
  page: number;
  pageSize: number;
  total: number;
  //recalculatePaginator(total: number): IPaginatorState;
}

export type SortDirection = 'asc' | 'desc' | '';

export interface ISortState {
  column: string;
  direction: SortDirection;
}

export class SortState implements ISortState {
  column = 'id'; // Id by default
  direction: SortDirection = 'asc'; // asc by default;
}

export interface ISortView {
  sorting: SortState;
  ngOnInit(): void;
  sort(column: string): void;
}