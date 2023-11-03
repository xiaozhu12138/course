import router from './index';
import store from '@/store';
import cookie from 'js-cookie';
import { Message} from 'element-ui'

router.beforeEach(async (to,from,next) => {
    let token = store.state.token;

    if(!token){
        token = cookie.get('id'); //获取token 赋值到token
        store.commit('writeToken',token);
    }
    if(!token){  //代表你彻底没有token
        //没有登录
        if(to.path != '/login'){
            next('/login');
        }else{
            next()
        }
    }else{// 验证token 获取个人信息
        let username = store.getters.username;
        if(!username){
            try{
                await store.dispatch('getUserProfile')
                if(to.path != '/login'){
                    next();
                }else{
                    Message({
                        message: '您已登录，如需要请退出登录',
                        type: 'warning'
                    })
                    next('/')
                } 
                
            }catch(e){
                cookie.remove('id');
                store.commit('writeToken','');
               
                if(to.path != '/login'){
                    next('/login');
                }else{
                    next()
                }
            }
        }else{
            if(to.path != '/login'){
                next();
            }else{
                Message({
                    message: '您已登录，如需要请退出登录',
                    type: 'warning'
                }) 
                next('/')
            } 
        }
        
    }

})

export default router;
