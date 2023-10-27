import { Button, FormGroup, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useRef } from "react";
import TodoContext from "../../Contexts/TodoContext";
import * as React from "react";

// Styled Component
const StyledForm = styled("form")(() => ({
  marginBottom: "1rem" /* 16px */,
}));

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  marginRight: "1rem" /* 16px */,
}));

// Main Component
const AddNewTodo = () => {
  const todoContext = React.useContext(TodoContext);

  const refInputTodoItem = useRef("");

  // Func: Form Submit Handler
  const formSubmitHandler = (e) => {
    // Prevent Form Submit Default Behaviour
    e.preventDefault();

    // Validation And Add Todo Item
    const todoItem = refInputTodoItem.current.value;

    if (
      todoItem !== null &&
      todoItem !== "" &&
      todoContext.value.findIndex(
        (todoItemB) => todoItemB.textContent === todoItem
      ) === -1
    ) {
      // Object Format
      const todoItemObj = {
        id: todoContext.value.length + 1,
        textContent: todoItem,
        isCompleted: false,
      };

      console.log(todoItemObj);

      // Add New Item
      todoContext.setTodoItems((prevTodoItems) => [
        ...prevTodoItems,
        todoItemObj,
      ]);
    }

    return;
  };

  return (
    <StyledForm onSubmit={formSubmitHandler}>
      <FormGroup row sx={{ flexWrap: "nowrap" }}>
        <StyledTextField
          id="outlined-basic"
          label="add details"
          variant="outlined"
          size="small"
          inputRef={refInputTodoItem}
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </FormGroup>
    </StyledForm>
  );
};

export default AddNewTodo;
