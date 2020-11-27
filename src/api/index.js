// 包含应用中所有请求接口函数
import jsonp from 'jsonp' //axios不能发jsonp请求
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''

//请求登陆
//返回promise
export const reLogin = (username,password)=>(
   
    ajax.post(BASE + '/login',{username,password})
)

//发送jsonp请求得到天气信息
export const reqWeather = ()=>{
    const url = ''
}
