import request from '@/axios';
import qs from 'qs';

export function play(path){
    return request({
        url:'https://www.chengzier.cn:9000/api/videoplay?path=' + path,
        headers:{
            'Content-Type':'application/JSON',
        }
    })
}