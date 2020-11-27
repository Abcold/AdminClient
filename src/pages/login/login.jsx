import React, { Component } from 'react'
import { Form, Input, Button, Checkbox,message } from 'antd';
import {Redirect} from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reLogin} from '../../api'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo192.png'
import './login.less'
const onFinish = (values ) => {
    console.log(values)
    console.log(values.username)
    const result =  reLogin(values.username,values.password)
    result.then(function (response){
        if(response.status===0){
            //user信息保存到local
        const user = response.data;
        // localStorage.setItem('user_key',JSON.stringify(user))    
        storageUtils.saveUser(user);
        //保存至内存
        memoryUtils.user = user
        //跳转管理页面
        message.success('登陆成功！')
        //this.props.history.replace('/')
        window.location.replace('/')
        }else{
        
            message.error(response.msg)
        }
    })
    
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default class Login extends Component {


    render() {
        //读取保存到user,如果存在，跳转管理
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = memoryUtils.user
        if(user._id){
            // this.props.history.replace('./login') //事件回调中路由跳转
            return <Redirect to="/"/>//自动跳转至指定路径
        } 
       
        return (


            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React：项目管理系统</h1>
                </div>

                <div className="login-content">
                    <h1>用户登陆</h1>

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            

                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="/">
                                Forgot password
        </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>

                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}


