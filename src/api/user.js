import request from '@/axios';
import qs from 'qs';

export function login(data){
    return request({
        url:'supersignin',
        method:'POST',
        data:qs.stringify(data),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
     }
    )
}
export function profile(token){
    return request({
        url:'superprofile',
        headers:{
            authorization:`Bearer ${token}`,
        }
    })
}
export function logout(username){
    let formData = new FormData();
    formData.append('username', username)
    return request({
        url:'createsuperuser',
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        data:formData,
     }
    )
}








