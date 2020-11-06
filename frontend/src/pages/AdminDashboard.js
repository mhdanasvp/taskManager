import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth'
import { listTask } from './apiCalls'

const AdminDashboard = () => {
    const { user: { _id, name, email, role, phone } } = isAuthenticated()
    const { accessToken } = isAuthenticated()
    const [values, setValues] = useState({
        error: "",

    })

    const [task, setTask] = useState([]);



    const loadTask = () => {
        listTask(_id, accessToken).then(data => {
            
            if (data.error) {
                setValues({ ...values, error: data.error.message })
            } else {

                setTask(data.task)
            }

        })
    }

    useEffect(() => {
        loadTask()

    }, [])

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{phone}</li>
                    <li className="list-group-item">{role === "1" ? "Admin" : "User"}</li>
                </ul>
            </div>
        )
    }
    const taskInfo = () => {
        return (
            <div className="card mb-5 mt-5">
                <h3 className="card-header">Task Information</h3>
                {task.map((task, taskIndex) => {
                    return (
                        <div className="row">
                            <div className="col-md-12">
                                <div className="" key={taskIndex} style={{ borderBottom: "5px solid indigo" }}>


                                    <ul className="list-group mb-2">
                                        <li className="list-group-item bg-primary">taskId: {task._id}</li>
                                        <li className="list-group-item">
                                            taskTitle: {task.taskTitle}
                                        </li>
                                        <li className="list-group-item" >
                                            Status :<b> {task.status}</b>
                                        </li>
                                        <li className="list-group-item">
                                            User : {task.user.name}
                                        </li>
                                        <li className="list-group-item">
                                            Phone : {task.user.phone}
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
        <div className="row">

            <div className="col-md-8 offset-md-2">
                {userInfo()}
                {taskInfo()}
            </div>
        </div>
    )
}

export default AdminDashboard
