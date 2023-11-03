export default {
    namespaced:true,
    state:()=>{
        booke:[]
    },
    mutations:{
        writList(state,booke){
            state.booke = booke
        }
    },
    action:{},
}