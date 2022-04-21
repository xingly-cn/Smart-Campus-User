import service from './request'

export const getCategoryList = () => service.request({
    url: '/lost/category/getList', 
    method: "GET", 
})