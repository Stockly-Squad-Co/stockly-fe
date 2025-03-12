export interface ApiResponse<T> {
  status: boolean;
  msg: string;
  data: T;
}

export type DateRange =
  | "today"
  | "yesterday"
  | "this-week"
  | "last-week"
  | "this-month"
  | "last-month"
  | "custom";
