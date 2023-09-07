import { useContext, useState } from 'react';
import styles from './TodoItem.module.scss';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { HiOutlineCheck } from 'react-icons/hi';
import TodoForm from './TodoForm';
import { TodoContext } from '../../context/TodoContext';

function TodoItem({ id, task, date ,done }) {
  const [isOpenForm,setIsOpenForm] = useState(false);
  const {deleteTodo,editTodo} = useContext(TodoContext);

  const handleClick = function() {
  setIsOpenForm(!isOpenForm)
  }

  const toggleStatus = () => {
    const newTodoObj = {id, task, date , status: !done}
    editTodo(id, newTodoObj);
  }

  return (
        <>
        {isOpenForm ? (<TodoForm 
            textSubmit="Edit Task" 
            massage = "Please update"
            setIsOpenForm={setIsOpenForm}
            editTodo = {editTodo}
            oldTodo = {{id, task, date ,done}}
            />):
            <li className={styles.todo}>
              <div className= {`${styles.todo__checkbox} ${done ? (styles.todo__checkbox__done): ""} `}>
                <HiOutlineCheck className={styles.todo__checkbox__icon} onClick={toggleStatus}/>
              </div>
              <p className={`${styles.todo__task} ${done ? (styles.todo__task__done) : ""}`}>{task} </p>
              <span className={styles.todo__date}>{date}</span>
              <div className={styles.todo__action}>
                <span>
                  <FaPen className={styles.todo__edit} onClick={handleClick}/>
                </span>
                <span>
                  <FaTrashAlt className={styles.todo__delete} onClick={() => deleteTodo(id)}/>
                </span>
              </div>
            </li>}
        </>

  )
}

export default TodoItem;