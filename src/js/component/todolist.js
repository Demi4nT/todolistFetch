import React, {useState, useEffect} from 'react';

export const TodoList = () => {
    const [task, setTask] = useState (" ");
    const [taskList, settaskList] = useState([]);

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
                        settaskList(result)
                        console.log(result)})
        .catch(error => console.log('error', error));
    };

    function putTask (newList) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(newList);

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
            <button onClick={ () => {
                let newList = taskList.concat({label: task, done: false})
                putTask(newList); settaskList(newList)
                console.log(taskList) }} >
                Añadir
            </button>
            <button className='limpiador' onClick={ () => {
                let clearAll = []
                settaskList(clearAll); putTask(clearAll)
            }}>Limpiar</button>
            {taskList.map( (value, key) => {
                return (<li className='list-group-item list-group-item-light' key={key}>
                    {value.label}
                    <div className='myDiv'>
                        <button className='btn btn-warning' onClick={ () => {
                            let deleteList = (taskList.filter( (item, i) => {
                                return (i !== key)
                            } ))
                            settaskList(deleteList)
                            putTask(deleteList)
                            console.log(taskList)
                            }} > x
                       </button>
                    </div>
                </li>)
            }    
            )}
            <p>Hay {taskList.length} tareas agregadas!</p>
        </div>
    )
}