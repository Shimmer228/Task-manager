import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createBoard, setBoardId } from "../features/board/boardSlice";
import OverlayCard from "./OverlayCard";
import {
  fetchTasks,
  updateTask,
  setActiveTask,
  reorderTasks
} from "../features/task/taskSlice";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

import Column from "./Column";
import Card from "./Card";

const STATUSES = ["todo", "inprogress", "done"] as const;

export default function Board() {
  const boardId = useAppSelector((state) => state.board.id);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);
  const activeTask = useAppSelector((state) => state.task.activeTask);
  const [inputId, setInputId] = useState("");


  useEffect(() => {
    const storedId = localStorage.getItem("boardId");
    if (storedId) {
      dispatch(setBoardId(storedId));
      dispatch(fetchTasks(storedId));
    } else {
      dispatch(createBoard())
        .unwrap()
        .then((newId) => {
          localStorage.setItem("boardId", newId);
          dispatch(setBoardId(newId));
          dispatch(fetchTasks(newId));
        })
        .catch((err) => console.error("Failed to create board", err));
    }
  }, [dispatch]);

  useEffect(() => {
    if (boardId) {
      localStorage.setItem("boardId", boardId);
    }
  }, [boardId]);

  const handleConnect = () => {
    if (!inputId.trim()) return;
    localStorage.setItem("boardId", inputId.trim());
    dispatch(setBoardId(inputId.trim()));
    dispatch(fetchTasks(inputId.trim()));
  };

  const handleNewBoard = () => {
    dispatch(createBoard())
      .unwrap()
      .then((newId) => {
        localStorage.setItem("boardId", newId);
        dispatch(setBoardId(newId));
        dispatch(fetchTasks(newId));
      })
      .catch((err) => console.error("Failed to create board", err));
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: any) => {
    const task = tasks.find((t) => t._id === event.active.id);
    if (task) {
      dispatch(setActiveTask(task));
    }
  };

  const STATUSES = ["todo", "inprogress", "done"] as const;

 const handleDragEnd = (event: any) => {
   const { active, over } = event;
   if (!over || active.id === over.id) {
     dispatch(setActiveTask(null));
     return;
   }

   const activeTask = tasks.find((t) => t._id === active.id);
   if (!activeTask) return;

   const overTask = tasks.find((t) => t._id === over.id);
   const isOverColumn = STATUSES.includes(over.id); //

   const oldStatus = activeTask.status;
   const newStatus = isOverColumn
     ? (over.id as TaskType["status"])
     : overTask?.status;

   if (!newStatus) return;

   const sameColumn = oldStatus === newStatus;

   if (!sameColumn) {
     dispatch(updateTask({ id: active.id, data: { status: newStatus } }));
     dispatch(setActiveTask(null));
     return;
   }

   // Якщо перетягування в ту ж колонку, але не на колонку
   if (!overTask || isOverColumn) {
     dispatch(setActiveTask(null));
     return;
   }

   const columnTasks = tasks
     .filter((t) => t.status === oldStatus)
     .sort((a, b) => a.order - b.order);

   const oldIndex = columnTasks.findIndex((t) => t._id === active.id);
   const newIndex = columnTasks.findIndex((t) => t._id === over.id);

   const reordered = arrayMove(columnTasks, oldIndex, newIndex).map((task, index) => ({
     _id: task._id,
     order: index,
   }));

   dispatch(reorderTasks(reordered));
   dispatch(setActiveTask(null));
 };

 return (
   <>
     {/* Верхній блок: підключення до дошки */}
     <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-4">
       <div className="flex  flex-row flex-wrap items-center gap-3">
         <input
           type="text"
           value={inputId}
           onChange={(e) => setInputId(e.target.value)}
           placeholder="Введіть ID дошки"
           className="border border-gray-300 rounded-md px-3 py-2 flex-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[250px]"
         />
         <button
           onClick={() => {
             dispatch(setBoardId(inputId));
             dispatch(fetchTasks(inputId));
           }}
           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
         >
           Підключитись
         </button>
         <button
           onClick={() => {
             dispatch(createBoard()).then((res: any) => {
               const newId = res.payload;
               dispatch(setBoardId(newId));
               dispatch(fetchTasks(newId));
             });
           }}
           className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition"
         >
           Нова дошка
         </button>
       </div>

       {boardId && (
         <div className="flex items-center gap-3 flex-wrap text-sm">
           <span className="text-white-700 font-medium">ID вашої дошки:</span>
           <span className="px-3 py-1 dark-gray-600 rounded-md font-mono border border-gray-200">
             {boardId}
           </span>
           <button
             onClick={() => navigator.clipboard.writeText(boardId)}
             className="dark-gray-600 hover:bg-gray-300 px-2 py-1 rounded-md"
           >
             Копіювати
           </button>
         </div>
       )}
     </div>

     {/* Контейнер з дошкою */}
     <div className="w-full bg-gradient-to-br  dark-gray-900 min-h-screen">
       <DndContext
         sensors={sensors}
         collisionDetection={closestCenter}
         onDragStart={handleDragStart}
         onDragEnd={handleDragEnd}
       >
         <div className="flex gap-6 px-6 pb-10 w-full max-w-[1600px] mx-auto">
           {STATUSES.map((status) => {
             const filtered = tasks
               .filter((t) => t.status === status)
               .sort((a, b) => a.order - b.order);

             return (
               <SortableContext
                 key={status}
                 items={filtered.map((t) => t._id)}
                 strategy={verticalListSortingStrategy}
               >
                 <Column
                   title={status}
                   status={status}
                   tasks={filtered}
                   boardId={boardId}
                 />
               </SortableContext>
             );
           })}
         </div>

         <DragOverlay>
           {activeTask ? <OverlayCard task={activeTask} /> : null}
         </DragOverlay>
       </DndContext>
     </div>
   </>
 );

 }