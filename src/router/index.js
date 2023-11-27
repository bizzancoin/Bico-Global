import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import register from '@/view/register'
import forget from '@/view/forget'
import index from '@/view/index'
import home from '@/view/home'
import transaction from '@/view/transaction'
import option from '@/view/Option'
import gold from '@/view/Gold'
import order from '@/view/order'
import assets from '@/view/assets'
import contact from '@/view/contact'
import article from '@/view/article'
import person from '@/view/person'
import realName from '@/view/realName'
import set from '@/view/set'
import agreement from '@/view/agreement'
import privacy from '@/view/privacy'
import notice from '@/view/notice'
import detail from '@/view/detail'
import quotation from '@/view/quotation'
import upcoinForm from '@/view/upcoinForm'
import artapp from '@/view/artapp'
import lcsx from "@/view/lcsx"
import agent from "@/view/agent"
import surbhtml from "@/view/surbhtml"
import users from "@/view/users"
import invitation from "@/view/invitation"
import Whiteskin from "@/view/Whiteskin"
import newSymbol from "@/view/coffer.vue"
import futures from "@/view/futures.vue"
import Signin from "@/view/Signin.vue"
import starchainminer from "@/view/starchainminer.vue"
import mstarch from "@/view/mstarch.vue"
import exchgtrade from "@/view/exchgtrade.vue"
import currencyTrade from '@/view/currencyTrade.vue'
import transactionTrade from '@/view/transactionTrade.vue'
import upLoanForm from '@/view/upLoanForm.vue'
Vue.use(Router)

//解决路由中添加了相同的路由
const routerPush  = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush .call(this, location).catch(err => err)
}


