import request from '@/axios';
import qs from 'qs';

export function binding(email){
    return request({
        url:'superbindemail',
        method:'POST',
        data:email,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
     }
    )
}
export function change(text){
    return request({
        url:'superbindemail',
        method:'PUT',
        data:text,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        }
        
    })
}

export function ouldPassword(){
    return request({
        url:'superchangepwd',
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
     }
    )
}
export function newPassword(data){
    return request({
        url:'superchangepwd',
        method:'PUT',
        data:data,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        }
        
    })
}


