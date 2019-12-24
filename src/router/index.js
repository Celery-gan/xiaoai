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
            component: Home,
            meta: {
                title: "Home",
                isMeta: true
            },
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
                import ('../views/pagingtab/Pagingtab'),
            meta: {
                title: "pagingtab",
                isMeta: true
            },
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
                import ('../views/labelpage/Labelpage'),
            meta: {
                title: "标签页",
                isMeta: true
            },

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
                import ('../views/pictures/Pictures'),
            meta: {
                title: "图片上传",
                isMeta: true
            },
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
                import ('../views/beenpub/Beenpub'),
            meta: {
                title: "已发表",
                isMeta: true
            },
        }]
    },
    // 查看文章 check
    {
        path: '/check',
        component: Common,
        children: [{
            path: '',
            name: 'check',
            component: () =>
                import ('../views/beenpub/Check'),
            meta: {
                title: "查看文章",
                isMeta: true
            },
        }]
    },
    // 修改文章 detail
    {
        path: '/detail',
        component: Common,
        children: [{
            path: '',
            name: 'detail',
            component: () =>
                import ('../views/beenpub/Detail'),
            meta: {
                title: "修改文章",
                isMeta: true
            },
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
                import ('../views/publish/Publish'),
            meta: {
                title: "发布文章",
                isMeta: true
            },
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
                import ('../views/statistics/Statistics'),
            meta: {
                title: "统计文章",
                isMeta: true
            },
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
                import ('../views/expExcel/ExpExcel'),
            meta: {
                title: "导出Excel",
                isMeta: true
            },
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
                import ('../views/logout/Logout'),
            meta: {
                title: "退出系统",
                isMeta: true
            },
        }]
    },
    // 登录页
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/Login'),
        meta: {
            title: "登录",
            isMeta: true
        },
    },
    // 注册页
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/login/Register'),
        meta: {
            title: "注册",
            isMeta: true
        },
    },
    // 错误路径
    {
        path: '*',
        name: 'error',
        component: () =>
            import ('../views/Error/Error'),
        meta: {
            title: "错误",
            isMeta: true
        },
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let username = localStorage.getItem('username')
    if (to.path === '/login' || to.path === '/register') {
        next()
    } else {
        username ? next() : next('/login')
    }
})

export default router