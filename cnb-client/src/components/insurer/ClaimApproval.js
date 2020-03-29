import React, { Component } from 'react';
import { Table, Input, Button } from 'antd';
import 'antd/dist/antd.css';

const { TextArea } = Input;

export default class ClaimApproval extends Component {
  state = {
    basicInfor: {
      'policyNumber': '218946734291111111111111111111111111111111111111111111111111',
      'name': '张三',
      'applyMoney': '3万',
      'contactInfo': '1231232',
      'bankAccount': '239081902',
      'insuranceType': '车辆损失险',
      'IDNumber': '239482908',
      'birthday': '1978.12.12',
      'carNumber': '239081902',
      'address': 'XXXX',
    },
    accidentDetails: {
      'location': '浙江省杭州市余杭区',
      'name': '张三',
      'time': '2019.1.1',
      'contactInfo': '123123',
      'through': `张三驾驶私家车，行驶过程中优于下暴雨，难以看清路面
                  和对面车辆，在杭州市余杭区与另一辆车相撞。`,
      // 'imgUrl': ['url1', 'url2'],
    },
    carSituation: [{
      'device': '发动机',
      'cost': '100',
    }, {
      'device': '转向灯',
      'cost': '100',
    }, {
      'device': '气门',
      'cost': '100',
    }, {
      'device': '散热器',
      'cost': '100',
    }, {
      'device': '压缩机',
      'cost': '100',
    }, {
      'device': '真空加力器',
      'cost': '100',
    }, {
      'device': '制动总泵',
      'cost': '100',
    }, {
      'device': '转向机',
      'cost': '100',
    }, {
      'device': '平衡块',
      'cost': '100',
    }, {
      'device': '蜂鸣器',
      'cost': '100',
    }]
  }
  render() {
    return (
      <div className='y-roval-container' style={{
        paddingLeft: 10,
        paddingRight: 40,
        marginBottom: 20,
        textAlign: 'left',
        fontFamily: "'Roboto',arial,sans-serif",
        wordBreak: 'break-word'
      }}>
        <div className='y-roval-title' style={{
          padding: '5px 20px',
          fontSize: 18,
        }}>
          <div>理赔审批</div>
        </div>
        <div className='y-roval-main' style={{

        }}>
          <div className='y-roval-main-info' style={{
            padding: '15px 60px 10px 20px',
            borderTop: '1.5px solid #333',
            borderBottom: '1.5px solid #333',
          }}>
            <BasicInfor data={this.state.basicInfor} />
            <AccidentDetails data={this.state.accidentDetails} />
            <CarSituation data={this.state.carSituation} />
          </div>
          <div className='y-roval-main-result'>
            <ClaimResult />
          </div>
        </div>
      </div>
    )
  }
}

function BasicInfor(props) {
  let { data } = props
  return (
    <div className='y-roval-block' style={styles['y-roval-block']}>
      <div className='y-roval-block-title'>
        <div>---基本资料---</div>
      </div>
      <div className='y-roval-block-main' style={{
        display: 'flex',
      }}>
        <div className='y-roval-block-info' style={styles['y-roval-block-info']}>
          <p>保单号：{data.policyNumber}</p>
          <p>姓名：{data.name}</p>
          <p>申请理赔金额：{data.applyMoney}</p>
          <p>联系方式：{data.contactInfo}</p>
          <p>银行账户：{data.bankAccount}</p>
        </div>
        <div className='y-roval-block-info' style={styles['y-roval-block-info']}>
          <p>保险类型：{data.insuranceType}</p>
          <p>身份证号：{data.IDNumber}</p>
          <p>出生日期：{data.birthday}</p>
          <p>车牌号：{data.carNumber}</p>
          <p>家庭住址：{data.address}</p>
        </div>
      </div>
    </div>
  )
}

function AccidentDetails(props) {
  let { data } = props
  return (
    <div className='y-roval-block' style={styles['y-roval-block']}>
      <div className='y-roval-block-title'>
        <div>---事故详情---</div>
      </div>
      <div className='y-roval-block-main' style={{
        display: 'flex', flexDirection: 'column',
      }}>
        <div className='y-roval-block-top' style={{ display: 'flex' }}>
          <div className='y-roval-block-info' style={styles['y-roval-block-info']}>
            <p>发生地点：{data.location}</p>
            <p>驾驶员姓名：{data.name}</p>
          </div>
          <div className='y-roval-block-info' style={styles['y-roval-block-info']}>
            <p>事故时间：{data.time}</p>
            <p>驾驶员联系方式：{data.contactInfo}</p>
          </div>
        </div>
        <div className='y-roval-block-btm'>
          <p style={{ margin: 0 }}>事故经过：</p>
          <p style={{ marginTop: 0 }}>{data.through}</p>
        </div>
        <div className='y-roval-block-btm'>
          <p style={{ margin: 0 }}>图片资料：</p>
          {
            data.imgUrl ? data.imgUrl.map((value, index) => {
              return <img src={value} alt={index} />
            }) : <p style={{ marginTop: 0 }}>暂无</p>
          }
        </div>
      </div>
    </div>
  )
}

const styles = {
  'y-roval-block-info': {
    flex: 1,
    paddingRight: 10,
  },
  'y-roval-block': {
    marginBottom: 10,
  }
}

function CarSituation(props) {
  let { data } = props
  const columns = [{
    title: '设备',
    dataIndex: 'device',
    key: 'device',
  }, {
    title: '费用',
    dataIndex: 'cost',
    key: 'cost',
  }, {
    title: '设备',
    dataIndex: 'device1',
    key: 'device1',
  }, {
    title: '费用',
    dataIndex: 'cost1',
    key: 'cost1',
  }]
  // 表格数据
  let colData = []
  for (let i = 0; i < data.length; i += 2) {
    i < data.length - 1 ? colData.push({
      key: i,
      device: data[i].device,
      cost: data[i].cost,
      device1: data[i + 1].device,
      cost1: data[i + 1].cost
    }) : colData.push({
      key: i,
      device: data[i].device,
      cost: data[i].cost,
      device1: null,
      cost1: null,
    })
  }
  console.log(colData)

  const pagination = {
    showTotal: () => `共${data.length}条`,
    pageSize: 10,
    hideOnSinglePage: true
  }
  return (
    <div className='y-roval-block' style={styles['y-roval-block']}>
      <Table
        columns={columns}
        dataSource={colData}
        bordered={true}
        pagination={pagination}
      />
    </div>
  )
}

function ClaimResult() {
  return (
    <div className='y-roval-block' style={{
      marginBottom: 10,
      marginTop: 20,
    }}>
      <div style={{ display: 'inline-flex', marginBottom: 15 }}>
        <p style={{
          display: 'flex',
          alignItems: 'center',
          margin: 0,
          marginRight: 15,
          wordBreak: 'keep-all',
        }}>理赔额</p>
        <Input placeholder="Basic usage" />
      </div>
      <div style={{ paddingRight: 60, marginBottom: 15 }}>
        <TextArea rows={4} />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}>
        <Button type="primary" style={{marginRight: 15}}>通过</Button>
        <Button>驳回</Button>
      </div>
    </div>
  )
}
