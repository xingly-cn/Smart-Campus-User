import service from './request'

export const getInfo = () => service.request({
    url: '/lost/stu/getInfo', 
    method: "GET", 
})

export const sendCode = () => service.request({
    url: '/lost/stu/sendCode', 
    method: "POST", 
})

export const verify = (params) => service.request({
    url: '/lost/stu/verify', 
    method: "POST", 
    params
})