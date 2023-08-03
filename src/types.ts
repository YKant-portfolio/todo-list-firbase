export interface ITodo {
  id: string;
  description: string;
  cheked?: boolean; // для дальнейшего функционала по завершению задачи( на будущее)
  createdAt?: any;
  updatedAt?: any;
}
