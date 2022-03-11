import axios from 'axios'
import { Message } from 'view-design';
import router from '../router';

const service = axios.create({
    baseURL: '/api',
    // 定义统一的请求头部
    headers: {
       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    // 配置请求超时时间
    timeout: 10000, 
    // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
    withCredentials: true
});


// 请求拦截
service.interceptors.request.use(config => {
    // 自定义header，可添加项目token
    config.headers.token = localStorage.getItem('token') || '';
    return config;
});
// 返回拦截
service.interceptors.response.use((res)=>{
    if (res.status === 200) {
        const {data, code, ...result} = res.data
        if(code === 20000) {
            return Promise.resolve({data, ...result})
        } else {
            Message.error(result.message)
            switch (code) {
                case 20001:
                    Message.success(result.message)
                    console.log(router, '2');
                    router.replace('/inform')
                    break;
            }
        }
    }

},(err)=>{    
    Promise.reject(err)
    console.log(err, 'rrr');
    Message.error('网络请求异常，请稍后重试!');
});
export default service;