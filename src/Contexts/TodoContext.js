import { createContext } from "react";

export const initializeTodoItems = [
  //   {
  //     id: 1,
  //     textContent: "Code Challenge 1",
  //     isCompleted: false,
  //   },
  //   {
  //     id: 2,
  //     textContent: "Code Challenge 2",
  //     isCompleted: false,
  //   },
  //   {
  //     id: 3,
  //     textContent: "Code Challenge 3",
  //     isCompleted: false,
  //   },
];

const TodoContext = createContext({
  value: initializeTodoItems,
  setTodoItems: () => {},
});

export default TodoContext;
