import { createContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

// Context name ใช้ทั้ง Provider, Consumer
const TodoContext = createContext();

// SetUp Context ฝั่ง Provider
function TodoContextProvider(props) {
  const END_POINT = "http://localhost:8080/api";
  axios.defaults.baseURL = END_POINT;
  const [allTodos, setAllTodos] = useState([]);
  const [showTodos, setShowTodos] = useState([]);

  // Search
  const searchTodo = (keyword) => {
    if (keyword.trim() === "") setShowTodos(allTodos);
    const newShowTodos = allTodos.filter((todoObj) =>
      todoObj.task.toLowerCase().includes(keyword.toLowerCase())
    );
    setShowTodos(newShowTodos);
  };

  // ADD
  const addTodo = async function (taskName) {
    const newTodo = {
      task: taskName,
      status: false,
      due_date: dayjs().format("YYYY-MM-DD"),
    };

    try {
      // SEND REQUEST : POST
      // WAIT RESOINSE
      // const options = {
      //   method: "POST",
      //   headers: { "Content-type": "application/json" },
      //   body: JSON.stringify(newTodo),
      // };
      // let response = await fetch(END_POINT, options);
      // let data = await response.json();
      const { data } = await axios.post("/todos", newTodo);
      const createTodo = { ...data.todo, due_date: data.todo.date };
      delete createTodo.date;

      // Update STATE
      setAllTodos((p) => [createTodo, ...p]);
      setShowTodos((p) => [createTodo, ...p]);
    } catch (error) {
      console.log(error);
    }
  };

  // READ
  async function fetchAllTodo() {
    try {
      // let response = await fetch(END_POINT, {
      //   method: "GET",
      // });
      // let todoData = await response.json();
      const response = await axios.get("/todos");
      console.log(response);
      const newTodolists = response.data.todos.map((todo) => {
        const newTodo = { ...todo, due_date: todo.date };
        delete todo.date;
        return newTodo;
      });
      setAllTodos(newTodolists);
      setShowTodos(newTodolists);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllTodo();
  }, []);

  // DELETE
  const deleteTodo = async (todoId) => {
    try {
      // const options = { method: "DELETE" };
      // let response = await fetch(`${END_POINT}/${todoId}`, options);
      const response = await axios.delete(`/todos/${todoId}`, todoId);
      if (response.status === 204) {
        setAllTodos((prev) => prev.filter((todo) => todo.id !== todoId));
        setShowTodos((prev) => prev.filter((todo) => todo.id !== todoId));
      }
    } catch (error) {
      console.log(error);
    }

    // 1st WAY
    // const foundIndex = allTodos.findIndex((todo) => todo.id === todoId)
    // if (foundIndex !== -1){
    //   const newTodoLists = [...allTodos]
    //   newTodoLists.splice(foundIndex,1)
    //   setAllTodos([...newTodoLists])
    // }
    // 2nd WAY
    // const newTodoLists = allTodos.filter((todo) => todo.id !== todoId)
    // setAllTodos(newTodoLists)
  };

  // EDIT : UpdateTodo
  const editTodo = async (todoId, updateTodoObj) => {
    try {
      // FindTodo
      let foundedIndex = allTodos.findIndex((todo) => todo.id === todoId);
      if (foundedIndex !== -1) {
        //updateTodo
        const updatedTodo = { ...allTodos[foundedIndex], ...updateTodoObj };
        updatedTodo.date = updatedTodo.due_date;
        // const options = {
        //   method: "PUT",
        //   headers: { "content-type": "application/json" },
        //   body: JSON.stringify(updatedTodo),
        // };
        // let response = await fetch(`${END_POINT}/${todoId}`, options);
        // const data = await response.json();
        const { data } = await axios.put(`/todos/${todoId}`, updatedTodo);
        // Updatestate
        const newTodoLists = [...allTodos];
        console.log(newTodoLists);
        newTodoLists[foundedIndex] = { ...data.todo, due_date: data.todo.date };
        setAllTodos(newTodoLists);
        setShowTodos(newTodoLists);

        // Practice #1
        // let foundedTodo = allTodos.find((todo) => todo.id === todoId);
        // if (!foundedTodo) return;

        // const newTodo = Object.assign({},foundedTodo,updateTodoObj)
        // let foundedIndex = allTodos.findIndex((todo) => todo.id === todoId);
        // if(foundedIndex === -1) return;

        // const newTodoLists = [...allTodos];
        // newTodoLists.splice(foundedIndex,1,newTodo)
        // setAllTodos(newTodoLists);

        // Practice #2
        // const newTodoLists = allTodos.map ((todo) => {
        //    if(todo.id !== todoId) {
        //     return todo;
        //   }else {
        //     return{...todo,...updateTodoObj}
        //   }
        // } );
        // setAllTodos(newTodolists);

        // Practice #3
        //   const newTodoLists = allTodos.reduce ((acc,todo) =>{
        //     if(todo.id !== todoId) acc.push(todo);
        //     else acc.push({...todo,...updateTodoObj});
        //     return acc;
        //   },[])
        //   setAllTodos(newTodoLists);
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sharedObj = {
    value: 60,
    allTodos,
    showTodos,
    addTodo,
    fetchAllTodo,
    editTodo,
    deleteTodo,
    searchTodo,
  };

  return (
    <TodoContext.Provider value={sharedObj}>
      {props.children}
    </TodoContext.Provider>
  );
}

// export ไปครอบ UI
export default TodoContextProvider;

// export ไปให่้ consumer
export { TodoContext };
