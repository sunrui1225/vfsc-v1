import request from "@/utils/request";

export function fetchList(query) {
    return request({
        url: '/vfsc-v1/entity/list',
        method: 'get',
        params: query
    })
}

export function companyDetail(id) {
    return request({
        url: '/vfsc-v1/entity/companyDetail',
        method: 'get',
        params: { id }
    })
}