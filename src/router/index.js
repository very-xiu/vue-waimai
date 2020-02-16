import Vue from 'vue'
import Router from 'vue-router'

/* import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Pay from '../pages/Pay/Pay.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue' */

const Msite =()=> import('../pages/Msite/Msite.vue')
const Order =()=> import('../pages/Order/Order.vue')
const Profile =()=> import('../pages/Profile/Profile.vue')
const Search =()=> import('../pages/Search/Search.vue')
const Login=()=> import('../pages/Login/Login.vue')
const Shop =()=> import('../pages/Shop/Shop.vue')
const Pay =()=> import('../pages/Pay/Pay.vue')
const ShopGoods =()=> import('../pages/Shop/ShopGoods/ShopGoods.vue')
const ShopRatings =()=> import('../pages/Shop/ShopRatings/ShopRatings.vue')
const ShopInfo =()=> import('../pages/Shop/ShopInfo/ShopInfo.vue')


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/msite'},
    {path:'/msite',component:Msite,meta:{showFooter:true}},// 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
    {path:'/order',component:Order,meta:{showFooter:true}},
    {path:'/profile',component:Profile,meta:{showFooter:true}},
    {path:'/search',component:Search,meta:{showFooter:true}},
    {path:'/login',component:Login},
    {
      path:'/shop',
      component:Shop,
      children:[
        {path:'/shop/goods',component:ShopGoods},
        {path:'/shop/ratings',component:ShopRatings},
        {path:'/shop/info',component:ShopInfo},
        {path:'',redirect:'/shop/goods'}
      ]
    },
    {path:'/pay',component:Pay},
  ]
})
