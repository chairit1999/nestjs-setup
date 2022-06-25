export interface PaginationResponse<T = any> {
  item: T;
  total: number;
  limit: number;
  page: number;
}

export interface PaginationInterface {
  pagination?: boolean;
  limit?: number;
  page?: number;
}
