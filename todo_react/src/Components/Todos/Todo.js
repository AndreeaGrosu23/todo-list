import React, { useEffect , useState } from 'react';
import axios from 'axios';
import './Todos.css';
import Moment from 'moment';

export default function ShowTodos() {

    const [allTodos, setAllTodos] = useState([]);
    const [show, setShow] = useState(false);
    const username = window.sessionStorage.getItem("user");
    const [taskType, setTaskType] = useState("Work");
    const [name, setName] = useState();
    const [deadline, setDeadline] = useState();
    const [duration, setDuration] = useState();
    const [updatedDuration, setUpdatedDuration] = useState();
    const [sortedAsc, setSortedAsc] = useState(false);

    useEffect(() => {
        async function getTodos() {
            const response = await axios.get(
                `http://localhost:8080/api/v1/todo/${username}`
            );
            setAllTodos(response.data);
        }
        getTodos();
    }, []);

    const calculateTimeLeft = (todo) => {
        let deadline = new Date(todo.deadline);
        let now = new Date();
        let timeLeft = parseInt(Math.round(deadline-now)/(1000*60*60*24));
        return timeLeft;       
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        setShow(true);
    }

    const saveTask = (e) => {
        e.preventDefault();
        let deadlineFormatted = Moment(deadline).format('YYYY-MM-DD');
        let now = new Date();
        let nowFormatted = Moment(now).format('YYYY-MM-DD');
        let isAfter = Moment(deadlineFormatted).isAfter(Moment(nowFormatted));
        let isToday = deadlineFormatted===nowFormatted;
        if ( (isToday || isAfter) && duration>0 && duration<2147483647) {
            const data = {
                taskType : taskType,
                name : name,
                deadline : deadline,
                duration : duration
            };
            axios.post(`http://localhost:8080/api/v1/todo/add-todo/${username}`, data);
            setShow(false);
            window.location.reload();
        } else { 
            alert("You need to insert a valid date YYYY-MM-DD and time estimation in hours!");
        }
       
    }

    const deleteTask = (todo) => {       
        axios.delete(`http://localhost:8080/api/v1/todo/${todo.id}/delete-todo`);
        window.location.reload();
    }

    const getSortedDesc = () => {
        setSortedAsc(false);
        async function getTodos() {
            const response = await axios.get(
                `http://localhost:8080/api/v1/todo/${username}/sorted-desc`
            );
            setAllTodos(response.data);
        }
        getTodos();
    }

    const getSortedAsc = () => {
        setSortedAsc(true);
        async function getTodos() {
            const response = await axios.get(
                `http://localhost:8080/api/v1/todo/${username}/sorted-asc`
            );
            setAllTodos(response.data);
        }
        getTodos();
    }

    const changeStatus = (todo) => {
        const finishDate = new Date();
        const dateFormatted = Moment(finishDate).format('YYYY-MM-DD');
        if (updatedDuration>0 && updatedDuration<2147483647) {
            const data = { status : "Done",
                    duration : updatedDuration,
                    deadline : dateFormatted};
            axios.put(`http://localhost:8080/api/v1/todo/${todo.id}/status-change`, data);
            window.location.reload();
        } else {
            alert("Please enter a valid number of hours!");
        }
    }

    const handleClose = () => {
        setShow(false);
        window.location.reload();
    }

    return (
        <div>
            <h2 className="card-title">To-Do List</h2>          
            <div className="taskContent">   
            { allTodos.length ?            
                <div className="card-body">      
                    <div className="sortButton">
                        { !sortedAsc ?
                        <button onClick={() => getSortedAsc()}>Sort by earliest deadline</button> 
                        :
                        <button onClick={() => getSortedDesc()}>Sort by latest deadline</button> 
                        }
                    </div>                                
                    <div className="list-wrapper">
                        <ul >       
                        {allTodos.map(todo => (                 
                            <div className="task-container" key={todo.id}>
                                <li className="ui-state-default">
                                    <div className="taskBox">
                                        { todo.status !== "Done=" ?
                                        <label><b>{todo.name}</b></label>
                                        :
                                        <label><b>{todo.name}</b></label>
                                        }
                                        <hr></hr>
                                        <div>
                                            <i><span>Category: {todo.taskType}</span></i>
                                        </div>
                                        <hr></hr>
                                        <span><i>Deadline: {todo.deadline}</i> | <i>Estimated time(hours): {todo.duration}</i></span>
                                        <hr></hr>
                                        <div>
                                            {todo.status !== "Done" ?

                                                ( calculateTimeLeft(todo) > 0 ?
                                                <i><span>Time left: {calculateTimeLeft(todo)} days</span></i>
                                                :
                                                
                                                <i><span style={{ "color" : "red" }}>Less than a day left!</span></i>
                                                )

                                                :

                                                <i><span style={{ "color" : "green" }}>Task already done!</span></i>
                                            }
                                        </div>
                                        <hr></hr>
                                        { todo.status !== "Done" ?
                                        <div>
                                            <form className="formUpdateDuration" onSubmit={e => changeStatus(todo)}>                       
                                                <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="1"
                                                value={updatedDuration}
                                                required
                                                placeholder="Time spent in hours"
                                                onChange = {e => setUpdatedDuration(e.currentTarget.value)}
                                                >
                                                </textarea>
                                                
                                                <button className="btn" id = "done" type="submit">
                                                    Mark as done
                                                </button>
                                            </form>

                                            <button className="btn" id="delete"
                                            type="button" 
                                            onClick={() => deleteTask(todo)}>
                                                Delete task
                                            </button>
                                        </div>
                                        :
                                        <div></div>
                                        }
                                    </div>
                                </li>
                            </div>
                        ))}
                        </ul>
                    </div>
                </div> 
                 :
                <div>You don't have any tasks yet! Please add one.</div>
                }

                { !show ? 

                <div className="addTaskButton">  
                    <button onClick={handleAddTask}>Add task</button> 
                </div> 
                
                :

                <div className="addTodoContainer">
                    <form onSubmit={saveTask}>
                        <div className="form-group">
                            <label for="exampleFormControlSelect1">Task type</label>
                            <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            value = {taskType}
                            style = {{ "fontSize" : "12px"}}
                            onChange = {e => setTaskType(e.currentTarget.value)}
                            >
                            <option>Work</option>
                            <option>Hobby</option>
                            <option>Home</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Add task name</label>
                            <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="1"
                            value={name}
                            required
                            placeholder="What is your task?"
                            onChange = {e => setName(e.currentTarget.value)}
                            >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label>Add deadline</label>
                            <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="1"
                            value={deadline}
                            required
                            placeholder="YYYY-MM-DD"
                            onChange = {e => setDeadline(e.currentTarget.value)}
                            >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label>Estimate time needed for the task</label>
                            <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="1"
                            value={duration}
                            required
                            placeholder="How many hours?"
                            onChange = {e => setDuration(e.currentTarget.value)}
                            >
                            </textarea>
                        </div>
                        
                        <button type="submit" className="btnAdd">Save task</button>
                        <button onClick={handleClose} className="btnAdd">Back</button>                                    
                    </form>                                
                </div>
                }
            </div> 
        </div>          
    );
}