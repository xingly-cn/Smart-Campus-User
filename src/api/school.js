import service from './request'

export const getSchoolList = () => service.request({
    url: '/lost/school/getList?cur=1&size=999', 
    method: "GET", 
})

