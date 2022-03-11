import service from './request'

export const getGoodList = (params) => service.request({
    url: '/lost/good/getAllList', 
    methods: "GET", 
    params
})

export const getGoodInfo = (params) => service.request({
    url: '/lost/good/getInfo', 
    methods: "GET", 
    params
})

export const goofFind = (params) => service.request({
    url: '/lost/good/find', 
    methods: "POST", 
    params
})

export const addGood = (params) => service.request({
    url: '/lost/good/add', 
    methods: "POST", 
    params
})

export const delGoof = (params) => service.request({
    url: '/lost/good/del', 
    methods: "POST", 
    params
})