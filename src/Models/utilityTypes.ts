export type TAPIResponse<T> = {
  status: string;
  totalResults: number;
  articles: T[];
};
