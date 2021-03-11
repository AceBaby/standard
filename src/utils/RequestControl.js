import axios from 'axios';
import url from '../api';
import Message from './Message';
import LoadingControl from './LoadingControl';
class RequestControl {
    constructor() {
        this.loadingControl = new LoadingControl();
        this.url = url;
        this.service = axios.create({
            baseURL: window.config.serviceRoot, // api的base_url
            timeout: 15000 // 请求超时时间
        });
        this.requestInterceptors();
        this.responseInterceptors();
    }
    requestInterceptors() {
        // request拦截器
        this.service.interceptors.request.use(config => {
            let loadingText = 'Loading';
            if (config.params && config.params.pageNum && config.params.pageNum > 1) {
                loadingText = '加载更多';
            }
            // 启动进度条
            this.loadingControl.start(loadingText);
            if (config.method === 'get') {
                // config.headers['Authorization'] = 'Bearer%20eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0N2VkZmU2NmJlZTI0ZThmOTNlMzkxNjRmZmNhYmJkMSIsImF1dGgiOiJhZG1pbiIsInN1YiI6ImFkbWluIn0.udz4_SgjTPPVccDjg9cvfwj6H93uSQ5Ii7DvYc11fmVALXBTm_j4GS8iGM4GpJH2wj9zRpTt0UYpTV9Emf8F9g'; // get请求加token的方式
                // config.params['access_token'] = Auth.getSessionStorage('SESSION_ADMIN_TOKEN'); // get请求加token的方式
                // config.params['reqContext'] = reqContext;
            }
            if (config.method === 'post') {
                // config.data = config.data + '&access_token=' + Auth.getSessionStorage('SESSION_ADMIN_TOKEN'); // post请求加token的方式
            }
            return config;
        }, error => {
            // Do something with request error
            console.log(error); // for debug
            Promise.reject(error);
        });
    }
    responseInterceptors() {
        // respone拦截器
        this.service.interceptors.response.use(
            response => {
            /**
             * code为非20000是抛错 可结合自己业务进行修改
             */
                const url = response.config.url;
                const res = response.data;
                this.loadingControl.close(); // 关闭进度条
                if (res.address) {
                    return res.address;
                }
                if (res.errcode !== 0) {
                    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
                    if (res.errcode === -100) {
                        Message.autoClosed(
                            {
                                type: 'error',
                                title: '登录信息已过期',
                                text: '即将跳转到登录页面',
                                timer: 3000
                            }).then(res => {
                            // Auth.removeSessionStorage('SESSION_ADMIN_TOKEN');
                            location.reload();
                            // this.$Router.push({ path: '/login' });
                        });
                    } else if (res.errcode !== -100) {
                        Message.popUp(
                            {
                                title: this.errorMsg(url),
                                text: res.msg,
                                showConfirm: false,
                                cancelText: '知道了'
                            });
                    }
                    return Promise.reject(res.errmsg);
                } else {
                    return response.data;
                }
            },
            error => {
                this.loadingControl.close(); // 关闭进度条
                const url = error.config.url;
                if (url.indexOf('login') !== -1) {
                    return Promise.reject(error.response.data.errmsg);
                }
                Message.popUp(
                    {
                        title: this.errorMsg(url),
                        text: error.message,
                        showConfirm: false,
                        cancelText: '知道了'
                    });
                return Promise.reject(error);
            }
        );
    }
    errorMsg(url) {
        let msgTit = '失败';
        if (url.indexOf('create') !== -1) {
            msgTit = '创建失败';
        }
        if (url.indexOf('update') !== -1) {
            msgTit = '保存失败';
        }
        if (url.indexOf('copy') !== -1) {
            msgTit = '复制失败';
        }
        if (url.indexOf('push') !== -1) {
            msgTit = '推送失败';
        }
        if (url.indexOf('delete') !== -1) {
            msgTit = '删除失败';
        }
        return msgTit;
    }

    fetchByGet(api, param) {
        const urlParam = this.url[api] + '?' + param;
        return new Promise((resolve, reject) => {
            this.service.get(urlParam).then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    fetch(api, params) {
        return new Promise((resolve, reject) => {
            this.service.get(this.url[api], {
                params: {
                    parameter: JSON.stringify(params)
                }
            }).then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    fetchLocal(url, params) {
        return new Promise((resolve, reject) => {
            this.service.get(url, {
                params: {
                    parameter: JSON.stringify(params)
                }
            }).then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    fetchByPost(api, parameter) {
        // 将原本默认的contenttype变为x-www-form-urlencoded,表单数据一般后端框架都能处理
        // const searchParams = new URLSearchParams();
        // if (Array.isArray(parameter)) {
        //     searchParams.append('parameter', JSON.stringify(parameter).replace(/\\n/g, ' ').replace(/\\/g, ''));
        // }
        // if (parameter.templetId) {
        //     searchParams.append('templetId', parameter.templetId);
        // }
        // if (parameter.thumbnail) {
        //     searchParams.append('thumbnail', JSON.stringify(parameter.thumbnail).replace(/\\n/g, ' ').replace(/\\/g, ''));
        // }
        return new Promise((resolve, reject) => {
            this.service.post(this.url[api], parameter).then(response => {
                resolve(response.data);
            }, err => {
                if (err.response) {
                    reject(err.response.data);
                } else {
                    reject(err);
                }
            })
                .catch((error) => {
                    if (error.response) {
                        reject(error.response.data);
                    } else {
                        reject(error);
                    }
                });
        });
    }
}

export default new RequestControl();
