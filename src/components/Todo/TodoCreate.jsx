import { useState } from 'react';
import styles from './TodoCreate.module.scss';
import TodoForm from "./TodoForm"
import { HiPlus } from 'react-icons/hi';



/*
Condition Rendering
- Default : Show Button & Text
- Active : Show TodoForm
*/

/*
CC2 - EVENT HANDLING
- เอาฟังก์ชันไปผูกติดกับ UI เทื่อให้ USER เป็นคนเรียกใช้ฟังก์ชันเอง
- onClick : ต้อง Click ก่อน , FN ถึงจะรัน
  - User ทำการคลิก
  - Browser
*/

/*
CC3 - JS Value ไม่สามารถทำให้ React Rerender ได้
ต้องใช้ state
*/

/*
CC5 -React State (1ในฟังก์ชันของ Hook)
*/
// #1 : FC = Function Component (Render)
function TodoCreate(props) {

  const [isOpenForm,setIsOpenForm] = useState(false);

  const handleClick = function() {
    setIsOpenForm(!isOpenForm)
  }

  return (
    <>
    {isOpenForm ? 
    (<TodoForm 
      textSubmit="Add Task" 
      massage = "Title is required" 
      setIsOpenForm={setIsOpenForm}
      data={props.data}
      setTodo={props.setTodo}
      addTodo={props.addTodo} 
      />) 
    : (<div className={styles.todo__create} onClick={handleClick}>
       <div className={styles.todo__create__button}>
       <HiPlus />
       </div>
       <h3 className={styles.todo__create__text}>Add Task</h3>
     </div>)}
  </>
  );
}

export default TodoCreate;
