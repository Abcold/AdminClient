import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import LinkButton from '../../components/link-button'
import {formateDate} from '../../utils/dataUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import   './index.less'
const { confirm } = Modal;
class Header extends Component {
    
    state = {
        currentTime : formateDate(Date.now())
    }

    /* 退出登陆 */
   
    logout=()=>{
        //显示确认提示
        Modal.confirm({
            title: '确认退出吗?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk:()=> {
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('./login')
            },
            onCancel() {
              console.log('Cancel');
            },
          });
      
        //确认后，退出登陆
    }
/* 得到当前请求path的title */
    getTitle= ()=>{
        let title =  ''
        const path = this.props.location.pathname
        menuList.forEach(item =>{
            if(item.key===path){
                title = item.title
            }else if(item.children){
                const CItem = item.children.find(cItem=>cItem.key===path)
                if(CItem){
                    title = CItem.title
                }
            }
        })
        return title
    }

componentDidMount(){
    //启动循环定时器
    this.intervalId = setInterval(() => {
        //将currenttime 更新
        this.setState({
            currentTime:formateDate(Date.now())
        })
    }, 1000);
}
componentWillUnmount(){
    //清除定时器
    clearInterval(this.intervalId)
}
    render() {
        const {currentTime} = this.state
        const user = memoryUtils.user
        //得到当前显示的title
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    欢迎, {user.username} &nbsp;&nbsp;
                    {/* 组件的标签体作为标签的children属性传入 */}
                    <LinkButton  onClick={this.logout}>
                        <span>退出</span></LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather"></img>
                        <span>晴天</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
