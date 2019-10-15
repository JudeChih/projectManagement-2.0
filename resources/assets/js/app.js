window._ = require('lodash');

try {
    window.$ = window.jQuery = require('jquery');

    require('foundation-sites');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

// window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

import router from './routes.js';
import HighlightText from 'vue-highlight-text';
import highlight from 'vue-highlight-text/public/directive.min';
import VueHtml5Editor from 'vue-html5-editor';
import rightMenu from "rightMenu";


Vue.directive('highlight', highlight);
Vue.component('HighlightText', HighlightText);
Vue.use(rightMenu);
Vue.use(VueHtml5Editor, {
    // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效 
    // global component name
    name: "vue-html5-editor",
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    // if set true,will append module name to toolbar after icon
    showModuleName: false,
    // 自定义各个图标的class，默认使用的是font-awesome提供的图标
    // custom icon class of built-in modules,default using font-awesome
    icons: {
        text: "fa fa-pencil-alt",
        color: "fa fa-paint-brush",
        font: "fa fa-font",
        align: "fa fa-align-left",
        list: "fa fa-list",
        link: "fa fa-chain",
        unlink: "fa fa-chain-broken",
        tabulation: "fa fa-table",
        image: "far fa-image",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa-undo fa",
        "full-screen": "fa fa-arrows-alt",
        info: "fa fa-info",
    },
    // 配置图片模块
    // config image module
    image: {
        // 文件最大体积，单位字节  max file size
        sizeLimit: 1024 * 1024,
        // 上传参数,默认把图片转为base64而不上传
        // upload config,default null and convert image to base64
        upload: {
            url: null,
            headers: {},
            params: {},
            fieldName: {}
        },
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
        // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
        // set null to disable compression
        // compress: {
        //     width: 500,
        //     quality: 80
        // },
        // 响应数据处理,最终返回图片链接
        // handle response data，return image url
        uploadHandler(responseText){
            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
            var json = JSON.parse(responseText)
            if (!json.ok) {
                alert(json.msg)
            } else {
                return json.data
            }
        }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    //default en-us, en-us and zh-cn are built-in
    language: "zh-cn",
    // 自定义语言
    i18n: {
        //specify your language here
        "zh-cn": {
            "align": "對齊方式",
            "image": "圖片",
            "list": "列表",
            "link": "鏈結",
            "unlink": "去除鏈結",
            "table": "表格",
            "font": "文字",
            "full screen": "全屏",
            "text": "排版",
            "eraser": "格式清除",
            "info": "關於",
            "color": "顏色",
            "please enter a url": "請輸入地址",
            "create link": "創建鏈結",
            "bold": "加粗",
            "italic": "傾斜",
            "underline": "下滑線",
            "strike through": "刪除線",
            "subscript": "上標",
            "superscript": "下標",
            "heading": "標題",
            "font name": "字體",
            "font size": "文字大小",
            "left justify": "左對齊",
            "center justify": "居中",
            "right justify": "右對齊",
            "ordered list": "有序列表",
            "unordered list": "無序列表",
            "fore color": "前景色",
            "background color": "背景色",
            "row count": "行數",
            "column count": "列數",
            "save": "确定",
            "upload": "選擇圖片",
            "progress": "進度",
            "unknown": "未知",
            "please wait": "請稍等",
            "error": "錯誤",
            "abort": "中斷",
            "reset": "重置",
            'exceed size limit': '圖片大小限制1M以下'
        }
    },
    // 隐藏不想要显示出来的模块
    // the modules you don't want
    hiddenModules: [
        "color",
        "font",
        "list",
        "link",
        "unlink",
        "tabulation",
        "hr",
        "eraser",
        "undo",
        "full-screen",
        "info",
    ],
    // 自定义要显示的模块，并控制顺序
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "image",
        "hr",
        "eraser",
        "undo",
        "full-screen",
        "info",
    ],
    // 扩展模块，具体可以参考examples或查看源码
    // extended modules
    modules: {
        //omit,reference to source code of build-in modules
    }
})

new Vue({
    router
}).$mount('#app');