import React from "react";
import { Table, Spin, Button, Input, message } from 'antd';
import { Route } from "react-router";

import { axios_get, axios_post } from '../../../services/axios';
import { BASE_URL } from '../../../constant/config';

const { Column } = Table;

export default class ApprovalTable extends React.Component {
  state = {
    spinLoading: true,
    dataSource: [],         // 列表数据
    isInfo: false,          // 是否正在查看详情
    // 详情状态
    record: {},             // 投保人详情内容
    repairerRecord: {},     // 维修商详情内容
  }

  async componentDidMount() {
    let r = await axios_get('/insurer/approvallist');
    let { data } = r;
    console.log(data)
    data.forEach(item => {
      if (!item.actmoney) item.actmoney = '未处理'
    });
    this.setState({ dataSource: data, spinLoading: false });
  }

  handleClickInfo = async (record) => {
    console.log(record)
    this.setState({
      isInfo: true,
      record,
    });
    // 加载维修商数据
    let r = await axios_post('/repairer/materialform/find', { insureNum: record.insureNum });
    this.setState({
      repairerRecord: r.data[0] || {}
    });
    // 修改理赔进度
    if (record.process === 1) {
      await axios_post('/insurer/deal/progress', { process: 2, insureNum: record.insureNum });
    }
  }

  handleClickBack = () => this.setState({ isInfo: false });

  render() {
    let { dataSource, record, repairerRecord } = this.state;

    return (
      <Route render={() => {
        return this.state.isInfo
          ? (
            <>
              <div className="header">
                <h3>理赔详情</h3>
                <Button className='btn-primary' icon='rollback' onClick={this.handleClickBack}>返回</Button>
              </div>
              <div className='list-layout'>
                <Details record={record} />
                <RepairerInfo record={repairerRecord} />
              </div>
              <Deal record={record} />
            </>
          )
          : (
            <>
              <div className="header"> <h3>理赔申请列表</h3> </div>
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
      <Column title='保险单号' dataIndex='insureNum' key='insureNum' />
      <Column title='理赔金额(元)' dataIndex='reqmoney' key='reqmoney' />
      <Column title='实际赔偿(元)' dataIndex='actmoney' key='actmoney' />
      <Column title='理赔进度' dataIndex='process' key='process' />
      <Column title='申请时间' dataIndex='createdAt' key='createdAt' />
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

function RepairerInfo(props) {
  let { record } = props;

  return (
    <div className='list-container'>
      <h3 className='list-title'>维修商材料</h3>
      {
        record.realname ?
          (
            <>
              <div className='list-line'><span className='list-head'>姓名</span>：{record.realname}</div>
              <div className='list-line'><span className='list-head'>保险单号</span>：{record.insureNum}</div>
              <div className='list-line'><span className='list-head'>实际理赔</span>：{record.actmoney}</div>
              <div className='list-line'><span className='list-head'>受损状况</span>：{record.status}</div>
              <div className='list-line'><span className='list-head'>申请时间</span>：{record.createdAt}</div>
              <div className='list-line'><span className='list-head'>更新时间</span>：{record.updatedAt}</div>

              <div className='list-line'><span className='list-head'>发票图片</span>：</div>
              {
                record.img.invoice.map((item, index) => {
                  const url = `${BASE_URL}/${item.path}`;
                  return (
                    <a href={url} target="_blank">
                      <img src={url} className='list-img' key={index} alt='img' />
                    </a>
                  )
                })
              }
            </>
          ) : <h4>维修商材料暂未上传</h4>
      }
    </div>
  )

}

function Details(props) {
  let { record } = props;
  return (
    <div className='list-container'>
      <h3 className='list-title'>投保人理赔申请资料</h3>
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

class Deal extends React.Component {
  state = {
    record: this.props.record,
    pass: this.props.record.process > 2,
    pay: this.props.record.process > 3,

    actmoney: null,
  }

  handleClickPass = async () => {
    await axios_post('/insurer/deal/progress', {
      process: 3,
      insureNum: this.state.record.insureNum
    });
    this.setState({ pass: true });
  }

  handleChangeActmoney = (e) => {
    this.setState({ actmoney: e.target.value });
  }

  handleClickPay = async () => {
    if (!this.state.actmoney)
      return message.error('赔付金额格式错误', 1);
    axios_post('/insurer/deal/act', {
      process: 4,
      actmoney: this.state.actmoney,
      insureNum: this.state.record.insureNum
    });
    this.setState({ pay: true });
  }

  render() {
    let { pass, actmoney, pay } = this.state;
    return (
      <div className='deal'>
        <h3 className='list-title'>理赔受理</h3>
        {
          pass ?
            (
              <>
                <Button disabled type='primary'>已通过</Button>
                {
                  pay ?
                    (
                      <div style={{ marginTop: 10 }}>实际理赔{actmoney}元</div>
                    ) :
                    (
                      <>
                        <Input
                          value={actmoney}
                          onChange={this.handleChangeActmoney}
                          placeholder='请输入实际理赔金额(元)'
                          style={{ marginTop: 10, marginBottom: 10 }}
                        />
                        <Button onClick={this.handleClickPay} type='primary'>赔付</Button>
                      </>
                    )
                }
              </>
            ) :
            <Button onClick={this.handleClickPass} type='primary'>通过</Button>
        }
      </div>
    )
  }
}
