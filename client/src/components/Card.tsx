import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TaskType } from "../types";
import { useAppDispatch } from "../hooks";
import { deleteTask, updateTask } from "../features/task/taskSlice";
import { useEffect, useState } from "react";

type Props = {
  task: TaskType;
  isOverlay?: boolean;
};

export default function Card({ task, isOverlay = false }: Props) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);

  useEffect(() => {
    setEditing(false);
    setTitle(task.title);
    setDesc(task.description);
  }, [task._id]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition
  } = useSortable({
    id: task._id,
    data: { status: task.status }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleSave = () => {
    dispatch(updateTask({ id: task._id, data: { title, description: desc } }));
    setEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="text-gray-700 bg-gray-300 p-3 rounded shadow hover:bg-gray-50"
    >
      <div className="flex justify-between items-start">
        {!isOverlay && (
          <span
            {...attributes}
            {...listeners}
            className="cursor-grab pr-2 text-gray-400 select-none"
            title="Drag"
          >
            ☰
          </span>
        )}
        {editing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border text-gray-200 rounded px-2 text-sm"
          />
        ) : (
          <strong className="flex-1">{task.title}</strong>
        )}

        {!isOverlay && (
          <div className="space-x-1">
            {!editing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setEditing(true);
                }}
                className="text-blue-500 text-sm"
              >
                ✎
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                dispatch(deleteTask(task._id));
              }}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="mt-2">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full text-gray-200 border rounded p-1 text-sm"
          />
          <button
            onClick={handleSave}
            className="mt-1 bg-green-500 text-white px-2 py-1 rounded text-sm"
          >
            Зберегти
          </button>
        </div>
      ) : (
        task.description && (
          <p className="text-sm text-gray-200 mt-1 text-gray-700">{task.description}</p>
        )
      )}
    </div>
  );
}
