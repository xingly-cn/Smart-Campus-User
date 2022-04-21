import service from './request'

export const useLogin = (params) => service.request({
    url: '/lost/stu/login', 
    method: "POST", 
    data: params
})
