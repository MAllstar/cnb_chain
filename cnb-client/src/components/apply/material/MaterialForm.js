import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import { Upload, message, Modal } from 'antd';
import { Redirect } from "react-router";

import { axios_post } from '../../../services/axios';

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

class MaterialForm extends React.Component {
  state = {
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
    const { invoFileList } = this.state;
    const formData = new FormData();

    for (let [k, v] of Object.entries(values)) {
      formData.append(k, v);
    }

    invoFileList.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    this.setState({ uploading: true });

    axios_post('/repairer/materialform', formData)
      .then(data => {
        console.log(data)
        this.setState({
          applyFlag: true,
          invoFileList: [],
          uploading: false
        });
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
      return <Redirect to="/center" />
    }
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage } = this.state;
    const { uploading, invoFileList } = this.state;

    const invoProps = {
      onRemove: file =>
        this.setState(state => {
          return { invoFileList: onRemoveState(state, file) }
        }),
      beforeUpload: this.handleBeforeInvoUpload,
      onPreview: this.handlePreview,
      multiple: false,
      invoFileList,
      accept: '.png, .jpg, .jpeg',
      listType: 'picture-card',
    };

    const uploadInvoButton = (
      <Button><Icon type="upload" />发票上传</Button>
    );

    return (
      <Form onSubmit={this.handleSubmit} className={'applyForm'}>

        <h2>材料上传</h2>

        <Form.Item label="真实姓名">
          {getFieldDecorator('realname', {
            rules: [
              {
                required: true,
                message: '请输入您的真实姓名'
              },
              {
                pattern: new RegExp('^[\u4e00-\u9fa5]+$', 'g'),
                message: '真实姓名有误'
              }
            ],
          })(<Input placeholder={"请输入您的真实姓名"} style={{ width: 560 }} />)}
        </Form.Item>

        <Form.Item label="车牌">
          {getFieldDecorator('carnum', {
            rules: [
              { required: true, message: '请输入车牌' },
              {
                pattern: new RegExp('^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}|[黑黄蓝绿]{1}$', 'g'),
                message: '车牌号有误'
              }
            ],
          })(
            <Input
              prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />}
              style={{ width: 560 }}
              placeholder="请输入车牌"
            />,
          )}
        </Form.Item>

        <Form.Item label="受损状况">
          {getFieldDecorator('status', {
            rules: [
              { required: true, message: '请输入受损状况' }
            ],
          })(
            <textarea
              prefix={<Icon type="tool" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              style={{ width: 560 }}
              placeholder="请输入受损状况"
            />,
          )}
        </Form.Item>

        <Form.Item label="维修金额">
          {getFieldDecorator('actmoney', {
            rules: [
              { required: true, message: '请输入维修金额' },
              {
                pattern: new RegExp('^[0-9]*$', 'g'),
                message: '请输入数字'
              }
            ],
          })(
            <Input
              prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              style={{ width: 560 }}
              placeholder="请输入维修金额"
            />,
          )}
        </Form.Item>

        <Form.Item label="保险单号">
          {getFieldDecorator('insureNum', {
            rules: [{ required: true, message: '请输入您的保险单号' }],
          })(
            <Input
              prefix={<Icon type="insuranc" style={{ color: 'rgba(0,0,0,.25)' }} />}
              style={{ width: 560 }}
              placeholder="请输入您的保险单号"
            />,
          )}
        </Form.Item>

        <Form.Item label="发票" extra="请上传发票图片（六张以内）">
          <div>
            <Upload {...invoProps}>
              {invoFileList.length >= 6 ? null : uploadInvoButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>,
          </div>
        </Form.Item>

        <Form.Item style={{ width: 100 }}>
          <Button uploading={uploading} type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(MaterialForm);
