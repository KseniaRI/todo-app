export interface IValues{
  todoText: string;
};

export interface ITodo {
  id: string;
  todoText: string;
  completed: boolean;
};

export enum TododsIndicator {
  'COMPLETED' = 'COMPLETED',
  'UNCOMPLETED' = 'UNCOMPLETED',
  'ALL' = 'ALL'
}