import "./App.css";

// Font Source Mui
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Root from "./components/layout/Root";
import TodoContext from "./Contexts/TodoContext";
import { useEffect, useState } from "react";
import { initializeTodoItems } from "./Contexts/TodoContext";

function App() {
  const [todoItems, setTodoItems] = useState(
    JSON.parse(localStorage.getItem("todoItems")) ?? initializeTodoItems
  );

  useEffect(() => {
    if (todoItems && todoItems.length > 0) {
      localStorage.setItem("todoItems", JSON.stringify(todoItems));
    } else {
      localStorage.removeItem("todoItems");
    }
  }, [todoItems]);

  return (
    <>
      <TodoContext.Provider
        value={{ value: todoItems, setTodoItems: setTodoItems }}
      >
        <Root />
      </TodoContext.Provider>
    </>
  );
}

export default App;
