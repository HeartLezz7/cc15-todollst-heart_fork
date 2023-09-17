import styles from './Button.module.scss';

export function Button({ type, onClick, text, active = true }) {
  let btnStyles = active ? styles.btn__primary : styles.btn__secondary;
  return <button className={`${styles.btn} ${btnStyles}`} type={type}onClick={onClick} >{text} </button>;
}
