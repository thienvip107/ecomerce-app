import React, { useState } from "react";
import { Menu } from "antd";
import { LogoutOutlined, MailOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons"
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase"
import { useDispatch } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");
    let dispatch = useDispatch();
    let history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key)
    }
    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        history.push("/login")
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<MailOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<UserAddOutlined />} className="float-right">

                <Link to="/register">Register</Link>
            </Menu.Item>
            <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Menu.Item>
            <SubMenu icon={<SettingOutlined />} title="Username">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
                <Item icon={<LogoutOutlined/>} onClick={logout}>\
                Logout</Item>
            </SubMenu>
        </Menu>
    )
}
export default Header;