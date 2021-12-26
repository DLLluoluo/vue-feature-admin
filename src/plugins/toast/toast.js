import Vue from 'vue'
import toastComponent from './toast.vue'

const ToastConstructor = Vue.extend(toastComponent);

function showToast(toastVal='default', time=1000){
    let ToastDOM = new ToastConstructor({
        el:document.createElement('div'),
        data(){
            return {
                toastVal:toastVal,
                toastShow:false
            }
        }
    });
    document.body.appendChild(ToastDOM.$el);
    ToastDOM.toastShow = true;
    let timer = setTimeout(res=>{
        clearTimeout(timer);
        document.body.removeChild(ToastDOM.$el); //删除dom元素
        ToastDOM.toastShow = false;
    },time);
}

Vue.prototype.$toast = showToast;