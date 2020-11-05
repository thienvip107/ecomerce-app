import React, { useState } from "react";
import { Menu } from "antd";
import {MailOutlined, SettingOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons"
 
const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent]= useState("home");

    const handleClick = (e) => {
        setCurrent(e.key)
    }
    return (
        <Menu onclick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="mail" icon ={<MailOutlined />}>
                Home
            </Item>
            <Item key="register" icon ={<UserAddOutlined />} className="float-right">
            Register
            </Item>
            <Item key="register" icon ={<UserOutlined />} className="float-right">
            Login
            </Item>
            <SubMenu icon={<SettingOutlined/>} title="Username">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
            </SubMenu>
        </Menu>
    )
}
export default Header;