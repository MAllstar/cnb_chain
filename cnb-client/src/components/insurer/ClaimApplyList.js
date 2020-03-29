import React, { Component } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';

const columns = [
  {
    title: '保单号',
    dataIndex: 'PolicyNumber',
    key: 'PolicyNumber',
    align: 'center',
  },
  {
    title: '投保人',
    dataIndex: 'Insured',
    key: 'Insured',
    align: 'center',
  },
  {
    title: '投保车辆',
    dataIndex: 'InsuranceCar',
    key: 'InsuranceCar',
    align: 'center',
  },
  {
    title: '车险种类',
    dataIndex: 'CarInsuranceType',
    key: 'CarInsuranceType',
    align: 'center',
  },
  {
    title: '处理结果',
    dataIndex: 'ProcessResult',
    key: 'ProcessResult',
    align: 'center',
    render: (ProcessResult) => <div style={{
      color: '#1890ff',
      cursor: 'pointer',
    }}>{ProcessResult}</div>
  },
];

const data = [
  {
    key: '1',
    PolicyNumber: '111111111',
    Insured: '张三',
    InsuranceCar: '浙A-66666',
    CarInsuranceType: '交强险',
    ProcessResult: '未处理，查看详情',
  },
  {
    key: '2',
    PolicyNumber: '222222222',
    Insured: '李四',
    InsuranceCar: '浙B-66666',
    CarInsuranceType: '车辆损失险',
    ProcessResult: '审批中',
  },
  {
    key: '3',
    PolicyNumber: '333333333',
    Insured: '王五',
    InsuranceCar: '浙C-66666',
    CarInsuranceType: '第三责任险',
    ProcessResult: '处理完成',
  },
  {
    key: '4',
    PolicyNumber: '4444444444',
    Insured: '刘六',
    InsuranceCar: '浙D-66666',
    CarInsuranceType: '交强险',
    ProcessResult: '已驳回',
  },
];

const pagination = {
  showTotal: () => `共${data.length}条`,
  pageSize: 10,
  hideOnSinglePage: true
}

export default class ClaimApplyList extends Component {
  render() {
    return (
      <div style={{ padding: '0 10px' }}>
        <Table
          columns={columns}
          dataSource={data}
          bordered={true}
          pagination={pagination}
        />
      </div>
    )
  }
}
