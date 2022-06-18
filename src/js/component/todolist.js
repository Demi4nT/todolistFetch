import React, {useState} from 'react';

export const TodoList = () => {
    const [task, setTask] = useState ("");
    const [taskList, settaskList] = useState([]);
    return (
        <div className='caja'>
            <h1>To dos</h1>
            <input onChange={ (e) => {setTask(e.target.value)}} />
            <button onClick={ () => settaskList([...taskList, task])} >
                Añadir
            </button>
            {taskList.map( (value, key) => {
                return (<li className='list-group-item list-group-item-light' key={key}>
                    {value}
                    <div className='myDiv'>
                        <button className='btn btn-warning' onClick={ () => {settaskList(taskList.filter( (item, i) => {
                            return (i !== key)
                        } ))}} > x
                       </button>
                    </div>
                </li>)
            }    
            )}
            <p>Hay {taskList.length} tareas agregadas!</p>
        </div>
    )
}