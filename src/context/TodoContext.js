import { createContext, useState } from "react";
import dayjs from "dayjs";

// Context name
const TodoContext = createContext();

function TodoContextProvider(props) {
  const END_POINT = "http://localhost:8080/api/todos";
  const [allTodos, setAllTodos] = useState([]);

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
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newTodo),
      };
      let response = await fetch(END_POINT, options);
      console.log(response);
      let data = await response.json();
      const createTodo = { ...data.todo, due_date: data.todo.date };
      delete createTodo.date;

      // Update STATE
      setAllTodos((p) => [createTodo, ...p]);
    } catch (error) {
      console.log(error);
    }
  };

  // READ
  async function fetchAllTodo() {
    try {
      let response = await fetch(END_POINT, {
        method: "GET",
      });
      let todoData = await response.json();

      const newTodolists = todoData.todos.map((todo) => {
        const newTodo = { ...todo, due_date: todo.date };
        delete todo.date;
        return newTodo;
      });
      setAllTodos(newTodolists);
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE
  const deleteTodo = async (todoId) => {
    try {
      const options = { method: "DELETE" };
      let response = await fetch(`${END_POINT}/${todoId}`, options);
      if (response.status === 204) {
        setAllTodos((prev) => prev.filter((todo) => todo.id !== todoId));
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
        const options = {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updatedTodo),
        };
        let response = await fetch(`${END_POINT}/${todoId}`, options);
        const data = await response.json();
        console.log(data);
        // Updatestate
        const newTodoLists = [...allTodos];
        console.log(newTodoLists);
        newTodoLists[foundedIndex] = { ...data.todo, due_date: data.todo.date };
        setAllTodos(newTodoLists);

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
    addTodo,
    fetchAllTodo,
    editTodo,
    deleteTodo,
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
