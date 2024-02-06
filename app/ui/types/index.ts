export interface Item {
  id: string;
  short: string;
  target: string;
  counter: string;
}

export interface QueryParams {
  page: number;
  counter: string;
  offset: number;
  short: string;
  target: string;
}
