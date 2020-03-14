import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '../components/MainLayout'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      redirect: 'customerManage',
      children: [
        {
          path: '',
          name: 'Main',
          component: _import('DataShow'),
          children: [
            {
              path: '/customerManage',
              name: 'CustomerManage',
              component: _import('customer/CustomerManage')
            },
            {
              path: '/category',
              name: 'Category',
              component: _import('item/Category')
            },
            {
              path: '/product',
              name: 'Product',
              component: _import('item/Product')
            },
          ]
        }
      ]
    }
  ]
})
