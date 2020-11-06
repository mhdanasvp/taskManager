
import React,{useState} from 'react'
import { Redirect } from 'react-router-dom';
import { isAuthenticated, signup,authenticate } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });
    const { name, email, password,phone, redirectToReferrer, error } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password,phone }).then(data => {
            
            if (data.error) {
                setValues({ ...values, error: data.error.message, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    phone:'',
                    error: '',
                   
                })
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };



    const signUpForm = () => (
        
        <form>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
        </div>

        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
        </div>

        <div className="form-group">
            <label className="text-muted">Phone</label>
            <input onChange={handleChange('phone')} type="text" className="form-control" value={phone} />
        </div>
        <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
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
                return <Redirect to="/" />;
            } else {
                return <Redirect to="/" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };
    return (
        <div className="col-md-6 offset-md-3">
        
        {showError()}
        {signUpForm()}
        {redirectUser()}
        </div>
    )
}

export default Signup
