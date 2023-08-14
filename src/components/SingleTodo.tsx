import { stringify } from "querystring";
import { ITasks } from "../Interfaces";
import { useState } from "react";
import icon from "../assets/img/cancel-close-delete-svgrepo-com.svg";

interface Props {
  task: ITasks;
  deleteTask(taskId: number): void;
  updateTask: (id: number) => void;
}

const SingleTodo = ({ task, deleteTask, updateTask }: Props) => {
  const [editTask, setEditTask] = useState<boolean>(false);
  const [completed, setCompleted] = useState(task.completed);

  const ToggleEditTask = () => {
    setEditTask((prev) => !prev);
  };

  const handleCompleted = (e: number) => {
    setCompleted(!completed);
    updateTask(task.id);
  };

  if (editTask) {
    return (
      <li className="group flex justify-between py-2 h-16">
        <textarea
          name=""
          value={task.text}
          className="py-2 px-4 text-xl outline-none resize-none bg-transparent "
          autoFocus
          onBlur={ToggleEditTask}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              ToggleEditTask();
            }
          }}
          // onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </li>
    );
  }

  return (
    <li
      className={`group flex justify-between py-2 h-16 ${
        completed ? "opacity-30" : ""
      }`}
    >
      <div className="flex gap-6 items-center">
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor={task.text}
            data-ripple-dark="true"
          >
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
              id={task.text}
              checked={task.completed}
              onChange={() => handleCompleted(task.id)}
            />

            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
        </div>

        <h4
          onClick={ToggleEditTask}
          className="first-letter:capitalize text-lg"
        >
          {task.text}
        </h4>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="min-w-[2.5rem] opacity-0 group-hover:opacity-100 h-[2.5rem] grid place-items-center rounded-full transition duration-500 hover:bg-slate-200"
      >
        <img src={icon} alt="cancel" className="w-5 h5" />
      </button>
    </li>
  );
};
export default SingleTodo;
