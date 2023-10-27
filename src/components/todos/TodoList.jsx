/* eslint-disable react/prop-types */
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TodoContext from "../../Contexts/TodoContext";
import { Box, Button, Typography } from "@mui/material";

const TodoList = ({ show = "all", secondaryAction = false }) => {
  const todoContext = React.useContext(TodoContext);

  const [checked, setChecked] = React.useState([]);

  const activeTodoItemHandler = (itemId) => {
    // Find Id
    if (itemId === null && !Number(itemId)) return;

    const todoItemIndex = todoContext.value.findIndex(
      (todoItem) => todoItem.id === Number(itemId)
    );

    if (todoItemIndex === -1) return;

    todoContext.value[todoItemIndex].isCompleted =
      !todoContext.value[todoItemIndex].isCompleted;

    // Update Item
    todoContext.setTodoItems([...todoContext.value]);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    activeTodoItemHandler(value);
  };

  const handleDelete = (itemId) => {
    // console.log("Delete" + " " + itemId);

    // Find Id
    if (itemId === null && !Number(itemId)) return;

    // Delete Match Id
    const todoItems = todoContext.value.filter(
      (todoItem) => todoItem.id !== Number(itemId)
    );

    // Update Item
    todoContext.setTodoItems([...todoItems]);
  };

  const handleDeleteAll = () => {
    // Delete All Item
    todoContext.setTodoItems([]);
  };

  // conditional List Items
  const todoItems = show.match("all")
    ? todoContext.value
    : show.match("active")
    ? todoContext.value.filter((todoItem) => !todoItem.isCompleted)
    : todoContext.value.filter((todoItem) => todoItem.isCompleted);

  return todoContext && todoContext.value && todoContext.value.length > 0 ? (
    <List
      sx={{
        width: "100%" /*, maxWidth: 360 */,
        bgcolor: "background.paper",
      }}
    >
      {todoItems && todoItems.length > 0 ? (
        todoItems.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
            <ListItem
              key={value.id}
              secondaryAction={
                secondaryAction ? (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={handleDelete.bind(null, value.id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                ) : undefined
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value.id)}
                dense
                sx={{
                  px: 0,
                }}
              >
                <ListItemIcon
                  sx={{
                    "&.MuiListItemIcon-root": {
                      minWidth: "32px",
                    },
                  }}
                >
                  <Checkbox
                    edge="start"
                    checked={value.isCompleted}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${value.textContent}`}
                  sx={{
                    textDecoration: value.isCompleted ? "line-through" : "none",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })
      ) : (
        <Typography variant="subtitle2">No Item(s) Found...</Typography>
      )}

      {show.match("completed") &&
        todoContext.value &&
        todoContext.value.find((todoItem) => todoItem.isCompleted) &&
        todoContext.value.length > 0 && (
          <Box
            sx={{
              marginTop: "2rem" /* 32px */,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" color="error" onClick={handleDeleteAll}>
              <DeleteOutlineIcon />
              <Typography>Delete All</Typography>
            </Button>
          </Box>
        )}
    </List>
  ) : (
    <Typography variant="subtitle2">No Item(s) Found...</Typography>
  );
};

export default TodoList;
