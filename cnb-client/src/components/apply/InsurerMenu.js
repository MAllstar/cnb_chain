import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class InsurerMenu extends React.Component {
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
                    key="approval"
                    style={{ height: 50, fontSize: 15 }}>
                    <Link to="/center/approval"><Icon type="table" />理赔审批</Link>
                </Menu.Item>

            </Menu>
        )
    }
}
