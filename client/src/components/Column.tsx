import type { TaskType } from "../types";
import Card from "./Card";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { createTask } from "../features/task/taskSlice";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  title: string;
  status: TaskType["status"];
  tasks: TaskType[];
  boardId: string;
};

export default function Column({ title, tasks, status, boardId }: Props) {
  const [newTitle, setNewTitle] = useState("");
  const dispatch = useAppDispatch();

  const { setNodeRef, isOver } = useDroppable({ id: status });

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    dispatch(
      createTask({
        boardId,
        task: {
          title: newTitle,
          description: "",
          status,
          boardId,
          order: 0,
        },
      })
    );
    setNewTitle("");
  };

  return (
    <div className="flex flex-col bg-gray-300 rounded-2xl p-4 flex-1 min-w-[300px] shadow-xl border border-gray-200 transition-all">
      <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300 capitalize">
        {title.replace("inprogress", "in progress")}
      </h2>

      <div
        ref={setNodeRef}
        className={`min-h-[120px] bg-gray-200 max-h-[500px] overflow-y-auto pr-1 flex-1 space-y-3 bg-gray-50 rounded-2xl p-2 border-2 ${
          isOver ? "border-blue-400 bg-blue-50" : "border-transparent"
        } transition-all`}
      >
        {tasks.length === 0 ? (
          <div className="h-16 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500 italic">
            Перетягніть сюди задачу
          </div>
        ) : (
          tasks.map((task) => <Card key={task._id} task={task} />)
        )}
      </div>

      <div className="mt-4 space-y-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Додати картку..."
          className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAdd}
          className="w-full bg-blue-500 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Додати
        </button>
      </div>
    </div>
  );

}
