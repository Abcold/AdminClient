import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        //读取保存到user,如果不存在，跳转登陆
        const user = memoryUtils.user
        //const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        if (!user._id) {
            // this.props.history.replace('./login') //事件回调中路由跳转
            return <Redirect to="/login" />//自动跳转至指定路径
        }

        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{ backgroundColor: 'white' }}>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,0.5)' }}>
                        推荐使用谷歌浏览器
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;
