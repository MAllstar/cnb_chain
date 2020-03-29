import React from "react";
import { Table, Spin, Button } from 'antd';
import { Route } from "react-router";

import { axios_get } from '../../../services/axios';
import ProgressComponent from '../progress/ProgressComponent';
import { BASE_URL } from '../../../constant/config';

const { Column } = Table;

class HistoryTable extends React.Component {
    state = {
        spinLoading: true,
        dataSource: [],         // 列表数据
        isInfo: false,          // 是否正在查看详情
        // 详情状态
        inWhatStep: 1,          // 进度
        record: {}              // 详情内容
    }

    async componentDidMount() {
        let r = await axios_get('/owner/historylist');
        let { data } = r;
        console.log(data)
        data.forEach(item => {
            if (!item.actmoney) item.actmoney = '请等待'
        });
        this.setState({ dataSource: data, spinLoading: false });
    }

    handleClickInfo = (record) => {
        console.log(record)
        this.setState({
            isInfo: true,
            inWhatStep: record.process,
            record,
        });
    }

    handleClickBack = () => this.setState({ isInfo: false });

    render() {
        let { dataSource, inWhatStep, record } = this.state;

        return (
            <Route render={() => {
                return this.state.isInfo
                    ? (
                        <>
                            <div className="header">
                                <h3>理赔详情</h3>
                                <Button className='btn-primary' icon='rollback' onClick={this.handleClickBack}>返回</Button>
                            </div>
                            
                            <ProgressComponent inWhatStep={inWhatStep} />
                            <Details record={record} />
                        </>
                    )
                    : (
                        <>
                            <div className="header"> <h3>历史理赔记录</h3> </div>
                            {
                                this.state.spinLoading ?
                                    (
                                        <div style={{ minHeight: '360px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Spin size='large' />
                                        </div>
                                    ) :
                                    <TableList
                                        data={dataSource}
                                        handleClickInfo={this.handleClickInfo}
                                    />
                            }
                        </>
                    )
            }} />
        )
    }
}

function TableList(props) {
    return (
        <Table dataSource={props.data}>
            <Column title='用户名' dataIndex='usr' key='usr' />
            <Column title='理赔金额(元)' dataIndex='reqmoney' key='reqmoney' />
            <Column title='实际赔偿(元)' dataIndex='actmoney' key='actmoney' />
            <Column title='理赔进度' dataIndex='process' key='process' />
            <Column title='申请时间' dataIndex='createdAt' key='createdAt' />
            <Column title='更新时间' dataIndex='updatedAt' key='updatedAt' />
            <Column
                title='编辑'
                dataIndex='edit'
                key='edit'
                render={(text, record) => (
                    <span style={{ cursor: 'pointer', color: '#40a9ff' }}>
                        <span onClick={() => props.handleClickInfo(record)}>查看详情</span>
                    </span>
                )}
            />
        </Table>
    )
}

function Details(props) {
    let { record } = props;
    return (
        <div className='list-container'>
            <div className='list-line'><span className='list-head'>姓名</span>：{record.realname}</div>
            <div className='list-line'><span className='list-head'>性别</span>：{record.gend}</div>
            <div className='list-line'><span className='list-head'>电话</span>：{record.phone}</div>
            <div className='list-line'><span className='list-head'>保险单号</span>：{record.insureNum}</div>
            <div className='list-line'><span className='list-head'>车险类型</span>：{record.type}</div>
            <div className='list-line'><span className='list-head'>理赔金额</span>：{record.reqmoney}</div>
            <div className='list-line'><span className='list-head'>实际理赔</span>：{record.actmoney}</div>
            <div className='list-line'><span className='list-head'>身份证号</span>：{record.IDcard}</div>
            <div className='list-line'><span className='list-head'>地址</span>：{record.address}</div>
            <div className='list-line'><span className='list-head'>申请时间</span>：{record.createdAt}</div>
            <div className='list-line'><span className='list-head'>更新时间</span>：{record.updatedAt}</div>

            <div className='list-line'><span className='list-head'>事故现场图片</span>：</div>
            {
                record.img.site.map((item, index) => {
                    const url = `${BASE_URL}/${item.path}`;
                    return (
                        <a href={url} target="_blank">
                            <img src={url} className='list-img' key={index} alt='img' />
                        </a>
                    )
                })
            }
        </div>
    )
}

export default HistoryTable;
