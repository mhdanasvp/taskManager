import React, { useState,useEffect } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, UserAddOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated,signout } from '../../auth';


const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("")
    const { user }=isAuthenticated()

    const history=useHistory()

    const handleClick = (e) => {
        console.log("clicked", e.key);
        setCurrent(e.key)

    }
  
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />} >
                <Link to="/">Home</Link>
            </Item>
            
           {!user && (
            <Item key="signin" icon={<UserOutlined />} className="float-right"  >
                <Link to="/signin">Signin</Link>
            </Item>
           )}
            {!user && (
                <Item key="signup" icon={<UserOutlined />} className="float-right"  >
                <Link to="/signup">Signup</Link>
            </Item>
            )}
            <Item className="float-right" icon={<LogoutOutlined />} onClick={() =>
                            signout(() => {
                                history.push("/signin");
                            })
                        }>Logout</Item>
            

            {user &&(
                <SubMenu key="SubMenu" icon={<UserOutlined />} title={user.name} className="float-right">

                
                <Item icon={<LogoutOutlined />} onClick={() =>
                            signout(() => {
                                history.push("/signin");
                            })
                        }>Logout</Item>
                


            </SubMenu>
            )}


        </Menu>
    )
}

export default Header
