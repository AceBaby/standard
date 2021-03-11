import { Loading } from 'element-ui';

class LoadingControl {
    constructor(text) {
        // this.text = text;
        this.loading = null;
        this.flag = true;
    }
    start(text, param) {
        if (this.isStart(param)) {
            this.loading = Loading.service({
                lock: true,
                text: text,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
    }
    isStart(param) {
        return this.flag;
    }
    close() {
        if (this.loading) {
            this.loading.close();
        }
    }
}

export default LoadingControl;
