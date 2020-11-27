// 封装发ajax请求函数
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
//添加请求拦截器,post请求格式为urlencoded格式
//请求前发出
axios.interceptors.request.use(function (config){
    const {method,data} = config
    //处理post请求,data对象转为query字符串
    if(method.toLowerCase()=='post' && typeof data==='object'){
        config.data =  qs.stringify(data);
    }

    return config;
})
//添加响应拦截器
//请求结果由response 变为data
axios.interceptors.response.use(function (response){
    return response.data; //返回的结果交给指定请求响应
},function(error){ //统一处理所有请求错误
    message.error("请求失败"+error.message)
    // return Promise.reject(error);
    //返回一个pending状态的promise,中断promise链
    return new Promise(()=>{})
});

export default axios;