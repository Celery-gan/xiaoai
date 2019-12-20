import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Common from '../views/common/Common'


Vue.use(VueRouter)

const routes = [
    // 首页
    {
        path: '/',
        component: Common,
        children: [{
            path: '',
            name: 'Home',
            component: Home
        }]
    },
    // 分页表格页 pagingtab
    {
        path: '/pagingtab',
        component: Common,
        children: [{
            path: '',
            name: 'pagingtab',
            component: () =>
                import ('../views/pagingtab/Pagingtab')
        }]
    },
    // 标签页  labelpage
    {
        path: '/labelpage',
        component: Common,
        children: [{
            path: '',
            name: 'labelpage',
            component: () =>
                import ('../views/labelpage/Labelpage')
        }]
    },
    // 图片上传  Pictures
    {
        path: '/pictures',
        component: Common,
        children: [{
            path: '',
            name: 'pictures',
            component: () =>
                import ('../views/pictures/Pictures')
        }]
    },

    // 已发表 beenpub
    {
        path: '/beenpub',
        component: Common,
        children: [{
            path: '',
            name: 'beenpub',
            component: () =>
                import ('../views/beenpub/Beenpub')
        }]
    },
    // 发布文章 publish article
    {
        path: '/publish',
        component: Common,
        children: [{
            path: '',
            name: 'publish',
            component: () =>
                import ('../views/publish/Publish')
        }]
    },
    // 统计文章  statistics
    {
        path: '/statistics',
        component: Common,
        children: [{
            path: '',
            name: 'statistics',
            component: () =>
                import ('../views/statistics/Statistics')
        }]
    },
    // 导出 Excel
    {
        path: '/expExcel',
        component: Common,
        children: [{
            path: '',
            name: 'expExcel',
            component: () =>
                import ('../views/expExcel/ExpExcel')
        }]
    },
    // 退出系统  logout
    {
        path: '/logout',
        component: Common,
        children: [{
            path: '',
            name: 'logout',
            component: () =>
                import ('../views/logout/Logout')
        }]
    },
    // 登录页
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/Login')
    },
    // 注册页
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/login/Register')
    },
    // 错误路径
    {
        path: '*',
        name: 'error',
        component: () =>
            import ('../views/Error/Error')
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router