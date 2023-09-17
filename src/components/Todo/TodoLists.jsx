import TodoItem from './TodoItem';
import styles from './TodoLists.module.scss'
import useTodo from '../../hooks/useTodo';

function TodoLists() {
  const {showTodos }  = useTodo();


  const dataRender = showTodos.map ((item)=> <TodoItem key={item.id} id={item.id} task= {item.task} date={item.due_date} done={item.status} />)

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
