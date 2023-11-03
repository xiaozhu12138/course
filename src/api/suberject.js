import request from '@/axios';
import qs from 'qs';


export function Authorization(token,data){
    return request({
        url:'classify',
        data:qs.stringify(data),
        headers:{
            authorization:`Bearer ${token}`,
        }
        
    })
}
export function del(token,data){
    return request({
        url:'classify',
        method:'DELETE',
        data:qs.stringify(data),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            authorization:`Bearer ${token}`,
        }
        
    })
}
export function once(token,data){
    let fromdata = new FormData();
    fromdata.append('name',data.name);
    return request({
        url:'classify',
        // data:qs.stringify(data),
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            authorization:`Bearer ${token}`,
        },
        data:fromdata
        
    })
}

export function change(token,data){
    return request({
        url:'classify',
        method:'PUT',
        data:qs.stringify(data),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            authorization:`Bearer ${token}`,
        }
        
    })
}

