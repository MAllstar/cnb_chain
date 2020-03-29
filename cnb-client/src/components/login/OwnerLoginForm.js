import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './LoginForm.css';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Radio, message } from 'antd';

import { axios_post } from '../../services/axios';
import { TOKEN_KEY } from '../../constant/config';

class OwnerLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginFlag: false
        };
    }

    //登录按钮提交
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios_post('/owner/signin', { values })
                    .then(data => {
                        console.log(data);
                        this.setState({ loginFlag: true });
                        // 使用 localStorage 创建一个本地存储的 name/value 对
                        window.localStorage.setItem(TOKEN_KEY, data.token);
                    })
            }
            //如果没有错误，则发送用户信息给后端
            else {
                message.error("输入信息有误！");
            }
        });
    };

    render() {
        if (this.state.loginFlag) {
            return <Redirect to="/Home" />
        }
        const { getFieldDecorator } = this.props.form;
        return (

            <Form onSubmit={this.handleSubmit} className="login-form">
                <p className={"login"}>Login in</p>
                <Form.Item>
                    {getFieldDecorator('usr', {
                        initialValue: '',
                        rules: [
                            {
                                required: true,
                                message: '请输入您的用户名!'
                            },
                            {
                                min: 5, max: 10,
                                message: '用户名长度不在范围内'
                            },
                            {
                                pattern: new RegExp('^\\w+$', 'g'),
                                message: '用户名必须为字母或者数字'
                            }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="text"
                            placeholder="请输入用户名" />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('pwd', {
                        initialValue: '',
                        rules: [
                            {
                                required: true,
                                message: '请输入您的密码!'
                            }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码" />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('root', {
                        initialValue: 1,
                    })(<Radio.Group onChange={this.props.handleChangeIDType} className={"idType"}>
                        <Radio value={1}>投保人</Radio>
                        <Radio value={2}>维修商</Radio>
                        <Radio value={3}>保险商</Radio>
                    </Radio.Group>)}

                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <span className={"register"}> Or <Link to="/Register">register now!</Link></span>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(OwnerLoginForm);
