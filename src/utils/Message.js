import swal from 'sweetalert2';
import picDelete from '../assets/images/message/pic_messagebox_delete.png';
import picCancel from '../assets/images/message/pic_messagebox_cancel.png';
import picError from '../assets/images/message/pic_messagebox_error.png';
import picPublish from '../assets/images/message/pic_messagebox_star.png';
import orderSplit from '../assets/images/message/pic_messagebox_orderSplit.png';

class Message {
    constructor() {
        this.Swal = swal.mixin({
            cancelButtonClass: 'swal_btn_ok',
            cancelButtonColor: '#ff5172',
            confirmButtonClass: 'swal_btn_ok',
            confirmButtonColor: '#7b5be3',
            allowOutsideClick: false,
            width: '420px',
            height: '240px'
        });
        this.pictureObj = {
            0: picError, // 错误
            1: picCancel, // 取消
            2: picDelete, // 删除
            3: picPublish, // 发布
            4: orderSplit // 拆分
        };
    }
    autoClosed({ type = 'success', title = '保存成功', text = '3秒后自动关闭', timer = 1400 } = {}) {
        const swalObj = {
            title,
            text,
            timer,
            customClass: 'swal_set_h',
            showConfirmButton: false
        };
        if (type === 'success') {
            swalObj.type = type;
        }
        if (type === 'error') {
            swalObj.imageUrl = this.pictureObj[0];
        }
        return this.Swal.fire(swalObj);
    }
    popUp({ title, text, type = 0, showConfirm = true, showCancel = true, conformText = '确定', cancelText = '取消' }) {
        return this.Swal.fire({
            title,
            showConfirmButton: showConfirm,
            showCancelButton: showCancel,
            imageUrl: this.pictureObj[type],
            confirmButtonText: conformText,
            cancelButtonText: cancelText,
            text
        });
    }
}

export default new Message();
