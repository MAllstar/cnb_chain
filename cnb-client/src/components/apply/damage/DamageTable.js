import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: '车辆设备',
        dataIndex: 'device',
    },
    {
        title: '损坏程度',
        dataIndex: 'damage',
    },
    {
        title: '预计维修金额',
        dataIndex: 'reqmoney',
    },
    {
        title: '赔偿金额',
        dataIndex: 'actmoney',
    },
];

const device = ['转向灯','气门','散热器','刹车片','真空加力器','转向机',
    '蜂鸣器','汽车缓冲器','倒车雷达','行驶记录仪','排气管','节油器'];

const data = [
    {
        device: '车门',
        damage: '轻微受损',
        reqmoney: '3000.00',
        actmoney: '2800.00',
    },
    {
        device: '转向灯',
        damage: '轻微受损',
        reqmoney: '3000.00',
        actmoney: '2800.00',
    },
    {
        device: '汽车缓冲器',
        damage: '严重受损',
        reqmoney: '3000.00',
        actmoney: '2800.00',
    },
    {
        device: '行驶记录仪',
        damage: '轻微受损',
        reqmoney: '3000.00',
        actmoney: '2800.00',
    },{
        device: '排气管',
        damage: '严重受损',
        reqmoney: '3000.00',
        actmoney: '2800.00',
    },{
        device: '蜂鸣器',
        damage: '中度受损',
        reqmoney: '3000.00',
        actmoney: '2800.00',
    },
];

class DamageTable extends Component {
    render() {
        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                title={() => '车辆损毁状况'}
            />
        );
    }
}

export default DamageTable;
