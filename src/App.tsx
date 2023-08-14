/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAppProps, ITasks } from "./Interfaces";
import { useState, ChangeEvent, FC, useEffect } from "react";
import SingleTodo from "./components/SingleTodo";
import { BsChevronDoubleDown, BsFillSendFill } from "react-icons/bs";

const App: FC = () => {
  const [collapse, setCollapse] = useState<boolean>(true);
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [value, setValue] = useState<string>("");
  const [active, setActive] = useState<string>("all");

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  const createTasks = (): void => {
    if (value) {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        text: value,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setValue("");
    }
  };

  const updateTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    const newarry = tasks.filter((task) => task.id !== taskId);
    setTasks(newarry);
  };

  useEffect(() => {
    if (active === "all") {
      setTasks((prev) => [...prev]);
    } else if (active === "completed") {
      const newTask = tasks.filter((task) => task.completed === true);
      if (newTask) {
        setTasks(newTask);
      } else {
        return;
      }
    } else {
      setTasks([]);
    }
  }, [active]);

  return (
    <div>
      <h1 className="sm:text-6xl text-4xl text-center text-orange-300/30">
        todos tasks
      </h1>
      <div className="sm:w-[35rem] w-[90%] text-gray-400  bg-white mx-auto my-7">
        <div className="rounded-md gap-3 shadow-md flex items-center  px-6 py-3 ">
          {tasks.length === 0 ? null : (
            <button
              onClick={() => setCollapse(!collapse)}
              className="min-w-[3rem] h-12 rounded-full grid place-items-center hover:bg-slate-200 transition duration-500"
            >
              <BsChevronDoubleDown />
            </button>
          )}

          <input
            className="py-2 px-5 w-full outline-none sm:text-2xl text-xl placeholder:text-gray-200"
            type="text"
            placeholder="What needs to be done?"
            name=""
            id=""
            value={value}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={createTasks}
            className="min-w-[3rem] h-12 rounded-full grid place-items-center hover:bg-slate-200 transition duration-500"
          >
            <BsFillSendFill />
          </button>
        </div>

        {tasks.length === 0 ? null : (
          <div className="px-6  shadow-xl">
            {collapse && (
              <ul role="list" className="divide-slate-200 divide-y">
                {tasks.map((task: ITasks) => (
                  <SingleTodo
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                ))}
              </ul>
            )}

            <footer className="flex items-center justify-between py-2 border-t flex-wrap gap-2">
              <span>{tasks.length} items left</span>

              <ul className=" flex gap-2 items-center">
                {["all", "completed", "clear"].map((b: string) => (
                  <li
                    onClick={() => setActive(b)}
                    key={b}
                    className={`cursor-pointer capitalize px-2 py-1 rounded-md  ${
                      b === active ? "bg-slate-200" : ""
                    }`}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
