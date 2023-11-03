import request from '@/axios';
import qs from 'qs';

export function zation(token){
    return request({
        url:'superprofile',
        headers:{
            authorization:`Bearer ${token}`,
        }
        
    })
}



