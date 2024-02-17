export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number; // current page number
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
