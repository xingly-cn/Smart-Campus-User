import service from './request'

export const getInfo = () => service.request({
    url: '/lost/stu/getInfo', 
    method: "GET", 
})

export const getInfo2 = (id) => service.request({
    url: '/lost/stu/getInfo2', 
    method: "GET", 
    params: {stuId: id}
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

export const edit = (params) => service.request({
    url: '/lost/stu/edit', 
    method: "POST", 
    data: params
})


export const find = (id) => service.request({
    url: '/lost/good/find', 
    method: "GET", 
    params: {goodId: id}
})

export const del = (id) => service.request({
    url: '/lost/good/del', 
    method: "GET", 
    params: {goodId: id}
})