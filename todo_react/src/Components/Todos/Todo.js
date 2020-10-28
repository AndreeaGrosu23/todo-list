import React, { useEffect , useState } from 'react';
import axios from 'axios';
import './Todos.css';
import Moment from 'moment';
// import { Button, Modal } from "react-bootstrap";

export default function ShowTodos() {

    const [allTodos, setAllTodos] = useState([]);

    const [show, setShow] = useState(false);

    const username = window.sessionStorage.getItem("user");

    const [taskType, setTaskType] = useState("Work");
    const [name, setName] = useState();
    const [deadline, setDeadline] = useState();
    const [duration, setDuration] = useState();

    // const [updatedDuration, setUpdatedDuration] = useState();
    // const [showEstimationBox, setShowEstimationBox] = useState(false);

    const [sortedAsc, setSortedAsc] = useState(false);
    // const [doneTodo, setDoneTodo] = useState();


    useEffect(() => {
        async function getTodos() {
            const response = await axios.get(
                `http://localhost:8080/api/v1/todo/${username}`
            );
            setAllTodos(response.data);
        }
        getTodos();
    }, [username]);

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
        console.log(deadlineFormatted);
        console.log(nowFormatted);
        let isAfter = Moment(deadlineFormatted).isAfter(Moment(nowFormatted));
        console.log(isAfter);
        if (isAfter && duration>0 && duration<2147483647) {
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
                `http://localhost:8080/api/v1/todo/${username}/sorted-asc`
            );
            setAllTodos(response.data);
        }
        getTodos();
    }

    const getSortedAsc = () => {
        setSortedAsc(true);
        async function getTodos() {
            const response = await axios.get(
                `http://localhost:8080/api/v1/todo/${username}/sorted-desc`
            );
            setAllTodos(response.data);
        }
        getTodos();
    }

    // const updateTask = (todo) => {
    //     setShowEstimationBox(true);
    //     setDoneTodo(todo);
    // }

    // const handleClose = () => {
    //     setShowEstimationBox(false);
    // }

    // const changeStatus = (todo) => {
    //     const finishDate = new Date();
    //     const dateFormatted = Moment(finishDate).format('YYYY-MM-DD');
    //     const data = { status : "Done",
    //             duration : updatedDuration,
    //             deadline : dateFormatted};
    //     axios.post(`http://localhost:8080/api/v1/todo/${todo.id}/status-change`, data);
    //     window.location.reload();
    // }

    return (
        <div>              
            <div className="page-content page-container justify-content-center" id="page-content">
                <div className="row container d-flex justify-content-center">
                    <div className="col-md-8">
                        <div className="card px-3">
                            <div className="card-body">
                            <h2 className="card-title">Todo list</h2> 
                                <div className="sortButton">
                                    { !sortedAsc ?
                                    <button onClick={() => getSortedAsc()}>Sort by earliest deadline</button> 
                                    :
                                    <button onClick={() => getSortedDesc()}>Sort by latest deadline</button> 
                                    }
                                </div>                                
                                <div className="list-wrapper">
                                    <ul className="d-flex flex-column-reverse todo-list">       
                                    {allTodos.map(todo => (                 
                                        <div className="task-container" key={todo.id}>
                                            <li className="ui-state-default">
                                                <div className="taskBox">
                                                    { todo.status !== "Done=" ?
                                                        <div className="checkbox" >
                                                            <label>
                                                                <input type="checkbox" value=""/>
                                                                <b>{todo.name}</b>
                                                            </label>
                                                        </div>
                                                        :
                                                        <div className="checkbox" style={{ "color" : "green"}}>
                                                            <label>
                                                                <input type="checkbox" value="" checked={true}/>
                                                                <b>{todo.name}</b>
                                                            </label>
                                                        </div>
                                                    }
                                                    <hr></hr>
                                                    <div>
                                                        <i><span>Category: {todo.taskType}</span></i>
                                                    </div>
                                                    <hr></hr>
                                                    <h6><i>Deadline: {todo.deadline}</i> | <i>Estimated time(hours): {todo.duration}</i></h6>
                                                    <hr></hr>
                                                    <div>
                                                        { calculateTimeLeft(todo) >= 1 && todo.status !== "Done=" ?
                                                        <i><span>Time left: {calculateTimeLeft(todo)} days</span></i>
                                                        :
                                                        <i><span style={{ "color" : "red" }}>Less than a day left!</span></i>
                                                        }
                                                    </div>
                                                    <hr></hr>
                                                    { todo.status !== "Done=" ?
                                                    <div>
                                                        <button style={{ "backgroundColor" : "red" }}
                                                        type="button" 
                                                        onClick={() => deleteTask(todo)}>
                                                            Delete task
                                                        </button>
                                                    </div>
                                                    :
                                                    <span style={{ "color" : "red" }} >Cannot delete finished task</span>
                                                    }
                                                </div>
                                            </li>
                                        </div>
                                    ))}
                                    </ul>
                                </div>
                            </div> 
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
                                        onChange = {e => setTaskType(e.currentTarget.value)}
                                        >
                                        <option>Work</option>
                                        <option>Hobby</option>
                                        <option>Home</option>
                                        </select>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label for="exampleFormControlTextarea1">Add task name</label>
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
                                        <label for="exampleFormControlTextarea1">Add deadline</label>
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
                                        <label for="exampleFormControlTextarea1">Estimate time needed for the task</label>
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
                                    
                                    <button type="submit" className="btn btn-primary">Save task</button>
                                                                            
                                </form>                                
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>           
    );
}