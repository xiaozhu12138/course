import VueX from 'vuex';
import Vue from 'vue';
import {profile} from '@/api/user'
import subject from './subject'
import video from './video'
import bookarr from './bookarr'
Vue.use(VueX);

export default new VueX.Store({
    state:{
        isCollapse:true,
        msg:'hello vuex',
        token:"",
        userProfile:{
            username:'',
            email:'',
            avatar:'',
            phone:''
        },

    },
    getters:{
        username(state){
            return state.userProfile.username;
        }
    },
    mutations:{
        changeMsg(state,data){
            state.msg = data;
        },
        reSave(state){
            state.isCollapse = !state.isCollapse;
        },
        writeToken(state,token){
            state.token = token;
        },
        writeUserProfile(state,profile){
            state.userProfile.username = profile.username;
            state.userProfile.email = profile.email;
            state.userProfile.avatar = `https://www.chengzier.cn:8000/${profile.avator}`;
            state.userProfile.phone = profile.phone;
        },

    },
    actions:{
        asyncMsg({commit}){
            setTimeout(() => {
                commit('changeMsg',123165);
            }, 1000);
        },
        getUserProfile({ commit ,state}){
            return new Promise((resolve, reject) => {
                profile(state.token).then((res) => {
                 let data = res.data;
                 if(data.status){
                    reject()
                 }else{
                    commit('writeUserProfile',data)
                    resolve()
                 }        
                }).catch((err)=>{   
                    reject()
                })
            })
        },
        
    },
    modules: {
        subject,
        video,
        bookarr
    }

})
