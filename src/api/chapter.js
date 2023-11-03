import request from '@/axios';
import qs from 'qs';

export function chapter(token,pk){
    return request({
        url:`chapter?pk=` + pk, 
        headers:{
            authorization:`Bearer ${token}`,
        }
        
    })
}
export function change(token,data){
    let formdata = new FormData();
    formdata.append("pk", data.pk);
    formdata.append("chapter_name", data.chapter_name);
    return request({
        url:`chapter`,
        method: 'POST',
        data:formdata,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            authorization:`Bearer ${token}`,
        }
    })
}

export function del(token,data){
    return request({
        url:'chapter',
        method:'DELETE',
        data:qs.stringify(data),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            authorization:`Bearer ${token}`,
        }
        
    })
}
export function modify(token,data){
    return request({
        url:'chapter',
        method:'PUT',
        data:qs.stringify(data),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            authorization:`Bearer ${token}`,
        }
        
    })
}



