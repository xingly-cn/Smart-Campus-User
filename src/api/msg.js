import service from './request'

export const getList = () => service.request({
    url: '/lost/msg/getList', 
    method: "GET", 
})

export const read = (id) => service.request({
    url: '/lost/msg/read', 
    method: "GET", 
    params: {msgId: id}
})

export const send = (params) => service.request({
    url: '/lost/msg/send', 
    method: "POST", 
    data: params
})

