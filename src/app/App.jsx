// Dependencies
import { useState } from 'react';
import { nanoid } from 'nanoid';
import './App.scss';
import AppBar from '../components/Common/AppBar/AppBar';
import SideBar from '../components/SideBar/SideBar';
import TodoHeader from '../components/Todo/TodoHeader';
import TodoCreate from '../components/Todo/TodoCreate';
import TodoLists from '../components/Todo/TodoLists';
import dayjs from 'dayjs';

const data = [ 
  { "id": nanoid(), 
  "task": "Suspendisse potenti.", 
  "status": false, 
  "due_date": "2023-04-26" },
{
    "id": nanoid(),
    "task": "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    "status": false,
    "due_date": "2023-05-08"
},
{
    "id": nanoid(),
    "task": "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
    "status": false,
    "due_date": "2023-04-30"
},]

function App() {
  const [allTodos, setAllTodos] = useState(data);

  const addTodo = function (taskName) {
    const newTodo =
    {id:nanoid(),
      task:taskName,
      status:false,
      due_date:dayjs().format('YYYY-MM-DD')}

    setAllTodos((p) => [newTodo,...p])
  }

  const deleteTodo = (deleteId) => {
    const foundIndex = allTodos.findIndex((todo) => todo.id === deleteId)
    if (foundIndex !== -1){
      const newTodoLists = [...allTodos]
      newTodoLists.splice(foundIndex,1)
      setAllTodos([...newTodoLists])
    }
    // 2WAY
    // const newTodoLists = allTodos.filter((todo) => todo.id !== deleteId)
    // setAllTodos(newTodoLists)
  }

  const editTodo = (todoId, newTodoObj) => {
    // console.log(todoId, newTodoObj)

    // Practice #1
    // let foundedTodo = allTodos.find((todo) => todo.id === todoId);
    // if (!foundedTodo) return;
    
    // const newTodo = Object.assign({},foundedTodo,newTodoObj)
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
    //     return{...todo,...newTodoObj}
    //   }
    // } );
    // setAllTodos(newTodolists);
    
    // Practice #3
    const newTodoLists = allTodos.reduce ((acc,todo) =>{
      if(todo.id !== todoId) acc.push(todo);
      else acc.push({...todo,...newTodoObj});
      return acc;
    },[])
    setAllTodos(newTodoLists);
  }
  
  return (
    <div className='todo'>
      <div className='todo__header'>
        <AppBar />
      </div>
      <div className='todo__sidebar'>
        <SideBar />
      </div>
      <div className='todo__content'>
        <main className='todo__container'>
          <TodoHeader />
          <TodoCreate 
          data={allTodos}
          setTodo={setAllTodos} 
          addTodo={addTodo}
          />
          <TodoLists data={allTodos} deleteTodo={deleteTodo} editTodo={editTodo}/>
        </main>
      </div>
    </div>
  );
}

export default App;
