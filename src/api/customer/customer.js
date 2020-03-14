import request from '@/utils/request';

export function getCustomerList(param) {
  return request({
    url: '/customerList',
    method: 'post',
    data: param
  })
}

export function addCustomer(param) {
  return request({
    url: '/addCustomer',
    method: 'post',
    data: param
  })
}

