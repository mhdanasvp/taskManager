import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { createTask } from './apiCalls';

const Task = () => {
    const [values, setValues] = useState({
        workingProject: '',
        taskTitle: '',
        description: '',
        Comments: '',
        status: 'Pending',
        error:'',
        redirectToReferrer: false
    });
    const { workingProject, taskTitle, description, redirectToReferrer, Comments,status,error } = values;
    const { user,accessToken } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });




        createTask(user._id,accessToken,{ workingProject, taskTitle, description,Comments,status}).then(data => {
            
            if (data.error) {
                setValues({ ...values, error: data.error.message, success: false });
            } else {
                setValues({
                    ...values,
                    workingProject: '',
                    taskTitle: '',
                    description: '',
                    Comments:'',
                    status: '',
                    error:'',
                    redirectToReferrer: true
                });
            }
        });
    };



    const taskForm = () => (
        
        <form>
        <div className="form-group">
            <label className="text-muted">workingProject</label>
            <input onChange={handleChange('workingProject')} type="text" className="form-control" value={workingProject} />
        </div>

        <div className="form-group">
            <label className="text-muted">taskTitle</label>
            <input onChange={handleChange('taskTitle')} type="email" className="form-control" value={taskTitle} />
        </div>

        <div className="form-group">
            <label className="text-muted">description</label>
            <input onChange={handleChange('description')} type="text" className="form-control" value={description} />
        </div>
        <div className="form-group">
            <label className="text-muted">Comments</label>
            <input onChange={handleChange('Comments')} type="text" className="form-control" value={Comments} />
        </div>
        <div className="form-group">
            <label className="text-muted">status</label>
            <input onChange={handleChange('status')} type="text" className="form-control" value={"Pending"} disabled/>
        </div>
        
        <button onClick={clickSubmit} className="btn btn-primary">
            Submit
        </button>
    </form>
        


    )
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === "1") {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        
    };
 


    return (
        <div className="container">
            {taskForm()}
            {showError()}
            {redirectUser()}
        </div>
    )
}

export default Task
