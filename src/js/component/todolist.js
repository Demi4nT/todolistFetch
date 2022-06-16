import React, {useState} from 'react';

export const TodoList = () => {
    const [task, setTask] = useState ("");
    const [taskList, settaskList] = useState([]);
    return (
        <div>
            <h1>To dos</h1>
            <input onChange={ (e) => {setTask(e.target.value)}} />
            <button onClick={ () => settaskList([...taskList, task])
            } >
                Añadir
            </button>
            {taskList.map( (value, key) => {
                return (<li key={key}>
                    {value}
                    <button onClick={ () => {settaskList(taskList.filter( (item, i) => {
                        return (i !== key)
                    } ))}} >x</button>
                </li>)
            }    
            )}
            <p>Hay {taskList.length} tareas agregadas!</p>
        </div>
    )
}