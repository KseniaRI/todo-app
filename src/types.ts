export interface IValues{
  todoText: string;
};

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
};

export enum TododsIndicator {
  'COMPLETED' = 'COMPLETED',
  'UNCOMPLETED' = 'UNCOMPLETED',
  'ALL' = 'ALL'
}

export enum Status {
  'LOADING' = 'LOADING',
  'RESOLVED' = 'RESOLVED',
  'REJECTED' = 'REJECTED',
}