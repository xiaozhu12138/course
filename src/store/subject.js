export default {
    namespaced:true,
    state:()=>{
        list:[]
    },
    mutations:{
        writList(state,list){
            state.list = list
        }
    },
    action:{},

}