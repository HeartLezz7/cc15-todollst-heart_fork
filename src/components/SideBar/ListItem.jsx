import styles from './ListItem.module.scss';

/*
props = {
  text : string
  icon : <Component/>
  active: boolean
}
*/
function ListItem(props) {

  const listClassName = `${styles.list__item} ${props.active ? 'active' : ''}`;
  // active=false => textClassName = "list__item"
  // active=true => textClassName = "list__item active"

  return (
    <li className={listClassName}>
      {props.icon}
      <p className={styles.list__item__text}>{props.text}</p>
    </li>
  );
}
// CSS + JS Value == DynamicsClassName
// not-active :  className='list__item'
// active :   className='list__item active'
export default ListItem;
