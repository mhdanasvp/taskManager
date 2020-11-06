import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { listTaskByUser,getStatusValues,updateTaskStatus } from './apiCalls';
import { isAuthenticated } from '../auth';
import moment from 'moment'


const UserDashboard = () => {
    const { user: { _id, name, email, role, phone } } = isAuthenticated()
    const { accessToken } = isAuthenticated()
    const [values, setValues] = useState({
        error: "",

    })
    const [task, setTask] = useState([])
    const [statusValues, setStatusValues] = useState([]);
    

    const loadTask = () => {
        listTaskByUser(_id, accessToken).then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error.message })
            } else {

                setTask(data.task)
            }

        })
    }
    const loadStatusValues = () => {
        getStatusValues(_id, accessToken).then(data => {
            if (data.error) {
                console.log(data.error.message);
            } else {
                
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadTask()
        loadStatusValues()
    }, [])
   
    const handleStatusChange = (e, taskId) => {
        updateTaskStatus(_id, accessToken, taskId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadTask();
                }
            }
        );
        
    };
    const showStatus = task => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {task.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, task._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );



   


    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">user Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/task">
                            Create Task
                        </Link>
                    </li>

                </ul>
            </div>
        );
    };
    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{phone}</li>
                    <li className="list-group-item">
                        {role === "1" ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };


    const taskInfo = () => {
        return (
            <div className="card mb-5 mt-5">
                <h3 className="card-header">Task History</h3>
                {task.map((task, taskIndex) => {
                    return (
                        <div className="row">
                            <div className="col-md-12">
                                <div className="" key={taskIndex} style={{ borderBottom: "5px solid indigo" }}>
                                    

                                    <ul className="list-group mb-2">
                                    <li className="list-group-item bg-primary">taskId: {task._id}</li>
                                    <li className="list-group-item">
                                    Status : {showStatus(task)}
                                </li>
                                <li className="list-group-item">
                                        Created on:{" "}
                                        {moment(task.createdAt).fromNow()}
                                    </li>

                                        <li className="list-group-item">
                                            workingProject: {task.workingProject}
                                        </li>
                                        <li className="list-group-item">
                                        taskTitle: {task.taskTitle}
                                        </li>
                                        <li className="list-group-item">
                                        description: {task.description}
                                        </li>
                                        <li className="list-group-item">
                                            Comments: {task.Comments}
                                        </li>
                                        <li className="list-group-item">
                                            workingProject: {task.workingProject}
                                        </li>


                                    </ul>

                                </div>
                            </div>
                        </div>
                    )
                })}</div>
        )
    }

        


    return (
        <div className="container">
            {userInfo()}
            {userLinks()}
            {taskInfo()}
            

        </div>
    )
}

export default UserDashboard
