import styles from './TodoLists.module.scss'
import {FaTrashAlt, FaPen } from "react-icons/fa"
 
function TodoLists() {
  return (
    <div>
      <ul>
        <li className={styles.todo}>
          <span className={styles.todo__checkbox}>{/*<FaRegCircle/>*/}</span>
          <p className={styles.todo__task}>TodoItem 1 </p>
          <span className={styles.todo__date}>30AUG</span>
          <div className={styles.todo__action}>
            <span className={styles.todo__edit}><FaPen/></span>
            <span className={styles.todo__delete}><FaTrashAlt/></span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default TodoLists