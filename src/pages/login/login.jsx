import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './images/logo192.png'
import './login.less'
const onFinish = (values) => {
    
    console.log(values+"    "+values.username)
    
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default class Login extends Component {


    render() {

       
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


