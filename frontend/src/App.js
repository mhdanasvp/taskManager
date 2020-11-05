import React,{Fragment} from 'react'
import { Switch,Route } from "react-router-dom"
import Header from './components/nav/Header'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import PrivateRoute from "./auth/PrivateRoute"
import AdminRoute from "./auth/AdminRoute"
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Task from './pages/Task'


const App = () => {
  return (
    <Fragment>
      
    <Header/>
      <Switch>
      
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/create/task" exact component={Task} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        
        


      </Switch>
    </Fragment>
  )
}

export default App
