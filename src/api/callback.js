import service from './request'

export const getCallbackList = (params) => service.request({
    url: '/lost/callback/getList', 
    method: "GET", 
    params
})

export const callbackdel = (id) => service.request({
    url: '/lost/callback/del', 
    method: "GET", 
    params: {callbackId: id}
})

