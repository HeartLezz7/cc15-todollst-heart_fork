import { useState } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoLists.module.scss'

function TodoLists({data}) {

  // CRUD = Create-Read-Update-Delete

  const dataRender = data.map ((item)=> <TodoItem key={item.id} id={item.id} task= {item.task} date={item.due_date} done={item.status}/>)

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
