export type FIELD = {
  name: string;
  time: number;
};

export type FIELD_OPTION = {
  label: string;
  time: number;
  value: string;
};

export type FILTER = {
  keyword: string;
  start_date: string;
  end_date: string;
  from_age: string;
  to_age: string;
  gender: string;
  field: string;
  status: string;
  entertainment_id: string;
};
