import React, {useState, useEffect} from 'react';

export const TodoList = () => {
    const [task, setTask] = useState (" ");
    const [taskList, settaskList] = useState([]);
    const [backtask, setBacktask] = useState (" ")
    const sentTask = [{label: task, done: false}]

    useEffect( () => {
        getTask();
    }, [] ) 

    function getTask () {

        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch("https://assets.breatheco.de/apis/fake/todos/user/demiancito", requestOptions)
        .then(response => response.json())
        .then(result => {
                        setBacktask(result)
                        console.log(result)})
        .catch(error => console.log('error', error));
    };

    function putTask (sentTask) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(sentTask);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://assets.breatheco.de/apis/fake/todos/user/demiancito", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    return (
        <div className='caja'>
            <h1>To dos</h1>
            <input onChange={ (e) => {setTask(e.target.value)}} />
            <button onClick={ () => {putTask(sentTask)}} >
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