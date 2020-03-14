import request from '@/utils/request';

export function addCategory(param) {
  return request({
    url: '/item/addCategory',
    method: 'post',
    data: param
  })
}

export function getAllCategory(param) {
  return request({
    url: '/item/getAllCategory',
    method: 'post',
    data: param
  })
}

export function delCategoryById(param) {
  return request({
    url: '/item/delCategoryById',
    method: 'post',
    data: param
  })
}

export function addProduct(param) {
  return request({
    url: '/item/addProduct',
    method: 'post',
    data: param
  })
}

export function getProduct(param) {
  return request({
    url: '/item/getProduct',
    method: 'post',
    data: param
  })
}
