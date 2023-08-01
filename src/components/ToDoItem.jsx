import { useState } from "react";
import { useEffect } from "react";
import "../styles/styles.css";
import {
  Button,
  Checkbox,
  Grid,
  ListItem,
  List,
  ListItemText,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { Switch } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
// import { List } from "@material-ui/core";

function TodoItem() {
  // state for dark theme
  const [dtheme, setTheme] = useState(false);
  //dark theme
  const ptheme = createTheme({
    palette: {
      mode: dtheme ? "dark" : "light",
    },
  });

  useEffect(() => {
    const themeType = localStorage.getItem("darker");
    if (themeType !== "dark") {
      setTheme(true);
    }
  }, []);

  // toggle for dark theme
  const handleChange = () => {
    localStorage.setItem("darker", dtheme ? "dark" : "light");
    setTheme(!dtheme);
    console.log(dtheme);
  };

  // state of entered text
  const [inputText, setInputText] = useState("");

  // state of submitted text
  const [submitText, setSubmittedText] = useState(() => {
    const localval = localStorage.getItem("abc");
    if (localval == null) return [];
    return JSON.parse(localval);
  });

  useEffect(() => {
    localStorage.setItem("abc", JSON.stringify(submitText));
  }, [submitText]);

  //add to the list using button
  const addToList = () => {
    if (inputText !== "") {
      setSubmittedText((currenttodos) => {
        return [
          ...currenttodos,
          { id: Math.random() * 1234, content: inputText, completed: false },
        ];
      });
    }
    setInputText("");
  };

  // add to list using enter key
  const addToList1 = (event) => {
    if (event.key === "Enter") {
      if (inputText !== "") {
        setSubmittedText((currenttodos) => {
          return [
            ...currenttodos,
            { id: Math.random() * 1234, content: inputText, completed: false },
          ];
        });
      }
      setInputText("");
    }
  };

  // delete from the list
  const deleteItem = (id) => {
    const newList = submitText.filter((ele) => ele.id !== id);
    setSubmittedText(newList);
    localStorage.setItem("abc", JSON.stringify(newList));
  };

  //change checkbox state
  const changeCheckboxState = (id, completed) => {
    setSubmittedText((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  // display to-dos
  const filteredTodos = submitText
    ? submitText.filter((todo) => todo.completed !== false)
    : [];
  return (
    <>
      <ThemeProvider theme={ptheme}>
        <CssBaseline />
        <Box sx={{ position: "fixed", top: 0, right: 0 }}>
          <Switch checked={dtheme} onChange={handleChange} />
        </Box>

        <div currenttodos={filteredTodos.length} />
        <Box>
          <h2>To-Do App</h2>

          <Box
            className="todo-application"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Create a new item!"
              name="todo"
              size="small"
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              onKeyDown={addToList1}
              value={inputText}
              sx={{}}
            />

            <Button
              sx={{ padding: 1 }}
              variant="contained"
              onClick={() => addToList()}
              size="small"
            >
              +
            </Button>
          </Box>

          <br />
          {submitText.map((st, index) => (
            <Grid
              container
              justifyContent="center"
              key={index}
              className={st.completed ? "completed" : ""}
              sx={{
                margin: 0,
              }}
            >
              <List>
                <ListItem
                  style={{
                    height: 30,
                    width: 800,
                    border: "1px ",
                    padding: "10px",
                    boxShadow: "1px 1px grey",
                  }}
                >
                  <Checkbox
                    id="checkbox"
                    type="checkbox"
                    checked={st.completed}
                    onChange={(e) =>
                      changeCheckboxState(st.id, e.target.checked)
                    }
                  />

                  <ListItemText>{st.content}</ListItemText>

                  <IconButton edge="end" onClick={() => deleteItem(st.id)}>
                    <DeleteForeverSharpIcon />
                  </IconButton>
                </ListItem>
              </List>
            </Grid>
          ))}
        </Box>
      </ThemeProvider>
    </>
  );
}

export default TodoItem;