export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: index,
      children:[{
        path: '',
        name: 'home',
        component: home,
        meta: ['首页'],
      }

      // 理财生息
      ,{
        path: '/lcsx',
        name: 'lcsx',
        component: lcsx,
        meta: ['理财生息'],
      },
      // 上币申请


      // 系统介绍
      ,{
        path: '/surbhtml',
        name: 'surbhtml',
        component: surbhtml,
        meta: ['系统介绍'],
      },

      // 用户中心
      ,{
        path: '/users',
        name: 'users',
        component: users,
        meta: ['用户中心'],
      },

        {
          path: '/upcoinForm',
          name: 'upcoinForm',
          component: upcoinForm,
          meta: ['上币申请'],
        },{
          path: '/upLoanForm',
          name: 'upLoanForm',
          component: upLoanForm,
          meta: ['客户申请'],
        },
      //代理中心Signin
      {
        path: '/agent',
        name: 'agent',
        component: agent,
        meta: ['代理中心'],
      },
      //每日签到
      {
        path: '/Signin',
        name: 'Signin',
        component: Signin,
        meta: ['每日签到'],
      },

      //基础交易
      {
        path: '/exchgtrade',
        name: 'exchgtrade',
        component: exchgtrade,
        meta: ['基础交易'],
      },
      //星链矿机
      {
        path: '/starchainminer',
        name: 'starchainminer',
        component: starchainminer,
        meta: ['星链矿机'],
      },

      //星链矿机2
      {
        path: '/mstarch',
        name: 'mstarch',
        component: mstarch,
        meta: ['星链矿机2'],
      },

      // 邀请好友
      {
        path: '/invitation',
        name: 'invitation',
        component: invitation,
        meta: ['邀请好友'],
      },
      // 白皮书
      {
        path: '/Whiteskin',
        name: 'Whiteskin',
        component: Whiteskin,
        meta: ['白皮书'],
      }
      // 新币认购
      ,{
        path: '/newSymbol',
        name: 'newSymbol',
        component: newSymbol,
        meta: ['新币申购'],
      }
      // 我的行情
      ,{
        path: '/quotation',
        name: 'quotation',
        component: quotation,
        meta: ['行情'],
      }
      // APP下载
      ,{
        path: '/artapp',
        name: 'artapp',
        component: artapp,
        meta: ['下载APP'],
      }
      // 用户登录
      ,{
        path:'/login',
        name:'login',
        component:login,
        meta:['登录']
      }
      // 用户注册
      ,{
        path:'/register',
        name:'register',
        component:register,
        meta:['注册']
      }
      // 忘记密码
      ,{
        path:'/forget',
        name:'forget',
        component:forget,
        meta:['忘记密码']
      }
      // 法币交易
      ,{
        path:'/legalCoin',
        name:'',
        component:() => import('@/view/legalCoin/index'),
        children:[{
	        path: '/',
	        name: 'manage',
	        component:() => import('@/view/legalCoin/manage'),
	        meta: ['我要购买'],
	      },{
	        path: '/sell',
	        name: 'sell',
	        component:() => import('@/view/legalCoin/sell'),
	        meta: ['我要出售'],
	      },{
          path:'/submitLegal',
	        name: 'submitLegal',
	        component:() => import('@/view/legalCoin/submitLegal'),
	        meta: ['购买详情'],
        },{
          path:'/legalOrder',
	        name: 'legalOrder',
	        component:() => import('@/view/legalCoin/legalOrder'),
	        meta: ['法币订单'],
        },{
          path:'/acceptor',
          name: 'acceptor',
	        component:() => import('@/view/legalCoin/acceptor'),
	        meta: ['法币商家'],
        },{
          path:'/apeal',
          name: 'apeal',
	        component:() => import('@/view/legalCoin/apeal'),
	        meta: ['申诉'],
        }]

      },{
        path:'/transaction',
        name:'transaction',
        component:transaction,
        meta:['合约交易']
      },{
        path:'/transactionTrade',
        name:'transactionTrade',
        component:transactionTrade,
        meta:['合约交易']
      },{
        path:'/option',
        name:'option',
        component:option,
        meta:['期权秒合约']
      },{
        path:'/gold',
        name:'gold',
        component:gold,
        meta:['USDT 黄金']
      },{
        path:'/futures',
        name:'futures',
        component:futures,
        meta:['期货永续合约']
      },{
        path:'/legalTrastion',
        name:'legalTrastion',
        component:() => import('@/view/legalTrastion'),
        meta:['币币交易']
      },{
        path:'/currencyTrade',
        name:'currencyTrade',
        component:() => import('@/view/currencyTrade'),
        meta:['币币交易']
      },{
        path:'/order',
        name:'order',
        component:order,
        meta:['合约平仓记录']
      },{
        path:'/coinOrder',
        name:'coinOrder',
        component:() => import('@/view/coinOrder'),
        meta:['币币成交记录']
      },{
        path:'/assets',
        name:'assets',
        component:assets,
        meta:['资产']
      },{
        path:'/book',
        name:'book',
        component:() => import('@/view/book'),
        meta:['白皮书']
      },{
        path:'/contact',
        name:'contact',
        component:contact,
        meta:['新手指南']
      },{
        path:'/detail',
        name:'detail',
        component:detail,
        meta:['详情']
      },{
        path:'/article',
        name:'article',
        component:article,
        meta:['关于我们']
      },{
        path:'/agreement',
        name:'agreement',
        component:agreement,
        meta:['用户协议']
      },{
        path:'/privacy',
        name:'privacy',
        component:privacy,
        meta:['隐私条例']
      },{
        path:'/notice',
        name:'notice',
        component:notice,
        meta:['公告']
      },{
        path:'/person',
        name:'身份验证',
        component:person,//个性中心路由地址
        children:[{
	        path: '/',
	        name: 'realName',
	        component: realName,
	        meta: ['个人中心'],
	      },{
          path:'/invite',
          name:'invite',
          component:() => import('@/view/person/invite'),
          meta:['邀请']
        },{
	        path: '/set',
	        name: 'set',
	        component: set,
          meta: ['安全中心'],
	      },{
	        path: '/updateAssets',
	        name: 'updateAssets',
	        component:() => import('@/view/person/safeCenter/updateAssets'),
	        meta: ['修改资产密码'],
	      },{
	        path: '/updateLogin',
	        name: 'updateLogin',
	        component:() => import('@/view/person/safeCenter/updateLogin'),
	        meta: ['修改登录密码'],
	      },{
	        path: '/email',
          name: 'email',
          component:() => import('@/view/person/safeCenter/email'),
	        meta: ['绑定邮箱'],
	      },{
          path:"/bindPhone",
          name: 'bindPhone',
          component:() => import('@/view/person/safeCenter/bindPhone'),
	        meta: ['绑定手机'],
        },{
          path:'/nickName',
          name: 'nickName',
          component:() => import('@/view/person/safeCenter/nickName'),
	        meta: ['绑定昵称'],
        },{
          path:'/pay',
          name: 'pay',
          component:() => import('@/view/person/safeCenter/pay'),
	        meta: ['绑定支付方式'],
        },,{
          path:'/wechat',
          name: 'wechat',
          component:() => import('@/view/person/safeCenter/wechat'),
	        meta: ['绑定微信'],
        },,{
          path:'/aiplay',
          name: 'aiplay',
          component:() => import('@/view/person/safeCenter/aiplay'),
	        meta: ['绑定支付宝'],
        },,{
          path:'/bank',
          name: 'bank',
          component:() => import('@/view/person/safeCenter/bank'),
	        meta: ['绑定银行卡'],
        },,{
          path:'/paypal',
          name: 'paypal',
          component:() => import('@/view/person/safeCenter/paypal'),
	        meta: ['绑定paypal'],
        }]
      }]
    }
  ],
  scrollBehavior (to, from, savedPosition) {//savedPosition通过浏览器前进、后退按钮时触发
    return { x: 0, y: 0 }
  }
})
