export type TaskType = {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  order: number;
  boardId: string;
};
