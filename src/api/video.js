import request from '@/axios';
import qs from 'qs';

export function videochapter(data,pk){
    return request({
        url:`chapter_video?pk=` + pk,
        data:qs.stringify(data),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        }
        
    })
}


export function videochapterlist(token,data){
    let formdata = new FormData();
    formdata.append("video", data.video);
    formdata.append("name", data.name);
    formdata.append("chapter_id", data.chapter_id);
    formdata.append("video_permission", data.video_permission);
    return request({
        url:`chapter_video?chapter_id=${data.chapter_id}`,
        data:formdata,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            authorization:`Bearer ${token}`,
        }
        
    })

}

export function del(data){
    return request({
        url:'chapter_video',
        method:'DELETE',
        data:qs.stringify(data),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        }
        
    })
}

export function text(data){
    return request({
        url:'chapter_video',
        method:'PUT',
        data:qs.stringify(data),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        }
        
    })
}