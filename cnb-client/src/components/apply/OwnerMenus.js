import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class OwnerMenus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "1"
        };
    }

    onClick = e => {
        this.setState({
            selectedKeys: e.key
        })
    };

    render() {
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%' }}
                onClick={this.onClick.bind(this)}
                selectedKeys={[this.state.selectedKeys]}
            >

                <Menu.Item
                    key="Problem"
                    style={{ height: 50, fontSize: 15 }}>
                    <Link to="/center/problem"><Icon type="question-circle" />常见问题</Link>
                </Menu.Item>

                <Menu.Item
                    key="Apply"
                    style={{ height: 50, fontSize: 15 }}>
                    <Link to="/center/apply"><Icon type="snippets" />申请理赔</Link>
                </Menu.Item>

                <Menu.Item key="History" style={{ height: 50, fontSize: 15 }}>
                    <Link to="/center/history"><Icon type="history" />历史理赔</Link>
                </Menu.Item>

            </Menu>
        )
    }
}
