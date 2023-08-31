// Dependencies
import './App.scss';
import { FaInbox, FaCalendar, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import Header from '../components/Header';
import Lists from '../components/Lists';
import TodoHeader from '../components/Todo/TodoHeader';
import TodoCreate from '../components/Todo/TodoCreate';
import TodoLists from '../components/Todo/Todolists';

function App() {

  const generalLists = [
    {id: 1, text: "Indox",icon: <FaInbox/> , active: true},
    {id: 2, text: "Today",icon: <FaCalendar/> , active: false},
    {id: 3, text: "Next 7 Days",icon: <FaCalendarAlt/> , active: false},
  ]

  const projectLists = [
    {id: 1, text: "Project-A",icon: <FaInbox/> , active: true},
    {id: 2, text: "Project-B",icon: <FaInbox/> , active: false},
  ]
  return (
    <div className='todo'>
      <div className='todo__header'>
        <Header />
      </div>
      <div className='todo__sidebar'>
        <aside className='sidebar'>
          <section className='sidebar__category'>
            <Lists data={generalLists}/>
          </section>
          <section className='sidebar__category'>
            <div className='accordion'>
              {/* Toggle */}
              <div className='accordion__toggle'>
                <li className='accordion__item'>
                  <FaChevronDown className='accordion__item__icon accordion__item__active' />
                  <p className='accordion__item__text'>Projects</p>
                </li>
              </div>
              {/* Lists */}
              <Lists data={projectLists}/>
              {/* another way
              <ul className='list'>
                {projectLists.map((obj)=> <ListItem key={obj.id} {...obj} />)}
              </ul> */}
            </div>
          </section>
        </aside>
      </div>
      <div className='todo__content'>
        <main className='todo__container'>
            <TodoHeader/>
          {/* CreateTodo */}
            <TodoCreate/>

          {/* TodoLists */}
              <TodoLists/>
        </main>
      </div>
    </div>
  );
}

export default App;
