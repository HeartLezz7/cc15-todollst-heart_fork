// Dependencies
import "./App.scss";
import AppBar from "../components/Common/AppBar/AppBar";
import SideBar from "../components/SideBar/SideBar";
import TodoHeader from "../components/Todo/TodoHeader";
import TodoCreate from "../components/Todo/TodoCreate";
import TodoLists from "../components/Todo/TodoLists";

// const data = [
//   { "id": nanoid(),
//   "task": "Suspendisse potenti.",
//   "status": false,
//   "due_date": "2023-04-26" },
// {
//     "id": nanoid(),
//     "task": "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
//     "status": false,
//     "due_date": "2023-05-08"
// },
// {
//     "id": nanoid(),
//     "task": "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
//     "status": false,
//     "due_date": "2023-04-30"
// },]

// const END_POINT = "http://localhost:8080/api/todos";

function App() {
  // const { fetchAllTodo } = useContext(TodoContext);

  // addTodo();
  // deleteTodo();
  // editTodo();
  // ADD
  // const addTodo = async function (taskName) {
  //   const newTodo =
  //   {task:taskName,
  //     status:false,
  //     due_date:dayjs().format('YYYY-MM-DD')}

  //     try {
  //       // SEND REQUEST : POST
  //       // WAIT RESOINSE
  //       const options = {method:"POST", headers : {"Content-type":"application/json"},body : JSON.stringify(newTodo)};
  //       let response = await fetch(END_POINT, options);
  //       let data = await response.json();
  //       const createTodo = {...data.todo, due_date: data.todo.date}
  //       delete createTodo.date;

  //     // Update STATE
  //       setAllTodos((p) => [createTodo,...p])
  //     } catch (error) {
  //       console.log(error);
  //     }
  // }

  // // DELETE
  // const deleteTodo = async (todoId) => {
  //   try {
  //     const options = {method:"DELETE"};
  //     let response = await fetch(`${END_POINT}/${todoId}`, options);
  //     if (response.status === 204){
  //       setAllTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }

  //   // 1st WAY
  //   // const foundIndex = allTodos.findIndex((todo) => todo.id === todoId)
  //   // if (foundIndex !== -1){
  //   //   const newTodoLists = [...allTodos]
  //   //   newTodoLists.splice(foundIndex,1)
  //   //   setAllTodos([...newTodoLists])
  //   // }
  //   // 2nd WAY
  //   // const newTodoLists = allTodos.filter((todo) => todo.id !== todoId)
  //   // setAllTodos(newTodoLists)
  // }

  // // EDIT : UpdateTodo
  // const editTodo = async (todoId, updateTodoObj) => {
  //   try{
  //     // FindTodo
  //    let foundedIndex = allTodos.findIndex((todo) => todo.id === todoId);
  //     if(foundedIndex !== -1){
  //       //updateTodo
  //       const updatedTodo = {...allTodos[foundedIndex],...updateTodoObj};
  //       updatedTodo.date = updatedTodo.due_date;
  //       const options = {method:"PUT", headers:{"content-type":"application/json"},body: JSON.stringify(updatedTodo),}
  //       let response = await fetch(`${END_POINT}/${todoId}`,options);
  //       const data = await response.json();
  //       console.log(data)
  //       // Updatestate
  //       const newTodoLists = [...allTodos];
  //       console.log(newTodoLists)
  //       newTodoLists [foundedIndex] = {...data.todo, due_date:data.todo.date};
  //       setAllTodos(newTodoLists);
  //       }
  //     } catch(error) {
  //       console.log(error)
  //     }

  //   }

  return (
    <div className="todo">
      <div className="todo__header">
        <AppBar />
      </div>
      <div className="todo__sidebar">
        <SideBar />
      </div>
      <div className="todo__content">
        <main className="todo__container">
          <TodoHeader />
          <TodoCreate />
          <TodoLists />
        </main>
      </div>
    </div>
  );
}

export default App;
