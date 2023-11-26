export interface ResponseError {
  response: {
    status: number;
    statusText: string;
  };
}

export interface ListResponseData<T> {
  data: T[];
  count: number;
}
