import TodoItem from './TodoItem';
import styles from './TodoLists.module.scss'

function TodoLists({data ,deleteTodo, editTodo}) {

  const dataRender = data.map ((item)=> <TodoItem key={item.id} id={item.id} task= {item.task} date={item.due_date} done={item.status} deleteTodo={deleteTodo} editTodo={editTodo}/>)
  console.log(dataRender)
  return (
   <ul className={styles.todo__lists}>

   {dataRender}

   </ul>
  );

  // #2 return 
  // <ul className={styles.todo__lists}>
  // {todoData.map ((item)=> 
  // <TodoItem 
  // key={item.id} 
  // task= {item.task} 
  // date={item.due_date} 
  // done={item.status}
  // />)}
  // </ul>
}

export default TodoLists;
