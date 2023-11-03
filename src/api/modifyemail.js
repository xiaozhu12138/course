import request from '@/axios';
import qs from 'qs';


export function binding(){
    return request({
        url:'superchangeemail',
        method:'POST',
        headers:{
            'Content-Type':'application/JSON'
        }
     }
    )
}
export function change(text){
    return request({
        url:'superchangeemail',
        method:'PUT',
        data:text,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        }
        
    })
}

export function ouldEmail(data){
    return request({
        url:'superbindnewemail',
        method:'POST',
        data:qs.stringify(data),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
     }
    )
}
export function newEmail(text){
    return request({
        url:'superbindnewemail',
        method:'PUT',
        data:text,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}