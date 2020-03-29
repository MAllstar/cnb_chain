import React, { Component } from 'react';
import { Layout, Breadcrumb, Icon } from 'antd';
import { Link } from "react-router-dom";

import ProContent from './ProContent';
import OwnerMenus from "../OwnerMenus";

const { Content, Sider } = Layout;

class Problem extends Component {
    render() {
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to="/Home"> 首页 </Link><Icon type="right" /></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/center">理赔中心</Link><Icon type="right" /></Breadcrumb.Item>
                        <Breadcrumb.Item>常见问题</Breadcrumb.Item>
                    </Breadcrumb>

                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <OwnerMenus />
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <ProContent />
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

export default Problem;
