import React, { useEffect , useState } from 'react';
import axios from 'axios';
import './Todos.css';

export default function ShowTodos() {

    const [allTodos, setAllTodos] = useState([]);

    useEffect(() => {
        async function getTodos() {
            const response = await axios.get(
                "http://localhost:8080/api/v1/todo/Andreea"
            );
            setAllTodos(response.data);
        }
        getTodos();
    }, []);

    return (
        <div>   
            <div className="page-content page-container" id="page-content">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-md-12">
                            <div className="card px-3">
                                <div className="card-body">
                                    <h4 className="card-title">Todo list</h4>                                  
                                    <div className="list-wrapper">
                                        <ul className="d-flex flex-column-reverse todo-list">       
                                        {allTodos.map(todo => (                 
                                            <div className="task-container">
                                                <li className="ui-state-default">
                                                    <div className="checkbox">
                                                        <label>
                                                            <input type="checkbox" value=""/>
                                                            {todo.name}
                                                        </label>
                                                    </div>
                                                </li>
                                            </div>
                                        ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="add-items d-flex">  
                                    <button class="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>           
    );
}