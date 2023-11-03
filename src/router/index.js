import VueRouter from 'vue-router';
import Vue from 'vue';


Vue.use(VueRouter)

const Login = () => import('@/views/Login'); 
const Layout = () =>import('@/layout');
const Dashbaord = () => import('@/views/Dashbaord');
const Subjeact = () => import('@/views/Subjeact');
const Information = () => import('@/views/Information');
const Chapter = () => import('@/views/Chapter');
const Video = () => import('@/views/Video');
const Password = () => import('@/views/Password');
const ModifyEmail = () => import('@/views/ModifyEmail');
const Map = () => import('@/views/Map');
const routes = [
    {
        path: '/login',
        component:Login,
    },
    {
        path: '/',
        redirect:'/dashbaord',
        component: Layout, 
        children:[
            {
                path:'dashbaord',
                component:Dashbaord,
                meta:{
                    title:'首页'
                }
            },
            {
                path:'information',
                component:Information,
                meta:{
                    title:'个人信息'
                }
            },
        ]

    },
    {
        path:'/subjeact',
        component: Layout, 
        children:[
            {
                path:'',
                component:Subjeact,
                meta:{
                    title:'课程管理'
                }
        }
    ]
    },
    {
        path:'/chapter',
        component: Layout, 
        children:[
            {
                path:'',
                component:Chapter,
                meta:{
                    title:'章节管理'
                }
            }
        ]
    },
    {
        path:'/video',
        component:Layout,
        children:[
            {
                path:'',
                component:Video,
                meta:{
                    title:'视频管理'
                }
            }
        ]
    },
    {
        path:'/password',
        component:Layout,
        children:[
            {
                path:'',
                component:Password,
                meta:{
                    title:'修改密码'
                }
            }
        ]
    },
    {
        path:'/modifyemail',
        component:Layout,
        children:[{
            path:'',
            component:ModifyEmail,
            meta:{
                title:'修改邮箱'
                }
        }]
    },
    {
        path:'/map',
        component:Layout,
        children:[{
            path:'',
            component:Map,
            meta:{
                title:'地图位置'
                }
        }]
    }


]

export default new VueRouter({
    model: 'hash',
    routes
})

