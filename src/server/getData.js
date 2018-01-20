import axios from 'axios';
import { baseUrl } from '../common/js/env';
// import $ from 'jquery';

// axios.defaults.baseURL = baseUrl + '/credit/';
axios.defaults.baseURL = baseUrl + '/';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

let getData = ({method = 'get', url = '', data = null, params = null}) => {
    //todo 待优化
    if (!url.startsWith('/loan')) {
        url = '/my-user' + url;
    }
    let token = localStorage.getItem('token');
    return axios({
        method: method,
        url: url,
        data: data,
        params: params,
        headers: {'token': token}
    }).then(res => {
        if (res.data && res.data.respCode === '1000') {
            return {
                flags: 'success',
                data: res.data.body
            };
        } else if (res.data && res.data.respCode === 8) {
            window.location.href = '/';
        } else if (!res || !res.data) {
            window.location.href = '/';
        } else {
            return {
                flags: 'fail',
                data: res.data.respMsg,
                // data: res.data.respMsg,
                errorCode: res.data.respCode
            };
        }
    }).catch(error => {
        return error;
    });
};

// let callComponent = new UdeskCallcenterComponent({
//     container: document.body,
//     token: localStorage.getItem('callToken'),
//     subDomain: '1-cash',
//     onScreenPop: function(conversation) {},
//     onHangup: function(conversation) {}
// });
export {
    getData
};
