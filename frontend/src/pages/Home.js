import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'

const Home = () => {
    const {user}=isAuthenticated()
    return (
        <div className="col-md-6 offset-md-3 mt-4">
            {!user && (<h1>Task Mangement System</h1>)}
            {user&&(
                <div>
                <h3>Welcome mr {user.name}</h3>
                <Link  to={user.role==="1"? "/admin/dashboard":"user/dashboard"} ><h3 className="text-info">Dashboard</h3></Link>
                </div>
            )}
        </div>
    )
}

export default Home
