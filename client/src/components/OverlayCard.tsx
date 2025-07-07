import type { TaskType } from "../types";

type Props = {
  task: TaskType;
};

export default function OverlayCard({ task }: Props) {
 return (
   <div className="bg-white p-3 rounded-md shadow-xl border border-gray-300 w-[250px]">
     <strong className="text-sm text-gray-800">{task.title}</strong>
     {task.description && (
       <p className="text-xs mt-1 text-gray-600">{task.description}</p>
     )}
   </div>
 );
}
