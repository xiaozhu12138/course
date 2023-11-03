import request from '@/axios';
import qs from 'qs';

export function unload(token,file){
    let formData = new FormData();
    formData.append('avator',file)
    return request({
        url:'changesuperavator',
        method:'POST',
        data:formData,
        headers:{
            authorization:`Bearer ${token}`,
        }
    })
}