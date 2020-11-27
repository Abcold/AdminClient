import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'

import menuList from '../../config/menuConfig'
import { Menu, Icon } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';


import logo from '../../assets/images/logo192.png'
import './index.less'
const { SubMenu } = Menu;

class LeftNav extends Component {
     //根据指定menu数据数组生成item和submenu的数组
    //reduce+函数递归
    
    //根据指定menu数据数组生成item和submenu的数组
    //map+函数递归
    getMenuNodes = (menuList) => {
        //请求的路径
        const path = this.props.location.pathname
        return menuList.map(item => {
            if (!item.children) {
                return (<Menu.Item key={item.key} >
                    <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>)
            }else{
                /* 
                判断当前item的可以是否是需要的openkey
                查找item中所有的children中的citem的key,看是否有一个跟请求的path匹配
                */
                const cItem = item.children.find(cItem => cItem.key===path)
                if(cItem){
                    this.openKey = item.key
                }
            }
            return (  //有下一集的菜单项

                <SubMenu key={item.key}
                    icon={<MailOutlined />}
                    title={
                        <span>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {
                        this.getMenuNodes(item.children)
                    }
                </SubMenu>
            )
        })
    }
    //第一次render之后执行一次
    /* 
    执行异步任务，发送ajax请求 ,定时器 */
    componentDidMount(){

    }
    /* 
    第一次render之前执行一次
    为第一次render做一些同步准备
     */
    componentWillMount(){
         this.menuNodes =this.getMenuNodes(menuList)
    }
    render() {
       
        //得到当前请求的路由路径
        const selectKey = this.props.location.pathname
        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="./home">
                    <img src={logo} alt="logo" />
                    <h1>后台</h1>
                </Link>

                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={this.openKey}
                    mode="inline"
                    theme="dark"
                // inlineCollapsed={this.state.collapsed}
                >
                    {
                        this.menuNodes
                    }
                    {/* <Menu.Item key="/home" >
                        <Link>
                        <Icon type="home"/>
                        <span>首页</span>
                        </Link>
                    </Menu.Item>


                    <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                        <Menu.Item key="/category" >
                        <Link to="/category">
                        <Icon type="folder-open"/>
                        <span>品类管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/product" >
                        <Link to="/product">
                        <Icon type="filter"/>
                        <span>商品管理</span>
                        </Link>
                    </Menu.Item>


                    </SubMenu> */
                    }
                </Menu>
            </div>
        )
    }
}

/* 
向外暴露 ，使用高阶组件withRouter包装非路由组件
新组向LeftNav传递三个属性 history/location/match
 */
 export default withRouter(LeftNav)

 /* 
 1 默认选中对应的menuItem
 2 有可能需要默认打开某个submenu ,访问的是某个二级菜单路径
 */