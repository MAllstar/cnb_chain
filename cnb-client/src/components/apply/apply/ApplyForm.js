import React from 'react';
import { Form, Input, Button, Radio, Icon } from 'antd';
import { Row, Col } from 'antd';
import { Select } from 'antd';
import { Upload, message, Modal } from 'antd';
import { Redirect } from "react-router";

import { axios_post } from '../../../services/axios';

const { Option } = Select;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function checkfile(file) {
    // 限制图片大小2M
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('超过2M限制，不允许上传~');
        return false;
    } else return true;
}

function onRemoveState(state, file) {
    // Remove file
    const index = state.invoFileList.indexOf(file);
    const newFileList = state.invoFileList.slice();
    newFileList.splice(index, 1);
    console.log(newFileList);
    return newFileList;
}

class ApplyForm extends React.Component {
    state = {
        siteFileList: [],
        invoFileList: [],
        previewImage: '',
        applyFlag: false,
        uploading: false,
        previewVisible: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.handleUpload(values);
            } else message.error('申请信息有误！');
        });
    };

    handleUpload = (values) => {
        const { invoFileList, siteFileList } = this.state;
        const formData = new FormData();
        let divide = 0;

        for (let [k, v] of Object.entries(values)) {
            formData.append(k, v);
        }

        invoFileList.forEach(file => {
            formData.append(`file${++divide}`, file);
        });
        formData.append('divide', divide);
        siteFileList.forEach((file, index) => {
            formData.append(`file${divide + index + 1}`, file);
        });

        this.setState({ uploading: true });
        axios_post('/owner/claimform', formData).then(data => {
            console.log(data)
            if (data.code === 1) {
                this.setState({
                    applyFlag: true,
                    invoFileList: [],
                    siteFileList: [],
                    uploading: false
                });
                message.success('上传成功');
            } else {
                this.setState({
                    uploading: false,
                    invoFileList: [],
                    siteFileList: []
                });
                message.error('上传失败');
            }
        }).catch(err => {
            message.error("提交失败");
            this.setState({ uploading: false });
        });
    };

    handleBeforeInvoUpload = file => {
        console.log(file);
        if (!checkfile(file))
            return true;
        this.setState(state => ({
            invoFileList: [...state.invoFileList, file]
        }));
        return false;
    };

    handleBeforeSiteUpload = file => {
        console.log(file);
        if (!checkfile(file))
            return true;
        this.setState(state => ({
            siteFileList: [...state.siteFileList, file]
        }));
        return false;
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    render() {
        if (this.state.applyFlag) {
            return <Redirect to="/center/history" />
        }
        const { getFieldDecorator } = this.props.form;
        const { previewVisible, previewImage } = this.state;
        const { uploading, invoFileList, siteFileList } = this.state;

        const invoProps = {
            onRemove: file => {
                this.setState(state => {
                    return {
                        invoFileList: onRemoveState(state, file),
                    };
                });
            },
            beforeUpload: this.handleBeforeInvoUpload,
            onPreview: this.handlePreview,
            multiple: false,
            invoFileList,
            accept: '.png, .jpg, .jpeg',
            listType: 'picture-card',
        };

        const siteProps = {
            onRemove: file =>
                this.setState(state => {
                    return { siteFileList: onRemoveState(state, file) }
                }),
            beforeUpload: this.handleBeforeInvoUpload,
            onPreview: this.handlePreview,
            multiple: false,
            siteFileList,
            accept: '.png, .jpg, .jpeg',
            listType: 'picture-card',
        };

        const uploadInvoButton = (
            <Button><Icon type="plus" />发票上传</Button>
        )

        const uploadSiteButton = (
            <Button><Icon type="upload" />事故现场图片上传</Button>
        );

        return (

            <Form onSubmit={this.handleSubmit}
                className={'applyForm'}
            >
                <Row>
                    <Col span={12}><h2>申请理赔</h2></Col>
                </Row>
                <Row>
                    <Col span={12}>

                        <Form.Item label="姓名">
                            {getFieldDecorator('realname', {
                                rules: [
                                    { required: true, message: '请输入您的姓名' },
                                    {
                                        pattern: new RegExp('^[\u4e00-\u9fa5]+$', 'g'),
                                        message: '真实姓名有误'
                                    }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    style={{ width: 260 }}
                                    placeholder="请输入您的姓名"
                                />,
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="电话">
                            {getFieldDecorator('phone', {
                                rules: [
                                    { required: true, message: '请输入您的手机号' },
                                    {
                                        pattern: new RegExp('^1[3456789]\\d{9}$', 'g'),
                                        message: '请输入正确的手机号'
                                    }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="text"
                                    style={{ width: 260 }}
                                    placeholder="请输入您的手机号"
                                />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="性别">
                            {getFieldDecorator('gend', {
                                initialValue: '男',
                                rules: [{ required: true, message: '请选择您的性别' }],
                            })(<Radio.Group className={"gender"}>
                                <Radio value={'男'}>男</Radio>
                                <Radio value={'女'}>女</Radio>
                            </Radio.Group>)}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="保险单号">
                            {getFieldDecorator('insureNum', {
                                rules: [{ required: true, message: '请输入您的保险单号' }],
                            })(
                                <Input
                                    prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    style={{ width: 260 }}
                                    placeholder="请输入您的保险单号"
                                />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="身份证">
                            {getFieldDecorator('IDcard', {
                                rules: [
                                    { required: true, message: '请输入您的身份证' },
                                    {
                                        pattern: new RegExp('^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$', 'g'),
                                        message: '身份证号有误'
                                    }
                                ],

                            })(
                                <Input
                                    prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    style={{ width: 260 }}
                                    placeholder="请输入您的身份证"
                                />,
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="车险类型">
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: '请选择您购买的车险类型' }],
                            })(
                                <Select placeholder="请选择您购买的车险类型" style={{ width: 260 }}>
                                    <Option value="交强险">交强险</Option>
                                    <Option value="车辆损失险">车辆损失险</Option>
                                    <Option value="第三者责任险">第三者责任险</Option>
                                    <Option value="全车盗抢险">全车盗抢险</Option>
                                    <Option value="设备损失险">设备损失险</Option>
                                </Select>,
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="理赔金额">
                            {getFieldDecorator('reqmoney', {
                                rules: [{ required: true, message: '请输入您的理赔金额（元）' }],
                            })(
                                <Input
                                    prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    style={{ width: 260 }}

                                    placeholder="请填写您的申请理赔金额"
                                />,
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="住址">
                            {getFieldDecorator('address', {
                                rules: [
                                    { required: true, message: '请输入您的住址' }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="text"
                                    style={{ width: 260 }}
                                    placeholder="请输入您的住址"
                                />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="发票上传" extra="请上传事故发生后的指定类型发票">
                            <Upload {...invoProps}>
                                {invoFileList.length >= 2 ? null : uploadInvoButton}
                            </Upload>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="事故现场图片" extra="请上传事故现场图片（六张以内）">
                            <div>
                                <Upload {...siteProps}>
                                    {siteFileList.length >= 2 ? null : uploadSiteButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>,
                            </div>

                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item style={{ width: 100 }}>
                    <Button uploading={uploading} type="primary" htmlType="submit" className="login-form-button">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(ApplyForm);
