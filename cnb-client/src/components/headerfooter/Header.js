import React, { useState, useEffect } from 'react';
import { Menu, Icon, Layout, Dropdown, message } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';
import 'antd/dist/antd.css';

import { axios_get } from '../../services/axios';
import { TOKEN_KEY } from '../../constant/config';

const { Header } = Layout;
class Head extends React.Component {
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Header>
                <div className="logo" />
                <Link to="/" className={"title"}>基于区块链的车辆事故理赔系统</Link>

                <UserInfo />

                <Menu
                    theme={"dark"}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    className={"menu"}>
                    <Menu.Item key="index">
                        <Link to="/Home"><Icon type="home" />
                            首页</Link>
                    </Menu.Item>

                    <Menu.Item key="blockChain">
                        <Link to="/BlockChain"><Icon type="appstore" />
                            区块链</Link>
                    </Menu.Item>

                    <Menu.Item key="Claims center">
                        <Link to="/center"><Icon type="form" />
                            理赔中心</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
}

// 组件是否存在
let UNMOUT = true;

function UserInfo() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        UNMOUT = true;
        const userFetch = async () => {
            let data = await axios_get('/verify');
            console.log(data)
            if (UNMOUT) {
                let { hash } = window.location;
                if (hash === '#/' || hash === '#/Login') {
                    window.location.href = '/#/Home';
                }
                setUser(data.usr);
            }
        }
        userFetch();
        return () => UNMOUT = false;
    }, []);

    const loginout = () => {
        axios_get('/verify/signout');
        window.location.href = '/#/';
        message.success('退出成功！', 1);
        localStorage.removeItem(TOKEN_KEY);
    }

    const menu = (
        <Menu>
            <Menu.Item key='logout' onClick={loginout}>
                <Icon type='logout' style={{ marginRight: 5 }} />
                退出登录
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            {
                user ? (
                    <Dropdown overlay={menu} placement='bottomLeft' overlayStyle={{ minWidth: 155 }}>
                        <span className='header-user'>
                            <span>{user}</span>
                        </span>
                    </Dropdown>
                ) : null
            }
        </>
    )
}

export default Head;
