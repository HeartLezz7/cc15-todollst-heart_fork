import { useState } from "react";
import { Button } from "../Common/Button/Button";
import styles from "./TodoForm.module.scss";
import useTodo from "../../hooks/useTodo";

/*
CC1 -Form Handle

- ใช้ FN Event onSubmit
- โดยทั่วไปทุกปุ่มใน <form/> จะทำหน้าที่ submit
- วิธีแก้ ต้องกำหนด type button
  -type ="submit" : <button type="button">1</button>
  -type ="submit" : <button type="submit">2</button>
*/

function TodoForm(props) {
  const [isError, setIsError] = useState(false);
  const [taskInput, setTaskInput] = useState(props.oldTodo?.task || "");
  const { addTodo, editTodo } = useTodo();
  const handleChangeInput = (event) => {
    if (isError) setIsError(false);
    setTaskInput(event.target.value);
  };

  // 2 MODE : Add or Edit
  const handleSubmit = function (event) {
    // 1. PreventDefault
    event.preventDefault();
    // 2. ต้องรู้ก่อนว่า User พิมพ์อะไรมา (อยู่ใน state : taskInput)

    // 3.FormValidation
    // Case 1 : submit ได้
    // Case 2 : submit ไม่ได้ => แสดง Error

    if (taskInput.trim() === "") {
      setIsError(true);
      return;
    }

    if (props.oldTodo) editTodo(props.oldTodo.id, { task: taskInput });
    else addTodo(taskInput);

    // create NewTodo
    // 1- ส่ง Request  ไปหลังบ้านเพื่อ save ลง Database
    // 2- ทำการอัพเดท state ของ AllTodo == React ทำการ Rerender
    // data = []
    //data = [{id:number,task:string,status:boolean,due_date:YYYY-MM-DD}]
    // const newTodo =
    // {id:nanoid(),
    //   task:taskInput,
    //   status:false,
    //   due_date:"2023-09-01"}
    // const newTodoLists = [newTodo,...props.data]
    // props.setTodo(newTodoLists);

    // Update State
    // props.setTodo((prev) => [newTodo,...prev]);

    // Send TaskInput to addTodo
    // if (props.addTodo){
    //   props.addTodo(taskInput);
    // }
    // else if(props.editTodo && props.oldTodo){
    //     props.editTodo(props.oldTodo.id , {task:taskInput})
    // }

    props.setIsOpenForm(false);
  };

  const handleCancel = function () {
    props.setIsOpenForm(false);
  };

  return (
    <form className={styles.todo__form__container} onSubmit={handleSubmit}>
      {/*	Body */}
      <input
        className={styles.todo__form__input}
        placeholder="Task Name"
        value={taskInput}
        onChange={handleChangeInput}
      />

      {/*Form Footer */}
      <div className={styles.todo__form__footer}>
        {isError ? <p className={styles.todo__error}>{props.massage}</p> : null}
        <div className={styles.todo__form__buttons}>
          <Button
            text="cancel"
            active={false}
            type="button"
            onClick={handleCancel}
          />
          <Button text={props.textSubmit} active={true} type="submit" />
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
