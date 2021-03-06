import service from './request'

export const getGoodList = (params) => service.request({
    url: '/lost/good/getAllList', 
    method: "GET", 
    params
})

export const getGoodInfo = (id) => service.request({
    url: '/lost/good/getInfo', 
    method: "GET", 
    params: { goodId: id }
})

export const goofFind = (params) => service.request({
    url: '/lost/good/find', 
    method: "POST", 
    params
})

export const addGood = (params) => service.request({
    url: '/lost/good/add', 
    method: "POST", 
    data: params
})

export const delGoof = (params) => service.request({
    url: '/lost/good/del', 
    method: "POST", 
    params
})

// 分类
export const getCategoryList = () => service.request({
    url: '/lost/category/getList', 
    method: "GET", 
})


// 意见反馈
export const addBack = (params) => service.request({
    url: '/lost/callback/add', 
    method: "POST", 
    data: params
})


export const informList = (params) => service.request({
    url: '/lost/inform/getList', 
    method: "GET", 
    params
})
