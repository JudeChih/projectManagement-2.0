/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(28)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(23)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(4),
  /* template */
  __webpack_require__(18),
  /* scopeId */
  "data-v-077da1d8",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\projectManagement-2.0\\resources\\assets\\js\\components\\Datetimepicker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Datetimepicker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-077da1d8", Component.options)
  } else {
    hotAPI.reload("data-v-077da1d8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'datetimepicker',
    props: {
        id: '',
        date: '',
        type: '',
        time: '', //date:只顯示日期不顯示時間、time:顯示日期與時間
        position: '' //點擊目標在畫面上的座標
    },
    data() {
        return {
            week_en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            now_page_year: '', //當頁年份
            now_page_month: '', //當頁月份
            today: { 'year': '', 'month': '', 'day': '' }, //當天年月日
            totime: { 'hour': '00', 'minute': '00' }, //當天小時分鐘
            month_olympic: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //閏年每月天數
            month_normal: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //正常年每月天數
            new_date: '', //所選日期
            new_time: '', //所選時間
            istime: false,
            top_or_bottom: false // true = top , false = bottom 月曆會在目標的上方還是下方
        };
    },
    computed: {
        data_for_month: function () {
            let self = this;
            var array_a = [];
            var result_arr = [];
            var totalDay = self.daysMonth(self.now_page_month, self.now_page_year); //獲取該月總天數
            var firstDay = self.dayStart(self.now_page_month, self.now_page_year); //获取该月第一天是星期几
            for (var i = 0; i < firstDay; i++) {
                var json = {};
                json.week = i % 7; //禮拜幾
                json.day = '';
                json.month = '';
                json.year = '';
                array_a.push(json);
                result_arr.push(json);
            }
            for (var i = 0; i < totalDay; i++) {
                var json = {};
                var array_b = [];
                var cd = new Date(self.now_page_year, self.now_page_month, i + 1);
                json.week = cd.getDay();
                json.day = cd.getDate();
                json.month = self.now_page_month;
                json.year = self.now_page_year;
                array_a.push(json);
                result_arr.push(json);
            }
            var num = Math.ceil(array_a.length / 7);
            for (var i = 0; i < num * 7 - array_a.length; i++) {
                var json = {};
                json.week = (array_a.length + i) % 7; //禮拜幾
                json.day = '';
                json.month = '';
                json.year = '';
                result_arr.push(json);
            }
            return result_arr;
        }
    },
    methods: {
        init: function () {
            let self = this;
            if (this.position) {
                var index_height = $(window).height();
                if (index_height - this.position.y < 400) {
                    self.top_or_bottom = true;
                } else {
                    self.top_or_bottom = false;
                }
            }
            if (this.date) {
                var cd = new Date(this.date);
                if (this.time) {
                    if (cd.getHours() < 10) {
                        self.totime.hour = '0' + cd.getHours();
                    } else {
                        self.totime.hour = cd.getHours();
                    }
                    if (cd.getMinutes() < 10) {
                        self.totime.minute = '0' + cd.getMinutes();
                    } else {
                        self.totime.minute = cd.getMinutes();
                    }
                    self.new_time = self.totime.hour + ':' + self.totime.minute;
                }
            } else {
                var cd = new Date();
                if (this.time) {
                    if (cd.getHours() < 10) {
                        self.totime.hour = '0' + cd.getHours();
                    } else {
                        self.totime.hour = cd.getHours();
                    }
                    if (cd.getMinutes() < 10) {
                        self.totime.minute = '0' + cd.getMinutes();
                    } else {
                        self.totime.minute = cd.getMinutes();
                    }
                    self.new_time = self.totime.hour + ':' + self.totime.minute;
                }
            }
            if (this.time) {
                self.istime = true;
            } else {
                self.istime = false;
            }
            self.now_page_year = cd.getFullYear();
            self.now_page_month = cd.getMonth();
            self.today.year = cd.getFullYear();
            self.today.month = cd.getMonth();
            self.today.day = cd.getDate();
            self.new_date = cd.getFullYear() + "-" + (cd.getMonth() + 1) + "-" + cd.getDate();
        },
        //刪除該欄位日期的設定
        closeDateTimePicker: function () {
            let self = this;
            var json = {};
            if (this.type == 'pt_id') {
                json.pt_id = this.id;
            } else if (this.type == 'pst_id') {
                json.pst_id = this.id;
            } else if (this.type == 'ai_id') {
                json.ai_id = this.id;
            } else if (this.type == 'url_id') {
                json.url_id = this.id;
            }
            json.date = '';
            self.$emit('get-newdate', json);

            self.now_page_year = '';
            self.now_page_month = '';
            self.today = { 'year': '', 'month': '', 'day': '' };
            self.totime = { 'hour': '', 'minute': '' };
            self.$emit('get-close', true);
        },
        //送出日期
        submitDate: function () {
            let self = this;
            var json = {};
            if (this.type == 'pt_id') {
                json.pt_id = this.id;
            } else if (this.type == 'pst_id') {
                json.pst_id = this.id;
            } else if (this.type == 'ai_id') {
                json.ai_id = this.id;
            } else if (this.type == 'url_id') {
                json.url_id = this.id;
            } else if (this.type == 'bbr_id') {
                json.bbr_id = this.id;
            }
            if (self.istime) {
                json.date = self.new_date + ' ' + self.new_time;
            } else {
                json.date = self.new_date;
            }
            self.$emit('get-newdate', json);

            self.now_page_year = '';
            self.now_page_month = '';
            self.today = { 'year': '', 'month': '', 'day': '' };
            self.totime = { 'hour': '', 'minute': '' };
            self.$emit('get-close', true);
        },
        //切換月份
        changeMonth: function (type) {
            let self = this;
            var cd = new Date();
            if (type == 'pre') {
                if (self.now_page_month == 0) {
                    self.now_page_year = self.now_page_year - 1;
                    self.now_page_month = 11;
                } else {
                    self.now_page_month = self.now_page_month - 1;
                }
            } else if (type == 'today') {
                self.now_page_year = cd.getFullYear();
                self.now_page_month = cd.getMonth();
            } else if (type == 'next') {
                if (self.now_page_month == 11) {
                    self.now_page_year = self.now_page_year + 1;
                    self.now_page_month = 0;
                } else {
                    self.now_page_month = self.now_page_month + 1;
                }
            }
        },
        //取得某年某月的天數
        daysMonth: function (month, year) {
            let self = this;
            var tmp = year % 4;
            if (tmp == 0) {
                return self.month_olympic[month];
            } else {
                return self.month_normal[month];
            }
        },
        //取得某年某月第一天是星期幾
        dayStart: function (month, year) {
            var tmpDate = new Date(year, month, 1);
            return tmpDate.getDay();
        },
        //選擇時間
        selectThisTime: function () {
            let self = this;
            var hour = $('input.hour').val();
            var minute = $('input.minute').val();
            if (hour.length == 1) {
                self.totime.hour = '0' + hour;
            } else if (hour.length == 0) {
                self.totime.hour = '00';
            } else if (hour > 23) {
                self.totime.hour = '23';
            } else {
                self.totime.hour = hour.substr(hour.length - 2);
            }
            if (minute.length == 1) {
                self.totime.minute = '0' + minute;
            } else if (minute.length == 0) {
                self.totime.minute = '00';
            } else if (minute > 59) {
                self.totime.minute = 59;
            } else {
                self.totime.minute = minute.substr(minute.length - 2);
            }
            self.new_time = self.totime.hour + ':' + self.totime.minute;
        },
        //選擇某個日期
        selectThisDay: function (year, month, day) {
            let self = this;
            self.today.year = year;
            self.today.month = month;
            self.today.day = day;
            self.new_date = year + "-" + (month + 1) + "-" + day;
        }
    },
    watch: {},
    mounted: function () {
        this.init();
    }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'hoverwrap',
    props: {
        title: '',
        subtitle: '',
        date: '',
        position: '',
        user: ''
    },
    data() {
        return {
            stylelist: {} //該彈窗的座標
        };
    },
    created: function () {},
    computed: {},
    methods: {
        init: function () {
            let self = this;
            //從這邊設定座標
            var index_width = $(window).width();
            var index_height = $(window).height();
            var json = {};
            if (index_width - this.position.x < 400) {
                json.right = index_width - this.position.x + 'px';
            } else {
                json.left = this.position.x + 'px';
                self.stylelist = { top: this.position.y + 'px', left: this.position.x + 'px' };
            }
            if (index_height - this.position.y < 200) {
                json.bottom = index_height - this.position.y + 'px';
            } else {
                json.top = this.position.y + 'px';
            }
            self.stylelist = json;
        }
    },
    watch: {},
    mounted: function () {
        this.init();
    }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'reminderwrap',
    props: {
        id: '', //使用者編號
        admin: '' //是否為管理員
        // type:'',//所屬部門
    },
    data() {
        return {
            reminderdata: []
        };
    },
    created: function () {
        let self = this;
        setInterval(function () {
            self.getUserReminderData();
        }, 1000);
    },
    computed: {},
    methods: {
        init: function () {
            let self = this;
        },
        getUserReminderData: function () {
            let self = this;
            var json = {};
            json.ud_id = this.id;
            if (this.admin) {
                axios.post('/adminallreminderdata', json).then(function (response) {
                    self.reminderdata = response.data;
                    if (self.reminderdata.length > 0) {
                        for (var i = 0; i < self.reminderdata.length; i++) {
                            self.appendReminderWrap(self.reminderdata[i]);
                        }
                    }
                }).catch(function (response) {
                    return false;
                });
            } else {
                axios.post('/userallreminderdata', json).then(function (response) {
                    self.reminderdata = response.data;
                    if (self.reminderdata.length > 0) {
                        for (var i = 0; i < self.reminderdata.length; i++) {
                            self.appendReminderWrap(self.reminderdata[i]);
                        }
                    }
                }).catch(function (response) {
                    return false;
                });
            }
        },
        appendReminderWrap: function (data) {
            let self = this;
            if (data.pst_name) {
                var string = "<div class='reminder'><i class='fas fa-bell'></i><p>" + data.pst_name + "</p></div>";
                $('#reminderwrap').append(string);
            } else if (data.ai_title) {
                var string = "<div class='reminder'><i class='fas fa-bell'></i><p>" + data.ai_title + "</p></div>";
                $('#reminderwrap').append(string);
            } else {
                var string = "<div class='reminder'><i class='fas fa-bell'></i><p>" + data.url_message + "</p></div>";
                $('#reminderwrap').append(string);
            }
            $('.reminder').on('click', function () {
                $(this).remove();
            });
        }
    },
    watch: {},
    mounted: function () {
        this.init();
    }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Datetimepicker_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Datetimepicker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Datetimepicker_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'singlepage',
    components: {
        datetimepicker: __WEBPACK_IMPORTED_MODULE_0__components_Datetimepicker_vue___default.a
    },
    props: {
        userdata: '', //使用者資訊
        type: '', //所屬table的開頭 pt pst ai ud al bi ...
        id: '', //所屬的編號
        cate: '', // 1 主任務、 2 子任務、 3 公告、 4 使用者帳號、 5 權限等級、 6 書籍...
        group: '' //所屬組別
    },
    data() {
        return {
            //是否為管理員
            isadmin: false,
            //所有欄位全部的選項
            milestone_cate: [], //里程碑所有選項
            requiresort_cate: [], //需求分類所有選項
            priority_cate: [], //優先權所有選項
            status_cate: [], //狀態所有選項
            executeitem_cate: [], //執行項目選項
            group_cate: [], //群組所有選項
            type_cate: [], //部門所有選項
            user_cate: [], //所有使用者
            user_group: [], //使用者所屬群組
            user_tags: [], //使用者的標籤資訊
            user_status: [], //使用者資訊
            user_auth: [], //使用者權限
            user_reminderdate: [], //使用者提醒專案資訊
            subprojectsort_cate: [],
            // authoritylevel_cate:[],//權限等級資訊
            user_data: {}, //單一使用者資料
            user_id: '', //單一使用者的編號
            auths: [], //所有權限等級資料
            auth_level: {}, //單一權限等級資料
            auth_id: '', //單一權限等級的編號
            book_status: [], //單一書籍狀態
            book_sort: [], //單一書籍分類
            book_data: {}, //單一書籍資料
            imageurl: '', //書籍圖片路徑暫存區
            book_id: '', //單一書籍編號
            project: [],
            project_ann: [],
            project_infors: [], //某專案任務所有的專案訊息
            project_records: [], //某專案任務所有的專案紀錄
            project_cate: '', //單一專案任務目前顯示的 1.專案任務 2.專案子任務 3.公告 4.....
            project_id: '', //單一專案任務目前顯示的專案任務資料的id
            project_infor_id: '', //單一專案任務目前顯示的專案訊息
            project_record_id: '', //單一專案任務目前顯示的專案紀錄
            single_title: [], //單一專案任務頁面左側主任務title顯示
            single_title_sub: [], //單一專案任務頁面左側子任務title顯示
            sub_loading: false, //單一專案加載框 顯示與否
            pro_type: '', //1.專案主任務 2.專案子任務 3.專案訊息 4.專案紀錄 5.標籤
            ann_type: '', //1.公告資訊 2.公告訊息 3.書籍借閱 4.書籍資訊 5.書籍分類 6.資產管理 7.wifi申請
            delete_id: '', //需要刪除的目標的id
            prompt_box_open: false, //提示框 顯示與否
            sub_project_input_open: false, //新增子任務區塊 顯示與否
            show_submit_btn: true, //送出按鈕功能 顯示與否
            project_ann_id: '', //單一專案任務目前顯示的專案任務資料的id
            ann_message_id: '', //單一專案公告目前顯示的公告訊息的id
            project_ann_messages: [], //某專案公告所有的公告訊息
            project_nav_open: 'information', //單一專案任務頁面-nav區塊 顯示與否
            //拖拉相關
            drag_pt_id: '',
            drag_pst_id: '',
            dropdown: { 'item': '', 'type': '', 'id': '' }, //用於判斷要開啟哪個下拉選單
            //文字編輯器設定
            editor_content: "",
            editing: false,
            create_infor_editor_open: false, //新增訊息區塊 顯示與否
            create_record_editor_open: false, //新增紀錄區塊 顯示與否
            create_message_editor_open: false, //新增訊息區塊(專案公告的) 顯示與否
            //上傳下載
            fileList: [],
            csrfToken: $('meta[name="csrf-token"]').attr('content'),
            amid: '' //公告訊息的編號
        };
    },
    computed: {},
    methods: {
        init: function () {
            let self = this;
            // self.showLoadingBlock();

            self.project_cate = this.cate;

            if (this.userdata.ud_admin) {
                self.isadmin = true;
            } else if (this.type == 'pt' && this.userdata.auth.pt_admin) {
                self.isadmin = true;
            } else if (this.type == 'ai' && this.userdata.auth.ai_admin) {
                self.isadmin = true;
            } else if (this.type == 'bi' && this.userdata.auth.bi_admin) {
                self.isadmin = true;
            }

            //傳入的type所牽涉到的設定 'pt' 'pst' ...
            if (this.type == 'pt') {
                var json = {};
                json.type = this.type;
                json.id = this.id;
                axios.post('/getSingleProjectData', json).then(function (response) {
                    self.project = response.data.project;
                    self.project_id = response.data.project_id;
                    self.single_title = response.data.single_title;
                    self.single_title_sub = response.data.single_title_sub;
                    self.project_infors = response.data.project_infors;
                    self.project_records = response.data.project_records;
                    self.user_tags = response.data.user_tags;
                    self.project_cate = 1;
                    self.project_nav_open = 'information';
                    self.clickImgToOpenNewTab();
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.type == 'pst') {
                var json = {};
                json.type = this.type;
                json.id = this.id;
                axios.post('/getSingleProjectData', json).then(function (response) {
                    self.project = response.data.project;
                    self.project_id = response.data.project_id;
                    self.single_title = response.data.single_title;
                    self.single_title_sub = response.data.single_title_sub;
                    self.project_infors = response.data.project_infors;
                    self.project_records = response.data.project_records;
                    self.user_reminderdate = response.data.user_reminderdate;self.project_cate = 2;
                    self.project_nav_open = 'information';
                    self.clickImgToOpenNewTab();
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.type == 'ai') {
                var json = {};
                json.id = this.id;
                axios.post('/getSingleAnnouncementData', json).then(function (response) {
                    self.project_ann = response.data.project_ann;
                    self.project_ann_id = response.data.project_ann_id;
                    self.project_ann_messages = response.data.project_ann_messages;
                    self.user_reminderdate = response.data.user_reminderdate;
                    self.ann_message_id = '';
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.type == 'ud' && this.id) {
                var json = {};
                json.id = this.id;
                axios.post('/getSingleUserData', json).then(function (response) {
                    self.user_data = response.data.user_data;
                    self.user_id = response.data.user_id;
                    self.imageurl = response.data.imageurl;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.type == 'al' && this.id) {
                var json = {};
                json.id = this.id;
                axios.post('/getSingleAuthorityData', json).then(function (response) {
                    self.auth_level = response.data.auth_level;
                    self.auth_id = response.data.auth_id;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.type == 'bi' && this.id) {
                var json = {};
                json.id = this.id;
                axios.post('/getSingleBookData', json).then(function (response) {
                    self.book_data = response.data.book_data;
                    self.book_id = response.data.book_id;
                    self.imageurl = response.data.imageurl;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }

            if (this.cate == 1 || this.cate == 2) {
                var json = {};
                json.cate = this.cate;
                json.group = this.group;
                axios.post('/getSingleCateData', json).then(function (response) {
                    self.subprojectsort_cate = response.data.subprojectsort_cate;
                    self.executeitem_cate = response.data.executeitem_cate;
                    self.milestone_cate = response.data.milestone_cate;
                    self.requiresort_cate = response.data.requiresort_cate;
                    self.priority_cate = response.data.priority_cate;
                    self.status_cate = response.data.status_cate;
                    self.user_cate = response.data.user_cate;
                    self.pro_type = json.cate;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.cate == 4 || this.cate == 5) {
                var json = {};
                json.cate = this.cate;
                json.type = 'ALL';
                axios.post('/getSingleCateData', json).then(function (response) {
                    self.auths = response.data.auths;
                    self.group_cate = response.data.group_cate;
                    self.type_cate = response.data.type_cate;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.cate == 6) {
                var json = {};
                json.cate = this.cate;
                json.type = 'ALL';
                axios.post('/getSingleCateData', json).then(function (response) {
                    self.book_sort = response.data.book_sort;
                    self.book_status = response.data.book_status;
                    self.user_cate = response.data.user_cate;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        ////////////////////////檔案上傳下載功能/////////////////////////
        ///
        ///
        ///
        downloadProFile: function (id, name) {
            let self = this;
            let type = self.project.ug_id;
            axios({
                methods: 'GET',
                url: '/downloadprofile?pi_id=' + id + '&name=' + name + '&type=' + type,
                responseType: 'blob' }).then(function (response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', name); //or any other extension
                document.body.appendChild(link);
                link.click();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        downloadAnnFile: function (id, name) {
            let self = this;
            axios({
                methods: 'GET',
                url: '/downloadannfile?am_id=' + id + '&name=' + name,
                responseType: 'blob' }).then(function (response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', name); //or any other extension
                document.body.appendChild(link);
                link.click();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        submitProUpload: function (id) {
            let self = this;
            let new_data = [];
            if (!self.editing) {
                new_data = $('input[name=newPro]')[0].files;
            } else {
                new_data = $('input[name=upPro]')[0].files;
            }
            let form = new FormData();
            if (new_data.length > 0) {
                for (var i = 0; i < new_data.length; i++) {
                    form.append("file[" + i + "]", new_data[i]);
                }
            }
            form.append("type", self.project.ug_id);
            form.append("pi_id", id);
            form.append("nowdata", self.fileList.length > 0 ? JSON.stringify(self.fileList) : '');
            axios.post('/uploadprofile', form).then(function (response) {
                self.getProjectInfor();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        submitAnnUpload: function (id) {
            let self = this;
            let new_data = [];
            if (!self.editing) {
                new_data = $('input[name=newAnn]')[0].files;
            } else {
                new_data = $('input[name=upAnn]')[0].files;
            }
            let form = new FormData();
            if (new_data.length > 0) {
                for (var i = 0; i < new_data.length; i++) {
                    form.append("file[" + i + "]", new_data[i]);
                }
            }

            form.append("am_id", id);
            form.append("nowdata", self.fileList.length > 0 ? JSON.stringify(self.fileList) : '');
            axios.post('/uploadannfile', form).then(function (response) {
                self.getProjectAnnMessage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        handleError: function (err, file, fileList) {
            return true;
        },
        handleSuccess: function (response, file, fileList) {},
        handleChange: function (file, filelist) {
            let self = this;
            self.fileList = filelist;
        },
        handlePreview: function (file) {
            let self = this;
        },
        handleRemove: function (file, filelist) {
            let self = this;
            self.fileList = filelist;
        },
        ///
        ///
        ///
        ////////////////////////檔案上傳下載功能 end////////////////////////
        ////////////////////////拖拉功能////////////////////////
        ///
        ///
        ///
        //我們必須阻止某一DOM元素對dragover的默認行為，才能使drop事件在其上正確執行
        allowDrop: function (event) {
            event.preventDefault();
        },
        //拖拉對調順序
        dragToChangeProjectSort: function (style, pt_id, pst_id) {
            let self = this;
            if (style == 'start') {
                self.drag_pt_id = pt_id;
                self.drag_pst_id = pst_id;
            } else if (style == 'drop') {
                if (self.drag_pt_id == pt_id && self.drag_pst_id != pst_id) {
                    var sort = '';
                    var dragTargetIndex = '';
                    var dropTargetIndex = '';
                    var pss_id = '';
                    //先取得是哪個專案底下的子任務排序列表
                    for (var i = 0; i < self.subprojectsort_cate.length; i++) {
                        if (self.subprojectsort_cate[i].pt_id == pt_id) {
                            sort = JSON.parse(self.subprojectsort_cate[i].pss_sort);
                            pss_id = self.subprojectsort_cate[i].pss_id;
                        }
                    }
                    var newsort = [];
                    //抓取拖拉的目標以及要前往的目標的排序第幾順位
                    for (var i = 0; i < sort.length; i++) {
                        if (sort[i] == self.drag_pst_id) {
                            dragTargetIndex = i;
                        } else if (sort[i] == pst_id) {
                            dropTargetIndex = i;
                        }
                    }
                    //排出新的排序列表
                    for (var i = 0; i < sort.length; i++) {
                        //拖拉目標往後移動
                        if (dragTargetIndex < dropTargetIndex) {
                            if (sort[i] == self.drag_pst_id) {} else {
                                if (sort[i] == pst_id) {
                                    newsort.push(sort[i]);
                                    newsort.push(self.drag_pst_id);
                                } else {
                                    newsort.push(sort[i]);
                                }
                            }
                            //拖拉目標往前移動
                        } else if (dragTargetIndex > dropTargetIndex) {
                            if (sort[i] == self.drag_pst_id) {} else {
                                if (sort[i] == pst_id) {
                                    newsort.push(self.drag_pst_id);
                                    newsort.push(sort[i]);
                                } else {
                                    newsort.push(sort[i]);
                                }
                            }
                            //拖拉目標並沒有移動
                        } else {
                            newsort.push(sort[i]);
                        }
                    }
                    //儲存新的排序列表
                    var json = {};
                    json.pss_id = pss_id;
                    json.pss_sort = JSON.stringify(newsort);
                    axios.post('/project-sort-modify', json) //修改 - 子任務排序
                    .then(function (response) {
                        if (response.data.result) {
                            self.getSingleTitle(pt_id);
                            self.getSubProjectsSortCate();
                        } else {
                            self.notification(response.data.string, 'failure');
                        }
                    }).catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯', 'failure');
                    });
                }
            } else if (style == 'end') {
                self.drag_pt_id = '';
                self.drag_pst_id = '';
                self.drag_over_pst_id = '';
            }
        },
        ///
        ///
        ///
        ////////////////////////拖拉功能 end////////////////////////
        ////////////////////////取得所需資料////////////////////////
        ///
        ///
        ///
        //取得單一書籍狀態
        getBookStatusCate: function () {
            let self = this;
            axios.get('/bookstatuscate').then(function (response) {
                self.book_status = response.data;
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一書籍分類
        getBookSort: function () {
            let self = this;
            axios.get('/booksort').then(function (response) {
                self.book_sort = response.data;
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一書籍資料
        getBookData: function ($bi_id) {
            let self = this;
            axios.get('/book/' + $bi_id).then(function (response) {
                self.book_data = response.data;
                self.book_id = response.data.bi_id;
                self.imageurl = response.data.bi_fileurl;
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得全部權限等級資料
        getAuths: function () {
            let self = this;
            var json = {};
            json.order = '';
            json.sort = '';
            axios.post('/auths', json).then(function (response) {
                self.auths = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一權限等級資料
        getAuthorityLevel: function ($al_id) {
            let self = this;
            axios.get('/authority/' + $al_id).then(function (response) {
                self.auth_level = response.data;
                self.auth_id = response.data.al_id;
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一使用者資料
        getUserData: function ($ud_id) {
            let self = this;
            axios.get('/user/' + $ud_id).then(function (response) {
                self.user_data = response.data;
                self.user_id = response.data.ud_id;
                self.imageurl = response.data.ud_icon;
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一公告資料
        getProjectAnn: function ($ai_id) {
            let self = this;

            axios.get('/announcement/' + $ai_id).then(function (response) {
                self.project_ann = response.data;
                self.project_ann_id = response.data.ai_id;
                self.ann_message_id = '';
                //取得該專案公告的訊息
                self.getProjectAnnMessage();
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一專案公告的資訊
        getProjectAnnMessage: function () {
            let self = this;
            var json = {};
            if (self.project_ann.ai_id) {
                json.ai_id = self.project_ann.ai_id;
            }
            axios.post('/announcementmessages', json).then(function (response) {
                self.project_ann_messages = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一專案任務資料
        getProject: function ($pt_id) {
            let self = this;
            axios.get('/project/' + $pt_id).then(function (response) {
                self.project = response.data;
                self.project_id = response.data.pt_id;
                //改變顯示專案類別
                self.project_cate = 1;
                //取得該專案任務nav title
                self.getSingleTitle(response.data.pt_id);
                //取得該專案任務的專案訊息
                self.getProjectInfor();
                //取得該專案任務的專案紀錄
                self.getProjectRecord();
                self.resetSinglePage();
                self.project_nav_open = 'information';
                self.getUserTags(response.data.ug_id);
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一專案子任務資料
        getSubProject: function ($pst_id) {
            let self = this;
            axios.get('/subproject/' + $pst_id).then(function (response) {
                self.project = response.data;
                self.project_id = response.data.pst_id;
                //改變顯示專案類別
                self.project_cate = 2;
                //取得該專案任務nav title
                self.getSingleTitle(response.data.pt_id);
                //取得該專案任務的專案訊息
                self.getProjectInfor();
                //取得該專案任務的專案紀錄
                self.getProjectRecord();
                self.resetSinglePage();
                self.project_nav_open = 'information';
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得專案訊息
        getProjectInfor: function () {
            let self = this;
            var json = {};
            if (self.project.pt_id) {
                json.pt_id = self.project.pt_id;
            }
            if (self.project.pst_id) {
                json.pst_id = self.project.pst_id;
            }
            axios.post('/projectinfors', json).then(function (response) {
                self.project_infors = response.data;
                self.clickImgToOpenNewTab();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得專案紀錄
        getProjectRecord: function () {
            let self = this;
            var json = {};
            if (self.project.pt_id) {
                json.pt_id = self.project.pt_id;
            }
            if (self.project.pst_id) {
                json.pst_id = self.project.pst_id;
            }
            axios.post('/projectrecords', json).then(function (response) {
                self.project_records = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一專案任務頁面左側title
        getSingleTitle: function ($pt_id) {
            let self = this;
            axios.get('/singletitle/' + $pt_id).then(function (response) {
                self.single_title = response.data.project;
                self.single_title_sub = response.data.projectsub;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得群組資料
        getGroupCate: function () {
            let self = this;
            axios.get('/usergroups').then(function (response) {
                self.group_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得部門資料
        getDepartmentCate: function () {
            let self = this;
            axios.get('/usertype').then(function (response) {
                self.type_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得權限等級資料(all)
        // getAuthorityLevelCate:function(){
        //     let self = this;
        //     axios.get('/authoritylevelcate')
        //         .then(function (response) {
        //             self.authoritylevel_cate = response.data;
        //         })
        //         .catch(function (response) {
        //             console.log(response);
        //             self.notification('系統出錯','failure');
        //         });
        // },
        //取得子任務排序資料
        getSubProjectsSortCate: function () {
            let self = this;
            axios.get('/subprojectsortcate').then(function (response) {
                self.subprojectsort_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得執行項目資料
        getExecuteitemCate: function () {
            let self = this;
            axios.get('/executeitemcate').then(function (response) {
                self.executeitem_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得里程碑資料
        getMilestoneCate: function () {
            let self = this;
            axios.get('/milestonecate').then(function (response) {
                self.milestone_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得需求類別資料
        getRequiresortCate: function () {
            let self = this;
            axios.get('/requiresortcate').then(function (response) {
                self.requiresort_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得優先權資料
        getPriorityCate: function () {
            let self = this;
            axios.get('/prioritycate').then(function (response) {
                self.priority_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得狀態資料
        getStatusCate: function () {
            let self = this;
            axios.get('/statuscate').then(function (response) {
                self.status_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得所有使用者
        getAllUserCate: function () {
            let self = this;
            axios.get('/users').then(function (response) {
                self.user_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得各部門使用者
        getUserCate: function () {
            let self = this;
            axios.get('/usercate').then(function (response) {
                self.user_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得使用者自定義標籤
        getUserTags: function (id) {
            let self = this;
            var json = {};
            json.ug_id = id;
            json.ud_id = this.userdata.ud_id;
            axios.post('/usertags', json).then(function (response) {
                self.user_tags = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得使用者有設定提醒的專案資料
        getReminderDate: function (id) {
            let self = this;
            var json = {};
            json.ud_id = this.userdata.ud_id;
            json.ut_id = this.userdata.ut_id;
            if (this.type == 'ai') {
                json.ai_id = id;
            } else {
                json.pst_id = id;
            }
            axios.post('/userreminderdate', json).then(function (response) {
                self.user_reminderdate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //將所選的權限等級填入使用者資料裡
        selectAuth: function (auth) {
            let self = this;
            self.user_data.al_id = auth.al_id;
            self.user_data.al_name = auth.al_name;
            self.user_data.al_remark = auth.al_remark;
            self.user_data.pt_admin = auth.pt_admin;
            self.user_data.ai_admin = auth.ai_admin;
            self.user_data.pm_admin = auth.pm_admin;
            self.user_data.bi_admin = auth.bi_admin;
        },
        //新增自訂標籤的圖片
        getFile(file, fileList) {
            let self = this;
            const isLt2M = file.size / 1024 / 1024 < 1;
            var str = file.name;
            var res = str.split(".");
            var isImage = false;
            if (res.length > 0) {
                if (res[res.length - 1] == 'png' || res[res.length - 1] == 'jpg' || res[res.length - 1] == 'jpeg') {
                    isImage = true;
                }
            }
            if (!isLt2M) {
                self.notification('圖片大小不能超過1M', 'failure');
            } else if (!isImage) {
                self.notification('上傳圖示只能是JPG或PNG格式', 'failure');
            } else {
                this.getBase64(file.raw).then(res => {
                    if (this.type == 'bi') {
                        self.book_data.bi_fileurl = res;
                    } else if (this.type == 'ud') {
                        self.user_data.ud_icon = res;
                    }
                    self.imageurl = res;
                });
            }
        },
        //將圖片轉成base64
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function () {
                    imgResult = reader.result;
                };
                reader.onerror = function (error) {
                    reject(error);
                };
                reader.onloadend = function () {
                    resolve(imgResult);
                };
            });
        },
        //如果未達某位數就補0
        zeroPadding: function (num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        ///
        ///
        ///
        ////////////////////////取得所需資料 end////////////////////
        ////////////////////////打開或關閉某物件////////////////////
        ///
        ///
        ///
        //計算年資
        showSeniority: function (ud_code) {
            let self = this;
            var year = ud_code.substr(0, 4);
            var month = ud_code.substr(4, 2);
            var day = ud_code.substr(6, 2);
            var date = year + '-' + month + '-' + day;

            var now = new Date();
            var num = parseInt(Math.abs(Date.parse(now).valueOf() - Date.parse(date).valueOf()) / 1000 / 60 / 60 / 24 / 365);
            return num;
        },
        //顯示input
        showInput: function () {
            let self = this;
            $('.project_name input').removeClass('none');
            $('.project_name span').addClass('none');
            $('.project_name input').focus();
        },
        //顯示loading區塊
        showLoadingBlock: function () {
            let self = this;
            // self.sub_loading = true;
            setTimeout(function () {
                self.sub_loading = false;
            }, 1000);
        },
        //展開或關閉單一專案頁面其中一個紀錄
        viewMore: function (id) {
            let self = this;
            var target = '.item' + id;
            if ($(target).find('.record_content').hasClass('close')) {
                $(target).find('.record_content').removeClass('close');
            } else {
                $(target).find('.record_content').addClass('close');
            }
        },
        //展開或關閉單一公告頁面其中一個資訊
        openThisMessageItem: function (id) {
            let self = this;
            var target = '.item' + id;
            self.editing = false;
            if ($(target).find('.infor_content').hasClass('close')) {
                $(target).find('.infor_content').removeClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
            } else {
                $(target).find('.infor_content').addClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-down');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-up');
            }
        },
        //展開或關閉單一專案頁面其中一個資訊
        openThisInforItem: function (id) {
            let self = this;
            var target = '.infor' + id;
            self.editing = false;
            if ($(target).find('.infor_content').hasClass('close')) {
                $(target).find('.infor_content').removeClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
            } else {
                $(target).find('.infor_content').addClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-down');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-up');
            }
        },
        openThisMessageEditor: function (id, am_fileurl) {
            let self = this;
            var target = '.item' + id;
            self.editing = true;
            if (am_fileurl) {
                self.fileList = JSON.parse(am_fileurl);
            } else {
                self.fileList = [];
            }
            if (self.ann_message_id != '' && self.ann_message_id != id) {
                var ex_target = '.infor' + self.ann_message_id;
                $(ex_target).find('.infor_content').removeClass('close');
                $(ex_target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(ex_target).find('.infor_icon').addClass('fa-chevron-circle-down');
            }
            self.ann_message_id = id;
            $(target).find('.infor_content').addClass('close');
            $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
            $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
        },
        closeMessageEditor: function () {
            let self = this;
            self.editing = false;
            self.ann_message_id = '';
            $('.infor_content').removeClass('close');
        },
        openThisInforEditor: function (id, pi_fileurl) {
            let self = this;
            var target = '.infor' + id;
            self.editing = true;
            if (pi_fileurl) {
                self.fileList = JSON.parse(pi_fileurl);
            } else {
                self.fileList = [];
            }
            if (self.project_infor_id != '' && self.project_infor_id != id) {
                var ex_target = '.infor' + self.project_infor_id;
                $(ex_target).find('.infor_content').removeClass('close');
                $(ex_target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(ex_target).find('.infor_icon').addClass('fa-chevron-circle-down');
            }
            self.project_infor_id = id;
            $(target).find('.infor_content').addClass('close');
            $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
            $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
        },
        closeInforEditor: function () {
            let self = this;
            self.editing = false;
            self.project_infor_id = '';
            $('.infor_content').removeClass('close');
        },
        //點擊圖片開新視窗
        clickImgToOpenNewTab: function () {
            setTimeout(function () {
                $('.message img').unbind();
                $('.message img').on('click', function () {
                    var string = $(this).prop('src');
                    var iframe = "<iframe width='100%' height='100%' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes' src='" + string + "'></iframe>";
                    var x = window.open();
                    x.document.open();
                    x.document.write(iframe);
                    x.document.close();
                });
                $('.message a').prop('target', '_blank');
            }, 1000);
        },
        //判斷是否能打開
        checkToOpen: function (item, type, id) {
            let self = this;
            if (self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id) {
                return true;
            } else {
                return false;
            }
        },
        //打開列表頁的下拉選單
        openDropdownMenu: function (item, type, id, e) {
            let self = this;
            var classname = e.target.className;
            var string = 'dropdown_item';
            var boolean = false;
            if (classname.match(string)) {
                boolean = true;
            }
            if (boolean) {
                if (self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id) {
                    self.dropdown.item = '';
                    self.dropdown.type = '';
                    self.dropdown.id = '';
                } else {
                    self.dropdown.item = item;
                    self.dropdown.type = type;
                    self.dropdown.id = id;
                }
            }
        },
        //關閉月曆
        closeDateTimePicker: function (obj) {
            let self = this;
            if (obj) {
                self.dropdown.item = '';
                self.dropdown.type = '';
                self.dropdown.id = '';
            }
        },
        //關閉目前的單一頁面
        closeNowPage: function () {
            let self = this;
            self.$emit('get-close', true);
        },
        ///
        ///
        ///
        ////////////////////////打開或關閉某物件 end////////////////
        ///////////////////////////新增相關///////////////////////////
        ///
        ///
        ///
        //新增公告訊息
        createMessage: function () {
            let self = this;
            var json = {};
            //檢查各欄位是否確實填入
            if ($('input[name=am_title]').val() != '') {
                json.am_title = $('input[name=am_title]').val();
            } else {
                self.notification('公告標題尚未填入', 'failure');
                return false;
            }
            if ($('.vue-html5-editor .content').html() != '') {
                json.am_message = $('.vue-html5-editor .content').html();
            } else {
                self.notification('公告內容尚未填入', 'failure');
                return false;
            }

            json.ai_id = self.project_ann.ai_id;
            axios.post('/announcement-create/2', json) //新增 - 公告訊息
            .then(function (response) {
                if (response.data.result) {
                    self.submitAnnUpload(response.data.id);
                    self.create_message_editor_open = false;
                    self.clickImgToOpenNewTab();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統錯誤', 'failure');
            });
        },
        //新增專案子任務
        createSubProject: function (pt_id) {
            let self = this;
            var json = {};
            json.pt_id = pt_id;
            if ($('.create_subproject_input textarea[name=pst_name]').val() != '') {
                json.pst_name = $('.create_subproject_input textarea[name=pst_name]').val();
            } else {
                self.notification('請填入子任務名稱', 'failure');
                return false;
            }
            axios.post('/project-create/2', json) //新增 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    //設定單一專案任務id
                    self.project_id = response.data.id;
                    self.getSubProject(self.project_id);
                    $('textarea[name=pst_name]').val('');
                    self.sub_project_input_open = false;
                    //變更單一專案顯示類別為專案主任務
                    self.project_cate = 2;
                    self.getSubProjectsSortCate();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //新增專案訊息
        createInformation: function () {
            let self = this;
            var json = {};
            //檢查各欄位是否確實填入
            if ($('input[name=pi_title]').val() != '') {
                json.pi_title = $('input[name=pi_title]').val();
            } else {
                self.notification('訊息標題尚未填入', 'failure');
                return false;
            }
            if ($('.vue-html5-editor .content').html() != '') {
                json.pi_message = $('.vue-html5-editor .content').html();
            } else {
                self.notification('訊息內容尚未填入', 'failure');
                return false;
            }

            if (self.project_cate == 1) {
                json.pt_id = self.project.pt_id;
            } else if (self.project_cate == 2) {
                json.pt_id = self.project.pt_id;
                json.pst_id = self.project.pst_id;
            }
            axios.post('/project-create/3', json) //新增 - 專案訊息
            .then(function (response) {
                if (response.data.result) {
                    self.submitProUpload(response.data.id);
                    // self.project_infors = response.data.data;
                    self.create_infor_editor_open = false;
                    self.clickImgToOpenNewTab();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //新增專案紀錄
        createRecord: function () {
            let self = this;
            var json = {};
            //檢查各欄位是否確實填入
            if ($('.vue-html5-editor .content').html() != '') {
                json.pr_message = $('.vue-html5-editor .content').html();
            } else {
                self.notification('紀錄內容尚未填入', 'failure');
                return false;
            }

            if (self.project_cate == 1) {
                json.pt_id = self.project.pt_id;
            } else if (self.project_cate == 2) {
                json.pt_id = self.project.pt_id;
                json.pst_id = self.project.pst_id;
            }
            axios.post('/project-create/4', json) //新增 - 專案紀錄
            .then(function (response) {
                if (response.data.result) {
                    self.project_records = response.data.data;
                    self.create_record_editor_open = false;
                    self.clickImgToOpenNewTab();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        ///
        ///
        ///
        ////////////////////////新增相關 end///////////////////////
        ////////////////////////修改相關///////////////////////////
        ///
        ///
        ///
        //設定書籍所有人
        changeBookUser: function (ud_id, ud_name) {
            let self = this;
            self.book_data.ud_id = ud_id;
            self.book_data.ud_name = ud_name;
        },
        //設定進貨日期
        changePurchaseDate: function (obj) {
            let self = this;
            self.book_data.bi_purchasedate = obj.date;
        },
        //新增或修改書籍
        changeBook: function () {
            let self = this;
            var json = {};
            json = self.book_data;
            //檢查全部欄位是否填入
            if (!json.bi_name) {
                self.notification('請填入書籍名稱', 'failure');
                return false;
            } else if (!json.bs_id) {
                self.notification('請選擇分類', 'failure');
                return false;
            } else if (!json.bi_purchasedate) {
                self.notification('請選擇進貨日期', 'failure');
                return false;
            } else if (!json.ud_id) {
                self.notification('請設定所有人', 'failure');
                return false;
            } else if (!json.bsc_id) {
                self.notification('請設定狀態', 'failure');
                return false;
            } else if (!json.bi_fileurl) {
                self.notification('請上傳一張書籍圖片', 'failure');
                return false;
            }
            if (self.book_id) {
                json.bi_id = self.book_id;
                axios.post('/book-modify/4', json) //修改書籍
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else {
                axios.post('/book-create/4', json) //新增書籍
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //新增或修改使用者資料
        changeUserData: function () {
            let self = this;
            var json = {};
            json = self.user_data;
            //檢查帳號
            if (!self.user_id) {
                if (!json.ud_account) {
                    self.notification('請填入帳號', 'failure');
                    return false;
                } else if (/[^0-9A-Za-z]/g.test(json.ud_account)) {
                    self.notification('帳號只能是英文和數字的組合字串', 'failure');
                    return false;
                }
            }

            //檢查密碼
            if (self.user_id) {
                //修改
                if (json.ud_password && json.ud_password_confirm) {
                    if (json.ud_password != json.ud_password_confirm) {
                        self.notification('密碼與確認密碼不相符', 'failure');
                        return false;
                    }
                }
            } else {
                //新增
                if (!json.ud_password) {
                    self.notification('請填入密碼', 'failure');
                    return false;
                } else if (!json.ud_password_confirm) {
                    self.notification('請填入確認密碼', 'failure');
                    return false;
                } else if (json.ud_password != json.ud_password_confirm) {
                    self.notification('密碼與確認密碼不相符', 'failure');
                    return false;
                }
            }

            //檢查必填欄位
            if (!json.ud_name) {
                self.notification('請填入使用者名稱', 'failure');
                return false;
            } else if (!json.ut_id) {
                self.notification('請選擇部門', 'failure');
                return false;
            } else if (!json.ug_id) {
                self.notification('請選擇群組', 'failure');
                return false;
            }

            //檢查選填項目
            if (json.ud_code) {
                var reg = /^[\d]+$/;
                var boolean = reg.test(json.ud_code);
                if (!boolean) {
                    self.notification('員工代號只能輸入數字', 'failure');
                    return false;
                } else if (json.ud_code.length != 10) {
                    self.notification('員工代號只限10碼', 'failure');
                    return false;
                }
            }

            //檢查是否設定權限
            if (!json.al_id) {
                self.notification('請選擇權限等級', 'failure');
                return false;
            }

            if (self.user_id) {
                axios.post('/user-modify/1', json) //修改使用者資料
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                        if (!self.isadmin) {
                            var sub_json = {};
                            sub_json.url_message = json.ud_name + '修改了個人資料';
                            var f_year = self.zeroPadding(1900 + new Date().getYear(), 4);
                            var f_month = self.zeroPadding(1 + new Date().getMonth(), 2);
                            var f_day = self.zeroPadding(new Date().getDate(), 2);
                            sub_json.url_reminderdate = f_year + '-' + f_month + '-' + f_day;
                            axios.post('/reminderdate-modify', sub_json) //修改使用者資料
                            .then(function (response) {}).catch(function (response) {
                                console.log(response);
                                self.notification('系統出錯', 'failure');
                            });
                        }
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else {
                axios.post('/user-create/1', json) //新增使用者資料
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //新增或修改權限等級
        changeAuthorityLevel: function () {
            let self = this;
            var json = {};
            json = self.auth_level;
            //檢查全部欄位是否填入
            if (!json.al_name) {
                self.notification('請填入權限名稱', 'failure');
                return false;
            } else if (!json.pt_admin && json.pt_admin != 0) {
                self.notification('請設定專案權限', 'failure');
                return false;
            } else if (!json.ai_admin && json.ai_admin != 0) {
                self.notification('請設定公告權限', 'failure');
                return false;
            } else if (!json.pm_admin && json.pm_admin != 0) {
                self.notification('請設定資產權限', 'failure');
                return false;
            } else if (!json.bi_admin && json.bi_admin != 0) {
                self.notification('請設定書籍權限', 'failure');
                return false;
            }
            if (self.auth_id) {
                json.al_id = self.auth_id;
                axios.post('/auth-modify/7', json) //修改權限等級
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else {
                axios.post('/auth-create/7', json) //新增權限等級
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //停啟用使用者
        changeUserStatus: function ($ud_id, $ud_status) {
            let self = this;
            var json = {};
            json.ud_id = $ud_id;
            if ($ud_status == 1) {
                json.ud_status = 0;
            } else {
                json.ud_status = 1;
            }

            axios.post('/user-modify/1', json) //修改使用者資料
            .then(function (response) {
                if (response.data.result) {
                    self.notification(response.data.string, 'success');
                    self.getUserData($ud_id);
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改使用者暱稱
        changeUserName: function () {
            let self = this;
            var json = {};
            json.ud_id = self.user_id;
            //檢查各欄位是否確實填入
            if ($('input[name=ud_name]').val() != '') {
                json.ud_name = $('input[name=ud_name]').val();
            } else {
                self.notification('使用者暱稱不能為空', 'failure');
                return false;
            }

            axios.post('/user-modify/1', json) //修改 - 公告資訊
            .then(function (response) {
                if (response.data.result) {
                    self.getUserData(self.user_id);
                    self.notification(response.data.string, 'success');
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改公告置頂與否
        changeAnnTopping: function (id, boolean) {
            let self = this;
            var json = {};
            if (boolean) {
                //改為置頂
                json.ai_topping = 1;
                json.ai_id = id;
            } else {
                //取消置頂
                json.ai_topping = 0;
                json.ai_id = id;
            }
            if (self.isadmin) {
                axios.post('/announcement-modify/1', json) //修改 - 公告資訊
                .then(function (response) {
                    if (response.data.result) {
                        self.getProjectAnn(id);
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //修改公告標題
        changeAnnTitle: function () {
            let self = this;
            var json = {};
            json.ai_id = self.project_ann_id;
            //檢查各欄位是否確實填入
            if ($('input[name=ai_title]').val() != '') {
                json.ai_title = $('input[name=ai_title]').val();
            } else {
                self.notification('公告標題不能為空', 'failure');
                return false;
            }
            axios.post('/announcement-modify/1', json) //修改 - 公告資訊
            .then(function (response) {
                if (response.data.result) {
                    self.project_ann.ai_title = json.ai_title;
                    self.notification(response.data.string, 'success');
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改公告訊息
        changeMessage: function (id) {
            let self = this;
            var target = '.item' + id;
            var json = {};
            json.am_id = id;
            //檢查各欄位是否確實填入
            if ($(target).find('.am_title').val() != '') {
                json.am_title = $('input[name=am_title]').val();
            } else {
                self.notification('公告標題尚未填入', 'failure');
                return false;
            }
            if ($(target).find('.vue-html5-editor .content').html() != '') {
                json.am_message = $('.vue-html5-editor .content').html();
            } else {
                self.notification('公告內容尚未填入', 'failure');
                return false;
            }
            json.ai_id = self.project_ann.ai_id;
            axios.post('/announcement-modify/2', json) //修改 - 公告訊息
            .then(function (response) {
                if (response.data.result) {
                    self.submitAnnUpload(id);
                    self.editing = false;
                    var target = '.item' + self.ann_message_id;
                    $(target).find('.infor_content').removeClass('close');
                    $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                    $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
                    self.ann_message_id = '';
                    self.notification(response.data.string, 'success');
                    self.clickImgToOpenNewTab();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改到期日期 - 專案公告
        changeAnnExecutiondate: function (obj) {
            let self = this;
            var json = {};
            json.ai_id = obj.ai_id;
            json.ai_expirydate = obj.date;
            axios.post('/announcement-modify/1', json) //修改 - 公告資訊
            .then(function (response) {
                if (response.data.result) {
                    self.project_ann.ai_expirydate = json.ai_expirydate;
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改專案訊息
        changeInformation: function (id) {
            let self = this;
            var target = '.item' + id;
            var json = {};
            json.pi_id = id;
            //檢查各欄位是否確實填入
            if ($(target).find('.pi_title').val() != '') {
                json.pi_title = $('input[name=pi_title]').val();
            } else {
                self.notification('訊息標題尚未填入', 'failure');
                return false;
            }
            if ($(target).find('.vue-html5-editor .content').html() != '') {
                json.pi_message = $('.vue-html5-editor .content').html();
            } else {
                self.notification('訊息內容尚未填入', 'failure');
                return false;
            }
            if (self.project_cate == 1) {
                json.pt_id = self.project.pt_id;
            } else if (self.project_cate == 2) {
                json.pt_id = self.project.pt_id;
                json.pst_id = self.project.pst_id;
            }
            axios.post('/project-modify/3', json) //修改 - 專案訊息
            .then(function (response) {
                if (response.data.result) {
                    self.submitProUpload(id);
                    self.editing = false;
                    var target = '.infor' + self.project_infor_id;
                    $(target).find('.infor_content').removeClass('close');
                    $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                    $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
                    self.project_infor_id = '';
                    self.notification(response.data.string, 'success');
                    self.clickImgToOpenNewTab();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改標籤
        changeTag: function (id) {
            let self = this;
            var json = {};
            json.pt_id = self.project_id;
            json.tm_id = id;
            self.changeForProject('pt', self.project_id, json);
        },
        //修改執行時間
        changeSpendTime: function (pst_id) {
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            if ($('input[name=pst_spendtime]').val() != '') {
                json.pst_spendtime = $('input[name=pst_spendtime]').val();
            } else {
                self.notification('請填入執行時間', 'failure');
                return false;
            }
            self.changeForProject('pst', pst_id, json);
        },
        //修改執行項目
        changeExecuteItem: function (pst_id, peic_id) {
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            json.peic_id = peic_id;
            self.changeForProject('pst', pst_id, json);
        },
        //修改狀態
        changeStatus: function (pst_id, psc_id) {
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            json.psc_id = psc_id;
            self.changeForProject('pst', pst_id, json);
        },
        //修改執行人
        changeUser: function (pst_id, ud_id) {
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            json.ud_id = ud_id;
            self.changeForProject('pst', pst_id, json);
        },
        //修改專案主任務名稱或子任務名稱
        changeProjectName: function () {
            let self = this;
            var json = {};
            if (self.project_cate == 1) {
                json.pt_id = self.project_id;
                json.ug_id = self.project_ug_id;
                json.pt_name = $('.project_name input[name=pt_name]').val();
                self.changeForProject('pt', self.project_id, json);
            } else if (self.project_cate == 2) {
                json.pst_id = self.project_id;
                json.pt_id = self.project.pt_id;
                json.ug_id = self.project_ug_id;
                json.pst_name = $('.project_name input[name=pst_name]').val();
                self.changeForProject('pst', self.project_id, json);
            }
        },
        //修改里程碑
        changeMilestone: function ($pmc_id) {
            let self = this;
            var json = {};
            json.pt_id = self.project_id;
            json.pmc_id = $pmc_id;
            self.changeForProject('pt', self.project_id, json);
        },
        //修改優先權
        changePriority: function ($ppc_id) {
            let self = this;
            var json = {};
            if (self.project_cate == 1) {
                json.pt_id = self.project_id;
                json.ppc_id = $ppc_id;
                self.changeForProject('pt', self.project_id, json);
            } else if (self.project_cate == 2) {
                json.pst_id = self.project_id;
                json.ppc_id = $ppc_id;
                self.changeForProject('pst', self.project_id, json);
            }
        },
        //修改需求類別
        changeRequireSort: function ($prsc_id) {
            let self = this;
            var json = {};
            if (self.project_cate == 1) {
                json.pt_id = self.project_id;
                json.prsc_id = $prsc_id;
                self.changeForProject('pt', self.project_id, json);
            } else if (self.project_cate == 2) {
                json.pst_id = self.project_id;
                json.prsc_id = $prsc_id;
                self.changeForProject('pst', self.project_id, json);
            }
        },
        //修改需求日期
        changeRequireDate: function (obj) {
            let self = this;
            var json = {};
            if (self.project_cate == 1) {
                json.pt_id = obj.pt_id;
                json.pt_requiredate = obj.date;
                self.changeForProject('pt', obj.pt_id, json);
            } else if (self.project_cate == 2) {
                json.pst_id = obj.pst_id;
                json.pst_requiredate = obj.date;
                self.changeForProject('pst', obj.pst_id, json);
            }
        },
        //修改執行日期
        changeExecutiondate: function (obj) {
            let self = this;
            var json = {};
            json.pst_id = obj.pst_id;
            json.pst_executiondate = obj.date;
            self.changeForProject('pst', obj.pst_id, json);
        },
        //修改完成日期
        changeCompletiondate: function (obj) {
            let self = this;
            var json = {};
            json.pst_id = obj.pst_id;
            json.pst_completiondate = obj.date;
            self.changeForProject('pst', obj.pst_id, json);
        },
        //修改提醒時間
        changeReminderdate: function (obj) {
            let self = this;
            var json = {};
            json.ud_id = this.userdata.ud_id;
            json.url_id = obj.url_id;
            json.url_reminderdate = obj.date;
            if (this.type == 'ai') {
                json.ai_id = self.project_ann_id;
            } else {
                json.pst_id = self.project_id;
            }
            var now = new Date();
            if (Date.parse(obj.date).valueOf() < Date.parse(now).valueOf()) {
                self.notification('提醒時間不能早於現在', 'failure');
            } else {
                axios.post('/reminderdate-modify', json) //修改 - 提醒時間
                .then(function (response) {
                    if (response.data.result) {
                        if (json.pst_id) {
                            self.getReminderDate(self.project_id);
                        } else if (json.ai_id) {
                            self.getReminderDate(self.project_ann_id);
                        }
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                    self.closeAllDropdownMenu();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                    self.closeAllDropdownMenu();
                });
            }
        },
        //修改備份相關資訊
        changeBackupDate: function (id) {
            let self = this;
            var json = {};
            json.pt_id = id;
            if ($('input[name=pt_backupurl]').val() != '') {
                json.pt_backup = 1;
                json.pt_backupurl = $('input[name=pt_backupurl]').val();
            } else {
                self.notification('請填入備份路經方可備份', 'failure');
                return false;
            }
            self.changeForProject('pt', id, json);
        },
        //專案相關統一由這個送到後端
        changeForProject: function (type, id, json) {
            let self = this;
            if (type == 'pt') {
                axios.post('/project-modify/1', json) //修改 - 專案任務
                .then(function (response) {
                    self.closeAllDropdownMenu();
                    if (response.data.result) {
                        self.getProject(id);
                        $('.pro .project_name input').addClass('none');
                        $('.pro .project_name span').removeClass('none');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                    self.closeAllDropdownMenu();
                });
            } else if (type == 'pst') {
                axios.post('/project-modify/2', json) //修改 - 專案子任務
                .then(function (response) {
                    self.closeAllDropdownMenu();
                    if (response.data.result) {
                        self.getSubProject(id);
                        $('.pro .project_name input').addClass('none');
                        $('.pro .project_name span').removeClass('none');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                    self.closeAllDropdownMenu();
                });
            }
        },
        ///
        ///
        ///
        ////////////////////////修改相關 end///////////////////////
        ////////////////////////刪除相關///////////////////////////
        ///
        ///
        ///
        //刪除專案任務相關的資料
        deleteProject: function () {
            let self = this;
            self.show_submit_btn = false;
            setTimeout(function () {
                self.show_submit_btn = true;
            }, 1000);
            var json = {};
            if (self.pro_type !== '') {
                if (self.pro_type == 1) {
                    json.pt_id = self.delete_id;
                } else if (self.pro_type == 2) {
                    json.pst_id = self.delete_id;
                } else if (self.pro_type == 3) {
                    json.pi_id = self.delete_id;
                } else if (self.pro_type == 4) {
                    json.pr_id = self.delete_id;
                }
                axios.post('/project-delete/' + self.pro_type, json) //刪除 - 專案訊息
                .then(function (response) {
                    if (self.pro_type == 1) {
                        self.$emit('get-close', true);
                    } else if (self.pro_type == 2) {
                        self.getProject(self.project.pt_id);
                    } else if (self.pro_type == 3) {
                        self.getProjectInfor();
                    } else if (self.pro_type == 4) {
                        self.getProjectRecord();
                    }
                    if (response.data.result) {
                        self.closePrompt();
                        self.notification(response.data.string, 'success');
                    } else {
                        self.closePrompt();
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (self.ann_type !== '') {
                if (self.ann_type == 1) {
                    json.ai_id = self.delete_id;
                } else if (self.ann_type == 2) {
                    json.am_id = self.delete_id;
                } else if (self.ann_type == 4) {
                    json.bi_id = self.delete_id;
                }
                if (self.ann_type == 1 || self.ann_type == 2) {
                    axios.post('/announcement-delete/' + self.ann_type, json) //刪除 - 公告相關
                    .then(function (response) {
                        if (self.ann_type == 1) {
                            self.getProjectAnns();
                        } else if (self.ann_type == 2) {
                            self.getProjectAnnMessage();
                        }
                        if (response.data.result) {
                            self.closePrompt();
                            self.notification(response.data.string, 'success');
                        } else {
                            self.closePrompt();
                            self.notification(response.data.string, 'failure');
                        }
                    }).catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯', 'failure');
                    });
                } else {
                    axios.post('/book-delete/' + self.ann_type, json) //刪除 - 書籍
                    .then(function (response) {
                        if (response.data.result) {
                            self.closePrompt();
                            self.notification(response.data.string, 'success');
                            if (self.ann_type == 4) {
                                self.closeNowPage();
                            }
                        } else {
                            self.closePrompt();
                            self.notification(response.data.string, 'failure');
                        }
                    }).catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯', 'failure');
                    });
                }
            } else if (self.user_type !== '') {}
        },
        //移除秒數
        removeSecond: function (date) {
            let self = this;
            var d = new Date(date);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var day = d.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var hour = d.getHours();
            if (hour < 10) {
                hour = '0' + hour;
            }
            var minute = d.getMinutes();
            if (minute < 10) {
                minute = '0' + minute;
            }
            var datetime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
            return datetime;
        },
        ///
        ///
        ///
        ////////////////////////刪除相關 end///////////////////////
        ////////////////////////提示框/////////////////////////////
        ///
        ///
        ///
        //重置單一專案頁面所有設定
        resetSinglePage: function () {
            let self = this;
            self.create_infor_editor_open = false;
            self.create_record_editor_open = false;
            self.create_message_editor_open = false;
            self.editing = false;
            self.project_record_id = '';
            self.project_infor_id = '';
        },
        //關閉所有彈出的下拉選單
        closeAllDropdownMenu: function () {
            let self = this;
            self.dropdown.item = '';
            self.dropdown.type = '';
            self.dropdown.id = '';
        },
        colseInput: function (e) {
            let self = this;
            var classname = e.target.className;
            var array = ['pro_input', 'ann_input'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if (classname.match(array[i])) {
                    boolean = false;
                }
            }
            if (boolean) {
                $('.pro .project_name input').addClass('none');
                $('.pro .project_name span').removeClass('none');
                $('.ann .project_name input').addClass('none');
                $('.ann .project_name span').removeClass('none');
            }
        },
        colseIfClickOutside: function (e) {
            let self = this;
            var classname = e.target.className;
            var array = ['dropdown_item', 'dd_wrap'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if (classname.match(array[i])) {
                    boolean = false;
                }
            }
            if (boolean) {
                self.dropdown.item = '';
                self.dropdown.type = '';
                self.dropdown.id = '';
            }
        },
        ///
        ///
        ///
        ////////////////////////刪除相關 end///////////////////////
        ////////////////////////提示框/////////////////////////////
        ///
        ///
        ///
        //彈出提示框
        prompt: function (string, type, boolean) {
            //string：要提示的字串，type：提示框的類型，boolean：是否要重整頁面
            let self = this;
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_title').find('h2').text(string);
            if (type == 'question') {
                $('.prompt_icon').find('i').removeClass('fa-check');
                $('.prompt_icon').find('i').removeClass('fa-times');
                $('.prompt_icon').find('i').addClass('fa-question');
                $('.prompt_btn_group').find('.btn_cancel').show();
                $('.prompt_btn_group').find('.btn_submit').show();
                $('.prompt_btn_group').find('p').hide();
            } else if (type == 'success') {
                $('.prompt_icon').find('i').removeClass('fa-question');
                $('.prompt_icon').find('i').removeClass('fa-times');
                $('.prompt_icon').find('i').addClass('fa-check');
                $('.prompt_btn_group').find('.btn_cancel').hide();
                $('.prompt_btn_group').find('.btn_submit').hide();
                $('.prompt_btn_group').find('p').show();
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function () {
                    $('.prompt_btn_group span').text(n - 1);
                    setTimeout(function () {
                        $('.prompt_btn_group span').text(n - 2);
                        setTimeout(function () {
                            if (boolean) {
                                self.closePrompt();
                                // self.init(true);
                            } else {
                                self.closePrompt();
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            } else if (type == 'failure') {
                $('.prompt_icon').find('i').removeClass('fa-check');
                $('.prompt_icon').find('i').removeClass('fa-question');
                $('.prompt_icon').find('i').addClass('fa-times');
                $('.prompt_btn_group').find('.btn_cancel').hide();
                $('.prompt_btn_group').find('.btn_submit').hide();
                $('.prompt_btn_group').find('p').show();
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function () {
                    $('.prompt_btn_group span').text(n - 1);
                    setTimeout(function () {
                        $('.prompt_btn_group span').text(n - 2);
                        setTimeout(function () {
                            if (boolean) {
                                self.closePrompt();
                                // self.init(true);
                            } else {
                                self.closePrompt();
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
            self.prompt_box_open = true;
            $('html').addClass('over_hidden');
        },
        //關閉提示框
        closePrompt: function () {
            let self = this;
            self.prompt_box_open = false;
            $('html').removeClass('over_hidden');
        },
        //推撥提示框
        notification: function (string, type) {
            if (type == 'success') {
                var block = "<div class='remove_wrapper success'><i class='fa fa-check'></i><span>" + string + "</span></div>";
                $('.notification_wrap').append(block);
                $('.remove_wrapper').hover(function () {
                    $(this).remove();
                });
                setTimeout(function () {
                    $('.remove_wrapper').remove();
                }, 3000);
            } else if (type == 'failure') {
                var block = "<div class='remove_wrapper failure'><i class='fa fa-times'></i><span>" + string + "</span></div>";
                $('.notification_wrap').append(block);
                $('.remove_wrapper').hover(function () {
                    $(this).remove();
                });
                setTimeout(function () {
                    $('.remove_wrapper').remove();
                }, 3000);
            }
        },
        //開啟刪除專案的提示詢問窗
        openDeleteProjectPromptBox: function (id, type) {
            //1.專案主任務 2.專案子任務 3.專案訊息 4.專案紀錄 5.標籤
            let self = this;
            var string = '';
            if (type == 6) {
                self.ann_type = type;
                self.pro_type = '';
                self.delete_id = id;
            } else {
                self.ann_type = '';
                self.pro_type = type;
                self.delete_id = id;
            }
            if (type == 1) {
                string = '確定要刪除該專案任務？';
            } else if (type == 2) {
                string = '確定要刪除該專案子任務？';
            } else if (type == 3) {
                string = '確定要刪除該專案訊息？';
            } else if (type == 4) {
                string = '確定要刪除該專案紀錄？';
            }
            self.prompt(string, 'question', false);
        },
        //開啟刪除公告的提示詢問窗
        openDeleteAnnPromptBox: function (id, type) {
            //1.公告資訊 2.公告訊息 4.書籍
            let self = this;
            var string = '';
            self.pro_type = '';
            self.ann_type = type;
            self.delete_id = id;
            if (type == 1) {
                string = '確定要刪除該公告資訊？';
            } else if (type == 2) {
                string = '確定要刪除該公告訊息？';
            } else if (type == 4) {
                string = '確定要刪除該書籍？';
            }
            self.prompt(string, 'question', false);
        }
        ///
        ///
        ///
        ////////////////////////提示框 end/////////////////////////
    },
    watch: {},
    mounted: function () {
        this.init();
    }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Singlepage_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Singlepage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Singlepage_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Hoverwrap_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Hoverwrap_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Hoverwrap_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Reminderwrap_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Reminderwrap_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Reminderwrap_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Datetimepicker_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Datetimepicker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Datetimepicker_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        singlepage: __WEBPACK_IMPORTED_MODULE_0__components_Singlepage_vue___default.a,
        hoverwrap: __WEBPACK_IMPORTED_MODULE_1__components_Hoverwrap_vue___default.a,
        reminderwrap: __WEBPACK_IMPORTED_MODULE_2__components_Reminderwrap_vue___default.a,
        datetimepicker: __WEBPACK_IMPORTED_MODULE_3__components_Datetimepicker_vue___default.a
    },
    data() {
        return {
            url_show_block: 'index', //分頁根據
            loading: false, //加載框 顯示與否
            user_status: [], //使用者的基本資料
            user_auth: [], //使用者權限
            user_group: [], //使用者所屬群組
            user_cate: [], //所有使用者
            //單一頁面所需的值
            single: { 'userdata': '', 'type': '', 'id': '', 'cate': '', 'group': '' },
            //用於判斷要開啟哪個下拉選單
            dropdown: { 'item': '', 'type': '', 'id': '', 'position': '' },
            //hover專案會談出的小框所需要的資訊
            hoverwrap: { 'title': '', 'subtitle': '', 'date': '', 'position': { 'x': '', 'y': '' } },
            //查詢功能設定
            search_show: false, //搜尋框 顯示與否
            composing: true, //監聽搜尋框輸入
            search_condition: { //搜尋關鍵字
                book_content: '',
                ann_content: '',
                user_content: '',
                auth_content: '',
                property_content: '',
                pro_content: ''
            },
            prompt_box_open: false, //提示框 顯示與否
            show_submit_btn: true, //送出按鈕功能 顯示與否
            //下拉選單設定
            top_or_bottom: false, // true = top , false = bottom 下拉選單會在目標的上方還是下方
            //上傳圖片
            image_url: '', //上傳標籤的預覽圖
            delete_id: '', //要刪除的資料的編號
            ann_type: '',
            index: {
                //所有會用到的資料
                system_urls: [], //系統連結資料
                sub_projects_month: [], //當月子任務資料
                sub_projects_week: [], //當週子任務資料
                sub_projects_all: [], //全部子任務資料
                read_more: false, //顯示月曆與否
                firstday: '',
                lastday: '',
                //時鐘相關
                date: '', //日期
                time: '', //時間
                one_week: '',
                month_en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                week_cn: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
                //月曆相關
                now_page_year: '', //當頁年份
                now_page_month: '', //當頁月份
                today: { 'year': '', 'month': '', 'day': '' }, //當天年月日
                month_olympic: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //閏年每月天數
                month_normal: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //正常年每月天數
            },
            book: {
                //所有會用到的資料
                data_books: [], //書籍列表資料
                data_bookborrows: [], //書籍借閱資料
                data_booksorts: [], //書籍分類
                book_infor: { 'bs_id': '', 'bs_name': '', 'bi_id': '', 'bi_name': '' }, //現在所瀏覽的書籍的資訊
                cate_bookstatus: [], //書籍狀態
                create_book_data: {}, //新增借閱紀錄暫存資料區
                //所有顯示區塊判斷用值
                create_book_open: false //新增借閱區塊 顯示與否
            },
            announcement: {
                //所有會用到的資料
                sub_nav: 0, //ann:公告
                data_anns: [], //公告列表資料
                reminder_data: [], //使用者提醒列表
                //所有顯示區塊判斷用值
                create_ann_open: false, //新增公告區塊 顯示與否
                tabHover: -1 //顯示圖片為hover或是尚未hover
            },
            property: {
                //所有會用到的資料
                data_propertys: [], //資產列表資料
                create_property_data: {}, //新增資產暫存資料區
                //所有顯示區塊判斷用值
                create_property_open: false, //新增資產區塊 顯示與否
                //asset(資產)所有顯示的欄位
                property_field_show_or_not: {
                    'ud_name': true, //人員
                    'pm_host': true, //主機
                    'pm_screenone': true, //螢幕1
                    'pm_screentwo': true, //螢幕2
                    'pm_telephone': true, //話機
                    'pm_canvas': true, //繪圖板
                    'pm_other': true, //其他
                    'pm_adobe': true //adobe
                }
            },
            account: {
                users: [], //全部使用者資料
                auths: [], //全部權限等級資料
                //基本設定值
                sub_nav: 'account_management',
                //排序功能的參數
                user_order: 'ud_code',
                user_sort: 'DESC',
                auth_order: 'al_name',
                auth_sort: 'DESC'
            },
            project: {
                //右鍵功能相關設定
                menudata: {
                    boxStyle: "width:150px;background:#f55;", // 菜单box的样式   Menu box style
                    optionStyle: "border: 1px solid #EEEEEE;background:#EDF2F6;color:#4F5A6A;line-height:30px;font-size:12px;", // 菜单选项的样式 Style of menu options
                    menus: [//按下右鍵跳出的按鈕
                    {
                        content: "修改標籤",
                        callback: "modifyTagStyle"
                    }, {
                        content: "刪除標籤",
                        callback: "deleteTagStyle"
                    }, {
                        content: "新增人員",
                        callback: "openUserTagWrap"
                    }]
                },
                //list所有顯示的欄位
                list_field_show_or_not: {
                    'all': {
                        'pmc_name': true, //里程碑
                        'prsc_name': true, //需求類別
                        'peic_name': true, //執行項目
                        'pst_requiredate': true, //需求日期
                        'pst_executiondate': true, //執行日期
                        'pst_completiondate': true, //完成日期
                        'ud_name': true, //執行者
                        'psc_name': true, //狀態
                        'ppc_name': true, //優先權
                        'pst_spendtime': true, //執行時間
                        'pt_backup': true //備份
                    },
                    'wait': {
                        'pmc_name': true, //里程碑
                        'prsc_name': true, //需求類別
                        'peic_name': true, //執行項目
                        'pst_requiredate': true, //需求日期
                        'pst_executiondate': true, //執行日期
                        'pst_completiondate': true, //完成日期
                        'ud_name': true, //執行者
                        'psc_name': true, //狀態
                        'ppc_name': true, //優先權
                        'pst_spendtime': true, //執行時間
                        'pt_backup': true //備份
                    },
                    'finish': {
                        'pmc_name': true, //里程碑
                        'prsc_name': true, //需求類別
                        'peic_name': true, //執行項目
                        'pst_requiredate': true, //需求日期
                        'pst_executiondate': true, //執行日期
                        'pst_completiondate': true, //完成日期
                        'ud_name': true, //執行者
                        'psc_name': true, //狀態
                        'ppc_name': true, //優先權
                        'pst_spendtime': true, //執行時間
                        'pt_backup': true //備份
                    },
                    'else': {
                        'pmc_name': true, //里程碑
                        'prsc_name': true, //需求類別
                        'peic_name': true, //執行項目
                        'pst_requiredate': true, //需求日期
                        'pst_executiondate': true, //執行日期
                        'pst_completiondate': true, //完成日期
                        'ud_name': true, //執行者
                        'psc_name': true, //狀態
                        'ppc_name': true, //優先權
                        'pst_spendtime': true, //執行時間
                        'pt_backup': true //備份
                    }
                },
                //所有欄位全部的選項
                milestone_cate: [], //里程碑所有選項
                requiresort_cate: [], //需求分類所有選項
                priority_cate: [], //優先權所有選項
                status_cate: [], //狀態所有選項
                executeitem_cate: [], //執行項目選項
                subprojectsort_cate: [],
                //所有會用到的資料
                project_ug_id: '', //該專案任務頁面是哪個組別 1.介面A 2.介面B 3.平台/遊戲A 4.平台/遊戲B
                user_tags: [], //使用者的標籤資訊
                user_favorites: [], //使用者的最愛專案
                sub_nav: 'all', //wait:待排程,all:全部任務,finish:完成任務,所有數字都是使用者自定義的標籤編號
                project_status: '全部任務',
                projects: [], //專案任務複數
                sub_projects: [], //專案子任務複數
                user_tag_projects: [], //使用者自定義標籤所包含的專案
                project: [], //專案任務單數
                sub_project: [], //專案子任務單數
                //各種顯示區塊
                create_tag_open: false, //新增標籤頁面 顯示與否
                add_user_tag_open: false, //新增使用者到標籤區塊 顯示與否
                create_project_status: false, //新增專案任務區塊 顯示與否
                create_subproject_status: false, //新增專案子任務區塊 顯示與否
                create_project_ann_status: false, //新增專案任務公告區塊 顯示與否
                subprojects_show: true, //列表呈現子任務 顯示與否
                project_show: false, //列表所顯示的專案任務狀態區塊 顯示與否
                project_nav_open: 'information', //單一專案任務頁面-nav區塊 顯示與否
                prompt_box_open: false, //提示框 顯示與否
                sub_project_input_open: false, //新增子任務區塊 顯示與否
                show_submit_btn: true, //送出按鈕功能 顯示與否
                search_show: false, //搜尋框 顯示與否
                //判別用的設定
                open_list_item: '', //列表頁 下拉選單所屬的欄位
                open_list_id: '', //列表頁 所打開的下拉選單為哪個id
                open_project_id: '', //列表頁 所打開的添加子任務輸入框為哪個id
                //拖拉功能設定
                drag_data: {},
                drag_pt_id: '',
                drag_pst_id: '',
                drag_over_pst_id: '',
                //標籤新增修改相關設定
                tag_type: '',
                tag_data: {},
                tag_user_data: [], //該標籤的所有成員資料
                tag_search_udname: '',
                tag_owner_id: '' //該標籤的擁有者的使用者編號
            }
        };
    },
    created: function () {
        let self = this;
        //擷取路徑抓取到ug_id
        let url = new URL(location.href);
        var array = url.hash.split("#/");
        if (array[1] != '') {
            self.url_show_block = array[1];
            if (!isNaN(self.url_show_block)) {
                self.project.project_ug_id = self.url_show_block;
            }
        } else {
            this.$router.replace('/index');
        }

        //設定時鐘
        var timerID = setInterval(self.updateTime(), 1000);

        //設定周曆
        self.index.one_week = self.getDaysOfWeek();

        //抓取一周的頭跟尾日期
        var cd = new Date();
        var timesStamp = cd.getTime();
        var currenDay = cd.getDay();
        var f_year = 1900 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 7) % 7)).getYear();
        var f_month = 1 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 7) % 7)).getMonth();
        var f_day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 7) % 7)).getDate();

        self.index.firstday = f_year + '-' + f_month + '-' + f_day;

        var l_year = 1900 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (6 - (currenDay + 7) % 7)).getYear();
        var l_month = 1 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (6 - (currenDay + 7) % 7)).getMonth();
        var l_day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (6 - (currenDay + 7) % 7)).getDate();

        self.index.lastday = l_year + '-' + l_month + '-' + l_day;
    },
    mounted: function () {
        this.init();
    },
    computed: {
        data_for_month: function () {
            let self = this;
            var array_a = [];
            var result_arr = [];
            var totalDay = self.daysMonth(self.index.now_page_month, self.index.now_page_year); //獲取該月總天數
            var firstDay = self.dayStart(self.index.now_page_month, self.index.now_page_year); //获取该月第一天是星期几
            for (var i = 0; i < firstDay; i++) {
                var json = {};
                json.week = i % 7; //禮拜幾
                json.day = '';
                json.month = '';
                json.year = '';
                array_a.push(json);
                result_arr.push(json);
            }
            for (var i = 0; i < totalDay; i++) {
                var json = {};
                var array_b = [];
                var cd = new Date(self.index.now_page_year, self.index.now_page_month, i + 1);
                json.week = cd.getDay();
                json.day = cd.getDate();
                json.month = self.index.now_page_month;
                json.year = self.index.now_page_year;
                for (var j = 0; j < self.index.sub_projects_month.length; j++) {
                    var nd = new Date(self.index.sub_projects_month[j].pst_completiondate);
                    if (cd.getDay() == nd.getDay() && cd.getDate() == nd.getDate() && self.index.now_page_month == nd.getMonth() && self.index.now_page_year == nd.getFullYear()) {
                        array_b.push(self.index.sub_projects_month[j]);
                    }
                }
                if (array_b.length > 0) {
                    json.sub_projects_month = array_b;
                }
                array_a.push(json);
                result_arr.push(json);
            }
            var num = Math.ceil(array_a.length / 7);
            for (var i = 0; i < num * 7 - array_a.length; i++) {
                var json = {};
                json.week = (array_a.length + i) % 7; //禮拜幾
                json.day = '';
                json.month = '';
                json.year = '';
                result_arr.push(json);
            }
            return result_arr;
        },
        data_for_week: function () {
            let self = this;
            var result_arr = [];
            var currentDate = new Date();
            var timesStamp = currentDate.getTime();
            var currenDay = currentDate.getDay();
            for (var i = 0; i < 7; i++) {
                var f_year = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getYear();
                var f_month = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getMonth();
                var f_day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getDate();
                var array_a = [];
                for (var j = 0; j < self.index.sub_projects_week.length; j++) {
                    var dd = new Date(self.index.sub_projects_week[j].pst_completiondate);
                    if (dd.getYear() == f_year && dd.getMonth() == f_month && dd.getDate() == f_day) {
                        array_a.push(self.index.sub_projects_week[j]);
                    }
                }
                result_arr.push(array_a);
            }
            return result_arr;
        },
        new_data: function () {
            let self = this;
            if (self.url_show_block == 'book-list') {
                var array_a = [];
                var array_b = [];
                if (!Array.isArray(self.book.data_bookborrows)) {
                    array_a.push(self.book.data_bookborrows);
                } else {
                    array_a = self.book.data_bookborrows;
                }
                if (self.search_condition.book_content != '') {
                    for (var j = 0; j < array_a.length; j++) {
                        var ss = array_a[j].ud_name;
                        var tt = new RegExp(self.search_condition.book_content, "i");
                        if (ss.match(tt)) {
                            array_b.push(array_a[j]);
                        }
                    }
                    return array_b;
                } else {
                    return array_a;
                }
            } else if (self.url_show_block == 'announcement-list') {
                var array_a = [];
                var array_b = [];
                var array_c = [];
                var array_d = [];
                var array_e = [];
                for (var i = 0; i < self.announcement.data_anns.length; i++) {
                    if (self.announcement.sub_nav == 0) {
                        if (self.announcement.data_anns[i].ai_cate == 2) {
                            array_e.push(self.announcement.data_anns[i]);
                        }
                    } else {
                        if (self.announcement.data_anns[i].ai_cate == 1 && self.announcement.data_anns[i].ug_id == self.announcement.sub_nav) {
                            array_e.push(self.announcement.data_anns[i]);
                        }
                    }
                }
                for (var i = 0; i < array_e.length; i++) {
                    if (array_e[i].ai_topping == 1) {
                        array_a.push(array_e[i]);
                    } else {
                        array_b.push(array_e[i]);
                    }
                }
                array_c = array_a.concat(array_b);
                if (self.search_condition.ann_content != '') {
                    for (var j = 0; j < array_c.length; j++) {
                        var ss = array_c[j].ai_title;
                        var tt = new RegExp(self.search_condition.ann_content, "i");
                        if (ss.match(tt)) {
                            array_d.push(array_c[j]);
                        }
                    }
                    for (var k = 0; k < array_d.length; k++) {
                        var boolean = true;
                        for (var l = 0; l < self.announcement.reminder_data.length; l++) {
                            if (array_d[k].ai_id == self.announcement.reminder_data[l].ai_id) {
                                array_d[k].url_reminderdate = self.announcement.reminder_data[l].url_reminderdate;
                                boolean = false;
                            }
                        }
                        if (boolean) {
                            array_c[k].url_reminderdate = null;
                        }
                    }
                    return array_d;
                } else {
                    for (var k = 0; k < array_c.length; k++) {
                        var boolean = true;
                        for (var l = 0; l < self.announcement.reminder_data.length; l++) {
                            if (array_c[k].ai_id == self.announcement.reminder_data[l].ai_id) {
                                array_c[k].url_reminderdate = self.announcement.reminder_data[l].url_reminderdate;
                                boolean = false;
                            }
                        }
                        if (boolean) {
                            array_c[k].url_reminderdate = null;
                        }
                    }
                    return array_c;
                }
            } else if (self.url_show_block == 'property-list') {
                let self = this;
                var array_a = [];
                var array_b = [];
                array_a = self.property.data_propertys;
                if (self.search_condition.property_content != '') {
                    for (var j = 0; j < array_a.length; j++) {
                        var ss = array_a[j].ud_name;
                        var tt = new RegExp(self.search_condition.property_content, "i");
                        if (ss.match(tt)) {
                            array_b.push(array_a[j]);
                        }
                    }
                    return array_b;
                } else {
                    return array_a;
                }
            }
        },
        books: function () {
            let self = this;
            var array_a = [];
            var array_b = [];
            for (var i = 0; i < self.book.data_books.length; i++) {
                if (self.book.book_infor.bs_id == self.book.data_books[i].bs_id) {
                    array_a.push(self.book.data_books[i]);
                }
            }
            return array_a;
        },
        new_users: function () {
            let self = this;
            var array_a = [];
            var array_b = [];
            array_a = self.account.users;
            if (self.search_condition.user_content != '') {
                for (var j = 0; j < array_a.length; j++) {
                    var ss = array_a[j].ud_name;
                    var tt = array_a[j].ud_account;
                    var uu = new RegExp(self.search_condition.user_content, "i");
                    if (ss.match(uu) || tt.match(uu)) {
                        array_b.push(array_a[j]);
                    }
                }
                return array_b;
            } else {
                return array_a;
            }
        },
        new_auths: function () {
            let self = this;
            var array_a = [];
            var array_b = [];
            array_a = self.account.auths;
            if (self.search_condition.auth_content != '') {
                for (var j = 0; j < array_a.length; j++) {
                    var ss = array_a[j].al_name;
                    var tt = array_a[j].al_remark;
                    var uu = new RegExp(self.search_condition.auth_content, "i");
                    if (ss) {
                        if (ss.match(uu)) {
                            array_b.push(array_a[j]);
                        }
                    } else if (tt) {
                        if (tt.match(uu)) {
                            array_b.push(array_a[j]);
                        }
                    }
                }
                return array_b;
            } else {
                return array_a;
            }
        },
        projects_for_group: function () {
            let self = this;
            var array_a = self.project.projects;
            var array_b = [];
            if (array_a.length > 0) {
                for (var i = 0; i < array_a.length; i++) {
                    if (array_a[i].ug_id == self.url_show_block) {
                        array_b.push(array_a[i]);
                    }
                }
            }
            return array_b;
        },
        new_projects: function () {
            let self = this;
            if (self.project.sub_nav == 'all') {
                if (self.project.project_status == '全部任務') {
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show) {
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if (tt && self.projects_for_group[i].is_show) {
                            array_b.push(self.projects_for_group[i]);
                        }
                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        if (array_d.length > 0) {
                            array_c[i].sub_projects = array_d;
                            array_e.push(array_c[i]);
                        } else {
                            if (self.user_status.ud_admin || self.user_auth.pt_admin) {
                                array_c[i].sub_projects = array_d;
                                array_e.push(array_c[i]);
                            }
                        }
                    }
                    if (self.search_condition.pro_content != '') {
                        for (var j = 0; j < array_e.length; j++) {
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if (ss.match(tt)) {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                } else {
                                    array_f.push(array_e[j]);
                                }
                            } else {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    var boolean = false;
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if (boolean) {
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    } else {
                        return array_e;
                    }
                } else if (self.project.project_status == '最愛') {
                    var array_a = [];
                    var array_f = [];
                    var array_e = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show) {
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                    }
                    for (var i = 0; i < array_a.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if (self.project.sub_projects[j].pt_id == array_a[i].pt_id) {
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        if (array_d.length > 0) {
                            array_a[i].sub_projects = array_d;
                            array_e.push(array_a[i]);
                        } else {
                            if (self.user_status.ud_admin || self.user_auth.pt_admin) {
                                array_e.push(array_a[i]);
                            }
                        }
                    }
                    if (self.search_condition.pro_content != '') {
                        for (var j = 0; j < array_e.length; j++) {
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if (ss.match(tt)) {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                } else {
                                    array_f.push(array_e[j]);
                                }
                            } else {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    var boolean = false;
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if (boolean) {
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    } else {
                        return array_e;
                    }
                } else if (self.project.project_status == '待排程') {
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show) {
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if (tt && self.projects_for_group[i].is_show) {
                            array_b.push(self.projects_for_group[i]);
                        }
                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                    }

                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        var tt = false;
                        for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                            if (array_c[i].sub_projects[j].psc_id == 2) {
                                tt = true;
                                array_d.push(array_c[i].sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                        if (tt) {
                            array_e.push(array_c[i]);
                        }
                    }
                    if (self.search_condition.pro_content != '') {
                        for (var j = 0; j < array_e.length; j++) {
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if (ss.match(tt)) {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                } else {
                                    array_f.push(array_e[j]);
                                }
                            } else {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    var boolean = false;
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if (boolean) {
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    } else {
                        return array_e;
                    }
                } else if (self.project.project_status == '待確認') {
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show) {
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if (tt && self.projects_for_group[i].is_show) {
                            array_b.push(self.projects_for_group[i]);
                        }
                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                    }

                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        var tt = false;
                        for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                            if (array_c[i].sub_projects[j].psc_id == 3) {
                                tt = true;
                                array_d.push(array_c[i].sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                        if (tt) {
                            array_e.push(array_c[i]);
                        }
                    }
                    if (self.search_condition.pro_content != '') {
                        for (var j = 0; j < array_e.length; j++) {
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if (ss.match(tt)) {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                } else {
                                    array_f.push(array_e[j]);
                                }
                            } else {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    var boolean = false;
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if (boolean) {
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    } else {
                        return array_e;
                    }
                } else if (self.projectf.project_status == '進行中') {
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show) {
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if (tt && self.projects_for_group[i].is_show) {
                            array_b.push(self.projects_for_group[i]);
                        }
                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                    }

                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        var tt = false;
                        for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                            if (array_c[i].sub_projects[j].psc_id == 4) {
                                tt = true;
                                array_d.push(array_c[i].sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                        if (tt) {
                            array_e.push(array_c[i]);
                        }
                    }
                    if (self.search_condition.pro_content != '') {
                        for (var j = 0; j < array_e.length; j++) {
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if (ss.match(tt)) {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        if (xx.match(self.search_condition.pro_content)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                } else {
                                    array_f.push(array_e[j]);
                                }
                            } else {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    var boolean = false;
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if (boolean) {
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    } else {
                        return array_e;
                    }
                }
            } else if (self.project.sub_nav == 'wait') {
                var array_a = [];
                var array_b = [];
                var array_c = [];
                var array_e = [];
                var array_f = [];
                for (var i = 0; i < self.projects_for_group.length; i++) {
                    var tt = true;
                    var array_c = [];
                    for (var j = 0; j < self.project.user_favorites.length; j++) {
                        if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show == 0) {
                            array_a.push(self.projects_for_group[i]);
                            tt = false;
                        }
                    }
                    if (tt && self.projects_for_group[i].is_show == 0) {
                        array_b.push(self.projects_for_group[i]);
                    }
                }
                array_c = array_a.concat(array_b);
                for (var i = 0; i < array_c.length; i++) {
                    var array_d = [];
                    for (var j = 0; j < self.project.sub_projects.length; j++) {
                        if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                            array_d.push(self.project.sub_projects[j]);
                        }
                    }
                    array_c[i].sub_projects = array_d;
                }

                if (self.search_condition.pro_content != '') {
                    for (var j = 0; j < array_c.length; j++) {
                        var ss = array_c[j].pt_name;
                        var tt = new RegExp(self.search_condition.pro_content, "i");
                        if (ss.match(tt)) {
                            if (array_c[j].sub_projects.length > 0) {
                                var vv = [];
                                for (var k = 0; k < array_c[j].sub_projects.length; k++) {
                                    var xx = array_c[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(array_c[j].sub_projects[k]);
                                    }
                                }
                                array_c[j].sub_projects = vv;
                                array_f.push(array_c[j]);
                            } else {
                                array_f.push(array_c[j]);
                            }
                        } else {
                            if (array_c[j].sub_projects.length > 0) {
                                var vv = [];
                                var boolean = false;
                                for (var k = 0; k < array_c[j].sub_projects.length; k++) {
                                    var xx = array_c[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(array_c[j].sub_projects[k]);
                                        boolean = true;
                                    }
                                }
                                if (boolean) {
                                    array_c[j].sub_projects = vv;
                                    array_f.push(array_c[j]);
                                }
                            }
                        }
                    }
                    return array_f;
                } else {
                    return array_c;
                }
            } else if (self.project.sub_nav == 'finish') {
                var array_a = [];
                var array_b = [];
                var array_c = [];
                var array_e = [];
                var array_f = [];
                for (var i = 0; i < self.projects_for_group.length; i++) {
                    var tt = true;
                    var array_c = [];
                    for (var j = 0; j < self.project.user_favorites.length; j++) {
                        if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id) {
                            array_a.push(self.projects_for_group[i]);
                            tt = false;
                        }
                    }
                    if (tt) {
                        array_b.push(self.projects_for_group[i]);
                    }
                }
                array_c = array_a.concat(array_b);
                for (var i = 0; i < array_c.length; i++) {
                    var array_d = [];
                    for (var j = 0; j < self.project.sub_projects.length; j++) {
                        if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                            array_d.push(self.project.sub_projects[j]);
                        }
                    }
                    array_c[i].sub_projects = array_d;
                }

                for (var i = 0; i < array_c.length; i++) {
                    var array_d = [];
                    var tt = false;
                    for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                        if (array_c[i].sub_projects[j].psc_id == 6 || array_c[i].sub_projects[j].psc_id == 7 || array_c[i].sub_projects[j].psc_id == 8 || array_c[i].sub_projects[j].psc_id == 9) {
                            tt = true;
                            array_d.push(array_c[i].sub_projects[j]);
                        }
                    }
                    array_c[i].sub_projects = array_d;
                    if (tt) {
                        array_e.push(array_c[i]);
                    }
                }
                if (self.search_condition.pro_content != '') {
                    for (var j = 0; j < array_e.length; j++) {
                        var ss = array_e[j].pt_name;
                        var tt = new RegExp(self.search_condition.pro_content, "i");
                        if (ss.match(tt)) {
                            if (array_e[j].sub_projects.length > 0) {
                                var vv = [];
                                for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                    var xx = array_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(array_e[j].sub_projects[k]);
                                    }
                                }
                                array_e[j].sub_projects = vv;
                                array_f.push(array_e[j]);
                            } else {
                                array_f.push(array_e[j]);
                            }
                        } else {
                            if (array_e[j].sub_projects.length > 0) {
                                var vv = [];
                                var boolean = false;
                                for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                    var xx = array_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(array_e[j].sub_projects[k]);
                                        boolean = true;
                                    }
                                }
                                if (boolean) {
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                }
                            }
                        }
                    }
                    return array_f;
                } else {
                    return array_e;
                }
            } else if (self.project.sub_nav != 'department_ann') {
                var toto_a = [];
                var toto_b = [];
                var toto_c = [];
                var toto_e = [];
                var toto_f = [];
                for (var i = 0; i < self.projects_for_group.length; i++) {
                    var tt = true;
                    for (var j = 0; j < self.project.user_favorites.length; j++) {
                        if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id) {
                            toto_a.push(self.projects_for_group[i]);
                            tt = false;
                        }
                    }
                    if (tt) {
                        toto_b.push(self.projects_for_group[i]);
                    }
                }
                toto_c = toto_a.concat(toto_b);
                for (var i = 0; i < toto_c.length; i++) {
                    var gg = [];
                    for (var j = 0; j < self.project.sub_projects.length; j++) {
                        if (toto_c[i].pt_id == self.project.sub_projects[j].pt_id) {
                            gg.push(self.project.sub_projects[j]);
                        }
                    }
                    toto_c[i].sub_projects = gg;
                }
                for (var i = 0; i < toto_c.length; i++) {
                    if (toto_c[i].tm_id == self.project.sub_nav) {
                        toto_e.push(toto_c[i]);
                    }
                }
                if (self.search_condition.pro_content != '') {
                    for (var j = 0; j < toto_e.length; j++) {
                        var ss = toto_e[j].pt_name;
                        var tt = new RegExp(self.search_condition.pro_content, "i");
                        if (ss.match(tt)) {
                            if (toto_e[j].sub_projects.length > 0) {
                                var vv = [];
                                for (var k = 0; k < toto_e[j].sub_projects.length; k++) {
                                    var xx = toto_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(toto_e[j].sub_projects[k]);
                                    }
                                }
                                toto_e[j].sub_projects = vv;
                                toto_f.push(toto_e[j]);
                            } else {
                                toto_f.push(toto_e[j]);
                            }
                        } else {
                            if (toto_e[j].sub_projects.length > 0) {
                                var vv = [];
                                var boolean = false;
                                for (var k = 0; k < toto_e[j].sub_projects.length; k++) {
                                    var xx = toto_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(toto_e[j].sub_projects[k]);
                                        boolean = true;
                                    }
                                }
                                if (boolean) {
                                    toto_e[j].sub_projects = vv;
                                    toto_f.push(toto_e[j]);
                                }
                            }
                        }
                    }
                    return toto_f;
                } else {
                    return toto_e;
                }
            }
        },
        usercate_for_group: function () {
            let self = this;
            var array_a = self.user_cate;
            var array_b = [];
            for (var i = 0; i < array_a.length; i++) {
                if (array_a[i].ug_id == self.url_show_block) {
                    array_b.push(array_a[i]);
                }
            }
            return array_b;
        },
        search_user_data: function () {
            let self = this;
            var array_a = [];
            var array_b = [];
            var array_c = [];
            if (self.project.tag_search_udname) {
                for (var i = 0; i < self.usercate_for_group.length; i++) {
                    var name = self.usercate_for_group[i].ud_name;
                    var boolean = true;
                    for (var j = 0; j < self.project.tag_user_data.length; j++) {
                        if (self.project.tag_user_data[j].ud_id == self.usercate_for_group[i].ud_id) {
                            boolean = false;
                        }
                    }
                    var string = new RegExp(self.project.tag_search_udname, "i");
                    if (boolean && name.match(string)) {
                        array_a.push(self.usercate_for_group[i]);
                    }
                }
                return array_a;
            } else {
                return array_b;
            }
        }
    },
    methods: {
        init: function () {
            let self = this;
            //取得初始化所有的資料
            var json_index = {};
            json_index.firstday = self.index.firstday;
            json_index.lastday = self.index.lastday;
            axios.post('/getAllIndexData', json_index).then(function (response) {
                self.user_group = response.data.user_group;
                self.user_status = response.data.user_status;
                self.user_auth = response.data.user_status.auth;
                self.index.system_urls = response.data.system_urls;
                self.index.sub_projects_week = response.data.sub_projects_week;
                self.index.sub_projects_all = response.data.sub_projects_all;
            }).catch(function (response) {
                console.log(response);
                self.notification(response, 'failure');
            });
            var json_book = {};
            axios.post('/getAllBookData', json_book).then(function (response) {
                self.book.data_books = response.data.data_books;
                self.book.book_infor = response.data.data_books[0];
                self.book.data_bookborrows = response.data.data_bookborrows;
                self.book.data_booksorts = response.data.data_booksorts;
                self.book.cate_bookstatus = response.data.cate_bookstatus;
                self.user_cate = response.data.user_cate;
            }).catch(function (response) {
                console.log(response);
                self.notification(response, 'failure');
            });
            var json_announcement = {};
            axios.post('/getAllAnnouncementData', json_announcement).then(function (response) {
                self.announcement.reminder_data = response.data.reminder_data;
                self.announcement.data_anns = response.data.data_anns;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
            var json_account = {};
            json_account.auth_order = self.account.auth_order;
            json_account.auth_sort = self.account.auth_sort;
            json_account.user_order = self.account.user_order;
            json_account.user_sort = self.account.user_sort;
            axios.post('/getAllAccountData', json_account).then(function (response) {
                self.account.auths = response.data.auths;
                self.account.users = response.data.users;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
            var json_property = {};
            axios.post('/getAllPropertyData', json_property).then(function (response) {
                self.property.data_propertys = response.data.data_propertys;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
            var json_project = {};
            axios.post('/getAllProjectData', json_project).then(function (response) {
                self.project.user_tags = response.data.user_tags;
                self.project.user_favorites = response.data.user_favorites;
                self.project.projects = response.data.projects;
                if (!self.user_status.ud_admin && !self.user_auth.pt_admin && self.project.sub_projects.length == 0) {
                    var string = '';
                    for (var i = 0; i < response.data.sub_projects.length; i++) {
                        if (string != response.data.sub_projects[i].pt_id) {
                            string = response.data.sub_projects[i].pt_id;
                            var json = {};
                            json.pt_id = string;
                            axios.post('/getsubprojectsofproject', json).then(function (response) {
                                self.project.sub_projects = self.project.sub_projects.concat(response.data);
                            }).catch(function (response) {
                                self.notification('系統出錯', 'failure');
                            });
                        }
                    }
                } else if (self.user_status.ud_admin || self.user_auth.pt_admin) {
                    self.project.sub_projects = response.data.sub_projects;
                }
                self.project.subprojectsort_cate = response.data.subprojectsort_cate;
                self.project.executeitem_cate = response.data.executeitem_cate;
                self.project.status_cate = response.data.status_cate;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //切換頁面
        changePage: function (page) {
            let self = this;
            if (page != self.url_show_block) {
                self.$router.replace('/' + page);
                self.url_show_block = page;
            }
        },
        //關閉彈跳視窗
        closeHover: function () {
            let self = this;
            self.hoverwrap = { 'title': '', 'subtitle': '', 'date': '', 'position': {} };
        },
        //開啟彈跳視窗
        openHover: function (pt_name, pst_name, date, user, e) {
            let self = this;
            self.hoverwrap.title = pt_name;
            self.hoverwrap.subtitle = pst_name;
            if (date) {
                self.hoverwrap.date = date;
            } else {
                self.hoverwrap.date = '尚未設定';
            }
            if (user) {
                self.hoverwrap.user = user;
            } else {
                self.hoverwrap.user = '待排程';
            }
            self.hoverwrap.position.x = e.x;
            self.hoverwrap.position.y = e.y;
        },
        //判斷是否開啟彈跳視窗
        checkToOpenHover: function () {
            let self = this;
            var boolean = true;
            if (self.hoverwrap.title == '') {
                return false;
            } else if (self.hoverwrap.subtitle == '') {
                return false;
            } else if (self.hoverwrap.date == '') {
                return false;
            }
            return boolean;
        },
        //打開月曆
        openCalendar: function () {
            let self = this;
            self.index.read_more = true;
            var cd = new Date();
            self.index.now_page_year = cd.getFullYear();
            self.index.now_page_month = cd.getMonth();
            self.index.today.year = cd.getFullYear();
            self.index.today.month = cd.getMonth();
            self.index.today.day = cd.getDate();
            self.getOneMonthProjectData();
        },
        //切換月份
        changeMonth: function (type) {
            let self = this;
            var cd = new Date();
            if (type == 'pre') {
                if (self.index.now_page_month == 0) {
                    self.index.now_page_year = self.index.now_page_year - 1;
                    self.index.now_page_month = 11;
                } else {
                    self.index.now_page_month = self.index.now_page_month - 1;
                }
            } else if (type == 'today') {
                self.index.now_page_year = cd.getFullYear();
                self.index.now_page_month = cd.getMonth();
            } else if (type == 'next') {
                if (self.index.now_page_month == 11) {
                    self.index.now_page_year = self.index.now_page_year + 1;
                    self.index.now_page_month = 0;
                } else {
                    self.index.now_page_month = self.index.now_page_month + 1;
                }
            }
            self.getOneMonthProjectData();
        },
        //如果未達某位數就補0
        zeroPadding: function (num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        //時鐘要素
        updateTime: function () {
            let self = this;
            var cd = new Date();
            self.index.time = self.zeroPadding(cd.getHours(), 2) + ':' + self.zeroPadding(cd.getMinutes(), 2) + ':' + self.zeroPadding(cd.getSeconds(), 2);
            self.index.date = self.zeroPadding(cd.getFullYear(), 4) + '/' + self.zeroPadding(cd.getMonth() + 1, 2) + '/' + self.zeroPadding(cd.getDate(), 2);
        },
        //取得當周每天的年月日
        getDaysOfWeek: function () {
            let self = this;
            var currentDate = new Date();
            var timesStamp = currentDate.getTime();
            var currenDay = currentDate.getDay();
            var dates = [];
            for (var i = 0; i < 7; i++) {
                var json = {};
                json.year = 1900 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getYear();
                json.month = self.index.month_en[new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getMonth()];
                json.day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getDate();
                json.week = self.index.week_cn[new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getDay()];
                dates.push(json);
            }
            return dates;
        },
        //取得某年某月的天數
        daysMonth: function (month, year) {
            let self = this;
            var tmp = year % 4;
            if (tmp == 0) {
                return self.index.month_olympic[month];
            } else {
                return self.index.month_normal[month];
            }
        },
        //取得某年某月第一天是星期幾
        dayStart: function (month, year) {
            var tmpDate = new Date(year, month, 1);
            return tmpDate.getDay();
        },
        //變更排序方式
        changeUserSort: function (order) {
            let self = this;
            if (self.account.user_order == order) {
                if (self.account.user_sort == 'DESC') {
                    self.account.user_sort = 'ASC';
                    self.getUsers();
                } else {
                    self.account.user_sort = 'DESC';
                    self.getUsers();
                }
            } else {
                self.account.user_order = order;
                self.account.user_sort = 'DESC';
                self.getUsers();
            }
        },
        //變更排序方式
        changeAuthSort: function (order) {
            let self = this;
            if (self.account.auth_order == order) {
                if (self.account.auth_sort == 'DESC') {
                    self.account.auth_sort = 'ASC';
                    self.getAuths();
                } else {
                    self.account.auth_sort = 'DESC';
                    self.getAuths();
                }
            } else {
                self.account.auth_order = order;
                self.account.auth_sort = 'DESC';
                self.getAuths();
            }
        },
        //關閉新增子任務與主任務的欄位
        closeProjectInput: function () {
            let self = this;
            self.project.create_project_status = false; //新增專案任務區塊 顯示與否
            self.project.create_subproject_status = false; //新增專案子任務區塊 顯示與否
        },
        colseUserTagWrap: function (e) {
            let self = this;
            var classname = e.target.className;
            var array = ['user_tag_item'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if (classname.match(array[i])) {
                    boolean = false;
                }
            }
            if (boolean) {
                self.project.add_user_tag_open = false;
                self.project.tag_data = {};
                $('#TT_MASK').hide();
                self.image_url = '';
                self.project.tag_search_udname = '';
            }
        },
        //關閉自訂標籤的視窗
        closeTagWrap: function () {
            let self = this;
            self.project.create_tag_open = false;
            self.image_url = '';
            self.project.tag_data = {};
            $('.create_tag_wrap input[name=tm_name]').val('');
        },
        //////////////////// 單一框設定 ////////////////////
        ///
        //關閉單一顯示頁
        closeSinglePage: function (obj) {
            let self = this;
            if (obj) {
                self.init();
                self.single = { 'userdata': '', 'type': '', 'id': '', 'cate': '', 'group': '' };
            }
        },
        //開啟單一顯示頁
        openSinglePage: function (user, type, id, cate, group = 0) {
            let self = this;
            self.single.userdata = user;
            self.single.type = type;
            self.single.id = id;
            self.single.cate = cate;
            self.single.group = group;
        },
        //判斷是否開啟單一顯示頁
        checkToOpenSingle: function () {
            let self = this;
            var boolean = true;
            if (self.single.type == '') {
                return false;
            } else if (self.single.id == '') {
                return false;
            } else if (self.single.cate == '') {
                return false;
            }
            return boolean;
        },
        showAllSubprojectsOrNot: function (boolean) {
            let self = this;
            if (boolean) {
                $('.sub_item').removeClass('hidden');
            } else {
                $('.sub_item').addClass('hidden');
            }
        },
        showSubProject: function (e, id) {
            let self = this;
            var classname = e.target.className;
            var array_a = ['cell']; // 點擊範圍
            var array_b = ['dropdown_item'];
            var boolean = true;
            var string = '.list' + id;
            for (var i = 0; i < array_a.length; i++) {
                if (!classname.match(array_a[i])) {
                    boolean = false;
                }
            }
            for (var i = 0; i < array_b.length; i++) {
                if (classname.match(array_b[i])) {
                    boolean = false;
                }
            }
            if (boolean) {
                if ($(string).find('.sub_item').hasClass('hidden')) {
                    $(string).find('.sub_item').removeClass('hidden');
                } else {
                    $(string).find('.sub_item').addClass('hidden');
                }
            }
        },
        ///
        //////////////////// 單一框設定 end ////////////////////

        ////////////////////////拖拉功能////////////////////////
        ///
        ///
        ///
        //拖拉功能
        drag: function (type, id) {
            let self = this;
            var json = {};
            //如果拖拉主任務，就是連同底下的子任務都一起拖拉
            if (type == 'pt_id') {
                json.pt_id = id;
                //如果拖拉子任務，就只有單一子任務拖拉
            }
            self.project.drag_data = json;
        },
        dragOrNot: function () {
            let self = this;
            if (self.user_status.ud_admin || self.user_auth.pt_admin) {
                return true;
            } else {
                return false;
            }
        },
        dragend: function () {
            let self = this;
            self.project.drag_data = {};
        },
        drop: function (id) {
            let self = this;
            self.project.drag_data.tm_id = id;
            self.project.drag_data.is_show = 1;
            self.project.drag_data.ug_id = self.project.project_ug_id;
            axios.post('/project-modify/1', self.project.drag_data) //修改 專案任務的標籤
            .then(function (response) {
                if (response.data.result) {
                    self.getProjects();
                    self.notification(response.data.string, 'success');
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //我們必須阻止某一DOM元素對dragover的默認行為，才能使drop事件在其上正確執行
        allowDrop: function (event) {
            event.preventDefault();
        },
        comingsoon: function (id) {
            let self = this;
            self.project.drag_over_pst_id = id;
        },
        //拖拉對調順序
        dragToChangeProjectSort: function (style, pt_id, pst_id) {
            let self = this;
            if (style == 'start') {
                self.project.drag_pt_id = pt_id;
                self.project.drag_pst_id = pst_id;
            } else if (style == 'drop') {
                if (self.project.drag_pt_id == pt_id && self.project.drag_pst_id != pst_id) {
                    var sort = '';
                    var dragTargetIndex = '';
                    var dropTargetIndex = '';
                    var pss_id = '';
                    //先取得是哪個專案底下的子任務排序列表
                    for (var i = 0; i < self.project.subprojectsort_cate.length; i++) {
                        if (self.project.subprojectsort_cate[i].pt_id == pt_id) {
                            sort = JSON.parse(self.project.subprojectsort_cate[i].pss_sort);
                            pss_id = self.project.subprojectsort_cate[i].pss_id;
                        }
                    }
                    var newsort = [];
                    //抓取拖拉的目標以及要前往的目標的排序第幾順位
                    for (var i = 0; i < sort.length; i++) {
                        if (sort[i] == self.project.drag_pst_id) {
                            dragTargetIndex = i;
                        } else if (sort[i] == pst_id) {
                            dropTargetIndex = i;
                        }
                    }
                    //排出新的排序列表
                    for (var i = 0; i < sort.length; i++) {
                        //拖拉目標往後移動
                        if (dragTargetIndex < dropTargetIndex) {
                            if (sort[i] == self.project.drag_pst_id) {} else {
                                if (sort[i] == pst_id) {
                                    newsort.push(sort[i]);
                                    newsort.push(self.project.drag_pst_id);
                                } else {
                                    newsort.push(sort[i]);
                                }
                            }
                            //拖拉目標往前移動
                        } else if (dragTargetIndex > dropTargetIndex) {
                            if (sort[i] == self.project.drag_pst_id) {} else {
                                if (sort[i] == pst_id) {
                                    newsort.push(self.project.drag_pst_id);
                                    newsort.push(sort[i]);
                                } else {
                                    newsort.push(sort[i]);
                                }
                            }
                            //拖拉目標並沒有移動
                        } else {
                            newsort.push(sort[i]);
                        }
                    }
                    //儲存新的排序列表
                    var json = {};
                    json.pss_id = pss_id;
                    json.pss_sort = JSON.stringify(newsort);
                    axios.post('/project-sort-modify', json) //修改 - 子任務排序
                    .then(function (response) {
                        if (response.data.result) {
                            self.getSubProjects();
                            self.getSubProjectsSortCate();
                        } else {
                            self.notification(response.data.string, 'failure');
                        }
                    }).catch(function (response) {
                        self.notification('系統出錯', 'failure');
                    });
                }
            } else if (style == 'end') {
                self.project.drag_pt_id = '';
                self.project.drag_pst_id = '';
                self.project.drag_over_pst_id = '';
            }
        },
        ///
        ///
        ///
        ////////////////////////拖拉功能 end////////////////////////

        ////////////////////////右鍵功能////////////////////////
        ///
        ///
        ///
        //右鍵功能 - 修改標籤
        modifyTagStyle: function () {
            let self = this;
            self.project.create_tag_open = true;
            self.project.tag_type = 'modify';
            $('#TT_MASK').hide();
        },
        //右鍵功能 - 刪除標籤
        deleteTagStyle: function () {
            let self = this;
            self.openDeletePromptBox(self.project.tag_data.tm_id, 5);
        },
        //右鍵功能 - 新增人員
        openUserTagWrap: function () {
            let self = this;
            self.getUserInThisTag();
            self.project.add_user_tag_open = true;
        },
        //將被點擊右鍵的自訂標籤資料存起來
        updateTagData: function (id, url, name) {
            let self = this;
            self.project.tag_data.tm_id = id;
            self.project.tag_data.tm_url = url;
            self.image_url = url;
            self.project.tag_data.tm_name = name;
        },
        ///
        ///
        ///
        ////////////////////////右鍵功能 end////////////////////////

        ////////////////////////查詢功能////////////////////////
        ///
        //查詢功能
        search: function () {
            let self = this;
            setTimeout(function () {
                if (self.composing) {
                    if (self.url_show_block == "book-list") {
                        self.search_condition.book_content = $('input[name=search_content]').val();
                    } else if (self.url_show_block == 'announcement-list') {
                        self.search_condition.ann_content = $('input[name=search_content]').val();
                    } else if (self.url_show_block == 'account-list') {
                        if (self.account.sub_nav == 'account_management') {
                            self.search_condition.user_content = $('input[name=search_content]').val();
                        } else if (self.account.sub_nav == 'authority_level') {
                            self.search_condition.auth_content = $('input[name=search_content]').val();
                        }
                    } else if (self.url_show_block == 'property-list') {
                        self.search_condition.property_content = $('input[name=search_content]').val();
                    } else if (!isNaN(self.url_show_block)) {
                        self.search_condition.pro_content = $('input[name=search_content]').val();
                    }
                }
            }, 10);
        },
        //查詢不在此標籤內的使用者
        searchUser: function () {
            let self = this;
            setTimeout(function () {
                if (self.composing) {
                    var json = {};
                    json.ud_name = $('.tag_input input[name=ud_name]').val();
                    json.tm_id = self.project.tag_data.tm_id;
                    self.project.tag_search_udname = $('.tag_input input[name=ud_name]').val();
                    axios.post('/userinthistag', json).then(function (response) {
                        self.project.tag_user_data = response.data;
                    }).catch(function (response) {
                        self.notification('系統出錯', 'failure');
                    });
                }
            }, 10);
        },
        //監聽搜尋框 注音輸入開始
        listen_input_start: function () {
            let self = this;
            self.composing = false;
        },
        //監聽搜尋框 注音輸入結束
        listen_input_end: function () {
            let self = this;
            self.composing = true;
        },
        //清除搜尋資料
        clearSearchCondition: function () {
            let self = this;
            self.search_condition = {
                book_content: '',
                ann_content: '',
                user_content: '',
                auth_content: '',
                property_content: '',
                pro_content: ''
            };
        },
        ///
        ////////////////////////查詢功能 end////////////////////

        ////////////////////////下拉功能////////////////////////
        ///
        //關閉月曆
        closeDateTimePicker: function (obj) {
            let self = this;
            if (obj) {
                self.closeAllDropdownMenu();
            }
        },
        //判斷是否開啟下拉選單
        checkToOpenDropDown: function (item, type, id) {
            let self = this;
            if (self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id) {
                return true;
            } else {
                return false;
            }
        },
        //打開列表頁的下拉選單
        openDropdownMenu: function (item, type, id, e) {

            let self = this;
            var classname = e.target.className;
            var string = 'dropdown_item';
            var boolean = false;

            if (classname.match(string)) {
                boolean = true;
            }
            var index_height = $(window).height();
            if (index_height - e.y < 400) {
                self.top_or_bottom = true;
            } else {
                self.top_or_bottom = false;
            }

            var json = {};
            json.x = e.x;
            json.y = e.y;
            if (boolean) {
                if (self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id) {
                    self.closeAllDropdownMenu();
                } else {
                    self.dropdown.item = item;
                    self.dropdown.type = type;
                    self.dropdown.id = id;
                    self.dropdown.position = json;
                }
            }
        },
        //關閉所有彈出的下拉選單
        closeAllDropdownMenu: function () {
            let self = this;
            self.dropdown.item = '';
            self.dropdown.type = '';
            self.dropdown.id = '';
            self.dropdown.position = '';
        },
        ///
        ////////////////////////下拉功能 end/////////////////////

        //////////////////// 上傳圖片 ////////////////////
        ///
        //新增自訂標籤的圖片
        getFile(file, fileList) {
            let self = this;
            const isLt2M = file.size / 1024 / 1024 < 1;
            var str = file.name;
            var res = str.split(".");
            var isImage = false;
            if (res.length > 0) {
                if (res[res.length - 1] == 'png' || res[res.length - 1] == 'jpg' || res[res.length - 1] == 'jpeg') {
                    isImage = true;
                }
            }
            if (!isLt2M) {
                self.notification('圖片大小不能超過1M', 'failure');
            } else if (!isImage) {
                self.notification('上傳標籤圖示只能是JPG或PNG格式', 'failure');
            } else {
                this.getBase64(file.raw).then(res => {
                    self.image_url = res;
                });
            }
        },
        //將圖片轉成base64
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function () {
                    imgResult = reader.result;
                };
                reader.onerror = function (error) {
                    reject(error);
                };
                reader.onloadend = function () {
                    resolve(imgResult);
                };
            });
        },
        ///
        //////////////////// 上傳圖片 end ////////////////////

        ////////////////////////取值專區 ////////////////////////
        ///
        //取得子任務排序資料
        getSubProjectsSortCate: function () {
            let self = this;
            axios.get('/subprojectsortcate').then(function (response) {
                self.project.subprojectsort_cate = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得執行項目資料
        getExecuteitemCate: function () {
            let self = this;
            axios.get('/executeitemcate').then(function (response) {
                self.project.executeitem_cate = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得狀態資料
        getStatusCate: function () {
            let self = this;
            axios.get('/statuscate').then(function (response) {
                self.project.status_cate = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //優先顯示加入最愛的專案
        showFavoriteFirst: function ($pt_id) {
            let self = this;
            for (var i = 0; i < self.project.user_favorites.length; i++) {
                if (self.project.user_favorites[i].pt_id == $pt_id) {
                    return true;
                }
            }
        },
        //取得使用者自定義標籤
        getUserTags: function () {
            let self = this;
            var json = {};
            json.ud_id = self.user_status.ud_id;
            axios.post('/usertags', json).then(function (response) {
                self.project.user_tags = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得使用者專案最愛
        getUserFavorites: function () {
            let self = this;
            //取得該使用者加最愛的專案
            axios.post('/userfavorites', self.user_status).then(function (response) {
                self.project.user_favorites = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得專案任務資料
        getProjects: function () {
            let self = this;
            axios.post('/projects').then(function (response) {
                self.project.projects = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一專案任務底下所有的子任務資料
        getSubProjects: function () {
            let self = this;
            axios.get('/subprojects').then(function (response) {
                if (!self.user_status.ud_admin && !self.user_auth.pt_admin && self.project.sub_projects.length == 0) {
                    var string = '';
                    // self.sub_projects = [];
                    for (var i = 0; i < response.data.length; i++) {
                        if (string != response.data[i].pt_id) {
                            string = response.data[i].pt_id;
                            var json = {};
                            json.pt_id = string;
                            axios.post('/getsubprojectsofproject', json).then(function (response) {
                                self.project.sub_projects = self.project.sub_projects.concat(response.data);
                            }).catch(function (response) {
                                self.notification('系統出錯', 'failure');
                            });
                        }
                    }
                    // self.sub_projects = array_a;
                } else if (self.user_status.ud_admin || self.user_auth.pt_admin) {
                    self.project.sub_projects = response.data;
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得某標籤裡的成員資料
        getUserInThisTag: function () {
            let self = this;
            var json = {};
            json.tm_id = self.project.tag_data.tm_id;
            axios.post('/userinthistag', json).then(function (response) {
                self.project.tag_user_data = response.data;
                for (var i = 0; i < self.project.tag_user_data.length; i++) {
                    if (self.project.tag_user_data[i].trm_owner) {
                        self.project.tag_owner_id = self.project.tag_user_data[i].ud_id;
                    }
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得資產列表資訊
        getPropertys: function () {
            let self = this;
            axios.get('/propertys').then(function (response) {
                self.property.data_propertys = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得全部權限等級資料
        getAuths: function () {
            let self = this;
            var json = {};
            json.order = self.account.auth_order;
            json.sort = self.account.auth_sort;
            axios.post('/auths', json).then(function (response) {
                self.account.auths = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得全部使用者資料
        getUsers: function () {
            let self = this;
            var json = {};
            json.order = self.account.user_order;
            json.sort = self.account.user_sort;
            axios.post('/users', json).then(function (response) {
                self.account.users = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得公告列表資訊
        getAnns: function (id) {
            let self = this;
            axios.get('/companyanns/' + id).then(function (response) {
                self.announcement.data_anns = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得書籍列表資訊
        getBooks: function () {
            let self = this;
            axios.get('/books').then(function (response) {
                if (response.data.length > 0) {
                    self.book.data_books = response.data;
                    self.book.book_infor = self.book.data_books[0];
                    self.getBorrowing(self.book.data_books[0].bi_id);
                } else {
                    self.book.book_infor = {};
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一書籍資訊
        getBook: function (id) {
            let self = this;
            axios.get('/book/' + id).then(function (response) {
                self.book.book_infor = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得某書籍借閱紀錄
        getBorrowing: function (id) {
            let self = this;
            axios.get('/borrowing/' + id).then(function (response) {
                self.book.data_bookborrows = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得書籍分類
        getBookSort: function () {
            let self = this;
            axios.get('/booksort').then(function (response) {
                self.book.data_booksorts = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得書籍狀態
        getBookStatusCate: function () {
            let self = this;
            axios.get('/bookstatuscate').then(function (response) {
                self.book.cate_bookstatus = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得所有使用者
        getUserCate: function () {
            let self = this;
            axios.get('/users').then(function (response) {
                self.user_cate = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得系統連結資料
        getUrls: function () {
            let self = this;
            axios.get('/urls').then(function (response) {
                if (response.data) {
                    self.index.system_urls = response.data;
                } else {
                    self.notification('無法取得全部資料，請重新登入。', 'failure');
                }
            }).catch(function (response) {
                self.notification(response, 'failure');
            });
        },
        //取得某年某月資料
        getOneMonthProjectData: function () {
            let self = this;
            var json = {};
            json.year = self.index.now_page_year;
            json.month = self.index.now_page_month;
            axios.post('/onemonthproject', json).then(function (response) {
                if (response.data) {
                    self.index.sub_projects_month = response.data;
                } else {
                    self.notification('無法取得當月資料，請重新登入。', 'failure');
                }
            }).catch(function (response) {
                self.notification(response, 'failure');
            });
        },
        //取得當週資料
        getOneWeekProjectData: function () {
            let self = this;
            var json = {};
            json.firstday = self.index.firstday;
            json.lastday = self.index.lastday;

            axios.post('/oneweekproject', json).then(function (response) {
                if (response.data) {
                    self.index.sub_projects_week = response.data;
                } else {
                    self.notification('無法取得當週資料，請重新登入。', 'failure');
                }
            }).catch(function (response) {
                self.notification(response, 'failure');
            });
        },
        //取得該使用者全部資料
        getAllUserProjectData: function () {
            let self = this;
            axios.get('/allusersubproject').then(function (response) {
                if (response.data) {
                    self.index.sub_projects_all = response.data;
                } else {
                    self.notification('無法取得全部資料，請重新登入。', 'failure');
                }
            }).catch(function (response) {
                self.notification(response, 'failure');
            });
        },
        ///
        ////////////////////////取值專區 end////////////////////////

        ////////////////////////其他有用功能////////////////////////
        ///
        //移除秒數
        removeSecond: function (date) {
            let self = this;
            var d = new Date(date);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var day = d.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var hour = d.getHours();
            if (hour < 10) {
                hour = '0' + hour;
            }
            var minute = d.getMinutes();
            if (minute < 10) {
                minute = '0' + minute;
            }
            var datetime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
            return datetime;
        },
        //關閉所有打開的區塊或視窗或是重置任何數值
        closeAll: function () {
            let self = this;
            self.dropdown.item = '';
            self.dropdown.type = '';
            self.dropdown.id = '';
            self.dropdown.position = '';

            self.book.create_book_open = false;
            self.book.create_book_data = {};
            self.property.create_property_open = false;
            self.property.create_property_data = {};
            self.announcement.create_ann_open = false;

            $('.content_wrap').removeClass('modify');
            $('.content_text input').addClass('none');
            $('.content_text span').removeClass('none');
            //後續還有可以繼續新增
        },
        //點擊目標以外地方關閉所有下拉
        colseIfClickOutside: function (e) {
            let self = this;
            var classname = e.target.className;
            var array = ['dropdown_item', 'dd_wrap'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if (classname.match(array[i])) {
                    boolean = false;
                }
            }
            if (boolean) {
                self.closeAll();
            }
        },
        //顯示某個欄位的input並且開始修改
        showThisFieldInput: function (field, id) {
            let self = this;
            var target = '.list' + id;
            $('.content_wrap').removeClass('modify');
            $('.content_text input').addClass('none');
            $('.content_text span').removeClass('none');
            $(target).find('.' + field).find('span').addClass('none');
            $(target).find('.' + field).find('input').removeClass('none');
            $(target).addClass('modify');
        },
        //選擇這本書
        selectThisBook: function (id, name) {
            let self = this;
            self.getBook(id);
            self.getBorrowing(id);
        },
        //切換其他書籍分類
        changeBookSort: function (id, name) {
            let self = this;
            self.book.book_infor = {};
            self.book.book_infor.bs_id = id;
            self.book.book_infor.bs_name = name;
            self.book.data_bookborrows = [];
        },
        ///
        ////////////////////////其他有用功能 end////////////////////////

        //////////////////// 推播框設定 ////////////////////
        ///
        //推撥提示框
        notification: function (string, type) {
            if (type == 'success') {
                var block = "<div class='remove_wrapper success'><i class='fa fa-check'></i><span>" + string + "</span></div>";
                $('.notification_wrap').append(block);
                $('.remove_wrapper').hover(function () {
                    $(this).remove();
                });
                setTimeout(function () {
                    $('.remove_wrapper').remove();
                }, 3000);
            } else if (type == 'failure') {
                var block = "<div class='remove_wrapper failure'><i class='fa fa-times'></i><span>" + string + "</span></div>";
                $('.notification_wrap').append(block);
                $('.remove_wrapper').hover(function () {
                    $(this).remove();
                });
                setTimeout(function () {
                    $('.remove_wrapper').remove();
                }, 3000);
            }
        },
        //彈出提示框
        prompt: function (string, type, boolean) {
            //string：要提示的字串，type：提示框的類型，boolean：是否要重整頁面
            let self = this;
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_title').find('h2').text(string);
            if (type == 'question') {
                $('.prompt_icon').find('i').removeClass('fa-check');
                $('.prompt_icon').find('i').removeClass('fa-times');
                $('.prompt_icon').find('i').addClass('fa-question');
                $('.prompt_btn_group').find('.btn_cancel').show();
                $('.prompt_btn_group').find('.btn_submit').show();
                $('.prompt_btn_group').find('p').hide();
            } else if (type == 'success') {
                $('.prompt_icon').find('i').removeClass('fa-question');
                $('.prompt_icon').find('i').removeClass('fa-times');
                $('.prompt_icon').find('i').addClass('fa-check');
                $('.prompt_btn_group').find('.btn_cancel').hide();
                $('.prompt_btn_group').find('.btn_submit').hide();
                $('.prompt_btn_group').find('p').show();
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function () {
                    $('.prompt_btn_group span').text(n - 1);
                    setTimeout(function () {
                        $('.prompt_btn_group span').text(n - 2);
                        setTimeout(function () {
                            if (boolean) {
                                self.closePrompt();
                                // self.init(true);
                            } else {
                                self.closePrompt();
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            } else if (type == 'failure') {
                $('.prompt_icon').find('i').removeClass('fa-check');
                $('.prompt_icon').find('i').removeClass('fa-question');
                $('.prompt_icon').find('i').addClass('fa-times');
                $('.prompt_btn_group').find('.btn_cancel').hide();
                $('.prompt_btn_group').find('.btn_submit').hide();
                $('.prompt_btn_group').find('p').show();
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function () {
                    $('.prompt_btn_group span').text(n - 1);
                    setTimeout(function () {
                        $('.prompt_btn_group span').text(n - 2);
                        setTimeout(function () {
                            if (boolean) {
                                self.closePrompt();
                                // self.init(true);
                            } else {
                                self.closePrompt();
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
            self.prompt_box_open = true;
            $('html').addClass('over_hidden');
        },
        closePrompt: function () {
            let self = this;
            self.prompt_box_open = false;
            $('html').removeClass('over_hidden');
        },
        ///
        //////////////////// 推播框設定 end ////////////////////

        ////////////////////////新增區塊////////////////////////
        ///
        //新增專案任務
        createProject: function () {
            let self = this;
            var json = {};
            if ($('input[name=pt_name]').val() != '') {
                json.pt_name = $('input[name=pt_name]').val();
            } else {
                self.notification('請填入主任務名稱', 'failure');
                return false;
            }
            json.ug_id = self.project.project_ug_id;
            if (self.project.sub_nav != 'all' && self.project.sub_nav != 'wait') {
                json.tm_id = self.project.sub_nav;
            } else if (self.project.sub_nav == 'wait') {
                json.is_show = 0;
            }
            axios.post('/project-create/1', json) //新增 - 專案主任務
            .then(function (response) {
                if (response.data.result) {
                    self.openSinglePage(self.user_status, 'pt', response.data.id, 1, self.project.project_ug_id);
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //新增標籤
        createTag: function () {
            let self = this;
            var json = {};
            var tm_name = $('.create_tag_wrap input[name=tm_name]').val();
            var tm_url = self.image_url;
            if (tm_name == '') {
                self.notification('請填入標籤名稱', 'failure');
            } else if (tm_name.length > 4) {
                self.notification('標籤名稱字數不能超過4位', 'failure');
            } else if (tm_url == '') {
                self.notification('請傳入標籤圖示', 'failure');
            } else {
                json.tm_name = tm_name;
                json.tm_url = tm_url;
                json.ug_id = self.project.project_ug_id;
                json.ud_id = self.user_status.ud_id;
                axios.post('/project-create/5', json) //新增 - 標籤
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeTagWrap();
                        self.getUserTags();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //新增專案子任務
        createSubProject: function (pt_id) {
            let self = this;
            var json = {};
            json.pt_id = pt_id;
            if ($('.create_subproject input[name=pst_name]').val() != '') {
                json.pst_name = $('.create_subproject input[name=pst_name]').val();
            } else {
                self.notification('請填入子任務名稱', 'failure');
                return false;
            }
            axios.post('/project-create/2', json) //新增 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                    self.getSubProjectsSortCate();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //新增使用者最愛
        createFavorite: function (pt_id) {
            let self = this;
            var arraydata = {};
            arraydata.pt_id = pt_id;
            arraydata.ud_id = self.user_status.ud_id;
            axios.post('/user-create/2', arraydata) //新增 - 使用者最愛
            .then(function (response) {
                if (response.data.result) {
                    self.getProjects();
                    self.getSubProjects();
                    self.getUserFavorites();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //新增使用者到此標籤
        addUserToThisTag: function (ud_id) {
            let self = this;
            var json = {};
            json.ud_id = ud_id;
            json.tm_id = self.project.tag_data.tm_id;
            axios.post('/user-to-tag-create', json).then(function (response) {
                if (response.data.result) {
                    self.notification(response.data.string, 'success');
                    self.getUserInThisTag();
                    $('.tag_input input[name=ud_name]').val('');
                    self.project.tag_search_udname = '';
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //新增資產
        createProperty: function () {
            let self = this;
            var json = {};
            if (self.property.create_property_data.ud_id) {
                json.ud_id = self.property.create_property_data.ud_id;
            } else {
                self.notification('請選擇人員', 'failure');
                return false;
            }
            if ($('.new_asset input[name=pm_host]').val() != '') {
                json.pm_host = $('.new_asset input[name=pm_host]').val();
            }
            if ($('.new_asset input[name=pm_screenone]').val() != '') {
                json.pm_screenone = $('.new_asset input[name=pm_screenone]').val();
            }
            if ($('.new_asset input[name=pm_screentwo]').val() != '') {
                json.pm_screentwo = $('.new_asset input[name=pm_screentwo]').val();
            }
            if ($('.new_asset input[name=pm_telephone]').val() != '') {
                json.pm_telephone = $('.new_asset input[name=pm_telephone]').val();
            }
            if ($('.new_asset input[name=pm_canvas]').val() != '') {
                json.pm_canvas = $('.new_asset input[name=pm_canvas]').val();
            }
            if ($('.new_asset input[name=pm_other]').val() != '') {
                json.pm_other = $('.new_asset input[name=pm_other]').val();
            }
            if ($('.new_asset input[name=pm_adobe]').val() != '') {
                json.pm_adobe = $('.new_asset input[name=pm_adobe]').val();
            }
            axios.post('/property-create/6', json) //新增 - 資產管理
            .then(function (response) {
                if (response.data.result) {
                    self.closeAll();
                    self.getPropertys();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //新增借閱紀錄
        createBorrowing: function () {
            let self = this;
            var json = {};
            json.bi_id = self.book.book_infor.bi_id;
            if (self.book.create_book_data.ud_id) {
                json.ud_id = self.book.create_book_data.ud_id;
            } else {
                self.notification('請選擇借閱人', 'failure');
                return false;
            }
            if (self.book.create_book_data.bbr_borrowingdate) {
                json.bbr_borrowingdate = self.book.create_book_data.bbr_borrowingdate;
            } else {
                self.notification('請選擇借閱日期', 'failure');
                return false;
            }
            if (self.book.create_book_data.bbr_returndate) {
                json.bbr_returndate = self.book.create_book_data.bbr_returndate;
            }
            axios.post('/book-create/3', json) //新增 - 書籍借閱
            .then(function (response) {
                if (response.data.result) {
                    self.closeAll();
                    self.getBorrowing(self.book.book_infor.bi_id);
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //設定借閱時間
        createBorrowingDate: function (obj) {
            let self = this;
            self.book.create_book_data.bbr_borrowingdate = obj.date;
        },
        //設定歸還時間
        createReturnDate: function (obj) {
            let self = this;
            self.book.create_book_data.bbr_returndate = obj.date;
        },
        //新增公告
        createAnn: function () {
            let self = this;
            var json = {};
            if ($('input[name=ai_title]').val() != '') {
                json.ai_title = $('input[name=ai_title]').val();
            } else {
                self.notification('請填入公告標題', 'failure');
                return false;
            }
            json.ug_id = self.announcement.sub_nav;
            if (self.announcement.sub_nav == 0) {
                json.ai_cate = 2;
            } else {
                json.ai_cate = 1;
            }
            axios.post('/announcement-create/1', json) //新增 - 公告資訊
            .then(function (response) {
                if (response.data.result) {
                    $('input[name=ai_title]').val('');
                    //關閉新增公告區塊
                    self.announcement.create_ann_open = false;
                    //開啟單一公告頁
                    self.openSinglePage(self.user_status, 'ai', response.data.id, 3);
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        ///
        //////////////////// 新增區塊 end ////////////////////

        ////////////////////////修改區塊////////////////////////
        ///
        //修改標籤
        changeTagStyle: function () {
            let self = this;
            var json = {};
            var tm_name = $('.create_tag_wrap input[name=tm_name]').val();
            var tm_url = self.image_url;
            if (tm_name == '') {
                self.notification('請填入標籤名稱', 'failure');
            } else if (tm_name.length > 4) {
                self.notification('標籤名稱字數不能超過4位', 'failure');
            } else if (tm_url == '') {
                self.notification('請傳入標籤圖示', 'failure');
            } else {
                json.tm_id = self.project.tag_data.tm_id;
                json.tm_name = tm_name;
                json.tm_url = tm_url;
                json.ug_id = self.project.project_ug_id;
                axios.post('/project-modify/5', json) //修改 - 標籤
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeTagWrap();
                        self.getUserTags();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //修改執行項目
        changeExecuteItem: function (pst_id, peic_id) {
            let self = this;
            var arraydata = {};
            arraydata.pst_id = pst_id;
            arraydata.peic_id = peic_id;
            axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                    self.closeAllDropdownMenu();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
                self.closeAllDropdownMenu();
            });
        },
        //修改狀態
        changeStatus: function (pst_id, psc_id) {
            let self = this;
            var arraydata = {};
            arraydata.pst_id = pst_id;
            arraydata.psc_id = psc_id;
            axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                    self.closeAllDropdownMenu();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
                self.closeAllDropdownMenu();
            });
        },
        //修改執行人
        changeUser: function (pst_id, ud_id) {
            let self = this;
            var arraydata = {};
            arraydata.pst_id = pst_id;
            arraydata.ud_id = ud_id;
            axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                    self.closeAllDropdownMenu();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
                self.closeAllDropdownMenu();
            });
        },
        //修改需求日期
        changeRequireDate: function (obj) {
            let self = this;
            var arraydata = {};
            if (obj.pt_id) {
                arraydata.pt_id = obj.pt_id;
                arraydata.pt_requiredate = obj.date;
                axios.post('/project-modify/1', arraydata) //修改 - 專案主任務
                .then(function (response) {
                    if (response.data.result) {
                        self.getProjects();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            } else if (obj.pst_id) {
                arraydata.pst_id = obj.pst_id;
                arraydata.pst_requiredate = obj.date;
                axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
                .then(function (response) {
                    if (response.data.result) {
                        self.getSubProjects();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //修改執行日期
        changeExecutiondate: function (obj) {
            let self = this;
            var arraydata = {};
            arraydata.pst_id = obj.pst_id;
            arraydata.pst_executiondate = obj.date;
            axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //修改完成日期
        changeCompletiondate: function (obj) {
            let self = this;
            var arraydata = {};
            arraydata.pst_id = obj.pst_id;
            arraydata.pst_completiondate = obj.date;
            axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //修改資產人員
        changePropertyUser: function (pm_id, ud_id) {
            let self = this;
            var json = {};
            json.pm_id = pm_id;
            json.ud_id = ud_id;
            axios.post('/property-modify/6', json) //修改 - 資產管理
            .then(function (response) {
                if (response.data.result) {
                    self.getPropertys();
                    self.closeAllDropdownMenu();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
                self.closeAllDropdownMenu();
            });
        },
        //修改某資產欄位資料
        changePropertyThisField: function (field, id) {
            let self = this;
            var json = {};
            var target = '.list' + id;
            if (field == 'pm_host') {
                json.pm_host = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_screenone') {
                json.pm_screenone = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_screentwo') {
                json.pm_screentwo = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_telephone') {
                json.pm_telephone = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_canvas') {
                json.pm_canvas = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_other') {
                json.pm_other = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_adobe') {
                json.pm_adobe = $(target).find('.' + field).find('input').val();
            }
            json.pm_id = id;
            axios.post('/property-modify/6', json) //修改 - 資產管理
            .then(function (response) {
                if (response.data.result) {
                    self.getPropertys();
                    self.closeAllDropdownMenu();
                    $('.content_text input').addClass('none');
                    $('.content_text span').removeClass('none');
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
                self.closeAllDropdownMenu();
            });
        },
        //停啟用使用者
        changeUserStatus: function ($ud_id, $ud_status) {
            let self = this;
            var json = {};
            json.ud_id = $ud_id;
            if ($ud_status == 1) {
                json.ud_status = 0;
            } else {
                json.ud_status = 1;
            }

            axios.post('/user-modify/1', json) //修改使用者資料
            .then(function (response) {
                if (response.data.result) {
                    self.notification(response.data.string, 'success');
                    self.getUsers();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //修改歸還日期
        changeReturnDate: function (obj) {
            let self = this;
            var json = {};
            json.bbr_id = obj.bbr_id;
            json.bbr_returndate = obj.date;
            axios.post('/book-modify/3', json) //修改 - 書籍借閱紀錄
            .then(function (response) {
                if (response.data.result) {
                    self.getBorrowing(self.book.book_infor.bi_id);
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //修改公告置頂與否
        changeAnnTopping: function (id, boolean) {
            let self = this;
            var json = {};
            if (boolean) {
                //改為置頂
                json.ai_topping = 1;
                json.ai_id = id;
            } else {
                //取消置頂
                json.ai_topping = 0;
                json.ai_id = id;
            }
            if (self.user_status.ud_admin || self.user_auth.ai_admin) {
                axios.post('/announcement-modify/1', json) //修改 - 公告資訊
                .then(function (response) {
                    if (response.data.result) {
                        self.getAnns(self.announcement.sub_nav);
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        ///
        ////////////////////////修改區塊 end////////////////////////

        ////////////////////////刪除區塊////////////////////////
        ///
        //刪除資料
        deleteData: function () {
            let self = this;
            self.show_submit_btn = false;
            setTimeout(function () {
                self.show_submit_btn = true;
            }, 1000);
            var json = {};
            if (self.url_show_block == 'book-list') {
                json.bbr_id = self.delete_id;
                axios.post('/book-delete/' + self.ann_type, json) //刪除 - 書籍
                .then(function (response) {
                    self.getBorrowing(self.book.book_infor.bi_id);
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                    self.closePrompt();
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            } else if (self.url_show_block == 'announcement-list') {
                json.ai_id = self.delete_id;
                axios.post('/announcement-delete/' + self.ann_type, json) //刪除 - 公告
                .then(function (response) {
                    self.getAnns(self.announcement.sub_nav);
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                    self.closePrompt();
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            } else if (self.url_show_block == 'account-list') {
                json.al_id = self.delete_id;
                axios.post('/auth-delete/' + self.ann_type, json) //刪除 - 權限等級
                .then(function (response) {
                    self.getAuths();
                    self.closePrompt();
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            } else if (self.url_show_block == 'property-list') {
                json.pm_id = self.delete_id;
                axios.post('/property-delete/' + self.ann_type, json) //刪除 - 公告
                .then(function (response) {
                    self.getPropertys();
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                    self.closePrompt();
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            } else if (!isNaN(self.url_show_block)) {
                json.tm_id = self.delete_id;
                axios.post('/project-delete/' + self.pro_type, json) //刪除 - 專案訊息
                .then(function (response) {
                    self.getUserTags();
                    if (response.data.result) {
                        self.closePrompt();
                        self.notification(response.data.string, 'success');
                    } else {
                        self.closePrompt();
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //開啟刪除的提示詢問窗
        openDeletePromptBox: function (id, type) {
            let self = this;
            var string = '';
            if (!isNaN(self.url_show_block)) {
                //1.專案主任務 2.專案子任務 3.專案訊息 4.專案紀錄 5.標籤
                self.pro_type = type;
                self.delete_id = id;
                if (type == 1) {
                    string = '確定要刪除該公告？';
                } else if (type == 5) {
                    string = '確定要刪除該標籤？';
                }
            } else {
                //1.公告資訊 2.公告訊息 3.書籍借閱 4.書籍資訊 5.書籍分類 6.資產管理 7.權限等級
                self.ann_type = type;
                self.delete_id = id;
                if (type == 1) {
                    string = '確定要刪除該公告？';
                } else if (type == 3) {
                    string = '確定要刪除該書籍借閱資訊？';
                } else if (type == 4) {
                    string = '確定要刪除該書籍？';
                } else if (type == 5) {
                    string = '確定要刪除該書籍分類？';
                } else if (type == 6) {
                    string = '確定要刪除該資產？';
                } else if (type == 7) {
                    string = '確定要刪除該權限等級？';
                }
            }

            self.prompt(string, 'question', false);
        },
        //取消加入最愛
        deleteFavorite: function ($pt_id) {
            let self = this;
            var arraydata = {};
            arraydata.pt_id = $pt_id;
            arraydata.ud_id = self.user_status.ud_id;
            axios.post('/user-delete/2', arraydata) //刪除 - 使用者最愛
            .then(function (response) {
                if (response.data.result) {
                    self.getProjects();
                    self.getSubProjects();
                    self.getUserFavorites();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        }
        ///
        ////////////////////////刪除區塊 end////////////////////////


    },
    watch: {}
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "", ""]);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(27)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(22),
  /* scopeId */
  "data-v-f53e4bea",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\projectManagement-2.0\\resources\\assets\\js\\components\\Hoverwrap.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Hoverwrap.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f53e4bea", Component.options)
  } else {
    hotAPI.reload("data-v-f53e4bea", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(26)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(21),
  /* scopeId */
  "data-v-7d4bba47",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\projectManagement-2.0\\resources\\assets\\js\\components\\Reminderwrap.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Reminderwrap.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7d4bba47", Component.options)
  } else {
    hotAPI.reload("data-v-7d4bba47", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(25)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(20),
  /* scopeId */
  "data-v-2dac10a2",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\projectManagement-2.0\\resources\\assets\\js\\components\\Singlepage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Singlepage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2dac10a2", Component.options)
  } else {
    hotAPI.reload("data-v-2dac10a2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(24)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(19),
  /* scopeId */
  "data-v-0f46a4b9",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\projectManagement-2.0\\resources\\assets\\js\\pages\\Index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0f46a4b9", Component.options)
  } else {
    hotAPI.reload("data-v-0f46a4b9", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "dd_wrap",
    class: {
      'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
    },
    attrs: {
      "id": "datetimepicker"
    }
  }, [_c('div', {
    staticClass: "header dd_wrap"
  }, [_c('div', {
    staticClass: "selected_date dd_wrap"
  }, [(_vm.istime) ? _c('p', {
    staticClass: "dd_wrap"
  }, [_vm._v(_vm._s(_vm.new_date) + " " + _vm._s(_vm.new_time))]) : _c('p', {
    staticClass: "dd_wrap"
  }, [_vm._v(_vm._s(_vm.new_date))])]), _vm._v(" "), _c('div', {
    staticClass: "datetime_title dd_wrap"
  }, [_c('p', {
    staticClass: "dd_wrap"
  }, [_vm._v(_vm._s(_vm.now_page_year) + "年" + _vm._s(_vm.now_page_month + 1) + "月")]), _vm._v(" "), _c('div', {
    staticClass: "btn_group dd_wrap"
  }, [_c('i', {
    staticClass: "fas fa-arrow-left dd_wrap",
    on: {
      "click": function($event) {
        return _vm.changeMonth('pre')
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "fas fa-circle dd_wrap",
    attrs: {
      "title": "回到當月"
    },
    on: {
      "click": function($event) {
        return _vm.changeMonth('today')
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "fas fa-arrow-right dd_wrap",
    on: {
      "click": function($event) {
        return _vm.changeMonth('next')
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "container dd_wrap"
  }, [_c('div', {
    staticClass: "week dd_wrap"
  }, _vm._l((_vm.week_en), function(week) {
    return _c('div', {
      staticClass: "item dd_wrap"
    }, [_vm._v(_vm._s(week))])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "daysForMonth dd_wrap"
  }, _vm._l((_vm.data_for_month), function(date) {
    return _c('div', {
      staticClass: "item dd_wrap",
      class: {
        'current': _vm.today.day == date.day && _vm.today.month == date.month && _vm.today.year == date.year
      },
      on: {
        "click": function($event) {
          return _vm.selectThisDay(date.year, date.month, date.day)
        }
      }
    }, [_vm._v(_vm._s(date.day))])
  }), 0), _vm._v(" "), (_vm.istime) ? _c('div', {
    staticClass: "time dd_wrap"
  }, [_c('div', {
    staticClass: "selected_time dd_wrap"
  }, [_c('i', {
    staticClass: "far fa-alarm-clock dd_wrap"
  }), _c('input', {
    staticClass: "hour dd_wrap",
    attrs: {
      "type": "number",
      "min": "0",
      "max": "23"
    },
    domProps: {
      "value": _vm.totime.hour
    },
    on: {
      "change": function($event) {
        return _vm.selectThisTime()
      }
    }
  }), _c('span', {
    staticClass: "dd_wrap"
  }, [_vm._v("：")]), _c('input', {
    staticClass: "minute dd_wrap",
    attrs: {
      "type": "number",
      "min": "0",
      "max": "59"
    },
    domProps: {
      "value": _vm.totime.minute
    },
    on: {
      "change": function($event) {
        return _vm.selectThisTime()
      }
    }
  })])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "footer dd_wrap"
  }, [_c('div', {
    staticClass: "btn_group dd_wrap"
  }, [_c('div', {
    staticClass: "btn_cancel dd_wrap",
    on: {
      "click": function($event) {
        return _vm.closeDateTimePicker()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit dd_wrap",
    on: {
      "click": function($event) {
        return _vm.submitDate()
      }
    }
  }, [_vm._v("確定")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-077da1d8", module.exports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page_list",
    on: {
      "click": function($event) {
        return _vm.colseIfClickOutside($event)
      }
    }
  }, [_c('div', {
    attrs: {
      "id": "page-header"
    }
  }, [_c('div', {
    staticClass: "header-wrapper"
  }, [_c('a', {
    staticClass: "logo_wrap",
    attrs: {
      "href": "/index"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "mainnav_wrap"
  }, [(_vm.user_status && _vm.user_status.ud_admin) ? _c('ul', {
    staticClass: "mainnav_content"
  }, [_c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'index' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('index')
      }
    }
  }, [_vm._v("個人主頁")])]), _vm._v(" "), _vm._l((_vm.user_group), function(group) {
    return _c('li', {
      staticClass: "nav_item",
      class: _vm.url_show_block == group.ug_id ? 'current' : false
    }, [_c('a', {
      staticClass: "nav_a",
      attrs: {
        "href": "javascript:void(0)"
      },
      on: {
        "click": function($event) {
          _vm.changePage(group.ug_id), _vm.project.project_ug_id = group.ug_id
        }
      }
    }, [_vm._v(_vm._s(group.ug_name_forshort))])])
  }), _vm._v(" "), _c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'announcement-list' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('announcement-list')
      }
    }
  }, [_vm._v("公告資訊")])]), _vm._v(" "), _c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'property-list' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('property-list')
      }
    }
  }, [_vm._v("資產管理")])]), _vm._v(" "), _c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'book-list' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('book-list')
      }
    }
  }, [_vm._v("書籍借閱")])])], 2) : _c('ul', {
    staticClass: "mainnav_content"
  }, [_c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'index' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('index')
      }
    }
  }, [_vm._v("個人主頁")])]), _vm._v(" "), _vm._l((_vm.user_group), function(group) {
    return (_vm.user_status.ug_id == group.ug_id) ? _c('li', {
      staticClass: "nav_item nav_hover",
      class: _vm.url_show_block == group.ug_id ? 'current' : false
    }, [_c('a', {
      staticClass: "nav_a",
      attrs: {
        "href": "javascript:void(0)"
      },
      on: {
        "click": function($event) {
          _vm.changePage(group.ug_id), _vm.project.project_ug_id = group.ug_id
        }
      }
    }, [_vm._v(_vm._s(group.ug_name_forshort))])]) : _vm._e()
  }), _vm._v(" "), _c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'announcement-list' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('announcement-list')
      }
    }
  }, [_vm._v("公告資訊")])]), _vm._v(" "), _c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'book-list' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('book-list')
      }
    }
  }, [_vm._v("書籍借閱")])])], 2)]), _vm._v(" "), _c('div', {
    staticClass: "user_wrap"
  }, [_c('ul', {}, [(_vm.url_show_block != 'index') ? _c('li', {
    class: {
      'search_open': _vm.search_show
    }
  }, [(!_vm.search_show) ? _c('i', {
    staticClass: "fas fa-search",
    on: {
      "click": function($event) {
        _vm.search_show = true
      }
    }
  }) : _c('i', {
    staticClass: "fas fa-times btn_close",
    on: {
      "click": function($event) {
        _vm.search_show = false, _vm.clearSearchCondition()
      }
    }
  }), _vm._v(" "), (_vm.search_show && _vm.url_show_block == 'book-list') ? _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.new_data.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "search_content"
    },
    domProps: {
      "value": _vm.search_condition.book_content
    },
    on: {
      "input": function($event) {
        return _vm.search()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.search_show && _vm.url_show_block == 'announcement-list') ? _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.new_data.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "search_content"
    },
    domProps: {
      "value": _vm.search_condition.ann_content
    },
    on: {
      "input": function($event) {
        return _vm.search()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.search_show && _vm.url_show_block == 'account-list' && _vm.account.sub_nav == 'account_management') ? _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.new_users.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "search_content"
    },
    domProps: {
      "value": _vm.search_condition.user_content
    },
    on: {
      "input": function($event) {
        return _vm.search()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }) : (_vm.search_show && _vm.url_show_block == 'account-list' && _vm.account.sub_nav == 'authority_level') ? _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.new_auths.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "search_content"
    },
    domProps: {
      "value": _vm.search_condition.auth_content
    },
    on: {
      "input": function($event) {
        return _vm.search()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.search_show && !isNaN(_vm.url_show_block)) ? _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.new_projects.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "search_content"
    },
    domProps: {
      "value": _vm.search_condition.pro_content
    },
    on: {
      "input": function($event) {
        return _vm.search()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm._m(0), _vm._v(" "), (_vm.user_status.ud_admin) ? _c('a', {
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('account-list')
      }
    }
  }, [_vm._m(1)]) : _vm._e(), _vm._v(" "), _c('li', {
    on: {
      "click": function($event) {
        return _vm.openSinglePage(_vm.user_status, 'ud', _vm.user_status.ud_id, 4)
      }
    }
  }, [_c('i', {
    staticClass: "far fa-user-circle"
  })])])])])]), _vm._v(" "), (_vm.url_show_block == 'index') ? _c('div', {
    staticClass: "index",
    attrs: {
      "id": "page-container"
    }
  }, [(!_vm.index.read_more) ? _c('div', {
    staticClass: "container-wrapper index-week"
  }, [_c('div', {
    staticClass: "title-wrapper"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("您好，" + _vm._s(_vm.user_status.ud_name))]), _vm._v(" "), _c('p', {
    staticClass: "now-datetime"
  }, [_c('span', {
    staticClass: "date"
  }, [_vm._v(_vm._s(_vm.index.date))]), _c('span', {
    staticClass: "time"
  }, [_vm._v(_vm._s(_vm.index.time))])])]), _vm._v(" "), _c('div', {
    staticClass: "weekly-calendar-wrapper"
  }, [_c('div', {
    staticClass: "title"
  }, [_c('h2', [_vm._v("我的日曆")]), _vm._v(" "), _c('p', [_vm._v("在這裡查看本週安排的活動")]), _vm._v(" "), _c('div', {
    staticClass: "read_more cursor",
    on: {
      "click": function($event) {
        return _vm.openCalendar()
      }
    }
  }, [_vm._v("查看更多")])]), _vm._v(" "), _c('div', {
    staticClass: "one_week"
  }, [_c('div', {
    staticClass: "week-header"
  }, _vm._l((_vm.index.one_week), function(ww) {
    return _c('div', {
      staticClass: "item"
    }, [_c('span', {
      staticClass: "month"
    }, [_vm._v(_vm._s(ww.month))]), _c('span', {
      staticClass: "day"
    }, [_vm._v(_vm._s(ww.day))]), _vm._v(" "), _c('span', {
      staticClass: "week"
    }, [_vm._v(_vm._s(ww.week))])])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "week-container"
  }, _vm._l((_vm.data_for_week), function(ww) {
    return _c('div', {
      staticClass: "item"
    }, _vm._l((ww), function(w) {
      return _c('div', {
        staticClass: "pro-item",
        on: {
          "click": function($event) {
            return _vm.openSinglePage(_vm.user_status, 'pst', w.pst_id, 2, w.ug_id)
          }
        }
      }, [_c('span', {
        staticClass: "pt_name",
        on: {
          "mouseover": function($event) {
            return _vm.openHover(w.pt_name, w.pst_name, w.pst_executiondate, w.ud_name, $event)
          },
          "mouseleave": function($event) {
            return _vm.closeHover()
          }
        }
      }, [_vm._v(_vm._s(w.pst_name))])])
    }), 0)
  }), 0)])]), _vm._v(" "), _c('div', {
    staticClass: "project-wrapper"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "project-list"
  }, [_vm._m(3), _vm._v(" "), _vm._l((_vm.index.sub_projects_all), function(ww) {
    return _c('div', {
      staticClass: "project-item cursor",
      on: {
        "click": function($event) {
          return _vm.openSinglePage(_vm.user_status, 'pst', ww.pst_id, 2, ww.ug_id)
        }
      }
    }, [_c('div', {
      staticClass: "table-item pt_name"
    }, [_vm._v(_vm._s(ww.pst_name))]), _vm._v(" "), (ww.pmc_name) ? _c('div', {
      staticClass: "table-item pmc_name"
    }, [_vm._v(_vm._s(ww.pmc_name))]) : _c('div', {
      staticClass: "table-item pmc_name"
    }, [_vm._v("未設定")]), _vm._v(" "), (ww.prsc_name) ? _c('div', {
      staticClass: "table-item prsc_name"
    }, [_vm._v(_vm._s(ww.prsc_name))]) : _c('div', {
      staticClass: "table-item prsc_name"
    }, [_vm._v("未設定")]), _vm._v(" "), (ww.peic_name) ? _c('div', {
      staticClass: "table-item peic_name"
    }, [_vm._v(_vm._s(ww.peic_name))]) : _c('div', {
      staticClass: "table-item peic_name"
    }, [_vm._v("未設定")]), _vm._v(" "), _c('div', {
      staticClass: "table-item pst_completiondate"
    }, [_vm._v(_vm._s(ww.pst_completiondate))]), _vm._v(" "), _c('div', {
      staticClass: "table-item psc_name"
    }, [(ww.psc_name) ? _c('p', {
      class: {
        'color1': ww.psc_id == 1, 'color2': ww.psc_id == 2, 'color3': ww.psc_id == 3, 'color4': ww.psc_id == 4 || ww.psc_id == 5, 'color5': ww.psc_id == 6 || ww.psc_id == 7 || ww.psc_id == 8, 'color6': ww.psc_id == 9
      }
    }, [_vm._v(_vm._s(ww.psc_name))]) : _c('p', {
      staticClass: "color1"
    }, [_vm._v("-")])])])
  })], 2)])]) : _c('div', {
    staticClass: "container-wrapper index-month"
  }, [_c('div', {
    staticClass: "title-wrapper"
  }, [_c('p', {
    staticClass: "title cursor",
    on: {
      "click": function($event) {
        _vm.index.read_more = false
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-arrow-left"
  }), _c('span', {
    staticClass: "year-and-month"
  }, [_vm._v(_vm._s(_vm.index.now_page_year) + "/" + _vm._s(_vm.index.now_page_month + 1))])]), _vm._v(" "), _c('div', {
    staticClass: "change_month"
  }, [_c('div', {
    staticClass: "pre_one cursor",
    on: {
      "click": function($event) {
        return _vm.changeMonth('pre')
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-chevron-left"
  })]), _vm._v(" "), _c('div', {
    staticClass: "today cursor",
    on: {
      "click": function($event) {
        return _vm.changeMonth('today')
      }
    }
  }, [_vm._v("今日")]), _vm._v(" "), _c('div', {
    staticClass: "next_one cursor",
    on: {
      "click": function($event) {
        return _vm.changeMonth('next')
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-chevron-right"
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "monthly-calendar-wrapper"
  }, [_c('div', {
    staticClass: "one_month"
  }, [_c('div', {
    staticClass: "month-header"
  }, _vm._l((_vm.index.week_cn), function(ww) {
    return _c('div', {
      staticClass: "item"
    }, [_c('span', {
      staticClass: "week"
    }, [_vm._v(_vm._s(ww))])])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "month-container"
  }, _vm._l((_vm.data_for_month), function(ww) {
    return _c('div', {
      staticClass: "item",
      class: {
        'weekend': ww.week == 0 || ww.week == 6, 'weekday': ww.week != 0 && ww.week != 6
      }
    }, [_c('span', {
      staticClass: "day",
      class: {
        'today': ww.day == _vm.index.today.day && ww.month == _vm.index.today.month && ww.year == _vm.index.today.year
      }
    }, [_vm._v(_vm._s(ww.day))]), _vm._v(" "), _c('div', {
      staticClass: "pro-item"
    }, _vm._l((ww.sub_projects_month), function(sub) {
      return _c('div', {
        staticClass: "pst_name",
        on: {
          "click": function($event) {
            return _vm.openSinglePage(_vm.user_status, 'pst', sub.pst_id, 2, sub.ug_id)
          },
          "mouseover": function($event) {
            return _vm.openHover(sub.pt_name, sub.pst_name, sub.pst_executiondate, sub.ud_name, $event)
          },
          "mouseleave": function($event) {
            return _vm.closeHover()
          }
        }
      }, [_c('p', [_vm._v(_vm._s(sub.pst_name))])])
    }), 0)])
  }), 0)])])])]) : _vm._e(), _vm._v(" "), (!isNaN(_vm.url_show_block)) ? _c('div', {
    staticClass: "project",
    attrs: {
      "id": "page-container"
    }
  }, [_c('div', {
    staticClass: "left"
  }, [_c('ul', {
    staticClass: "tags_wrap"
  }, [(_vm.project.sub_nav == 'all') ? _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'all'
    },
    attrs: {
      "draggable": "false"
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'all', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      },
      "drop": function($event) {
        return _vm.changeProjectItem('all')
      },
      "dragover": function($event) {
        return _vm.allowDrop($event)
      }
    }
  }, [_vm._m(4)]) : _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'all'
    },
    attrs: {
      "onmouseover": "$(this).find('img').attr('src','/image/desktop-solid_hover.png')",
      "onmouseout": "$(this).find('img').attr('src','/image/desktop-solid.png')",
      "draggable": "false"
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'all', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      },
      "drop": function($event) {
        return _vm.changeProjectItem('all')
      },
      "dragover": function($event) {
        return _vm.allowDrop($event)
      }
    }
  }, [_vm._m(5)]), _vm._v(" "), ((_vm.user_status.ud_admin || _vm.user_auth.pt_admin) && _vm.project.sub_nav == 'wait') ? _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'wait'
    },
    attrs: {
      "draggable": "false"
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'wait', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      },
      "drop": function($event) {
        return _vm.changeProjectItem('wait')
      },
      "dragover": function($event) {
        return _vm.allowDrop($event)
      }
    }
  }, [_vm._m(6)]) : ((_vm.user_status.ud_admin || _vm.user_auth.pt_admin) && _vm.project.sub_nav != 'wait') ? _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'wait'
    },
    attrs: {
      "onmouseover": "$(this).find('img').attr('src','/image/clipboard-regular_hover.png')",
      "onmouseout": "$(this).find('img').attr('src','/image/clipboard-regular.png')",
      "draggable": "false"
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'wait', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      },
      "drop": function($event) {
        return _vm.changeProjectItem('wait')
      },
      "dragover": function($event) {
        return _vm.allowDrop($event)
      }
    }
  }, [_vm._m(7)]) : _vm._e(), _vm._v(" "), (_vm.project.sub_nav == 'finish') ? _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'finish'
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'finish', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      }
    }
  }, [_vm._m(8)]) : _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'finish'
    },
    attrs: {
      "onmouseover": "$(this).find('img').attr('src','/image/clipboard-check-solid_hover.png')",
      "onmouseout": "$(this).find('img').attr('src','/image/clipboard-check-solid.png')"
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'finish', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      }
    }
  }, [_vm._m(9)]), _vm._v(" "), _vm._l((_vm.project.user_tags), function(tag) {
    return (tag.ug_id == _vm.project.project_ug_id) ? _c('li', {
      directives: [{
        name: "rightMenu",
        rawName: "v-rightMenu",
        value: (_vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.project.menudata : false),
        expression: "user_status.ud_admin || user_auth.pt_admin ?project.menudata : false"
      }],
      class: {
        'current': _vm.project.sub_nav == tag.tm_id
      },
      attrs: {
        "draggable": "false"
      },
      on: {
        "click": function($event) {
          _vm.project.sub_nav = tag.tm_id, _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
        },
        "drop": function($event) {
          return _vm.drop(tag.tm_id)
        },
        "dragover": function($event) {
          return _vm.allowDrop($event)
        },
        "mouseup": function($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) { return null; }
          if ('button' in $event && $event.button !== 2) { return null; }
          return _vm.updateTagData(tag.tm_id, tag.tm_url, tag.tm_name)
        }
      }
    }, [_c('div', {
      staticClass: "tag_item"
    }, [_c('img', {
      attrs: {
        "src": tag.tm_url,
        "alt": "",
        "draggable": "false"
      }
    }), _vm._v(" "), _c('p', {
      attrs: {
        "draggable": "false"
      }
    }, [_vm._v(_vm._s(tag.tm_name))])])]) : _vm._e()
  }), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.pt_admin) ? _c('li', {
    staticClass: "add_tag",
    on: {
      "click": function($event) {
        _vm.project.create_tag_open = true, _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.project.tag_type = 'create', _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      }
    }
  }, [_vm._m(10)]) : _vm._e()], 2)]), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "right_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [(_vm.project.sub_nav == 'all') ? _c('div', {
    staticClass: "project_status"
  }, [_c('div', {
    staticClass: "project_title dropdown_item",
    on: {
      "click": function($event) {
        return _vm.openDropdownMenu('project', 'show', 2, $event)
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.project_status))]), (_vm.checkToOpenDropDown('project', 'show', 2)) ? _c('i', {
    staticClass: "fas fa-chevron-up dropdown_item"
  }) : _c('i', {
    staticClass: "fas fa-chevron-down dropdown_item"
  })]), _vm._v(" "), (_vm.checkToOpenDropDown('project', 'show', 2)) ? _c('ul', {
    staticClass: "project_content dd_wrap"
  }, [_c('li', {
    staticClass: "dd_wrap",
    class: {
      'current': _vm.project.project_status == '全部任務'
    },
    on: {
      "click": function($event) {
        _vm.project.project_status = '全部任務', _vm.closeDateTimePicker(true)
      }
    }
  }, [_vm._v("全部任務")]), _vm._v(" "), _c('li', {
    staticClass: "dd_wrap",
    class: {
      'current': _vm.project.project_status == '最愛'
    },
    on: {
      "click": function($event) {
        _vm.project.project_status = '最愛', _vm.closeDateTimePicker(true)
      }
    }
  }, [_vm._v("最愛")]), _vm._v(" "), _c('li', {
    staticClass: "dd_wrap",
    class: {
      'current': _vm.project.project_status == '待排程'
    },
    on: {
      "click": function($event) {
        _vm.project.project_status = '待排程', _vm.closeDateTimePicker(true)
      }
    }
  }, [_vm._v("待排程")]), _vm._v(" "), _c('li', {
    staticClass: "dd_wrap",
    class: {
      'current': _vm.project.project_status == '待確認'
    },
    on: {
      "click": function($event) {
        _vm.project.project_status = '待確認', _vm.closeDateTimePicker(true)
      }
    }
  }, [_vm._v("待確認")]), _vm._v(" "), _c('li', {
    staticClass: "dd_wrap",
    class: {
      'current': _vm.project.project_status == '進行中'
    },
    on: {
      "click": function($event) {
        _vm.project.project_status = '進行中', _vm.closeDateTimePicker(true)
      }
    }
  }, [_vm._v("進行中")])]) : _vm._e()]) : _vm._e(), _vm._v(" "), ((_vm.user_status.ud_admin || _vm.user_auth.pt_admin) && _vm.project.sub_nav != 'finish') ? _c('div', {
    staticClass: "btn_create",
    on: {
      "click": function($event) {
        _vm.project.create_project_status ? _vm.project.create_project_status = false : _vm.project.create_project_status = true
      }
    }
  }, [_vm._v("新增任務")]) : _vm._e()]), _vm._v(" "), (_vm.project.create_project_status) ? _c('div', {
    staticClass: "create_project"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "pt_name",
      "placeholder": "輸入新任務名稱"
    }
  }), _c('i', {
    staticClass: "far fa-times-circle close",
    on: {
      "click": function($event) {
        _vm.project.create_project_status = false
      }
    }
  }), _c('i', {
    staticClass: "far fa-check-circle check",
    on: {
      "click": function($event) {
        _vm.createProject(), _vm.project.create_project_status = false
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "head_wrap row"
  }, [_c('div', {
    staticClass: "head_text cell ellipsis"
  }, [_c('i', {
    staticClass: "fas fa-list-ul dropdown_item",
    on: {
      "click": function($event) {
        return _vm.openDropdownMenu('list', 'show', 1, $event)
      }
    }
  }), _vm._v(" "), (_vm.checkToOpenDropDown('list', 'show', 1)) ? _c('ul', {
    staticClass: "title_list dd_wrap"
  }, [_c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pmc_name),
      expression: "project.list_field_show_or_not.all.pmc_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pmc_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pmc_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pmc_name) ? _vm._i(_vm.project.list_field_show_or_not.all.pmc_name, null) > -1 : (_vm.project.list_field_show_or_not.all.pmc_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pmc_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pmc_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pmc_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pmc_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pmc_name"
    }
  }, [_vm._v("里程碑")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.prsc_name),
      expression: "project.list_field_show_or_not.all.prsc_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "prsc_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.prsc_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.prsc_name) ? _vm._i(_vm.project.list_field_show_or_not.all.prsc_name, null) > -1 : (_vm.project.list_field_show_or_not.all.prsc_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.prsc_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "prsc_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "prsc_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "prsc_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "prsc_name"
    }
  }, [_vm._v("需求類別")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.peic_name),
      expression: "project.list_field_show_or_not.all.peic_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "peic_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.peic_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.peic_name) ? _vm._i(_vm.project.list_field_show_or_not.all.peic_name, null) > -1 : (_vm.project.list_field_show_or_not.all.peic_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.peic_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "peic_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "peic_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "peic_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "peic_name"
    }
  }, [_vm._v("執行項目")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pst_requiredate),
      expression: "project.list_field_show_or_not.all.pst_requiredate"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pst_requiredate"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pst_requiredate,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pst_requiredate) ? _vm._i(_vm.project.list_field_show_or_not.all.pst_requiredate, null) > -1 : (_vm.project.list_field_show_or_not.all.pst_requiredate)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pst_requiredate,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_requiredate", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_requiredate", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pst_requiredate", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pst_requiredate"
    }
  }, [_vm._v("需求/確認日期")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pst_executiondate),
      expression: "project.list_field_show_or_not.all.pst_executiondate"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pst_executiondate"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pst_executiondate,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pst_executiondate) ? _vm._i(_vm.project.list_field_show_or_not.all.pst_executiondate, null) > -1 : (_vm.project.list_field_show_or_not.all.pst_executiondate)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pst_executiondate,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_executiondate", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_executiondate", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pst_executiondate", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pst_executiondate"
    }
  }, [_vm._v("執行日期")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pst_completiondate),
      expression: "project.list_field_show_or_not.all.pst_completiondate"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pst_completiondate"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pst_completiondate,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pst_completiondate) ? _vm._i(_vm.project.list_field_show_or_not.all.pst_completiondate, null) > -1 : (_vm.project.list_field_show_or_not.all.pst_completiondate)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pst_completiondate,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_completiondate", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_completiondate", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pst_completiondate", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pst_completiondate"
    }
  }, [_vm._v("完成日期")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.ud_name),
      expression: "project.list_field_show_or_not.all.ud_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "ud_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.ud_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.ud_name) ? _vm._i(_vm.project.list_field_show_or_not.all.ud_name, null) > -1 : (_vm.project.list_field_show_or_not.all.ud_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.ud_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "ud_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "ud_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "ud_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "ud_name"
    }
  }, [_vm._v("執行者")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.psc_name),
      expression: "project.list_field_show_or_not.all.psc_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "psc_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.psc_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.psc_name) ? _vm._i(_vm.project.list_field_show_or_not.all.psc_name, null) > -1 : (_vm.project.list_field_show_or_not.all.psc_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.psc_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "psc_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "psc_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "psc_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "psc_name"
    }
  }, [_vm._v("狀態")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.ppc_name),
      expression: "project.list_field_show_or_not.all.ppc_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "ppc_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.ppc_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.ppc_name) ? _vm._i(_vm.project.list_field_show_or_not.all.ppc_name, null) > -1 : (_vm.project.list_field_show_or_not.all.ppc_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.ppc_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "ppc_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "ppc_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "ppc_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "ppc_name"
    }
  }, [_vm._v("優先權")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pst_spendtime),
      expression: "project.list_field_show_or_not.all.pst_spendtime"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pst_spendtime"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pst_spendtime,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pst_spendtime) ? _vm._i(_vm.project.list_field_show_or_not.all.pst_spendtime, null) > -1 : (_vm.project.list_field_show_or_not.all.pst_spendtime)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pst_spendtime,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_spendtime", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_spendtime", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pst_spendtime", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pst_spendtime"
    }
  }, [_vm._v("時間")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pt_backup),
      expression: "project.list_field_show_or_not.all.pt_backup"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pt_backup"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pt_backup,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pt_backup) ? _vm._i(_vm.project.list_field_show_or_not.all.pt_backup, null) > -1 : (_vm.project.list_field_show_or_not.all.pt_backup)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pt_backup,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pt_backup", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pt_backup", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pt_backup", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pt_backup"
    }
  }, [_vm._v("備份")])])])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell star"
  }), _vm._v(" "), _c('div', {
    staticClass: "head_text cell pt_name"
  }, [_vm._v("任務\n                            "), (!_vm.project.subprojects_show) ? _c('i', {
    staticClass: "fas fa-chevron-circle-down cursor",
    on: {
      "click": function($event) {
        _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      }
    }
  }) : _c('i', {
    staticClass: "fas fa-chevron-circle-up cursor",
    on: {
      "click": function($event) {
        _vm.showAllSubprojectsOrNot(false), _vm.project.subprojects_show = false
      }
    }
  })]), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pmc_name) ? _c('div', {
    staticClass: "head_text cell pmc_name"
  }, [_vm._v("里程碑")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.prsc_name) ? _c('div', {
    staticClass: "head_text cell prsc_name"
  }, [_vm._v("需求類別")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.peic_name) ? _c('div', {
    staticClass: "head_text cell peic_name"
  }, [_vm._v("執行項目")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pst_requiredate) ? _c('div', {
    staticClass: "head_text cell pst_requiredate"
  }, [_vm._v("需求/確認日期")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pst_executiondate) ? _c('div', {
    staticClass: "head_text cell pst_executiondate"
  }, [_vm._v("執行日期")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pst_completiondate) ? _c('div', {
    staticClass: "head_text cell pst_completiondate"
  }, [_vm._v("完成日期")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.ud_name) ? _c('div', {
    staticClass: "head_text cell ud_name"
  }, [_vm._v("執行者")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.psc_name) ? _c('div', {
    staticClass: "head_text cell psc_name"
  }, [_vm._v("狀態")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.ppc_name) ? _c('div', {
    staticClass: "head_text cell ppc_name"
  }, [_vm._v("優先權")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pst_spendtime) ? _c('div', {
    staticClass: "head_text cell pst_spendtime"
  }, [_vm._v("時間")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pt_backup) ? _c('div', {
    staticClass: "head_text cell pt_backup"
  }, [_vm._v("備份")]) : _vm._e()]), _vm._v(" "), _vm._l((_vm.new_projects), function(pro) {
    return _c('div', {
      staticClass: "content_wrap row_group",
      class: 'list' + pro.pt_id
    }, [_c('div', {
      staticClass: "main_project row",
      on: {
        "click": function($event) {
          return _vm.showSubProject($event, pro.pt_id)
        }
      }
    }, [(_vm.user_status.ud_admin || _vm.user_auth.pt_admin) ? _c('div', {
      staticClass: "content_text cell ellipsis cursor",
      attrs: {
        "draggable": "true"
      },
      on: {
        "dragstart": function($event) {
          return _vm.drag("pt_id", pro.pt_id)
        },
        "dragend": function($event) {
          return _vm.dragend()
        }
      }
    }, [_c('i', {
      staticClass: "fas fa-ellipsis-v"
    })]) : _c('div', {
      staticClass: "content_text cell ellipsis"
    }), _vm._v(" "), _c('div', {
      staticClass: "content_text cell star"
    }, [(_vm.showFavoriteFirst(pro.pt_id)) ? _c('i', {
      staticClass: "fas fa-star",
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.deleteFavorite(pro.pt_id) : false
        }
      }
    }) : _c('i', {
      staticClass: "far fa-star",
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.createFavorite(pro.pt_id) : false
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pt_name"
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.pro_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.pro_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }],
      staticClass: "overover cursor",
      on: {
        "click": function($event) {
          return _vm.openSinglePage(_vm.user_status, 'pt', pro.pt_id, 1, pro.ug_id)
        }
      }
    }, [_vm._v(_vm._s(pro.pt_name))])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pmc_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pmc_name == true
      }
    }, [(pro.pmc_name) ? _c('span', [_vm._v(_vm._s(pro.pmc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell prsc_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.prsc_name == true
      }
    }, [(pro.prsc_name) ? _c('span', [_vm._v(_vm._s(pro.prsc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell peic_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.peic_name == true
      }
    }, [_c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pst_requiredate",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pst_requiredate == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('pt_requiredate', 'pt_id', pro.pt_id, $event) : false
        }
      }
    }, [(pro.pt_requiredate) ? _c('span', {
      staticClass: "dropdown_item"
    }, [_vm._v(_vm._s(pro.pt_requiredate))]) : _c('span', {
      staticClass: "dropdown_item"
    }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('pt_requiredate', 'pt_id', pro.pt_id)) ? _c('datetimepicker', {
      attrs: {
        "id": pro.pt_id,
        "type": "pt_id",
        "date": pro.pt_requiredate,
        "position": _vm.dropdown.position
      },
      on: {
        "get-close": _vm.closeDateTimePicker,
        "get-newdate": _vm.changeRequireDate
      }
    }) : _vm._e()], 1), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pst_executiondate",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pst_executiondate == true
      }
    }, [_c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pst_completiondate",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pst_completiondate == true
      }
    }, [_c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ud_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.ud_name == true
      }
    }, [_c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell psc_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.psc_name == true
      }
    }, [_c('p', {
      staticClass: "color1"
    }, [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ppc_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.ppc_name == true
      }
    }, [(pro.ppc_name) ? _c('p', {
      class: {
        'red': pro.ppc_id == 3
      }
    }, [_vm._v(_vm._s(pro.ppc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pst_spendtime",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pst_spendtime == true
      }
    }, [_c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pt_backup",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pt_backup == true
      }
    }, [(pro.pt_backup == 0) ? _c('i', {
      staticClass: "far fa-square icon_backup"
    }) : (pro.pt_backup == 1) ? _c('i', {
      staticClass: "fas fa-check-square icon_backup"
    }) : _vm._e()])]), _vm._v(" "), _vm._l((pro.sub_projects), function(sub) {
      return _c('div', {
        staticClass: "sub_project row sub_item",
        class: {
          'changeColor': _vm.project.drag_pt_id == pro.pt_id && _vm.project.drag_over_pst_id == sub.pst_id, 'dropTarget': _vm.project.drag_pt_id == pro.pt_id && _vm.project.drag_pst_id == sub.pst_id
        },
        attrs: {
          "draggable": "true"
        },
        on: {
          "dragstart": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.dragToChangeProjectSort("start", pro.pt_id, sub.pst_id) : false
          },
          "dragend": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.dragToChangeProjectSort("end", pro.pt_id, sub.pst_id) : false
          },
          "drop": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.dragToChangeProjectSort("drop", pro.pt_id, sub.pst_id) : false
          },
          "dragover": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.allowDrop($event) : false
          },
          "dragenter": function($event) {
            return _vm.comingsoon(sub.pst_id)
          }
        }
      }, [(_vm.user_status.ud_admin || _vm.user_auth.pt_admin) ? _c('div', {
        staticClass: "content_text cell ellipsis cursor"
      }, [_c('i', {
        staticClass: "fas fa-sort"
      })]) : _c('div', {
        staticClass: "content_text cell ellipsis"
      }), _vm._v(" "), _c('div', {
        staticClass: "content_text cell star"
      }), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pt_name"
      }, [_c('span', {
        directives: [{
          name: "highlight",
          rawName: "v-highlight",
          value: ({
            keyword: _vm.search_condition.pro_content,
            overWriteStyle: {
              color: '#EC4683'
            },
            sensitive: false
          }),
          expression: "{keyword: search_condition.pro_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
        }],
        staticClass: "overover",
        class: {
          'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin || _vm.user_status.ud_id == sub.ud_id
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin || _vm.user_status.ud_id == sub.ud_id ? _vm.openSinglePage(_vm.user_status, 'pst', sub.pst_id, 1, pro.ug_id) : false
          }
        }
      }, [_vm._v(_vm._s(sub.pst_name))])]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pmc_name",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pmc_name == true
        }
      }, [(pro.pmc_name) ? _c('span', [_vm._v(_vm._s(pro.pmc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell prsc_name",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.prsc_name == true
        }
      }, [(pro.prsc_name) ? _c('span', [_vm._v(_vm._s(pro.prsc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell peic_name dropdown_item",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.peic_name == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('peic_name', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.peic_name) ? _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v(_vm._s(sub.peic_name))]) : _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('peic_name', 'pst_id', sub.pst_id)) ? _c('div', {
        staticClass: "drop_down_wrap dd_wrap",
        class: {
          'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
        }
      }, [_c('ul', {
        staticClass: "infor_ul dd_wrap"
      }, _vm._l((_vm.project.executeitem_cate), function(item) {
        return _c('li', {
          staticClass: "infor_li dd_wrap",
          class: {
            'current': sub.peic_id == item.peic_id
          },
          on: {
            "click": function($event) {
              return _vm.changeExecuteItem(sub.pst_id, item.peic_id)
            }
          }
        }, [_vm._v(_vm._s(item.peic_name))])
      }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pst_requiredate",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pst_requiredate == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('pst_requiredate', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.pst_requiredate) ? _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v(_vm._s(sub.pst_requiredate))]) : _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('pst_requiredate', 'pst_id', sub.pst_id)) ? _c('datetimepicker', {
        attrs: {
          "id": sub.pst_id,
          "type": "pst_id",
          "date": sub.pst_requiredate,
          "position": _vm.dropdown.position
        },
        on: {
          "get-close": _vm.closeDateTimePicker,
          "get-newdate": _vm.changeRequireDate
        }
      }) : _vm._e()], 1), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pst_executiondate",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pst_executiondate == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('pst_executiondate', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.pst_executiondate) ? _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v(_vm._s(sub.pst_executiondate))]) : _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('pst_executiondate', 'pst_id', sub.pst_id)) ? _c('datetimepicker', {
        attrs: {
          "id": sub.pst_id,
          "type": "pst_id",
          "date": sub.pst_executiondate,
          "position": _vm.dropdown.position
        },
        on: {
          "get-close": _vm.closeDateTimePicker,
          "get-newdate": _vm.changeExecutiondate
        }
      }) : _vm._e()], 1), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pst_completiondate",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pst_completiondate == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('pst_completiondate', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.pst_completiondate) ? _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v(_vm._s(sub.pst_completiondate))]) : _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('pst_completiondate', 'pst_id', sub.pst_id)) ? _c('datetimepicker', {
        attrs: {
          "id": sub.pst_id,
          "type": "pst_id",
          "date": sub.pst_completiondate,
          "position": _vm.dropdown.position
        },
        on: {
          "get-close": _vm.closeDateTimePicker,
          "get-newdate": _vm.changeCompletiondate
        }
      }) : _vm._e()], 1), _vm._v(" "), _c('div', {
        staticClass: "content_text cell ud_name",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.ud_name == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('ud_name', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.ud_name) ? _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v(_vm._s(sub.ud_name))]) : _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('ud_name', 'pst_id', sub.pst_id)) ? _c('div', {
        staticClass: "drop_down_wrap user dd_wrap",
        class: {
          'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
        }
      }, [_c('ul', {
        staticClass: "infor_ul dd_wrap"
      }, _vm._l((_vm.usercate_for_group), function(user) {
        return _c('li', {
          staticClass: "infor_li dd_wrap",
          class: {
            'current': sub.ud_id == user.ud_id
          },
          on: {
            "click": function($event) {
              return _vm.changeUser(sub.pst_id, user.ud_id)
            }
          }
        }, [(user.ud_icon) ? _c('img', {
          staticClass: "dd_wrap",
          attrs: {
            "src": user.ud_icon,
            "alt": ""
          }
        }) : _c('img', {
          staticClass: "dd_wrap",
          attrs: {
            "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
            "alt": ""
          }
        }), _vm._v("\n                                            " + _vm._s(user.ud_name) + "\n                                        ")])
      }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell psc_name",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.psc_name == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('psc_name', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.psc_name) ? _c('p', {
        staticClass: "dropdown_item",
        class: {
          'color1': sub.psc_id == 1, 'color2': sub.psc_id == 2, 'color3': sub.psc_id == 3, 'color4': sub.psc_id == 4 || sub.psc_id == 5, 'color5': sub.psc_id == 6 || sub.psc_id == 7 || sub.psc_id == 8, 'color6': sub.psc_id == 9
        }
      }, [_vm._v(_vm._s(sub.psc_name))]) : _c('p', {
        staticClass: "color1 dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('psc_name', 'pst_id', sub.pst_id)) ? _c('div', {
        staticClass: "drop_down_wrap status dd_wrap",
        class: {
          'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
        }
      }, [_c('ul', {
        staticClass: "infor_ul dd_wrap"
      }, _vm._l((_vm.project.status_cate), function(status) {
        return _c('li', {
          staticClass: "infor_li dd_wrap",
          class: {
            'current': sub.psc_id == status.psc_id
          },
          on: {
            "click": function($event) {
              return _vm.changeStatus(sub.pst_id, status.psc_id)
            }
          }
        }, [_c('span', {
          staticClass: "dd_wrap",
          class: {
            'color1': status.psc_id == 1, 'color2': status.psc_id == 2, 'color3': status.psc_id == 3, 'color4': status.psc_id == 4 || status.psc_id == 5, 'color5': status.psc_id == 6 || status.psc_id == 7 || status.psc_id == 8, 'color6': status.psc_id == 9
          }
        }), _vm._v(_vm._s(status.psc_name))])
      }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell ppc_name",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.ppc_name == true
        }
      }, [(sub.ppc_name) ? _c('p', {
        class: {
          'red': sub.ppc_id == 3
        }
      }, [_vm._v(_vm._s(sub.ppc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pst_spendtime",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pst_spendtime == true
        }
      }, [(sub.pst_spendtime) ? _c('span', [_vm._v(_vm._s(sub.pst_spendtime) + "h")]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pt_backup",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pt_backup == true
        }
      })])
    }), _vm._v(" "), _c('div', {
      staticClass: "row add_sub_project"
    }, [_c('div', {
      staticClass: "cell"
    }), _vm._v(" "), _c('div', {
      staticClass: "cell margin_a_little"
    }), _vm._v(" "), ((_vm.user_status.ud_admin || _vm.user_auth.pt_admin)) ? _c('div', {
      staticClass: "cell add_sub_item sub_item"
    }, [(!_vm.project.create_subproject_status || _vm.project.open_project_id != pro.pt_id) ? _c('span', {
      on: {
        "click": function($event) {
          _vm.project.create_subproject_status = true, _vm.project.open_project_id = pro.pt_id
        }
      }
    }, [_vm._v("添加子任務")]) : _vm._e(), _vm._v(" "), (_vm.project.create_subproject_status && _vm.project.open_project_id == pro.pt_id) ? _c('div', {
      staticClass: "create_subproject"
    }, [_c('input', {
      attrs: {
        "type": "text",
        "name": "pst_name",
        "placeholder": "輸入新子任務名稱"
      }
    }), _c('i', {
      staticClass: "far fa-times-circle close",
      on: {
        "click": function($event) {
          _vm.project.create_subproject_status = false
        }
      }
    }), _c('i', {
      staticClass: "far fa-check-circle check",
      on: {
        "click": function($event) {
          _vm.project.create_subproject_status = false, _vm.createSubProject(pro.pt_id)
        }
      }
    })]) : _vm._e()]) : _vm._e()])], 2)
  })], 2), _vm._v(" "), (_vm.new_projects.length == 0 && _vm.search_condition.pro_content != '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("查無任務")]) : (_vm.new_projects.length == 0 && _vm.search_condition.pro_content == '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("暫無任務")]) : _vm._e()])])]) : _vm._e(), _vm._v(" "), (_vm.url_show_block == 'announcement-list') ? _c('div', {
    staticClass: "announcement",
    attrs: {
      "id": "page-container"
    }
  }, [_c('div', {
    staticClass: "left"
  }, [_c('ul', {
    staticClass: "tags_wrap"
  }, [_c('li', {
    class: {
      'current': _vm.announcement.sub_nav == 0
    },
    on: {
      "click": function($event) {
        _vm.announcement.sub_nav = 0, _vm.closeAll()
      },
      "mouseover": function($event) {
        _vm.announcement.tabHover = 0
      },
      "mouseleave": function($event) {
        _vm.announcement.tabHover = -1
      }
    }
  }, [_c('div', {
    staticClass: "tag_item"
  }, [(_vm.announcement.sub_nav == 0 || _vm.announcement.tabHover == 0) ? _c('img', {
    attrs: {
      "src": "/image/coffee-solid_hover.png"
    }
  }) : _c('img', {
    attrs: {
      "src": "/image/coffee-solid.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("部級公告")])])]), _vm._v(" "), _vm._l((_vm.user_group), function(group) {
    return _c('li', {
      class: {
        'current': _vm.announcement.sub_nav == group.ug_id
      },
      on: {
        "click": function($event) {
          _vm.announcement.sub_nav = group.ug_id, _vm.closeAll()
        },
        "mouseover": function($event) {
          _vm.announcement.tabHover = group.ug_id
        },
        "mouseleave": function($event) {
          _vm.announcement.tabHover = -1
        }
      }
    }, [_c('div', {
      staticClass: "tag_item"
    }, [(_vm.announcement.sub_nav == group.ug_id || _vm.announcement.tabHover == group.ug_id) ? _c('img', {
      attrs: {
        "src": "/image/coffee-solid_hover.png"
      }
    }) : _c('img', {
      attrs: {
        "src": "/image/coffee-solid.png"
      }
    }), _vm._v(" "), _c('p', [_vm._v(_vm._s(group.ug_name_forshort) + " 公告")])])])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "right ann"
  }, [_c('div', {
    staticClass: "right_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [(_vm.user_status.ud_admin || _vm.user_auth.ai_admin) ? _c('div', {
    staticClass: "btn_create dd_wrap",
    on: {
      "click": function($event) {
        _vm.announcement.create_ann_open ? _vm.announcement.create_ann_open = false : _vm.announcement.create_ann_open = true
      }
    }
  }, [_vm._v("新增公告")]) : _vm._e()]), _vm._v(" "), (_vm.announcement.create_ann_open) ? _c('div', {
    staticClass: "create_project dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "ai_title",
      "placeholder": "輸入新公告標題"
    }
  }), _c('i', {
    staticClass: "far fa-times-circle close dd_wrap",
    on: {
      "click": function($event) {
        _vm.announcement.create_ann_open = false
      }
    }
  }), _c('i', {
    staticClass: "far fa-check-circle check dd_wrap",
    on: {
      "click": function($event) {
        return _vm.createAnn()
      }
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.new_data.length > 0) ? _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "head_wrap row"
  }, [_c('div', {
    staticClass: "head_text cell star"
  }), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ai_title"
  }), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ai_expirydate"
  }, [_vm._v("到期日")]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ai_reminderdate"
  }, [_vm._v("提醒")]), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.ai_admin) ? _c('div', {
    staticClass: "head_text cell btn_delete"
  }) : _vm._e()]), _vm._v(" "), _vm._l((_vm.new_data), function(ann) {
    return _c('div', {
      staticClass: "content_wrap row_group"
    }, [_c('div', {
      staticClass: "main_project row"
    }, [_c('div', {
      staticClass: "content_text cell star"
    }, [(ann.ai_topping == 1) ? _c('i', {
      staticClass: "fas fa-star",
      class: {
        'cursor': _vm.user_status.ud_admin || _vm.user_auth.ai_admin
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.ai_admin ? _vm.changeAnnTopping(ann.ai_id, false) : false
        }
      }
    }) : _c('i', {
      staticClass: "far fa-star",
      class: {
        'cursor': _vm.user_status.ud_admin || _vm.user_auth.ai_admin
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.ai_admin ? _vm.changeAnnTopping(ann.ai_id, true) : false
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ai_title"
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.ann_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.ann_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }],
      on: {
        "click": function($event) {
          return _vm.openSinglePage(_vm.user_status, 'ai', ann.ai_id, 3)
        }
      }
    }, [_vm._v(_vm._s(ann.ai_title))])]), _vm._v(" "), (ann.ai_expirydate) ? _c('div', {
      staticClass: "content_text cell ai_expirydate"
    }, [_vm._v(_vm._s(ann.ai_expirydate))]) : _c('div', {
      staticClass: "content_text cell ai_expirydate"
    }, [_vm._v("-")]), _vm._v(" "), (ann.url_reminderdate) ? _c('div', {
      staticClass: "content_text cell ai_reminderdate"
    }, [_vm._v(_vm._s(_vm.removeSecond(ann.url_reminderdate)))]) : _c('div', {
      staticClass: "content_text cell ai_reminderdate"
    }, [_vm._v("-")]), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.ai_admin) ? _c('div', {
      staticClass: "content_text cell btn_delete"
    }, [_c('i', {
      staticClass: "far fa-trash-alt",
      on: {
        "click": function($event) {
          return _vm.openDeletePromptBox(ann.ai_id, 1)
        }
      }
    })]) : _vm._e()])])
  })], 2) : _vm._e(), _vm._v(" "), (_vm.new_data.length == 0 && _vm.search_condition.ann_content != '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("查無公告")]) : (_vm.new_data.length == 0 && _vm.search_condition.ann_content == '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("暫無公告")]) : _vm._e()])])]) : _vm._e(), _vm._v(" "), (_vm.url_show_block == 'property-list') ? _c('div', {
    staticClass: "property",
    attrs: {
      "id": "page-container"
    }
  }, [_c('div', {
    staticClass: "right asset"
  }, [_c('div', {
    staticClass: "right_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [_c('div', {
    staticClass: "account_title"
  }, [_vm._v("資產管理")]), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.pm_admin) ? _c('div', {
    staticClass: "btn_create dd_wrap",
    on: {
      "click": function($event) {
        _vm.property.create_property_open ? _vm.closeAll() : _vm.property.create_property_open = true
      }
    }
  }, [_vm._v("新增資產")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "head_wrap row"
  }, [_c('div', {
    staticClass: "head_text cell ellipsis"
  }, [_c('i', {
    staticClass: "fas fa-list-ul dropdown_item cursor",
    on: {
      "click": function($event) {
        return _vm.openDropdownMenu('list', 'show', 1, $event)
      }
    }
  }), _vm._v(" "), (_vm.checkToOpenDropDown('list', 'show', 1)) ? _c('ul', {
    staticClass: "title_list dd_wrap"
  }, [_c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.ud_name),
      expression: "property.property_field_show_or_not.ud_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "ud_name"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.ud_name,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.ud_name) ? _vm._i(_vm.property.property_field_show_or_not.ud_name, null) > -1 : (_vm.property.property_field_show_or_not.ud_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.ud_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "ud_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "ud_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "ud_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "ud_name"
    }
  }, [_vm._v("人員")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_host),
      expression: "property.property_field_show_or_not.pm_host"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_host"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_host,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_host) ? _vm._i(_vm.property.property_field_show_or_not.pm_host, null) > -1 : (_vm.property.property_field_show_or_not.pm_host)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_host,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_host", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_host", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_host", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_host"
    }
  }, [_vm._v("主機")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_screenone),
      expression: "property.property_field_show_or_not.pm_screenone"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_screenone"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_screenone,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_screenone) ? _vm._i(_vm.property.property_field_show_or_not.pm_screenone, null) > -1 : (_vm.property.property_field_show_or_not.pm_screenone)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_screenone,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_screenone", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_screenone", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_screenone", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_screenone"
    }
  }, [_vm._v("螢幕1")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_screentwo),
      expression: "property.property_field_show_or_not.pm_screentwo"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_screentwo"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_screentwo,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_screentwo) ? _vm._i(_vm.property.property_field_show_or_not.pm_screentwo, null) > -1 : (_vm.property.property_field_show_or_not.pm_screentwo)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_screentwo,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_screentwo", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_screentwo", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_screentwo", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_screentwo"
    }
  }, [_vm._v("螢幕2")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_telephone),
      expression: "property.property_field_show_or_not.pm_telephone"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_telephone"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_telephone,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_telephone) ? _vm._i(_vm.property.property_field_show_or_not.pm_telephone, null) > -1 : (_vm.property.property_field_show_or_not.pm_telephone)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_telephone,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_telephone", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_telephone", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_telephone", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_telephone"
    }
  }, [_vm._v("話機")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_canvas),
      expression: "property.property_field_show_or_not.pm_canvas"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_canvas"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_canvas,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_canvas) ? _vm._i(_vm.property.property_field_show_or_not.pm_canvas, null) > -1 : (_vm.property.property_field_show_or_not.pm_canvas)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_canvas,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_canvas", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_canvas", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_canvas", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_canvas"
    }
  }, [_vm._v("繪圖板")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_other),
      expression: "property.property_field_show_or_not.pm_other"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_other"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_other,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_other) ? _vm._i(_vm.property.property_field_show_or_not.pm_other, null) > -1 : (_vm.property.property_field_show_or_not.pm_other)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_other,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_other", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_other", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_other", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_other"
    }
  }, [_vm._v("其他")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_adobe),
      expression: "property.property_field_show_or_not.pm_adobe"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_adobe"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_adobe,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_adobe) ? _vm._i(_vm.property.property_field_show_or_not.pm_adobe, null) > -1 : (_vm.property.property_field_show_or_not.pm_adobe)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_adobe,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_adobe", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_adobe", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_adobe", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_adobe"
    }
  }, [_vm._v("adobe")])])])]) : _vm._e()]), _vm._v(" "), (_vm.property.property_field_show_or_not.ud_name) ? _c('div', {
    staticClass: "head_text cell ud_name"
  }, [_vm._v("人員\n                        ")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_host) ? _c('div', {
    staticClass: "head_text cell pm_host"
  }, [_vm._v("主機")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_screenone) ? _c('div', {
    staticClass: "head_text cell pm_screenone"
  }, [_vm._v("螢幕1")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_screentwo) ? _c('div', {
    staticClass: "head_text cell pm_screentwo"
  }, [_vm._v("螢幕2")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_telephone) ? _c('div', {
    staticClass: "head_text cell pm_telephone"
  }, [_vm._v("話機")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_canvas) ? _c('div', {
    staticClass: "head_text cell pm_canvas"
  }, [_vm._v("繪圖板")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_other) ? _c('div', {
    staticClass: "head_text cell pm_other"
  }, [_vm._v("其他")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_adobe) ? _c('div', {
    staticClass: "head_text cell pm_adobe"
  }, [_vm._v("adobe")]) : _vm._e(), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.pm_admin) ? _c('div', {
    staticClass: "head_text cell btn_delete"
  }) : _vm._e()]), _vm._v(" "), (_vm.property.create_property_open) ? _c('div', {
    staticClass: "content_wrap row_group dd_wrap new_asset"
  }, [_c('div', {
    staticClass: "sub_project row dd_wrap"
  }, [_c('div', {
    staticClass: "content_text cell ellipsis dd_wrap"
  }), _vm._v(" "), _c('div', {
    staticClass: "content_text cell ud_name dropdown_item cursor",
    on: {
      "click": function($event) {
        return _vm.openDropdownMenu('ud_name', 'pm_id', 'create', $event)
      }
    }
  }, [(_vm.property.create_property_data.ud_name) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.property.create_property_data.ud_name))]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpenDropDown('ud_name', 'pm_id', 'create')) ? _c('div', {
    staticClass: "drop_down_wrap user dd_wrap",
    class: {
      'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
    }
  }, [_c('ul', {
    staticClass: "infor_ul dd_wrap"
  }, _vm._l((_vm.user_cate), function(user) {
    return _c('li', {
      staticClass: "infor_li dd_wrap",
      class: {
        'current': _vm.property.create_property_data.ud_id == user.ud_id
      },
      on: {
        "click": function($event) {
          _vm.property.create_property_data.ud_name = user.ud_name, _vm.property.create_property_data.ud_id = user.ud_id, _vm.closeAllDropdownMenu()
        }
      }
    }, [(user.ud_icon) ? _c('img', {
      staticClass: "dd_wrap",
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "dd_wrap",
      attrs: {
        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
        "alt": ""
      }
    }), _vm._v("\n                                            " + _vm._s(user.ud_name) + "\n                                        ")])
  }), 0)]) : _vm._e()]), _vm._v(" "), _vm._m(11), _vm._v(" "), _vm._m(12), _vm._v(" "), _vm._m(13), _vm._v(" "), _vm._m(14), _vm._v(" "), _vm._m(15), _vm._v(" "), _vm._m(16), _vm._v(" "), _vm._m(17), _vm._v(" "), _c('div', {
    staticClass: "content_text cell btn_create dd_wrap"
  }, [_c('i', {
    staticClass: "far fa-times-circle close dd_wrap",
    on: {
      "click": function($event) {
        return _vm.closeAll()
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "far fa-check-circle check dd_wrap",
    on: {
      "click": function($event) {
        return _vm.createProperty()
      }
    }
  })])])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.new_data), function(pro) {
    return _c('div', {
      staticClass: "content_wrap row_group",
      class: 'list' + pro.pm_id
    }, [_c('div', {
      staticClass: "sub_project row"
    }, [_c('div', {
      staticClass: "content_text cell ellipsis"
    }), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ud_name dropdown_item",
      class: {
        'none': !_vm.property.property_field_show_or_not.ud_name == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pm_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pm_admin
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.openDropdownMenu('ud_name', 'pm_id', pro.pm_id, $event) : false
        }
      }
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.property_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.property_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }],
      staticClass: "overover dropdown_item",
      class: {
        'cursor': _vm.user_status.ud_admin || _vm.user_auth.pm_admin
      }
    }, [_vm._v(_vm._s(pro.ud_name))]), _vm._v(" "), (_vm.checkToOpenDropDown('ud_name', 'pm_id', pro.pm_id)) ? _c('div', {
      staticClass: "drop_down_wrap user dd_wrap",
      class: {
        'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
      }
    }, [_c('ul', {
      staticClass: "infor_ul dd_wrap"
    }, _vm._l((_vm.user_cate), function(user) {
      return _c('li', {
        staticClass: "infor_li dd_wrap",
        class: {
          'current': pro.ud_id == user.ud_id
        },
        on: {
          "click": function($event) {
            return _vm.changePropertyUser(pro.pm_id, user.ud_id)
          }
        }
      }, [(user.ud_icon) ? _c('img', {
        staticClass: "dd_wrap",
        attrs: {
          "src": user.ud_icon,
          "alt": ""
        }
      }) : _c('img', {
        staticClass: "dd_wrap",
        attrs: {
          "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
          "alt": ""
        }
      }), _vm._v("\n                                            " + _vm._s(user.ud_name) + "\n                                        ")])
    }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_host dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_host == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_host', pro.pm_id) : false
        }
      }
    }, [(pro.pm_host) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_host))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_host"
      },
      domProps: {
        "value": pro.pm_host
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_host', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_screenone dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_screenone == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_screenone', pro.pm_id) : false
        }
      }
    }, [(pro.pm_screenone) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_screenone))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_screenone"
      },
      domProps: {
        "value": pro.pm_screenone
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_screenone', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_screentwo dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_screentwo == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_screentwo', pro.pm_id) : false
        }
      }
    }, [(pro.pm_screentwo) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_screentwo))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_screentwo"
      },
      domProps: {
        "value": pro.pm_screentwo
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_screentwo', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_telephone dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_telephone == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_telephone', pro.pm_id) : false
        }
      }
    }, [(pro.pm_telephone) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_telephone))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_telephone"
      },
      domProps: {
        "value": pro.pm_telephone
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_telephone', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_canvas dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_canvas == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_canvas', pro.pm_id) : false
        }
      }
    }, [(pro.pm_canvas) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_canvas))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_canvas"
      },
      domProps: {
        "value": pro.pm_canvas
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_canvas', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_other dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_other == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_other', pro.pm_id) : false
        }
      }
    }, [(pro.pm_other) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_other))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_other"
      },
      domProps: {
        "value": pro.pm_other
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_other', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_adobe dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_adobe == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_adobe', pro.pm_id) : false
        }
      }
    }, [(pro.pm_adobe) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_adobe))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_adobe"
      },
      domProps: {
        "value": pro.pm_adobe
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_adobe', pro.pm_id)
        }
      }
    })]), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.pm_admin) ? _c('div', {
      staticClass: "content_text cell btn_delete"
    }, [_c('i', {
      staticClass: "far fa-trash-alt",
      on: {
        "click": function($event) {
          return _vm.openDeletePromptBox(pro.pm_id, 6)
        }
      }
    })]) : _vm._e()])])
  })], 2), _vm._v(" "), (_vm.new_data.length == 0 && _vm.search_condition.property_content != '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("查無資產")]) : (_vm.new_data.length == 0 && _vm.search_condition.property_content == '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("暫無資產")]) : _vm._e()])])]) : _vm._e(), _vm._v(" "), (_vm.url_show_block == 'book-list') ? _c('div', {
    staticClass: "book",
    attrs: {
      "id": "page-container"
    }
  }, [_c('div', {
    staticClass: "right book"
  }, [_c('div', {
    staticClass: "book_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [_c('div', {
    staticClass: "header_top"
  }, [_c('div', {
    staticClass: "book_sort cursor dropdown_item",
    on: {
      "click": function($event) {
        _vm.book.book_infor ? _vm.openDropdownMenu('bs_name', 'bs_id', _vm.book.book_infor.bs_id, $event) : false
      }
    }
  }, [(_vm.book.book_infor && _vm.book.book_infor.bs_name) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.book.book_infor.bs_name))]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("請先新增書籍")]), _vm._v(" "), (_vm.book.book_infor && _vm.checkToOpenDropDown('bs_name', 'bs_id', _vm.book.book_infor.bs_id)) ? _c('i', {
    staticClass: "fas fa-chevron-up dropdown_item"
  }) : _c('i', {
    staticClass: "fas fa-chevron-down dropdown_item"
  }), _vm._v(" "), (_vm.book.book_infor && _vm.checkToOpenDropDown('bs_name', 'bs_id', _vm.book.book_infor.bs_id)) ? _c('div', {
    staticClass: "drop_down_wrap dd_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul dd_wrap"
  }, [(_vm.book.data_booksorts.length < 1) ? _c('li', {
    staticClass: "infor_li dd_wrap"
  }, [_vm._v("請先新增書籍")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.book.data_booksorts), function(sort) {
    return _c('li', {
      staticClass: "infor_li dd_wrap",
      class: {
        'current': _vm.book.book_infor.bs_id == sort.bs_id
      },
      on: {
        "click": function($event) {
          return _vm.changeBookSort(sort.bs_id, sort.bs_name)
        }
      }
    }, [_vm._v(_vm._s(sort.bs_name))])
  })], 2)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "book_name cursor dropdown_item",
    on: {
      "click": function($event) {
        _vm.book.book_infor ? _vm.openDropdownMenu('bi_name', 'bi_id', _vm.book.book_infor.bi_id, $event) : false
      }
    }
  }, [(_vm.book.book_infor && _vm.book.book_infor.bi_name) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.book.book_infor.bi_name))]) : (_vm.books.length < 1) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("請先新增書籍")]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.book.book_infor && _vm.checkToOpenDropDown('bi_name', 'bi_id', _vm.book.book_infor.bi_id)) ? _c('i', {
    staticClass: "fas fa-chevron-up dropdown_item"
  }) : _c('i', {
    staticClass: "fas fa-chevron-down dropdown_item"
  }), _vm._v(" "), (_vm.book.book_infor && _vm.checkToOpenDropDown('bi_name', 'bi_id', _vm.book.book_infor.bi_id)) ? _c('div', {
    staticClass: "drop_down_wrap dd_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul dd_wrap"
  }, [(_vm.books.length < 1) ? _c('li', {
    staticClass: "infor_li dd_wrap"
  }, [_vm._v("此分類無書籍")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.books), function(infor) {
    return _c('li', {
      staticClass: "infor_li dd_wrap",
      class: {
        'current': _vm.book.book_infor && _vm.book.book_infor.bi_id == infor.bi_id
      },
      on: {
        "click": function($event) {
          return _vm.selectThisBook(infor.bi_id, infor.bi_name)
        }
      }
    }, [_vm._v(_vm._s(infor.bi_name))])
  })], 2)]) : _vm._e()]), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.bi_admin) ? _c('div', {
    staticClass: "btn_create dd_wrap",
    on: {
      "click": function($event) {
        return _vm.openSinglePage(_vm.user_status, 'bi', null, 6)
      }
    }
  }, [_vm._v("新增書籍")]) : _vm._e(), _vm._v(" "), (_vm.book.book_infor && (_vm.user_status.ud_admin || _vm.user_auth.bi_admin) && _vm.book.book_infor.bi_id) ? _c('div', {
    staticClass: "btn_modify dd_wrap",
    on: {
      "click": function($event) {
        return _vm.openSinglePage(_vm.user_status, 'bi', _vm.book.book_infor.bi_id, 6)
      }
    }
  }, [_vm._v("修改書籍")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "header_bottom"
  }, [_c('div', {
    staticClass: "image_wrap"
  }, [(_vm.book.book_infor && _vm.book.book_infor.bi_fileurl) ? _c('img', {
    attrs: {
      "src": _vm.book.book_infor.bi_fileurl,
      "alt": "書籍圖片"
    }
  }) : _c('img', {
    attrs: {
      "src": "image/book.png",
      "alt": "書籍圖片"
    }
  })]), _vm._v(" "), (_vm.book.book_infor && _vm.book.book_infor.bi_name) ? _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.book.book_infor.bi_name))]) : _vm._e(), _vm._v(" "), (_vm.book.book_infor && _vm.book.book_infor.bi_purchasedate) ? _c('p', {
    staticClass: "date"
  }, [_vm._v("進貨日期： " + _vm._s(_vm.book.book_infor.bi_purchasedate))]) : _vm._e(), _vm._v(" "), (_vm.book.book_infor && _vm.book.book_infor.ud_name) ? _c('p', {
    staticClass: "user"
  }, [_vm._v("資產： " + _vm._s(_vm.book.book_infor.ud_name))]) : _vm._e(), _vm._v(" "), (_vm.book.book_infor && _vm.book.book_infor.bsc_name) ? _c('p', {
    staticClass: "status"
  }, [_vm._v("狀態： " + _vm._s(_vm.book.book_infor.bsc_name))]) : _vm._e(), _vm._v(" "), (_vm.book.book_infor && _vm.book.book_infor.bi_message) ? _c('textarea', {
    attrs: {
      "name": "",
      "id": "",
      "cols": "30",
      "rows": "10",
      "disabled": ""
    },
    domProps: {
      "value": _vm.book.book_infor.bi_message
    }
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "container_top row"
  }, [_c('div', {
    staticClass: "top_item cell"
  }, [_vm._v("借閱人")]), _vm._v(" "), _c('div', {
    staticClass: "top_item cell"
  }, [_vm._v("借閱日期")]), _vm._v(" "), _c('div', {
    staticClass: "top_item cell"
  }, [_vm._v("歸還日期")]), _vm._v(" "), _c('div', {
    staticClass: "top_item cell btn_delete"
  }, [(_vm.book.book_infor && (_vm.user_status.ud_admin || _vm.user_auth.bi_admin) && _vm.book.book_infor.bi_id) ? _c('div', {
    staticClass: "btn_create dd_wrap",
    on: {
      "click": function($event) {
        _vm.book.create_book_open ? _vm.closeAll() : _vm.book.create_book_open = true
      }
    }
  }, [_vm._v("新增借閱")]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "margin_top"
  }), _vm._v(" "), _c('div', {
    staticClass: "container_bottom row_group"
  }, [(_vm.book.create_book_open) ? _c('div', {
    staticClass: "bottom_item row new_book"
  }, [_c('div', {
    staticClass: "content_text cell ud_name dropdown_item cursor",
    on: {
      "click": function($event) {
        return _vm.openDropdownMenu('ud_name', 'bbr_id', 'create', $event)
      }
    }
  }, [(_vm.book.create_book_data.ud_name) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.book.create_book_data.ud_name))]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpenDropDown('ud_name', 'bbr_id', 'create')) ? _c('div', {
    staticClass: "drop_down_wrap user dd_wrap",
    class: {
      'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
    }
  }, [_c('ul', {
    staticClass: "infor_ul dd_wrap"
  }, _vm._l((_vm.user_cate), function(user) {
    return _c('li', {
      staticClass: "infor_li dd_wrap",
      class: {
        'current': _vm.book.create_book_data.ud_id == user.ud_id
      },
      on: {
        "click": function($event) {
          _vm.book.create_book_data.ud_name = user.ud_name, _vm.book.create_book_data.ud_id = user.ud_id, _vm.closeAllDropdownMenu()
        }
      }
    }, [(user.ud_icon) ? _c('img', {
      staticClass: "dd_wrap",
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "dd_wrap",
      attrs: {
        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
        "alt": ""
      }
    }), _vm._v("\n                                            " + _vm._s(user.ud_name) + "\n                                        ")])
  }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "content_text cell",
    class: {
      'cursor': _vm.user_status.ud_admin || _vm.user_auth.bi_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.bi_admin
    },
    on: {
      "click": function($event) {
        _vm.user_status.ud_admin || _vm.user_auth.bi_admin ? _vm.openDropdownMenu('bbr_borrowingdate', 'bbr_id', 'create', $event) : false
      }
    }
  }, [(_vm.book.create_book_data.bbr_borrowingdate) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.book.create_book_data.bbr_borrowingdate))]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('bbr_borrowingdate', 'bbr_id', 'create')) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.book.create_book_data.bbr_id,
      "type": "bbr_id",
      "date": _vm.book.create_book_data.bbr_borrowingdate,
      "position": _vm.dropdown.position
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.createBorrowingDate
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "content_text cell",
    class: {
      'cursor': _vm.user_status.ud_admin || _vm.user_auth.bi_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.bi_admin
    },
    on: {
      "click": function($event) {
        _vm.user_status.ud_admin || _vm.user_auth.bi_admin ? _vm.openDropdownMenu('bbr_returndate', 'bbr_id', 'create', $event) : false
      }
    }
  }, [(_vm.book.create_book_data.bbr_returndate) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.book.create_book_data.bbr_returndate))]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('bbr_returndate', 'bbr_id', 'create')) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.book.create_book_data.bbr_id,
      "type": "bbr_id",
      "date": _vm.book.create_book_data.bbr_returndate,
      "position": _vm.dropdown.position
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.createReturnDate
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "content_text cell create_wrap dd_wrap"
  }, [_c('i', {
    staticClass: "far fa-times-circle close dd_wrap",
    on: {
      "click": function($event) {
        return _vm.closeAll()
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "far fa-check-circle check dd_wrap",
    on: {
      "click": function($event) {
        return _vm.createBorrowing()
      }
    }
  })])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.new_data), function(bo) {
    return _c('div', {
      staticClass: "bottom_item row"
    }, [_c('div', {
      staticClass: "content_text cell"
    }, [(bo.ud_name) ? _c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.book_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.book_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }]
    }, [_vm._v(_vm._s(bo.ud_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell"
    }, [(bo.bbr_borrowingdate) ? _c('span', [_vm._v(_vm._s(bo.bbr_borrowingdate))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell",
      class: {
        'cursor': _vm.user_status.ud_admin || _vm.user_auth.bi_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.bi_admin
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.bi_admin ? _vm.openDropdownMenu('bbr_returndate', 'bbr_id', bo.bbr_id, $event) : false
        }
      }
    }, [(bo.bbr_returndate) ? _c('span', {
      staticClass: "dropdown_item"
    }, [_vm._v(_vm._s(bo.bbr_returndate))]) : _c('span', {
      staticClass: "dropdown_item"
    }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('bbr_returndate', 'bbr_id', bo.bbr_id)) ? _c('datetimepicker', {
      attrs: {
        "id": bo.bbr_id,
        "type": "bbr_id",
        "date": bo.bbr_returndate,
        "position": _vm.dropdown.position
      },
      on: {
        "get-close": _vm.closeDateTimePicker,
        "get-newdate": _vm.changeReturnDate
      }
    }) : _vm._e()], 1), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.bi_admin) ? _c('div', {
      staticClass: "content_text cell btn_delete"
    }, [_c('i', {
      staticClass: "far fa-trash-alt",
      on: {
        "click": function($event) {
          return _vm.openDeletePromptBox(bo.bbr_id, 3)
        }
      }
    })]) : _vm._e()])
  })], 2)]), _vm._v(" "), (_vm.new_data.length < 1) ? _c('div', {
    staticClass: "not_found"
  }, [_c('img', {
    attrs: {
      "src": "/image/nobody.png",
      "alt": ""
    }
  })]) : _vm._e()])])]) : _vm._e(), _vm._v(" "), (_vm.url_show_block == 'account-list') ? _c('div', {
    staticClass: "account",
    attrs: {
      "id": "page-container"
    }
  }, [_c('div', {
    staticClass: "left"
  }, [_c('ul', {
    staticClass: "tags_wrap"
  }, [(_vm.account.sub_nav == 'account_management') ? _c('li', {
    class: {
      'current': _vm.account.sub_nav == 'account_management'
    },
    on: {
      "click": function($event) {
        _vm.account.sub_nav = 'account_management'
      }
    }
  }, [_vm._m(18)]) : _c('li', {
    class: {
      'current': _vm.account.sub_nav == 'account_management'
    },
    attrs: {
      "onmouseover": "$(this).find('img').attr('src','/image/users-solid_hover.png')",
      "onmouseout": "$(this).find('img').attr('src','/image/users-solid.png')"
    },
    on: {
      "click": function($event) {
        _vm.account.sub_nav = 'account_management'
      }
    }
  }, [_vm._m(19)]), _vm._v(" "), (_vm.account.sub_nav == 'authority_level') ? _c('li', {
    class: {
      'current': _vm.account.sub_nav == 'authority_level'
    },
    on: {
      "click": function($event) {
        _vm.account.sub_nav = 'authority_level'
      }
    }
  }, [_vm._m(20)]) : _c('li', {
    class: {
      'current': _vm.account.sub_nav == 'authority_level'
    },
    attrs: {
      "onmouseover": "$(this).find('img').attr('src','/image/door-open-solid_hover.png')",
      "onmouseout": "$(this).find('img').attr('src','/image/door-open-solid.png')"
    },
    on: {
      "click": function($event) {
        _vm.account.sub_nav = 'authority_level'
      }
    }
  }, [_vm._m(21)])])]), _vm._v(" "), (_vm.account.sub_nav == 'account_management') ? _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "right_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [_c('div', {
    staticClass: "btn_create",
    on: {
      "click": function($event) {
        return _vm.openSinglePage(_vm.user_status, 'ud', null, 4)
      }
    }
  }, [_vm._v("新增帳號")])]), _vm._v(" "), (_vm.new_users.length > 0) ? _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "head_wrap row"
  }, [_c('div', {
    staticClass: "head_text cell ud_code cursor",
    on: {
      "click": function($event) {
        return _vm.changeUserSort('ud_code')
      }
    }
  }, [_vm._v("\n                            員工代號\n                            "), (_vm.account.user_order == 'ud_code' && _vm.account.user_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.user_order == 'ud_code' && _vm.account.user_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ud_account cursor",
    on: {
      "click": function($event) {
        return _vm.changeUserSort('ud_account')
      }
    }
  }, [_vm._v("\n                            帳號\n                            "), (_vm.account.user_order == 'ud_account' && _vm.account.user_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.user_order == 'ud_account' && _vm.account.user_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ud_name cursor",
    on: {
      "click": function($event) {
        return _vm.changeUserSort('ud_name')
      }
    }
  }, [_vm._v("\n                            暱稱\n                            "), (_vm.account.user_order == 'ud_name' && _vm.account.user_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.user_order == 'ud_name' && _vm.account.user_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ug_name cursor",
    on: {
      "click": function($event) {
        return _vm.changeUserSort('ug_name')
      }
    }
  }, [_vm._v("\n                            組別\n                            "), (_vm.account.user_order == 'ug_name' && _vm.account.user_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.user_order == 'ug_name' && _vm.account.user_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell al_id"
  }, [_vm._v("權限等級")]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ud_status"
  }, [_vm._v("啟/停用")])]), _vm._v(" "), _vm._l((_vm.new_users), function(user) {
    return _c('div', {
      staticClass: "content_wrap row_group"
    }, [_c('div', {
      staticClass: "main_project row"
    }, [_c('div', {
      staticClass: "content_text cell ud_code"
    }, [_vm._v(_vm._s(user.ud_code))]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ud_account"
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.user_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.user_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }],
      staticClass: "cursor",
      on: {
        "click": function($event) {
          return _vm.openSinglePage(_vm.user_status, 'ud', user.ud_id, 4)
        }
      }
    }, [_vm._v(_vm._s(user.ud_account))])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ud_name"
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.user_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.user_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }]
    }, [_vm._v(_vm._s(user.ud_name))])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ug_name"
    }, [_vm._v(_vm._s(user.ug_name))]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell al_id"
    }, [_vm._v(_vm._s(user.al_name))]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ud_status"
    }, [(user.ud_status == 1) ? _c('span', {
      staticClass: "btn green cursor",
      on: {
        "click": function($event) {
          return _vm.changeUserStatus(user.ud_id, user.ud_status)
        }
      }
    }, [_vm._v("啟用中")]) : (user.ud_status == 0) ? _c('span', {
      staticClass: "btn red cursor",
      on: {
        "click": function($event) {
          return _vm.changeUserStatus(user.ud_id, user.ud_status)
        }
      }
    }, [_vm._v("停用中")]) : _vm._e()])])])
  })], 2) : _vm._e(), _vm._v(" "), (_vm.new_users.length == 0 && _vm.search_condition.user_content != '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("查無使用者")]) : (_vm.new_users.length == 0 && _vm.search_condition.user_content == '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("暫無使用者")]) : _vm._e()])]) : _vm._e(), _vm._v(" "), (_vm.account.sub_nav == 'authority_level') ? _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "right_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [_c('div', {
    staticClass: "btn_create",
    on: {
      "click": function($event) {
        return _vm.openSinglePage(_vm.user_status, 'al', null, 5)
      }
    }
  }, [_vm._v("新增權限等級")])]), _vm._v(" "), (_vm.new_auths.length > 0) ? _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "head_wrap row"
  }, [_c('div', {
    staticClass: "head_text cell al_name cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('al_name')
      }
    }
  }, [_vm._v("\n                            層級名稱"), (_vm.account.auth_order == 'al_name' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'al_name' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell pt_admin cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('pt_admin')
      }
    }
  }, [_vm._v("\n                            專案"), (_vm.account.auth_order == 'pt_admin' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'pt_admin' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ai_admin cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('ai_admin')
      }
    }
  }, [_vm._v("\n                            公告"), (_vm.account.auth_order == 'ai_admin' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'ai_admin' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell pm_admin cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('pm_admin')
      }
    }
  }, [_vm._v("\n                            資產"), (_vm.account.auth_order == 'pm_admin' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'pm_admin' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell bi_admin cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('bi_admin')
      }
    }
  }, [_vm._v("\n                            書籍"), (_vm.account.auth_order == 'bi_admin' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'bi_admin' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell al_remark cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('al_remark')
      }
    }
  }, [_vm._v("\n                            備註"), (_vm.account.auth_order == 'al_remark' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'al_remark' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell delete"
  }, [_vm._v("功能")])]), _vm._v(" "), _vm._l((_vm.new_auths), function(auth) {
    return _c('div', {
      staticClass: "content_wrap row_group"
    }, [_c('div', {
      staticClass: "main_project row"
    }, [_c('div', {
      staticClass: "content_text cell al_name cursor"
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.auth_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.auth_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }],
      on: {
        "click": function($event) {
          return _vm.openSinglePage(_vm.user_status, 'al', auth.al_id, 5)
        }
      }
    }, [_vm._v(_vm._s(auth.al_name))])]), _vm._v(" "), (auth.pt_admin) ? _c('div', {
      staticClass: "content_text cell pt_admin"
    }, [_vm._v("可編輯")]) : _c('div', {
      staticClass: "content_text cell pt_admin"
    }, [_vm._v("僅查看")]), _vm._v(" "), (auth.ai_admin) ? _c('div', {
      staticClass: "content_text cell ai_admin"
    }, [_vm._v("可編輯")]) : _c('div', {
      staticClass: "content_text cell ai_admin"
    }, [_vm._v("僅查看")]), _vm._v(" "), (auth.pm_admin) ? _c('div', {
      staticClass: "content_text cell pm_admin"
    }, [_vm._v("可編輯")]) : _c('div', {
      staticClass: "content_text cell pm_admin"
    }, [_vm._v("僅查看")]), _vm._v(" "), (auth.bi_admin) ? _c('div', {
      staticClass: "content_text cell bi_admin"
    }, [_vm._v("可編輯")]) : _c('div', {
      staticClass: "content_text cell bi_admin"
    }, [_vm._v("僅查看")]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell al_remark"
    }, [_vm._v(_vm._s(auth.al_remark ? auth.al_remark : ''))]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell btn_delete"
    }, [_c('i', {
      staticClass: "far fa-trash-alt",
      on: {
        "click": function($event) {
          return _vm.openDeletePromptBox(auth.al_id, 7)
        }
      }
    })])])])
  })], 2) : _vm._e(), _vm._v(" "), (_vm.new_auths.length == 0 && _vm.search_condition.auth_content != '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("查無權限等級")]) : (_vm.new_auths.length == 0 && _vm.search_condition.auth_content == '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("暫無權限等級")]) : _vm._e()])]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.checkToOpenHover()) ? _c('hoverwrap', {
    attrs: {
      "title": _vm.hoverwrap.title,
      "subtitle": _vm.hoverwrap.subtitle,
      "date": _vm.hoverwrap.date,
      "user": _vm.hoverwrap.user,
      "position": _vm.hoverwrap.position
    }
  }) : _vm._e(), _vm._v(" "), (_vm.project.create_tag_open) ? _c('div', {
    staticClass: "create_tag_wrap"
  }, [_c('div', {
    staticClass: "tag_box"
  }, [_c('div', {
    staticClass: "tag_content"
  }, [_c('div', {
    staticClass: "tag_title"
  }, [(_vm.project.tag_type == 'create') ? _c('h2', [_vm._v("新增標籤")]) : (_vm.project.tag_type == 'modify') ? _c('h2', [_vm._v("修改標籤")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "tag_name"
  }, [_c('label', {
    attrs: {
      "for": "tm_name"
    }
  }, [_vm._v("標籤名稱")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.tag_data.tm_name),
      expression: "project.tag_data.tm_name"
    }],
    attrs: {
      "type": "text",
      "name": "tm_name"
    },
    domProps: {
      "value": (_vm.project.tag_data.tm_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.project.tag_data, "tm_name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('el-upload', {
    attrs: {
      "action": "",
      "on-change": _vm.getFile,
      "auto-upload": false,
      "show-file-list": false
    }
  }, [(_vm.image_url) ? _c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.image_url
    }
  }) : _c('i', {
    staticClass: "el-icon-plus avatar-uploader-icon"
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "tag_btn_group"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closeTagWrap()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), (_vm.project.tag_type == 'create') ? _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.createTag()
      }
    }
  }, [_vm._v("確認")]) : (_vm.project.tag_type == 'modify') ? _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.changeTagStyle()
      }
    }
  }, [_vm._v("確認")]) : _vm._e()])])]) : _vm._e(), _vm._v(" "), (_vm.project.add_user_tag_open) ? _c('div', {
    staticClass: "add_user_tag_wrap",
    on: {
      "click": function($event) {
        return _vm.colseUserTagWrap($event)
      }
    }
  }, [_c('div', {
    staticClass: "user_tag_box user_tag_item"
  }, [_c('div', {
    staticClass: "user_tag_header user_tag_item"
  }, [_vm._m(22), _vm._v(" "), _c('div', {
    staticClass: "tag_input user_tag_item"
  }, [_vm._m(23), _vm._v(" "), _c('input', {
    staticClass: "user_tag_item",
    attrs: {
      "type": "text",
      "name": "ud_name",
      "placeholder": "輸入使用者名稱"
    },
    on: {
      "input": function($event) {
        return _vm.searchUser()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }), _vm._v(" "), (_vm.search_user_data.length) ? _c('ul', {
    staticClass: "search_result user_tag_item"
  }, _vm._l((_vm.search_user_data), function(user) {
    return _c('li', {
      staticClass: "user_tag_item",
      on: {
        "click": function($event) {
          return _vm.addUserToThisTag(user.ud_id)
        }
      }
    }, [_c('div', {
      staticClass: "user_icon user_tag_item"
    }, [_c('img', {
      staticClass: "user_tag_item",
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "user_name user_tag_item"
    }, [_vm._v(_vm._s(user.ud_name))])])
  }), 0) : _vm._e()])]), _vm._v(" "), (_vm.project.tag_user_data.length) ? _c('div', {
    staticClass: "user_tag_container user_tag_item"
  }, _vm._l((_vm.project.tag_user_data), function(user) {
    return _c('div', {
      staticClass: "user_data user_tag_item"
    }, [_c('div', {
      staticClass: "user_icon user_tag_item"
    }, [_c('img', {
      staticClass: "user_tag_item",
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "user_name user_tag_item"
    }, [_vm._v(_vm._s(user.ud_name))]), _vm._v(" "), (user.trm_owner) ? _c('div', {
      staticClass: "owner user_tag_item"
    }, [_vm._v("擁有者")]) : _vm._e(), _vm._v(" "), (!user.trm_owner && _vm.user_status.ud_admin && _vm.user_status.ud_id == _vm.project.tag_owner_id) ? _c('div', {
      staticClass: "remove_user user_tag_item",
      on: {
        "click": function($event) {
          return _vm.deleteUserFromThisTag(user.trm_id)
        }
      }
    }, [_vm._v("踢除")]) : _vm._e()])
  }), 0) : _vm._e(), _vm._v(" "), _vm._m(24)])]) : _vm._e(), _vm._v(" "), (_vm.checkToOpenSingle()) ? _c('singlepage', {
    attrs: {
      "userdata": _vm.single.userdata,
      "type": _vm.single.type,
      "id": _vm.single.id,
      "cate": _vm.single.cate,
      "group": _vm.single.group
    },
    on: {
      "get-close": _vm.closeSinglePage
    }
  }) : _vm._e(), _vm._v(" "), _c('reminderwrap', {
    attrs: {
      "id": _vm.user_status.ud_id,
      "admin": _vm.user_status.ud_admin ? true : false
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.prompt_box_open),
      expression: "prompt_box_open"
    }],
    staticClass: "prompt_wrap"
  }, [_c('div', {
    staticClass: "prompt_box"
  }, [_vm._m(25), _vm._v(" "), _c('div', {
    staticClass: "prompt_btn_group"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closePrompt()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), (_vm.show_submit_btn) ? _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.deleteData()
      }
    }
  }, [_vm._v("確認")]) : _c('div', {
    staticClass: "btn_submit"
  }, [_vm._v("確認")]), _vm._v(" "), _vm._m(26)])])]), _vm._v(" "), (_vm.loading) ? _c('div', {
    staticClass: "loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "notification_wrap"
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('i', {
    staticClass: "far fa-bell"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('i', {
    staticClass: "fas fa-cog"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "title"
  }, [_c('h2', [_vm._v("我的任務列表")]), _vm._v(" "), _c('p', [_vm._v("關注您的所有專案列表")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list-title project-item"
  }, [_c('div', {
    staticClass: "table-item pt_name"
  }, [_vm._v("任務")]), _vm._v(" "), _c('div', {
    staticClass: "table-item pmc_name"
  }, [_vm._v("里程碑")]), _vm._v(" "), _c('div', {
    staticClass: "table-item prsc_name"
  }, [_vm._v("需求類別")]), _vm._v(" "), _c('div', {
    staticClass: "table-item peic_name"
  }, [_vm._v("執行項目")]), _vm._v(" "), _c('div', {
    staticClass: "table-item pst_completiondate"
  }, [_vm._v("完成日期")]), _vm._v(" "), _c('div', {
    staticClass: "table-item psc_name"
  }, [_vm._v("狀態")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/desktop-solid_hover.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("全部任務")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/desktop-solid.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("全部任務")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/clipboard-regular_hover.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("待排程")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/clipboard-regular.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("待排程")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/clipboard-check-solid_hover.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("完成任務")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/clipboard-check-solid.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("完成任務")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('i', {
    staticClass: "fas fa-folder-plus"
  }), _vm._v(" "), _c('p', [_vm._v("自訂標籤")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_host dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_host",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_screenone dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_screenone",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_screentwo dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_screentwo",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_telephone dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_telephone",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_canvas dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_canvas",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_other dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_other",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_adobe dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_adobe",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/users-solid_hover.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("帳號管理")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/users-solid.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("帳號管理")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/door-open-solid_hover.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("權限管理")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/door-open-solid.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("權限管理")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_title user_tag_item"
  }, [_c('h2', {
    staticClass: "user_tag_item"
  }, [_vm._v("編輯人員")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    staticClass: "user_tag_item",
    attrs: {
      "for": "ud_name"
    }
  }, [_c('i', {
    staticClass: "far fa-user-plus user_tag_item"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user_tag_footer user_tag_item"
  }, [_c('div', {
    staticClass: "btn_submit"
  }, [_vm._v("完成")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "prompt_content"
  }, [_c('div', {
    staticClass: "prompt_icon"
  }, [_c('i', {
    staticClass: "fas"
  })]), _vm._v(" "), _c('div', {
    staticClass: "prompt_title"
  }, [_c('h2')])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('span'), _vm._v("s 後自動關閉")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0f46a4b9", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "singlepage"
    },
    on: {
      "click": function($event) {
        _vm.colseIfClickOutside($event), _vm.colseInput($event)
      }
    }
  }, [_c('div', {
    staticClass: "overlay",
    class: _vm.type,
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  }), _vm._v(" "), (_vm.type == 'pst' || _vm.type == 'pt') ? _c('div', {
    staticClass: "sp_block pro"
  }, [(_vm.sub_loading) ? _c('div', {
    staticClass: "sub_loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp_nav"
  }, [_c('ul', {
    staticClass: "nav_wrap"
  }, [_c('li', {
    class: {
      'current': _vm.project_cate == 1 && _vm.single_title.pt_id == _vm.project_id
    },
    on: {
      "click": function($event) {
        _vm.getProject(_vm.single_title.pt_id), _vm.clickImgToOpenNewTab()
      }
    }
  }, [(!_vm.project.pt_backup) ? _c('i', {
    staticClass: "far fa-square icon_backup"
  }) : _c('i', {
    staticClass: "fas fa-check-square icon_backup"
  }), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.single_title.pt_name))]), _vm._v(" "), (_vm.isadmin) ? _c('i', {
    staticClass: "cursor far fa-trash-alt",
    on: {
      "click": function($event) {
        return _vm.openDeleteProjectPromptBox(_vm.single_title.pt_id, 1)
      }
    }
  }) : _vm._e()]), _vm._v(" "), _vm._l((_vm.single_title_sub), function(title) {
    return (_vm.single_title_sub.length > 0 && _vm.isadmin) ? _c('li', {
      staticClass: "sub_item",
      class: {
        'border_color1': title.psc_id == 1, 'border_color2': title.psc_id == 2, 'border_color3': title.psc_id == 3, 'border_color4': title.psc_id == 4 || title.psc_id == 5, 'border_color5': title.psc_id == 6 || title.psc_id == 7 || title.psc_id == 8, 'border_color6': title.psc_id == 9, 'current': _vm.project_cate == 2 && title.pst_id == _vm.project_id
      },
      attrs: {
        "draggable": "true"
      },
      on: {
        "click": function($event) {
          _vm.getReminderDate(title.pst_id), _vm.getSubProject(title.pst_id), _vm.clickImgToOpenNewTab(), _vm.closeAllDropdownMenu()
        },
        "dragstart": function($event) {
          return _vm.dragToChangeProjectSort("start", title.pt_id, title.pst_id)
        },
        "dragend": function($event) {
          return _vm.dragToChangeProjectSort("end", title.pt_id, title.pst_id)
        },
        "drop": function($event) {
          return _vm.dragToChangeProjectSort("drop", title.pt_id, title.pst_id)
        },
        "dragover": function($event) {
          return _vm.allowDrop($event)
        }
      }
    }, [_c('p', [_vm._v(_vm._s(title.pst_name))]), _vm._v(" "), _c('i', {
      staticClass: "cursor far fa-trash-alt",
      on: {
        "click": function($event) {
          return _vm.openDeleteProjectPromptBox(title.pst_id, 2)
        }
      }
    })]) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.single_title_sub), function(title) {
    return (_vm.single_title_sub.length > 0 && !_vm.isadmin) ? _c('li', {
      staticClass: "sub_item",
      class: {
        'border_color1': title.psc_id == 1, 'border_color2': title.psc_id == 2, 'border_color3': title.psc_id == 3, 'border_color4': title.psc_id == 4 || title.psc_id == 5, 'border_color5': title.psc_id == 6 || title.psc_id == 7 || title.psc_id == 8, 'border_color6': title.psc_id == 9, 'current': _vm.project_cate == 2 && title.pst_id == _vm.project_id
      },
      on: {
        "click": function($event) {
          _vm.getReminderDate(title.pst_id), _vm.getSubProject(title.pst_id), _vm.clickImgToOpenNewTab(), _vm.closeAllDropdownMenu()
        }
      }
    }, [_c('p', [_vm._v(_vm._s(title.pst_name))])]) : _vm._e()
  })], 2), _vm._v(" "), (_vm.sub_project_input_open && _vm.isadmin) ? _c('div', {
    staticClass: "create_subproject_input"
  }, [_c('textarea', {
    attrs: {
      "name": "pst_name",
      "placeholder": "添加子任務"
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "far fa-times-circle close",
    on: {
      "click": function($event) {
        _vm.sub_project_input_open = false
      }
    }
  }), _c('i', {
    staticClass: "far fa-check-circle check",
    on: {
      "click": function($event) {
        return _vm.createSubProject(_vm.single_title.pt_id)
      }
    }
  })]) : (!_vm.sub_project_input_open && _vm.isadmin) ? _c('div', {
    staticClass: "create_subproject",
    on: {
      "click": function($event) {
        _vm.sub_project_input_open = true
      }
    }
  }, [_vm._v("\n                添加子任務\n            ")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "sp_content"
  }, [_c('div', {
    staticClass: "content_title"
  }, [_c('div', {
    staticClass: "project_name"
  }, [(_vm.project_cate == 1 && _vm.isadmin) ? _c('p', {
    on: {
      "click": function($event) {
        return _vm.showInput()
      }
    }
  }, [_c('input', {
    staticClass: "none pro_input",
    attrs: {
      "type": "text",
      "name": "pt_name"
    },
    domProps: {
      "value": _vm.project.pt_name
    },
    on: {
      "change": function($event) {
        return _vm.changeProjectName()
      }
    }
  }), _c('span', {
    staticClass: "pro_input"
  }, [_vm._v(_vm._s(_vm.project.pt_name))])]) : (_vm.project_cate == 2 && _vm.isadmin) ? _c('p', {
    on: {
      "click": function($event) {
        return _vm.showInput()
      }
    }
  }, [_c('input', {
    staticClass: "none pro_input",
    attrs: {
      "type": "text",
      "name": "pst_name"
    },
    domProps: {
      "value": _vm.project.pst_name
    },
    on: {
      "change": function($event) {
        return _vm.changeProjectName()
      }
    }
  }), _c('span', {
    staticClass: "pro_input"
  }, [_vm._v(_vm._s(_vm.project.pst_name))])]) : (_vm.project_cate == 1 && !_vm.isadmin) ? _c('p', [_vm._v(_vm._s(_vm.project.pt_name))]) : (_vm.project_cate == 2 && !_vm.isadmin) ? _c('p', [_vm._v(_vm._s(_vm.project.pst_name))]) : _vm._e(), _vm._v(" "), _c('i', {
    staticClass: "fas fa-times close",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "project_creater"
  }, [_c('p', [_vm._v(_vm._s(_vm.project.create_user) + " 在 " + _vm._s(_vm.project.create_date) + " 建立")])]), _vm._v(" "), _c('div', {
    staticClass: "content_nav"
  }, [_c('ul', {
    staticClass: "nav_wrap"
  }, [_c('li', {
    class: {
      'current': _vm.project_nav_open == 'information'
    },
    on: {
      "click": function($event) {
        _vm.project_nav_open = 'information', _vm.resetSinglePage(), _vm.clickImgToOpenNewTab(), _vm.closeAllDropdownMenu()
      }
    }
  }, [_vm._v("任務訊息")]), _vm._v(" "), _c('li', {
    class: {
      'current': _vm.project_nav_open == 'record'
    },
    on: {
      "click": function($event) {
        _vm.project_nav_open = 'record', _vm.resetSinglePage(), _vm.clickImgToOpenNewTab(), _vm.closeAllDropdownMenu()
      }
    }
  }, [_vm._v("紀錄")]), _vm._v(" "), (_vm.project_cate == 1) ? _c('li', {
    class: {
      'current': _vm.project_nav_open == 'backup'
    },
    on: {
      "click": function($event) {
        _vm.project_nav_open = 'backup', _vm.resetSinglePage(), _vm.closeAllDropdownMenu()
      }
    }
  }, [_vm._v("備份")]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [(_vm.project_nav_open == 'information') ? _c('div', {
    staticClass: "information_wrap"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [(_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("里程碑")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])]) : _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('pmc_name', 'pt_id', _vm.project.pt_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("里程碑")]), _vm._v(" "), (_vm.project.pmc_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.pmc_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定里程碑")]), _vm._v(" "), (_vm.checkToOpen('pmc_name', 'pt_id', _vm.project.pt_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.milestone_cate), function(mile) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.pmc_name == mile.pmc_name
      },
      on: {
        "click": function($event) {
          return _vm.changeMilestone(mile.pmc_id)
        }
      }
    }, [_vm._v(_vm._s(mile.pmc_name))])
  }), 0)]) : _vm._e()]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("需求類別")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])]) : _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('prsc_name', 'pt_id', _vm.project.pt_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("需求類別")]), _vm._v(" "), (_vm.project.prsc_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.prsc_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定類別")]), _vm._v(" "), (_vm.checkToOpen('prsc_name', 'pt_id', _vm.project.pt_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: " infor_ul"
  }, _vm._l((_vm.requiresort_cate), function(require) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.prsc_name == require.prsc_name
      },
      on: {
        "click": function($event) {
          return _vm.changeRequireSort(require.prsc_id)
        }
      }
    }, [_vm._v(_vm._s(require.prsc_name))])
  }), 0)]) : _vm._e()]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('peic_name', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("執行項目")]), _vm._v(" "), (_vm.project.peic_name) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.peic_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定項目")]), _vm._v(" "), (_vm.checkToOpen('peic_name', 'pst_id', _vm.project.pst_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.executeitem_cate), function(item) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.peic_id == item.peic_id
      },
      on: {
        "click": function($event) {
          return _vm.changeExecuteItem(_vm.project_id, item.peic_id)
        }
      }
    }, [_vm._v(_vm._s(item.peic_name))])
  }), 0)]) : _vm._e()]) : _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("執行項目")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [(_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('pst_requiredate', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("確認日期")]), _vm._v(" "), (!_vm.project.pst_requiredate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.pst_requiredate))]), _vm._v(" "), (_vm.checkToOpen('pst_requiredate', 'pst_id', _vm.project.pst_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.project.pst_id,
      "type": "pst_id",
      "date": _vm.project.pst_requiredate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeRequireDate
    }
  }) : _vm._e()], 1) : _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('pt_requiredate', 'pt_id', _vm.project.pt_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("需求日期")]), _vm._v(" "), (!_vm.project.pt_requiredate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.pt_requiredate))]), _vm._v(" "), (_vm.checkToOpen('pt_requiredate', 'pt_id', _vm.project.pt_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.project.pt_id,
      "type": "pt_id",
      "date": _vm.project.pt_requiredate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeRequireDate
    }
  }) : _vm._e()], 1), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('pst_executiondate', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("執行日期")]), _vm._v(" "), (!_vm.project.pst_executiondate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.pst_executiondate))]), _vm._v(" "), (_vm.checkToOpen('pst_executiondate', 'pst_id', _vm.project.pst_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.project.pst_id,
      "type": "pst_id",
      "date": _vm.project.pst_executiondate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeExecutiondate
    }
  }) : _vm._e()], 1) : _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("執行日期")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('pst_completiondate', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("完成日期")]), _vm._v(" "), (!_vm.project.pst_completiondate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.pst_completiondate))]), _vm._v(" "), (_vm.checkToOpen('pst_completiondate', 'pst_id', _vm.project.pst_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.project.pst_id,
      "type": "pst_id",
      "date": _vm.project.pst_completiondate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeCompletiondate
    }
  }) : _vm._e()], 1) : _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("完成日期")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [(_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell infor_cell2 dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ud_name', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("執行人")]), _vm._v(" "), (_vm.project.ud_name) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.ud_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定執行人")]), _vm._v(" "), (_vm.checkToOpen('ud_name', 'pst_id', _vm.project.pst_id)) ? _c('div', {
    staticClass: "drop_down_wrap user"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, [_vm._l((_vm.user_cate), function(user) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.ud_id == user.ud_id
      },
      on: {
        "click": function($event) {
          return _vm.changeUser(_vm.project_id, user.ud_id)
        }
      }
    }, [(user.ud_icon) ? _c('img', {
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    }) : _c('img', {
      attrs: {
        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
        "alt": ""
      }
    }), _vm._v("\n                                            " + _vm._s(user.ud_name) + "\n                                        ")])
  }), _vm._v(" "), (_vm.user_cate.length == 0) ? _c('li', {
    staticClass: "infor_li"
  }, [_vm._v("暫無執行人")]) : _vm._e()], 2)]) : _vm._e()]) : _c('div', {
    staticClass: "infor_cell infor_cell2"
  }, [_c('span', [_vm._v("執行人")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('psc_name', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("狀態")]), _vm._v(" "), (_vm.project.psc_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.psc_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定狀態")]), _vm._v(" "), (_vm.checkToOpen('psc_name', 'pst_id', _vm.project.pst_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.status_cate), function(status) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.psc_id == status.psc_id
      },
      on: {
        "click": function($event) {
          return _vm.changeStatus(_vm.project_id, status.psc_id)
        }
      }
    }, [_vm._v(_vm._s(status.psc_name))])
  }), 0)]) : _vm._e()]) : _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("狀態")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell dropdown_item border_none",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ppc_name', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("優先權")]), _vm._v(" "), (_vm.project.ppc_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.ppc_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定優先權")]), _vm._v(" "), (_vm.checkToOpen('ppc_name', 'pst_id', _vm.project.pst_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.priority_cate), function(pri) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.ppc_name == pri.ppc_name
      },
      on: {
        "click": function($event) {
          return _vm.changePriority(pri.ppc_id)
        }
      }
    }, [_vm._v(_vm._s(pri.ppc_name))])
  }), 0)]) : _vm._e()]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item border_both",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('url_reminderdate', 'url_id', _vm.user_reminderdate.url_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("提醒")]), _vm._v(" "), (_vm.user_reminderdate.url_reminderdate) ? _c('span', {
    staticClass: "content  dropdown_item"
  }, [_vm._v(_vm._s(_vm.removeSecond(_vm.user_reminderdate.url_reminderdate)))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]), _vm._v(" "), (_vm.checkToOpen('url_reminderdate', 'url_id', _vm.user_reminderdate.url_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.user_reminderdate.url_id,
      "type": "url_id",
      "date": _vm.user_reminderdate.url_reminderdate,
      "time": "true"
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeReminderdate
    }
  }) : _vm._e()], 1) : _c('div', {
    staticClass: "infor_cell border_both"
  }, [_c('span', [_vm._v("提醒")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("執行時間")]), _vm._v(" "), _c('input', {
    staticClass: "single_input",
    attrs: {
      "type": "text",
      "name": "pst_spendtime",
      "placeholder": "00.00"
    },
    domProps: {
      "value": _vm.project.pst_spendtime
    },
    on: {
      "change": function($event) {
        _vm.isadmin ? _vm.changeSpendTime(_vm.project.pst_id) : false
      }
    }
  })]) : _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("執行時間")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])])]), _vm._v(" "), (_vm.project_cate == 1) ? _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('tm_name', 'pt_id', _vm.project.pt_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("標籤")]), _vm._v(" "), (_vm.project.tm_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.tm_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定標籤")]), _vm._v(" "), (_vm.checkToOpen('tm_name', 'pt_id', _vm.project.pt_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, [_vm._l((_vm.user_tags), function(tag) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.tm_name == tag.tm_name
      },
      on: {
        "click": function($event) {
          return _vm.changeTag(tag.tm_id)
        }
      }
    }, [_vm._v(_vm._s(tag.tm_name))])
  }), _vm._v(" "), (_vm.user_tags.length < 1) ? _c('li', {
    staticClass: "infor_li"
  }, [_vm._v("暫無標籤")]) : _vm._e()], 2)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  })]) : _vm._e()]), _vm._v(" "), (!_vm.create_infor_editor_open) ? _c('div', {
    staticClass: "add_new_information",
    on: {
      "click": function($event) {
        _vm.create_infor_editor_open = true, _vm.closeInforEditor(), _vm.fileList = []
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-plus"
  }), _c('span', {
    staticClass: "infor_content"
  }, [_vm._v("新增訊息")])]) : _vm._e(), _vm._v(" "), (_vm.create_infor_editor_open) ? _c('div', {
    staticClass: "create_new_information"
  }, [_c('i', {
    staticClass: "fas fa-plus"
  }), _c('input', {
    staticClass: "pi_title",
    attrs: {
      "type": "text",
      "name": "pi_title",
      "value": ""
    }
  }), _vm._v(" "), (_vm.create_infor_editor_open) ? _c('vue-html5-editor', {
    attrs: {
      "content": _vm.editor_content,
      "height": 500
    }
  }) : _vm._e(), _vm._v(" "), _c('div', [_c('el-upload', {
    ref: "upload",
    staticClass: "upload-demo",
    attrs: {
      "action": "/uploadfile",
      "multiple": "",
      "name": "newPro",
      "on-preview": _vm.handlePreview,
      "on-remove": _vm.handleRemove,
      "on-change": _vm.handleChange,
      "on-success": _vm.handleSuccess,
      "on-error": _vm.handleError,
      "file-list": _vm.fileList,
      "headers": {
        'X-CSRF-TOKEN': _vm.csrfToken
      },
      "auto-upload": false
    }
  }, [_c('el-button', {
    attrs: {
      "size": "small",
      "type": "text"
    }
  }, [_vm._v("上傳檔案")])], 1)], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.create_infor_editor_open) ? _c('div', {
    staticClass: "create_new_information_btn"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        _vm.create_infor_editor_open = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.createInformation()
      }
    }
  }, [_vm._v("確認")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "infor_lists"
  }, _vm._l((_vm.project_infors), function(item) {
    return _c('div', {
      staticClass: "infor_item",
      class: 'infor' + item.pi_id
    }, [_c('div', {
      staticClass: "infor_title"
    }, [_c('div', {
      staticClass: "cursor title_content",
      on: {
        "click": function($event) {
          _vm.project_infor_id != item.pi_id || !_vm.editing ? _vm.openThisInforItem(item.pi_id) : false, _vm.project_infor_id != item.pi_id || !_vm.editing ? _vm.create_infor_editor_open = false : false
        }
      }
    }, [_c('i', {
      staticClass: "fas fa-chevron-circle-down infor_icon"
    }), _vm._v(" "), (_vm.project_infor_id == item.pi_id && _vm.editing) ? _c('input', {
      staticClass: "pi_title",
      attrs: {
        "type": "text",
        "name": "pi_title"
      },
      domProps: {
        "value": item.pi_title
      }
    }) : _c('span', [_vm._v(_vm._s(item.pi_title))])]), _vm._v(" "), _c('div', {
      staticClass: "function_wrap"
    }, [_c('i', {
      staticClass: "cursor far fa-edit",
      on: {
        "click": function($event) {
          _vm.openThisInforEditor(item.pi_id, item.pi_fileurl), _vm.create_infor_editor_open = false
        }
      }
    }), _vm._v(" "), _c('i', {
      staticClass: "cursor far fa-trash-alt",
      on: {
        "click": function($event) {
          _vm.create_infor_editor_open = false, _vm.openDeleteProjectPromptBox(item.pi_id, 3)
        }
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "infor_content"
    }, [_c('div', {
      staticClass: "message",
      domProps: {
        "innerHTML": _vm._s(item.pi_message)
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "upload-demo"
    }, [_c('ul', {
      staticClass: "el-upload-list el-upload-list--text"
    }, _vm._l((JSON.parse(item.pi_fileurl)), function(file) {
      return _c('li', {
        staticClass: "el-upload-list__item is-ready",
        on: {
          "click": function($event) {
            return _vm.downloadProFile(item.pi_id, file.name)
          }
        }
      }, [_c('a', {
        staticClass: "el-upload-list__item-name"
      }, [_c('i', {
        staticClass: "el-icon-document"
      }), _vm._v(_vm._s(file.name))])])
    }), 0)]), _vm._v(" "), _c('div', {
      staticClass: "creator"
    }, [_c('div', [_c('span', {
      staticClass: "user"
    }, [_vm._v(_vm._s(item.create_user))]), _c('span', {
      staticClass: "date"
    }, [_vm._v(_vm._s(item.create_date))])])])]), _vm._v(" "), (_vm.project_infor_id == item.pi_id && _vm.editing) ? _c('vue-html5-editor', {
      attrs: {
        "content": item.pi_message,
        "height": 500
      }
    }) : _vm._e(), _vm._v(" "), (_vm.project_infor_id == item.pi_id && _vm.editing) ? _c('div', [_c('el-upload', {
      staticClass: "upload-demo",
      attrs: {
        "action": "/uploadfile",
        "multiple": "",
        "name": "upPro",
        "on-preview": _vm.handlePreview,
        "on-remove": _vm.handleRemove,
        "on-change": _vm.handleChange,
        "on-success": _vm.handleSuccess,
        "on-error": _vm.handleError,
        "file-list": _vm.fileList,
        "headers": {
          'X-CSRF-TOKEN': _vm.csrfToken
        },
        "auto-upload": false
      }
    }, [_c('el-button', {
      attrs: {
        "size": "small",
        "type": "text"
      }
    }, [_vm._v("上傳檔案")])], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.project_infor_id == item.pi_id && _vm.editing) ? _c('div', {
      staticClass: "modify_information_btn"
    }, [_c('div', {
      staticClass: "btn_cancel",
      on: {
        "click": function($event) {
          return _vm.openThisInforItem(item.pi_id)
        }
      }
    }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
      staticClass: "btn_submit",
      on: {
        "click": function($event) {
          return _vm.changeInformation(item.pi_id)
        }
      }
    }, [_vm._v("確認")])]) : _vm._e()], 1)
  }), 0)]) : (_vm.project_nav_open == 'record') ? _c('div', {
    staticClass: "record_wrap"
  }, [(!_vm.create_record_editor_open) ? _c('div', {
    staticClass: "add_new_record",
    on: {
      "click": function($event) {
        _vm.create_record_editor_open = true, _vm.project_infor_id = ''
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-plus"
  }), _c('span', {
    staticClass: "record_content"
  }, [_vm._v("新增紀錄")])]) : _vm._e(), _vm._v(" "), (_vm.create_record_editor_open) ? _c('div', {
    staticClass: "create_new_record"
  }, [(_vm.create_record_editor_open) ? _c('vue-html5-editor', {
    attrs: {
      "content": _vm.editor_content,
      "height": 500
    }
  }) : _vm._e()], 1) : _vm._e(), _vm._v(" "), (_vm.create_record_editor_open) ? _c('div', {
    staticClass: "create_new_record_btn"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        _vm.create_record_editor_open = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.createRecord()
      }
    }
  }, [_vm._v("確認")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "record_lists"
  }, _vm._l((_vm.project_records), function(item) {
    return _c('div', {
      staticClass: "record_item",
      class: 'item' + item.pr_id
    }, [_c('div', {
      staticClass: "record_content close"
    }, [_c('div', {
      staticClass: "creator"
    }, [_c('div', {
      staticClass: "creator_wrap"
    }, [_c('span', {
      staticClass: "user"
    }, [_vm._v(_vm._s(item.create_user))]), _c('span', {
      staticClass: "date"
    }, [_vm._v(_vm._s(item.create_date))])]), _vm._v(" "), _c('div', {
      staticClass: "function_wrap"
    }, [_c('i', {
      staticClass: "cursor far fa-trash-alt",
      on: {
        "click": function($event) {
          _vm.create_record_editor_open = false, _vm.openDeleteProjectPromptBox(item.pr_id, 4)
        }
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "message",
      domProps: {
        "innerHTML": _vm._s(item.pr_message)
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "view_more",
      on: {
        "click": function($event) {
          return _vm.viewMore(item.pr_id)
        }
      }
    })])])
  }), 0)]) : (_vm.project_nav_open == 'backup') ? _c('div', {
    staticClass: "backup_wrap"
  }, [_c('div', {
    staticClass: "backup_table"
  }, [_c('div', {
    staticClass: "backup_row"
  }, [_c('div', {
    staticClass: "backup_cell"
  }, [_c('span', [_vm._v("備份")]), _vm._v(" "), (_vm.project.pt_backup == 1) ? _c('span', {
    staticClass: "content"
  }, [_c('i', {
    staticClass: "fas fa-check-square icon_backup"
  })]) : (_vm.project.pt_backup == 0) ? _c('span', {
    staticClass: "content"
  }, [_c('i', {
    staticClass: "far fa-square icon_backup"
  })]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "backup_cell"
  }, [_c('span', [_vm._v("日期")]), _vm._v(" "), (_vm.project.pt_backup == 1) ? _c('span', {
    staticClass: "content"
  }, [_vm._v(_vm._s(_vm.project.pt_backupdate))]) : (_vm.project.pt_backup == 0) ? _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("尚未備份")]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "backup_row"
  }, [_c('div', {
    staticClass: "backup_cell backup_cell2"
  }, [_c('span', [_vm._v("備份路徑")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "name": "pt_backupurl",
      "placeholder": "填入備份路徑"
    },
    domProps: {
      "value": _vm.project.pt_backupurl
    },
    on: {
      "change": function($event) {
        return _vm.changeBackupDate(_vm.project.pt_id)
      }
    }
  })])])])]) : _vm._e()])])]) : (_vm.type == 'ai') ? _c('div', {
    staticClass: "sp_block ann"
  }, [(_vm.sub_loading) ? _c('div', {
    staticClass: "sub_loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp_content"
  }, [_c('div', {
    staticClass: "content_title"
  }, [(_vm.project_ann.ai_topping == 1) ? _c('i', {
    staticClass: "fas fa-star btn_favor",
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.changeAnnTopping(_vm.project_ann.ai_id, false) : false
      }
    }
  }) : _c('i', {
    staticClass: "far fa-star btn_favor",
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.changeAnnTopping(_vm.project_ann.ai_id, true) : false
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "project_name"
  }, [(_vm.isadmin) ? _c('p', {
    on: {
      "click": function($event) {
        return _vm.showInput()
      }
    }
  }, [_c('input', {
    staticClass: "ann_input none",
    attrs: {
      "type": "text",
      "name": "ai_title"
    },
    domProps: {
      "value": _vm.project_ann.ai_title
    },
    on: {
      "change": function($event) {
        return _vm.changeAnnTitle()
      }
    }
  }), _c('span', {
    staticClass: "ann_input"
  }, [_vm._v(_vm._s(_vm.project_ann.ai_title))])]) : _c('p', [_vm._v(_vm._s(_vm.project_ann.ai_title))]), _vm._v(" "), _c('i', {
    staticClass: "fas fa-times close",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "project_creater"
  }, [_c('p', [_vm._v(_vm._s(_vm.project_ann.create_user) + " 在 " + _vm._s(_vm.project_ann.create_date) + " 建立")])])]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "information_wrap"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ai_expirydate', 'ai_id', _vm.project_ann.ai_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("到期日")]), _vm._v(" "), (!_vm.project_ann.ai_expirydate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project_ann.ai_expirydate))]), _vm._v(" "), (_vm.checkToOpen('ai_expirydate', 'ai_id', _vm.project_ann.ai_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.project_ann.ai_id,
      "type": "ai_id",
      "date": _vm.project_ann.ai_expirydate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeAnnExecutiondate
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('url_reminderdate', 'url_id', _vm.user_reminderdate.url_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("提醒")]), _vm._v(" "), (_vm.user_reminderdate.url_reminderdate) ? _c('span', {
    staticClass: "content  dropdown_item"
  }, [_vm._v(_vm._s(_vm.removeSecond(_vm.user_reminderdate.url_reminderdate)))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]), _vm._v(" "), (_vm.checkToOpen('url_reminderdate', 'url_id', _vm.user_reminderdate.url_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.user_reminderdate.url_id,
      "type": "url_id",
      "date": _vm.user_reminderdate.url_reminderdate,
      "time": "true"
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeReminderdate
    }
  }) : _vm._e()], 1)])]), _vm._v(" "), (!_vm.create_message_editor_open) ? _c('div', {
    staticClass: "add_new_information",
    on: {
      "click": function($event) {
        _vm.create_message_editor_open = true, _vm.closeMessageEditor(), _vm.fileList = []
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-plus"
  }), _c('span', {
    staticClass: "infor_content"
  }, [_vm._v("新增訊息")])]) : _vm._e(), _vm._v(" "), (_vm.create_message_editor_open) ? _c('div', {
    staticClass: "create_new_information"
  }, [_c('i', {
    staticClass: "fas fa-plus"
  }), _c('input', {
    staticClass: "am_title",
    attrs: {
      "type": "text",
      "name": "am_title",
      "value": ""
    }
  }), _vm._v(" "), (_vm.create_message_editor_open) ? _c('vue-html5-editor', {
    attrs: {
      "content": _vm.editor_content,
      "height": 500
    }
  }) : _vm._e(), _vm._v(" "), _c('div', [_c('el-upload', {
    ref: "upload",
    staticClass: "upload-demo",
    attrs: {
      "action": "/uploadfile",
      "multiple": "",
      "name": "newAnn",
      "on-preview": _vm.handlePreview,
      "on-remove": _vm.handleRemove,
      "on-change": _vm.handleChange,
      "on-success": _vm.handleSuccess,
      "on-error": _vm.handleError,
      "file-list": _vm.fileList,
      "headers": {
        'X-CSRF-TOKEN': _vm.csrfToken
      },
      "auto-upload": false
    }
  }, [_c('el-button', {
    attrs: {
      "size": "small",
      "type": "text"
    }
  }, [_vm._v("上傳檔案")])], 1)], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.create_message_editor_open) ? _c('div', {
    staticClass: "create_new_information_btn"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        _vm.create_message_editor_open = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.createMessage()
      }
    }
  }, [_vm._v("確認")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "infor_lists"
  }, _vm._l((_vm.project_ann_messages), function(item) {
    return _c('div', {
      staticClass: "infor_item",
      class: 'item' + item.am_id
    }, [_c('div', {
      staticClass: "infor_title"
    }, [_c('div', {
      staticClass: "cursor title_content",
      on: {
        "click": function($event) {
          _vm.ann_message_id != item.am_id || !_vm.editing ? _vm.openThisMessageItem(item.am_id) : false, _vm.ann_message_id != item.am_id || !_vm.editing ? _vm.create_message_editor_open = false : false
        }
      }
    }, [_c('i', {
      staticClass: "fas fa-chevron-circle-down infor_icon"
    }), _vm._v(" "), (_vm.ann_message_id == item.am_id && _vm.editing) ? _c('input', {
      staticClass: "am_title",
      attrs: {
        "type": "text",
        "name": "am_title"
      },
      domProps: {
        "value": item.am_title
      }
    }) : _c('span', [_vm._v(_vm._s(item.am_title))])]), _vm._v(" "), _c('div', {
      staticClass: "function_wrap"
    }, [_c('i', {
      staticClass: "cursor far fa-edit",
      on: {
        "click": function($event) {
          _vm.openThisMessageEditor(item.am_id, item.am_fileurl), _vm.create_message_editor_open = false
        }
      }
    }), _vm._v(" "), _c('i', {
      staticClass: "cursor far fa-trash-alt",
      on: {
        "click": function($event) {
          _vm.create_message_editor_open = false, _vm.openDeleteAnnPromptBox(item.am_id, 2)
        }
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "infor_content"
    }, [_c('div', {
      staticClass: "message",
      domProps: {
        "innerHTML": _vm._s(item.am_message)
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "upload-demo"
    }, [_c('ul', {
      staticClass: "el-upload-list el-upload-list--text"
    }, _vm._l((JSON.parse(item.am_fileurl)), function(file) {
      return _c('li', {
        staticClass: "el-upload-list__item is-ready",
        on: {
          "click": function($event) {
            return _vm.downloadAnnFile(item.am_id, file.name)
          }
        }
      }, [_c('a', {
        staticClass: "el-upload-list__item-name"
      }, [_c('i', {
        staticClass: "el-icon-document"
      }), _vm._v(_vm._s(file.name))])])
    }), 0)]), _vm._v(" "), _c('div', {
      staticClass: "creator"
    }, [_c('div', [_c('span', {
      staticClass: "user"
    }, [_vm._v(_vm._s(item.create_user))]), _c('span', {
      staticClass: "date"
    }, [_vm._v(_vm._s(item.create_date))])])])]), _vm._v(" "), (_vm.ann_message_id == item.am_id && _vm.editing) ? _c('vue-html5-editor', {
      attrs: {
        "content": item.am_message,
        "height": 500
      }
    }) : _vm._e(), _vm._v(" "), (_vm.ann_message_id == item.am_id && _vm.editing) ? _c('div', [_c('el-upload', {
      ref: "upload",
      refInFor: true,
      staticClass: "upload-demo",
      attrs: {
        "action": "/uploadfile",
        "multiple": "",
        "name": "upAnn",
        "on-preview": _vm.handlePreview,
        "on-remove": _vm.handleRemove,
        "on-change": _vm.handleChange,
        "on-success": _vm.handleSuccess,
        "on-error": _vm.handleError,
        "file-list": _vm.fileList,
        "headers": {
          'X-CSRF-TOKEN': _vm.csrfToken
        },
        "auto-upload": false
      }
    }, [_c('el-button', {
      attrs: {
        "size": "small",
        "type": "text"
      }
    }, [_vm._v("上傳檔案")])], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.ann_message_id == item.am_id && _vm.editing) ? _c('div', {
      staticClass: "modify_information_btn"
    }, [_c('div', {
      staticClass: "btn_cancel",
      on: {
        "click": function($event) {
          return _vm.openThisMessageItem(item.am_id)
        }
      }
    }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
      staticClass: "btn_submit",
      on: {
        "click": function($event) {
          return _vm.changeMessage(item.am_id)
        }
      }
    }, [_vm._v("確認")])]) : _vm._e()], 1)
  }), 0)])])])]) : (_vm.type == 'ud') ? _c('div', {
    staticClass: "sp_block ud"
  }, [(_vm.sub_loading) ? _c('div', {
    staticClass: "sub_loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp_content"
  }, [_c('div', {
    staticClass: "content_title"
  }, [_c('div', {
    staticClass: "project_name"
  }, [(_vm.isadmin) ? _c('el-upload', {
    staticClass: "user_image_wrap",
    attrs: {
      "action": "",
      "on-change": _vm.getFile,
      "auto-upload": false,
      "show-file-list": false
    }
  }, [(_vm.imageurl) ? _c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.imageurl
    }
  }) : _c('i', {
    staticClass: "el-icon-plus avatar-uploader-icon"
  })]) : _c('div', {
    staticClass: "user_icon_wrap"
  }, [_c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.imageurl
    }
  })]), _vm._v(" "), (_vm.user_id) ? _c('p', [_vm._v("修改帳號")]) : _c('p', [_vm._v("新增帳號")]), _vm._v(" "), (_vm.user_id) ? _c('p', {
    staticClass: "creater"
  }, [_vm._v(_vm._s(_vm.user_data.create_user) + " 在 " + _vm._s(_vm.user_data.create_date) + " 建立")]) : _vm._e()], 1)]), _vm._v(" "), _c('div', {
    staticClass: "content overflow",
    class: {
      'create': !_vm.user_id, 'modify': _vm.user_id
    }
  }, [_c('div', {
    staticClass: "account_infor_wrap"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "account_infor_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("帳號")]), _vm._v(" "), (!_vm.user_id) ? _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_account),
      expression: "user_data.ud_account"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_account)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_account", $event.target.value)
      }
    }
  })]) : _c('span', {
    staticClass: "content"
  }, [_vm._v(_vm._s(_vm.user_data.ud_account))])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("啟/停用")]), _vm._v(" "), (_vm.user_data.ud_status == 1) ? _c('span', {
    staticClass: "btn green",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.changeUserStatus(_vm.user_data.ud_id, _vm.user_data.ud_status) : false
      }
    }
  }, [_vm._v("啟用中")]) : (_vm.user_data.ud_status == 0) ? _c('span', {
    staticClass: "btn red",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.changeUserStatus(_vm.user_data.ud_id, _vm.user_data.ud_status) : false
      }
    }
  }, [_vm._v("停用中")]) : _vm._e(), _vm._v(" "), (!_vm.user_id) ? _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("新增無效用")]) : _vm._e()])])])])]), _vm._v(" "), _c('div', {
    staticClass: "password_infor_wrap"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "password_infor_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("密碼")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_password),
      expression: "user_data.ud_password"
    }],
    attrs: {
      "type": "password",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_password", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("確認密碼")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_password_confirm),
      expression: "user_data.ud_password_confirm"
    }],
    attrs: {
      "type": "password",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_password_confirm)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_password_confirm", $event.target.value)
      }
    }
  })])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "user_infor_wrap"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "user_infor_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("使用者名稱")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_name),
      expression: "user_data.ud_name"
    }],
    attrs: {
      "type": "text",
      "placeholder": "請輸入使用者名稱"
    },
    domProps: {
      "value": (_vm.user_data.ud_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_name", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("年資")]), _vm._v(" "), (_vm.user_data.ud_code) ? _c('span', {
    staticClass: "content"
  }, [_vm._v("滿" + _vm._s(_vm.showSeniority(_vm.user_data.ud_code)) + "年")]) : _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無法計算")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("員工代號")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_code),
      expression: "user_data.ud_code"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_code", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("信箱")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_mail),
      expression: "user_data.ud_mail"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_mail)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_mail", $event.target.value)
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("市話")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_tel),
      expression: "user_data.ud_tel"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_tel)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_tel", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("手機")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_mobile),
      expression: "user_data.ud_mobile"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_mobile)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_mobile", $event.target.value)
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("緊急聯絡人")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_emercontactname),
      expression: "user_data.ud_emercontactname"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_emercontactname)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_emercontactname", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("聯絡人電話")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_emercontactphone),
      expression: "user_data.ud_emercontactphone"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_emercontactphone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_emercontactphone", $event.target.value)
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell",
    class: {
      'cursor': _vm.isadmin, 'dropdown_item': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ut_name', 'ut_id', _vm.user_data.ut_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("部門")]), _vm._v(" "), (_vm.user_data.ut_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.user_data.ut_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpen('ut_name', 'ut_id', _vm.user_data.ut_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.type_cate), function(type) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.user_data.ut_id == type.ut_id
      },
      on: {
        "click": function($event) {
          _vm.user_data.ut_id = type.ut_id, _vm.user_data.ut_name = type.ut_name
        }
      }
    }, [_vm._v(_vm._s(type.ut_name))])
  }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell",
    class: {
      'cursor': _vm.isadmin, 'dropdown_item': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ug_name', 'ug_id', _vm.user_data.ug_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("群組")]), _vm._v(" "), (_vm.user_data.ug_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.user_data.ug_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpen('ug_name', 'ug_id', _vm.user_data.ug_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.group_cate), function(group) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.user_data.ug_id == group.ug_id
      },
      on: {
        "click": function($event) {
          _vm.user_data.ug_id = group.ug_id, _vm.user_data.ug_name = group.ug_name
        }
      }
    }, [_vm._v(_vm._s(group.ug_name))])
  }), 0)]) : _vm._e()])])])])]), _vm._v(" "), _c('div', {
    staticClass: "auth_infor_wrap"
  }, [_vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "auth_infor_container"
  }, [_c('div', {
    staticClass: "auth_level",
    class: {
      'cursor': _vm.isadmin, 'dropdown_item': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('al_name', 'al_id', _vm.user_data.al_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("權限等級")]), _vm._v(" "), (_vm.user_data.al_name) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.user_data.al_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpen('al_name', 'al_id', _vm.user_data.al_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, [(_vm.auths.length < 1) ? _c('li', {
    staticClass: "infor_li"
  }, [_vm._v("請新增權限等級")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.auths), function(auth) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.user_data.al_id == auth.al_id
      },
      on: {
        "click": function($event) {
          return _vm.selectAuth(auth)
        }
      }
    }, [_vm._v(_vm._s(auth.al_name))])
  })], 2)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "auth_remark"
  }, [_c('span', [_vm._v("備註")]), _vm._v(" "), (_vm.user_data.al_remark) ? _c('span', {
    staticClass: "content"
  }, [_vm._v(_vm._s(_vm.user_data.al_remark))]) : _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無")])]), _vm._v(" "), (_vm.user_data.al_id) ? _c('div', {
    staticClass: "auth_detail"
  }, [_c('div', {
    staticClass: "auth_item"
  }, [_c('span', [_vm._v("專案權限")]), _vm._v(" "), (_vm.user_data.pt_admin) ? _c('span', {
    staticClass: "content"
  }, [_vm._v("可編輯")]) : _c('span', {
    staticClass: "content"
  }, [_vm._v("僅查看")])]), _vm._v(" "), _c('div', {
    staticClass: "auth_item"
  }, [_c('span', [_vm._v("公告權限")]), _vm._v(" "), (_vm.user_data.ai_admin) ? _c('span', {
    staticClass: "content"
  }, [_vm._v("可編輯")]) : _c('span', {
    staticClass: "content"
  }, [_vm._v("僅查看")])]), _vm._v(" "), _c('div', {
    staticClass: "auth_item"
  }, [_c('span', [_vm._v("資產權限")]), _vm._v(" "), (_vm.user_data.pm_admin) ? _c('span', {
    staticClass: "content"
  }, [_vm._v("可編輯")]) : _c('span', {
    staticClass: "content"
  }, [_vm._v("僅查看")])]), _vm._v(" "), _c('div', {
    staticClass: "auth_item"
  }, [_c('span', [_vm._v("書籍權限")]), _vm._v(" "), (_vm.user_data.bi_admin) ? _c('span', {
    staticClass: "content"
  }, [_vm._v("可編輯")]) : _c('span', {
    staticClass: "content"
  }, [_vm._v("僅查看")])])]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "content_footer"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.changeUserData()
      }
    }
  }, [_vm._v("確認")])])])]) : (_vm.type == 'al') ? _c('div', {
    staticClass: "sp_block al"
  }, [(_vm.sub_loading) ? _c('div', {
    staticClass: "sub_loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp_content"
  }, [_c('div', {
    staticClass: "content_title"
  }, [_c('div', {
    staticClass: "project_name"
  }, [(_vm.auth_id) ? _c('p', [_vm._v("修改權限等級")]) : _c('p', [_vm._v("新增權限等級")])]), _vm._v(" "), (_vm.auth_level.create_user) ? _c('div', {
    staticClass: "project_creater"
  }, [_c('p', [_vm._v(_vm._s(_vm.auth_level.create_user) + " 在 " + _vm._s(_vm.auth_level.create_date) + " 建立")])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "content overflow",
    class: {
      'create': !_vm.auth_id, 'modify': _vm.auth_id
    }
  }, [_c('div', {
    staticClass: "auth_infor_wrap"
  }, [_vm._m(4), _vm._v(" "), _c('div', {
    staticClass: "auth_infor_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("權限名稱")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.al_name),
      expression: "auth_level.al_name"
    }],
    attrs: {
      "type": "text",
      "name": "al_name",
      "placeholder": "請輸入權限名稱"
    },
    domProps: {
      "value": (_vm.auth_level.al_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.auth_level, "al_name", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  })]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell x2"
  }, [_c('span', {}, [_vm._v("備註")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.al_remark),
      expression: "auth_level.al_remark"
    }],
    attrs: {
      "type": "text",
      "name": "al_remark",
      "placeholder": "填入備註"
    },
    domProps: {
      "value": (_vm.auth_level.al_remark)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.auth_level, "al_remark", $event.target.value)
      }
    }
  })])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "auth_level_wrap"
  }, [_vm._m(5), _vm._v(" "), _c('div', {
    staticClass: "auth_level_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("專案權限")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.pt_admin),
      expression: "auth_level.pt_admin"
    }],
    attrs: {
      "id": "pt1",
      "type": "radio",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.pt_admin, "1")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "pt_admin", "1")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "pt1"
    }
  }, [_vm._v("可編輯")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.pt_admin),
      expression: "auth_level.pt_admin"
    }],
    attrs: {
      "id": "pt2",
      "type": "radio",
      "value": "0"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.pt_admin, "0")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "pt_admin", "0")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "pt2"
    }
  }, [_vm._v("僅查看")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("公告權限")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.ai_admin),
      expression: "auth_level.ai_admin"
    }],
    attrs: {
      "id": "ai1",
      "type": "radio",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.ai_admin, "1")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "ai_admin", "1")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "ai1"
    }
  }, [_vm._v("可編輯")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.ai_admin),
      expression: "auth_level.ai_admin"
    }],
    attrs: {
      "id": "ai2",
      "type": "radio",
      "value": "0"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.ai_admin, "0")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "ai_admin", "0")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "ai2"
    }
  }, [_vm._v("僅查看")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("資產權限")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.pm_admin),
      expression: "auth_level.pm_admin"
    }],
    attrs: {
      "id": "pm1",
      "type": "radio",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.pm_admin, "1")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "pm_admin", "1")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "pm1"
    }
  }, [_vm._v("可編輯")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.pm_admin),
      expression: "auth_level.pm_admin"
    }],
    attrs: {
      "id": "pm2",
      "type": "radio",
      "value": "0"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.pm_admin, "0")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "pm_admin", "0")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "pm2"
    }
  }, [_vm._v("僅查看")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("書籍權限")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.bi_admin),
      expression: "auth_level.bi_admin"
    }],
    attrs: {
      "id": "bi1",
      "type": "radio",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.bi_admin, "1")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "bi_admin", "1")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "bi1"
    }
  }, [_vm._v("可編輯")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.bi_admin),
      expression: "auth_level.bi_admin"
    }],
    attrs: {
      "id": "bi0",
      "type": "radio",
      "value": "0"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.bi_admin, "0")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "bi_admin", "0")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "bi0"
    }
  }, [_vm._v("僅查看")])])])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "content_footer"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.changeAuthorityLevel()
      }
    }
  }, [_vm._v("確認")])])])]) : (_vm.type == 'bi') ? _c('div', {
    staticClass: "sp_block bi"
  }, [(_vm.sub_loading) ? _c('div', {
    staticClass: "sub_loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp_content"
  }, [_c('div', {
    staticClass: "content_title"
  }, [_c('div', {
    staticClass: "project_name"
  }, [_c('el-upload', {
    staticClass: "book_image_wrap",
    attrs: {
      "action": "",
      "on-change": _vm.getFile,
      "auto-upload": false,
      "show-file-list": false
    }
  }, [(_vm.imageurl) ? _c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.imageurl
    }
  }) : _c('i', {
    staticClass: "el-icon-plus avatar-uploader-icon"
  })]), _vm._v(" "), (_vm.book_data.bi_name) ? _c('p', [_vm._v(_vm._s(_vm.book_data.bi_name))]) : _c('p', [_vm._v("設定書籍名稱")]), _vm._v(" "), (_vm.book_id) ? _c('p', {
    staticClass: "creater"
  }, [_vm._v(_vm._s(_vm.book_data.create_user) + " 在 " + _vm._s(_vm.book_data.create_date) + " 建立")]) : _vm._e(), _vm._v(" "), _c('i', {
    staticClass: "fas fa-times close",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "cursor far fa-trash-alt delete",
    on: {
      "click": function($event) {
        return _vm.openDeleteAnnPromptBox(_vm.book_data.bi_id, 4)
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "content overflow",
    class: {
      'create': !_vm.book_id, 'modify': _vm.book_id
    }
  }, [_c('div', {
    staticClass: "book_infor_wrap"
  }, [_c('div', {
    staticClass: "book_infor_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("書籍名稱")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.book_data.bi_name),
      expression: "book_data.bi_name"
    }],
    attrs: {
      "type": "text",
      "placeholder": "設定書籍名稱"
    },
    domProps: {
      "value": (_vm.book_data.bi_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.book_data, "bi_name", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('bs_id', 'bi_id', _vm.book_data.bs_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("分類")]), _vm._v(" "), (_vm.book_data.bs_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.book_data.bs_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpen('bs_id', 'bi_id', _vm.book_data.bs_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.book_sort), function(sort) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.book_data.bs_id == sort.bs_id
      },
      on: {
        "click": function($event) {
          _vm.book_data.bs_id = sort.bs_id, _vm.book_data.bs_name = sort.bs_name
        }
      }
    }, [_vm._v(_vm._s(sort.bs_name))])
  }), 0)]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell dropdown_item x3",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('bi_purchasedate', 'bi_id', _vm.book_data.bi_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("進貨日期")]), _vm._v(" "), (!_vm.book_data.bi_purchasedate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.book_data.bi_purchasedate))]), _vm._v(" "), (_vm.checkToOpen('bi_purchasedate', 'bi_id', _vm.book_data.bi_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.book_data.bi_id,
      "type": "bi_id",
      "date": _vm.book_data.bi_purchasedate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changePurchaseDate
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "infor_cell dropdown_item x3",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ud_name', 'bi_id', _vm.book_data.bi_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("資產")]), _vm._v(" "), (_vm.book_data.ud_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.book_data.ud_name))]) : (_vm.book_data.ud_id == 0) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v("公司")]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定資產")]), _vm._v(" "), (_vm.checkToOpen('ud_name', 'bi_id', _vm.book_data.bi_id)) ? _c('div', {
    staticClass: "drop_down_wrap user"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.user_cate), function(user) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.book_data.ud_id == user.ud_id
      },
      on: {
        "click": function($event) {
          return _vm.changeBookUser(user.ud_id, user.ud_name)
        }
      }
    }, [(user.ud_icon) ? _c('img', {
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    }) : _c('img', {
      attrs: {
        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
        "alt": ""
      }
    }), _vm._v("\n                                                " + _vm._s(user.ud_name) + "\n                                            ")])
  }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell dropdown_item x3",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('bsc_id', 'bi_id', _vm.book_data.bsc_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("狀態")]), _vm._v(" "), (_vm.book_data.bsc_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.book_data.bsc_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpen('bsc_id', 'bi_id', _vm.book_data.bsc_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.book_status), function(status) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.book_data.bsc_id == status.bsc_id
      },
      on: {
        "click": function($event) {
          _vm.book_data.bsc_id = status.bsc_id, _vm.book_data.bsc_name = status.bsc_name
        }
      }
    }, [_vm._v(_vm._s(status.bsc_name))])
  }), 0)]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell x1"
  }, [_c('span', {}, [_vm._v("書籍內容")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.book_data.bi_message),
      expression: "book_data.bi_message"
    }],
    attrs: {
      "name": "bi_message",
      "cols": "30",
      "rows": "10"
    },
    domProps: {
      "value": (_vm.book_data.bi_message)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.book_data, "bi_message", $event.target.value)
      }
    }
  })])])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "content_footer"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.changeBook()
      }
    }
  }, [_vm._v("確認")])])])]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.prompt_box_open),
      expression: "prompt_box_open"
    }],
    staticClass: "prompt_wrap"
  }, [_c('div', {
    staticClass: "prompt_box"
  }, [_vm._m(6), _vm._v(" "), _c('div', {
    staticClass: "prompt_btn_group"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closePrompt()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), (_vm.show_submit_btn) ? _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.deleteProject()
      }
    }
  }, [_vm._v("確認")]) : _c('div', {
    staticClass: "btn_submit"
  }, [_vm._v("確認")]), _vm._v(" "), _vm._m(7)])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "account_infor_header"
  }, [_c('p', [_vm._v("員工帳號")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "password_infor_header"
  }, [_c('p', [_vm._v("員工密碼")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user_infor_header"
  }, [_c('p', [_vm._v("員工資訊")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "auth_infor_header"
  }, [_c('p', [_vm._v("權限資訊")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "auth_infor_header"
  }, [_c('p', [_vm._v("權限資訊")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "auth_level_header"
  }, [_c('p', [_vm._v("權限等級")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "prompt_content"
  }, [_c('div', {
    staticClass: "prompt_icon"
  }, [_c('i', {
    staticClass: "fas"
  })]), _vm._v(" "), _c('div', {
    staticClass: "prompt_title"
  }, [_c('h2')])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('span'), _vm._v("s 後自動關閉")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2dac10a2", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "reminderwrap"
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7d4bba47", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    style: (_vm.stylelist),
    attrs: {
      "id": "hoverwrap"
    }
  }, [_c('div', {
    staticClass: "title"
  }, [_c('span', [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _c('div', {
    staticClass: "subtitle"
  }, [_c('i', {
    staticClass: "fas fa-long-arrow-alt-right",
    attrs: {
      "title": "子專案標題"
    }
  }), _c('span', [_vm._v(_vm._s(_vm.subtitle))])]), _vm._v(" "), _c('div', {
    staticClass: "user"
  }, [_c('i', {
    staticClass: "fas fa-running"
  }), _c('span', [_vm._v("執行人：")]), _c('span', [_vm._v(_vm._s(_vm.user))])]), _vm._v(" "), _c('div', {
    staticClass: "date"
  }, [_c('i', {
    staticClass: "fas fa-calendar-day"
  }), _c('span', [_vm._v("執行日期：")]), _c('span', [_vm._v(_vm._s(_vm.date))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f53e4bea", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3eac1cd6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-077da1d8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Datetimepicker.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-077da1d8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Datetimepicker.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("837a958e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0f46a4b9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0f46a4b9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("44be28d4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2dac10a2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Singlepage.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2dac10a2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Singlepage.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3b0a3368", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7d4bba47\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Reminderwrap.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7d4bba47\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Reminderwrap.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("75378808", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-f53e4bea\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Hoverwrap.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-f53e4bea\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Hoverwrap.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
   prefixProperties: __webpack_require__(33) ,
   cssUnitless: __webpack_require__(30) ,
   object: __webpack_require__(37),
   string: __webpack_require__(59)
}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

'use exports'

//make sure properties are in hyphenated form

module.exports = {
    'animation'    : 1,
    'column-count' : 1,
    'columns'      : 1,
    'font-weight'  : 1,
    'opacity'      : 1,
    'order  '      : 1,
    'z-index'      : 1,
    'zoom'         : 1,
    'flex'         : 1,
    'box-flex'     : 1,
    'transform'    : 1,
    'perspective'  : 1,
    'box-pack'     : 1,
    'box-align'    : 1,
    'colspan'      : 1,
    'rowspan'      : 1
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectHasOwn = Object.prototype.hasOwnProperty

module.exports = function(object, propertyName){
    return objectHasOwn.call(object, propertyName)
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toUpperFirst = __webpack_require__(36)

var re         = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/

var docStyle   = typeof document == 'undefined'?
                    {}:
                    document.documentElement.style

var prefixInfo = (function(){

    var prefix = (function(){

            for (var prop in docStyle) {
                if( re.test(prop) ) {
                    // test is faster than match, so it's better to perform
                    // that on the lot and match only when necessary
                    return  prop.match(re)[0]
                }
            }

            // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
            // However (prop in style) returns the correct value, so we'll have to test for
            // the precence of a specific property
            if ('WebkitOpacity' in docStyle){
                return 'Webkit'
            }

            if ('KhtmlOpacity' in docStyle) {
                return 'Khtml'
            }

            return ''
        })(),

    lower = prefix.toLowerCase()

    return {
        style       : prefix,
        css       : '-' + lower + '-',
        dom       : ({
            Webkit: 'WebKit',
            ms    : 'MS',
            o     : 'WebKit'
        })[prefix] || toUpperFirst(prefix)
    }

})()

module.exports = prefixInfo

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = {
    'border-radius'              : 1,
    'border-top-left-radius'     : 1,
    'border-top-right-radius'    : 1,
    'border-bottom-left-radius'  : 1,
    'border-bottom-right-radius' : 1,
    'box-shadow'                 : 1,
    'order'                      : 1,
    'flex'                       : function(name, prefix){
        return [prefix + 'box-flex']
    },
    'box-flex'                   : 1,
    'box-align'                  : 1,
    'animation'                  : 1,
    'animation-duration'         : 1,
    'animation-name'             : 1,
    'transition'                 : 1,
    'transition-duration'        : 1,
    'transform'                  : 1,
    'transform-style'            : 1,
    'transform-origin'           : 1,
    'backface-visibility'        : 1,
    'perspective'                : 1,
    'box-pack'                   : 1
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toCamelFn = function(str, letter){
       return letter ? letter.toUpperCase(): ''
   }

var hyphenRe = __webpack_require__(56)

module.exports = function(str){
   return str?
          str.replace(hyphenRe, toCamelFn):
          ''
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var separate = __webpack_require__(57)

module.exports = function(name){
   return separate(name).toLowerCase()
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(value){
    return value.length?
                value.charAt(0).toUpperCase() + value.substring(1):
                value
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var prefixInfo  = __webpack_require__(32)
var cssPrefixFn = __webpack_require__(52)

var HYPHENATE   = __webpack_require__(35)
var CAMELIZE   = __webpack_require__(34)
var HAS_OWN     = __webpack_require__(31)
var IS_OBJECT   = __webpack_require__(54)
var IS_FUNCTION = __webpack_require__(53)

var applyPrefix = function(target, property, value, normalizeFn){
    cssPrefixFn(property).forEach(function(p){
        target[normalizeFn? normalizeFn(p): p] = value
    })
}

var toObject = function(str){
    str = (str || '').split(';')

    var result = {}

    str.forEach(function(item){
        var split = item.split(':')

        if (split.length == 2){
            result[split[0].trim()] = split[1].trim()
        }
    })

    return result
}

var CONFIG = {
    cssUnitless: __webpack_require__(30)
}

/**
 * @ignore
 * @method toStyleObject
 *
 * @param  {Object} styles The object to convert to a style object.
 * @param  {Object} [config]
 * @param  {Boolean} [config.addUnits=true] True if you want to add units when numerical values are encountered.
 * @param  {Object}  config.cssUnitless An object whose keys represent css numerical property names that will not be appended with units.
 * @param  {Object}  config.prefixProperties An object whose keys represent css property names that should be prefixed
 * @param  {String}  config.cssUnit='px' The css unit to append to numerical values. Defaults to 'px'
 * @param  {String}  config.normalizeName A function that normalizes a name to a valid css property name
 * @param  {String}  config.scope
 *
 * @return {Object} The object, normalized with css style names
 */
var TO_STYLE_OBJECT = function(styles, config, prepend, result){

    if (typeof styles == 'string'){
        styles = toObject(styles)
    }

    config = config || CONFIG

    config.cssUnitless = config.cssUnitless || CONFIG.cssUnitless

    result = result || {}

    var scope    = config.scope || {},

        //configs
        addUnits = config.addUnits != null?
                            config.addUnits:
                            scope && scope.addUnits != null?
                                scope.addUnits:
                                true,

        cssUnitless      = (config.cssUnitless != null?
                                config.cssUnitless:
                                scope?
                                    scope.cssUnitless:
                                    null) || {},
        cssUnit          = (config.cssUnit || scope? scope.cssUnit: null) || 'px',
        prefixProperties = (config.prefixProperties || (scope? scope.prefixProperties: null)) || {},

        camelize    = config.camelize,
        normalizeFn = camelize? CAMELIZE: HYPHENATE

    // Object.keys(cssUnitless).forEach(function(key){
    //     cssUnitless[normalizeFn(key)] = 1
    // })

    var processed,
        styleName,

        propName,
        propValue,
        propCssUnit,
        propType,
        propIsNumber,

        fnPropValue,
        prefix

    for (propName in styles) if (HAS_OWN(styles, propName)) {

        propValue = styles[ propName ]

        //the hyphenated style name (css property name)
        styleName = HYPHENATE(prepend? prepend + propName: propName)

        processed = false
        prefix    = false

        if (IS_FUNCTION(propValue)) {

            //a function can either return a css value
            //or an object with { value, prefix, name }
            fnPropValue = propValue.call(scope || styles, propValue, propName, styleName, styles)

            if (IS_OBJECT(fnPropValue) && fnPropValue.value != null){

                propValue = fnPropValue.value
                prefix    = fnPropValue.prefix
                styleName = fnPropValue.name?
                                HYPHENATE(fnPropValue.name):
                                styleName

            } else {
                propValue = fnPropValue
            }
        }

        propType     = typeof propValue
        propIsNumber = propType == 'number' || (propType == 'string' && propValue != '' && propValue * 1 == propValue)

        if (propValue == null || styleName == null || styleName === ''){
            continue
        }

        if (propIsNumber || propType == 'string'){
           processed = true
        }

        if (!processed && propValue.value != null && propValue.prefix){
           processed = true
           prefix    = propValue.prefix
           propValue = propValue.value
        }

        // hyphenStyleName = camelize? HYPHENATE(styleName): styleName

        if (processed){

            prefix = prefix || !!prefixProperties[styleName]

            if (propIsNumber){
                propValue = addUnits && !(styleName in cssUnitless) ?
                                propValue + cssUnit:
                                propValue + ''//change it to a string, so that jquery does not append px or other units
            }

            //special border treatment
            if (
                    (
                     styleName == 'border' ||
                    (!styleName.indexOf('border')
                        &&
                        !~styleName.indexOf('radius')
                        &&
                        !~styleName.indexOf('width'))
                    ) &&
                    propIsNumber
                ){

                styleName = styleName + '-width'
            }

            //special border radius treatment
            if (!styleName.indexOf('border-radius-')){
                styleName.replace(/border(-radius)(-(.*))/, function(str, radius, theRest){
                    var positions = {
                        '-top'    : ['-top-left',      '-top-right' ],
                        '-left'   : ['-top-left',    '-bottom-left' ],
                        '-right'  : ['-top-right',   '-bottom-right'],
                        '-bottom' : ['-bottom-left', '-bottom-right']
                    }

                    if (theRest in positions){
                        styleName = []

                        positions[theRest].forEach(function(pos){
                            styleName.push('border' + pos + radius)
                        })
                    } else {
                        styleName = 'border'+ theRest + radius
                    }

                })

                if (Array.isArray(styleName)){
                    styleName.forEach(function(styleName){
                        if (prefix){
                            applyPrefix(result, styleName, propValue, normalizeFn)
                        } else {
                            result[normalizeFn(styleName)] = propValue
                        }
                    })

                    continue
                }
            }

            if (prefix){
                applyPrefix(result, styleName, propValue, normalizeFn)
            } else {
                result[normalizeFn(styleName)] = propValue
            }

        } else {
            //the propValue must be an object, so go down the hierarchy
            TO_STYLE_OBJECT(propValue, config, styleName + '-', result)
        }
    }

    return result
}

module.exports = TO_STYLE_OBJECT

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__routes_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_highlight_text__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_highlight_text___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_highlight_text__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_highlight_text_public_directive_min__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_highlight_text_public_directive_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_highlight_text_public_directive_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_html5_editor__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_html5_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_html5_editor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rightMenu__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rightMenu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rightMenu__);
window._ = __webpack_require__(64);

try {
    window.$ = window.jQuery = __webpack_require__(38);

    __webpack_require__(49);
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







Vue.directive('highlight', __WEBPACK_IMPORTED_MODULE_2_vue_highlight_text_public_directive_min___default.a);
Vue.component('HighlightText', __WEBPACK_IMPORTED_MODULE_1_vue_highlight_text___default.a);
Vue.use(__WEBPACK_IMPORTED_MODULE_4_rightMenu___default.a);
Vue.use(__WEBPACK_IMPORTED_MODULE_3_vue_html5_editor___default.a, {
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
        info: "fa fa-info"
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
        uploadHandler(responseText) {
            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
            var json = JSON.parse(responseText);
            if (!json.ok) {
                alert(json.msg);
            } else {
                return json.data;
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
    hiddenModules: ["color", "font", "list", "link", "unlink", "tabulation", "hr", "eraser", "undo", "full-screen", "info"],
    // 自定义要显示的模块，并控制顺序
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: ["text", "color", "font", "align", "list", "link", "unlink", "tabulation", "image", "hr", "eraser", "undo", "full-screen", "info"],
    // 扩展模块，具体可以参考examples或查看源码
    // extended modules
    modules: {
        //omit,reference to source code of build-in modules
    }
});

new Vue({
    router: __WEBPACK_IMPORTED_MODULE_0__routes_js__["a" /* default */]
}).$mount('#app');

/***/ }),
/* 40 */,
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 44 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 46 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 47 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (new VueRouter({
    routes: [{
        path: '/index',
        name: 'index',
        component: Vue.component('index', __webpack_require__(17))
    }]
}));

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreUtils", function() { return foundation_core_utils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Core", function() { return Foundation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Foundation", function() { return Foundation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return Box; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onImagesLoaded", function() { return onImagesLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Keyboard", function() { return Keyboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaQuery", function() { return MediaQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Motion", function() { return Motion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Move", function() { return Move; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nest", function() { return Nest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Touch", function() { return Touch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Triggers", function() { return Triggers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Abide", function() { return Abide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Accordion", function() { return Accordion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionMenu", function() { return AccordionMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drilldown", function() { return Drilldown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dropdown", function() { return Dropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropdownMenu", function() { return DropdownMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Equalizer", function() { return Equalizer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interchange", function() { return Interchange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Magellan", function() { return Magellan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OffCanvas", function() { return OffCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Orbit", function() { return Orbit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponsiveMenu", function() { return ResponsiveMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponsiveToggle", function() { return ResponsiveToggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reveal", function() { return Reveal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Slider", function() { return Slider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmoothScroll", function() { return SmoothScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sticky", function() { return Sticky; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return Tabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toggler", function() { return Toggler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponsiveAccordionTabs", function() { return ResponsiveAccordionTabs; });


function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

/**
 * Returns a boolean for RTL support
 */

function rtl() {
  return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html').attr('dir') === 'rtl';
}
/**
 * returns a random base-36 uid with namespacing
 * @function
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
 * @returns {String} - unique id
 */


function GetYoDigits(length, namespace) {
  length = length || 6;
  return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? "-".concat(namespace) : '');
}
/**
 * Escape a string so it can be used as a regexp pattern
 * @function
 * @see https://stackoverflow.com/a/9310752/4317384
 *
 * @param {String} str - string to escape.
 * @returns {String} - escaped string
 */


function RegExpEscape(str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function transitionend($elem) {
  var transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  };
  var elem = document.createElement('div'),
      end;

  for (var t in transitions) {
    if (typeof elem.style[t] !== 'undefined') {
      end = transitions[t];
    }
  }

  if (end) {
    return end;
  } else {
    end = setTimeout(function () {
      $elem.triggerHandler('transitionend', [$elem]);
    }, 1);
    return 'transitionend';
  }
}
/**
 * Return an event type to listen for window load.
 *
 * If `$elem` is passed, an event will be triggered on `$elem`. If window is already loaded, the event will still be triggered.
 * If `handler` is passed, attach it to the event on `$elem`.
 * Calling `onLoad` without handler allows you to get the event type that will be triggered before attaching the handler by yourself.
 * @function
 *
 * @param {Object} [] $elem - jQuery element on which the event will be triggered if passed.
 * @param {Function} [] handler - function to attach to the event.
 * @returns {String} - event type that should or will be triggered.
 */


function onLoad($elem, handler) {
  var didLoad = document.readyState === 'complete';
  var eventType = (didLoad ? '_didLoad' : 'load') + '.zf.util.onLoad';

  var cb = function cb() {
    return $elem.triggerHandler(eventType);
  };

  if ($elem) {
    if (handler) $elem.one(eventType, handler);
    if (didLoad) setTimeout(cb);else __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).one('load', cb);
  }

  return eventType;
}
/**
 * Retuns an handler for the `mouseleave` that ignore disappeared mouses.
 *
 * If the mouse "disappeared" from the document (like when going on a browser UI element, See https://git.io/zf-11410),
 * the event is ignored.
 * - If the `ignoreLeaveWindow` is `true`, the event is ignored when the user actually left the window
 *   (like by switching to an other window with [Alt]+[Tab]).
 * - If the `ignoreReappear` is `true`, the event will be ignored when the mouse will reappear later on the document
 *   outside of the element it left.
 *
 * @function
 *
 * @param {Function} [] handler - handler for the filtered `mouseleave` event to watch.
 * @param {Object} [] options - object of options:
 * - {Boolean} [false] ignoreLeaveWindow - also ignore when the user switched windows.
 * - {Boolean} [false] ignoreReappear - also ignore when the mouse reappeared outside of the element it left.
 * @returns {Function} - filtered handler to use to listen on the `mouseleave` event.
 */


function ignoreMousedisappear(handler) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$ignoreLeaveWindo = _ref.ignoreLeaveWindow,
      ignoreLeaveWindow = _ref$ignoreLeaveWindo === void 0 ? false : _ref$ignoreLeaveWindo,
      _ref$ignoreReappear = _ref.ignoreReappear,
      ignoreReappear = _ref$ignoreReappear === void 0 ? false : _ref$ignoreReappear;

  return function leaveEventHandler(eLeave) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var callback = handler.bind.apply(handler, [this, eLeave].concat(rest)); // The mouse left: call the given callback if the mouse entered elsewhere

    if (eLeave.relatedTarget !== null) {
      return callback();
    } // Otherwise, check if the mouse actually left the window.
    // In firefox if the user switched between windows, the window sill have the focus by the time
    // the event is triggered. We have to debounce the event to test this case.


    setTimeout(function leaveEventDebouncer() {
      if (!ignoreLeaveWindow && document.hasFocus && !document.hasFocus()) {
        return callback();
      } // Otherwise, wait for the mouse to reeapear outside of the element,


      if (!ignoreReappear) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).one('mouseenter', function reenterEventHandler(eReenter) {
          if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(eLeave.currentTarget).has(eReenter.target).length) {
            // Fill where the mouse finally entered.
            eLeave.relatedTarget = eReenter.target;
            callback();
          }
        });
      }
    }, 0);
  };
}

var foundation_core_utils = /*#__PURE__*/Object.freeze({
  rtl: rtl,
  GetYoDigits: GetYoDigits,
  RegExpEscape: RegExpEscape,
  transitionend: transitionend,
  onLoad: onLoad,
  ignoreMousedisappear: ignoreMousedisappear
});

// Authors & copyright(c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. MIT license

/* eslint-disable */

window.matchMedia || (window.matchMedia = function () {

  var styleMedia = window.styleMedia || window.media; // For those that don't support matchMedium

  if (!styleMedia) {
    var style = document.createElement('style'),
        script = document.getElementsByTagName('script')[0],
        info = null;
    style.type = 'text/css';
    style.id = 'matchmediajs-test';

    if (!script) {
      document.head.appendChild(style);
    } else {
      script.parentNode.insertBefore(style, script);
    } // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers


    info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;
    styleMedia = {
      matchMedium: function matchMedium(media) {
        var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }'; // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers

        if (style.styleSheet) {
          style.styleSheet.cssText = text;
        } else {
          style.textContent = text;
        } // Test if media query is true or false


        return info.width === '1px';
      }
    };
  }

  return function (media) {
    return {
      matches: styleMedia.matchMedium(media || 'all'),
      media: media || 'all'
    };
  };
}());
/* eslint-enable */

var MediaQuery = {
  queries: [],
  current: '',

  /**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */
  _init: function _init() {
    var self = this;
    var $meta = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('meta.foundation-mq');

    if (!$meta.length) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<meta class="foundation-mq">').appendTo(document.head);
    }

    var extractedStyles = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.foundation-mq').css('font-family');
    var namedQueries;
    namedQueries = parseStyleToObject(extractedStyles);

    for (var key in namedQueries) {
      if (namedQueries.hasOwnProperty(key)) {
        self.queries.push({
          name: key,
          value: "only screen and (min-width: ".concat(namedQueries[key], ")")
        });
      }
    }

    this.current = this._getCurrentSize();

    this._watcher();
  },

  /**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */
  atLeast: function atLeast(size) {
    var query = this.get(size);

    if (query) {
      return window.matchMedia(query).matches;
    }

    return false;
  },

  /**
   * Checks if the screen matches to a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
   */
  is: function is(size) {
    size = size.trim().split(' ');

    if (size.length > 1 && size[1] === 'only') {
      if (size[0] === this._getCurrentSize()) return true;
    } else {
      return this.atLeast(size[0]);
    }

    return false;
  },

  /**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */
  get: function get(size) {
    for (var i in this.queries) {
      if (this.queries.hasOwnProperty(i)) {
        var query = this.queries[i];
        if (size === query.name) return query.value;
      }
    }

    return null;
  },

  /**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */
  _getCurrentSize: function _getCurrentSize() {
    var matched;

    for (var i = 0; i < this.queries.length; i++) {
      var query = this.queries[i];

      if (window.matchMedia(query.value).matches) {
        matched = query;
      }
    }

    if (_typeof(matched) === 'object') {
      return matched.name;
    } else {
      return matched;
    }
  },

  /**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */
  _watcher: function _watcher() {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery', function () {
      var newSize = _this._getCurrentSize(),
          currentSize = _this.current;

      if (newSize !== currentSize) {
        // Change the current media query
        _this.current = newSize; // Broadcast the media query change on the window

        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
      }
    });
  }
}; // Thank you: https://github.com/sindresorhus/query-string

function parseStyleToObject(str) {
  var styleObject = {};

  if (typeof str !== 'string') {
    return styleObject;
  }

  str = str.trim().slice(1, -1); // browsers re-quote string style values

  if (!str) {
    return styleObject;
  }

  styleObject = str.split('&').reduce(function (ret, param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = parts[0];
    var val = parts[1];
    key = decodeURIComponent(key); // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    val = typeof val === 'undefined' ? null : decodeURIComponent(val);

    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }

    return ret;
  }, {});
  return styleObject;
}

var FOUNDATION_VERSION = '6.5.3'; // Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify

var Foundation = {
  version: FOUNDATION_VERSION,

  /**
   * Stores initialized plugins.
   */
  _plugins: {},

  /**
   * Stores generated unique ids for plugin instances
   */
  _uuids: [],

  /**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */
  plugin: function plugin(_plugin, name) {
    // Object key to use when adding to global Foundation object
    // Examples: Foundation.Reveal, Foundation.OffCanvas
    var className = name || functionName(_plugin); // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
    // Examples: data-reveal, data-off-canvas

    var attrName = hyphenate(className); // Add to the Foundation object and the plugins list (for reflowing)

    this._plugins[attrName] = this[className] = _plugin;
  },

  /**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */
  registerPlugin: function registerPlugin(plugin, name) {
    var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
    plugin.uuid = GetYoDigits(6, pluginName);

    if (!plugin.$element.attr("data-".concat(pluginName))) {
      plugin.$element.attr("data-".concat(pluginName), plugin.uuid);
    }

    if (!plugin.$element.data('zfPlugin')) {
      plugin.$element.data('zfPlugin', plugin);
    }
    /**
     * Fires when the plugin has initialized.
     * @event Plugin#init
     */


    plugin.$element.trigger("init.zf.".concat(pluginName));

    this._uuids.push(plugin.uuid);

    return;
  },

  /**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */
  unregisterPlugin: function unregisterPlugin(plugin) {
    var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);

    plugin.$element.removeAttr("data-".concat(pluginName)).removeData('zfPlugin')
    /**
     * Fires when the plugin has been destroyed.
     * @event Plugin#destroyed
     */
    .trigger("destroyed.zf.".concat(pluginName));

    for (var prop in plugin) {
      plugin[prop] = null; //clean up script to prep for garbage collection.
    }

    return;
  },

  /**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */
  reInit: function reInit(plugins) {
    var isJQ = plugins instanceof __WEBPACK_IMPORTED_MODULE_0_jquery___default.a;

    try {
      if (isJQ) {
        plugins.each(function () {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('zfPlugin')._init();
        });
      } else {
        var type = _typeof(plugins),
            _this = this,
            fns = {
          'object': function object(plgs) {
            plgs.forEach(function (p) {
              p = hyphenate(p);
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-' + p + ']').foundation('_init');
            });
          },
          'string': function string() {
            plugins = hyphenate(plugins);
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-' + plugins + ']').foundation('_init');
          },
          'undefined': function undefined() {
            this['object'](Object.keys(_this._plugins));
          }
        };

        fns[type](plugins);
      }
    } catch (err) {
      console.error(err);
    } finally {
      return plugins;
    }
  },

  /**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
  reflow: function reflow(elem, plugins) {
    // If plugins is undefined, just grab everything
    if (typeof plugins === 'undefined') {
      plugins = Object.keys(this._plugins);
    } // If plugins is a string, convert it to an array with one item
    else if (typeof plugins === 'string') {
        plugins = [plugins];
      }

    var _this = this; // Iterate through each plugin


    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(plugins, function (i, name) {
      // Get the current plugin
      var plugin = _this._plugins[name]; // Localize the search to all elements inside elem, as well as elem itself, unless elem === document

      var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(elem).find('[data-' + name + ']').addBack('[data-' + name + ']'); // For each plugin found, initialize it

      $elem.each(function () {
        var $el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            opts = {}; // Don't double-dip on plugins

        if ($el.data('zfPlugin')) {
          console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
          return;
        }

        if ($el.attr('data-options')) {
          var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
            var opt = e.split(':').map(function (el) {
              return el.trim();
            });
            if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
          });
        }

        try {
          $el.data('zfPlugin', new plugin(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), opts));
        } catch (er) {
          console.error(er);
        } finally {
          return;
        }
      });
    });
  },
  getFnName: functionName,
  addToJquery: function addToJquery($$$1) {
    // TODO: consider not making this a jQuery function
    // TODO: need way to reflow vs. re-initialize

    /**
     * The Foundation jQuery method.
     * @param {String|Array} method - An action to perform on the current jQuery object.
     */
    var foundation = function foundation(method) {
      var type = _typeof(method),
          $noJS = $$$1('.no-js');

      if ($noJS.length) {
        $noJS.removeClass('no-js');
      }

      if (type === 'undefined') {
        //needs to initialize the Foundation object, or an individual plugin.
        MediaQuery._init();

        Foundation.reflow(this);
      } else if (type === 'string') {
        //an individual method to invoke on a plugin or group of plugins
        var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary

        var plugClass = this.data('zfPlugin'); //determine the class of plugin

        if (typeof plugClass !== 'undefined' && typeof plugClass[method] !== 'undefined') {
          //make sure both the class and method exist
          if (this.length === 1) {
            //if there's only one, call it directly.
            plugClass[method].apply(plugClass, args);
          } else {
            this.each(function (i, el) {
              //otherwise loop through the jQuery collection and invoke the method on each
              plugClass[method].apply($$$1(el).data('zfPlugin'), args);
            });
          }
        } else {
          //error for no class or no method
          throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
        }
      } else {
        //error for invalid argument type
        throw new TypeError("We're sorry, ".concat(type, " is not a valid parameter. You must use a string representing the method you wish to invoke."));
      }

      return this;
    };

    $$$1.fn.foundation = foundation;
    return $$$1;
  }
};
Foundation.util = {
  /**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */
  throttle: function throttle(func, delay) {
    var timer = null;
    return function () {
      var context = this,
          args = arguments;

      if (timer === null) {
        timer = setTimeout(function () {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  }
};
window.Foundation = Foundation; // Polyfill for requestAnimationFrame

(function () {
  if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
    return new Date().getTime();
  };
  var vendors = ['webkit', 'moz'];

  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
  }

  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;

    window.requestAnimationFrame = function (callback) {
      var now = Date.now();
      var nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };

    window.cancelAnimationFrame = clearTimeout;
  }
  /**
   * Polyfill for performance.now, required by rAF
   */


  if (!window.performance || !window.performance.now) {
    window.performance = {
      start: Date.now(),
      now: function now() {
        return Date.now() - this.start;
      }
    };
  }
})();

if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function fNOP() {},
        fBound = function fBound() {
      return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }

    fBound.prototype = new fNOP();
    return fBound;
  };
} // Polyfill to get the name of a function in IE9


function functionName(fn) {
  if (typeof Function.prototype.name === 'undefined') {
    var funcNameRegex = /function\s([^(]{1,})\(/;
    var results = funcNameRegex.exec(fn.toString());
    return results && results.length > 1 ? results[1].trim() : "";
  } else if (typeof fn.prototype === 'undefined') {
    return fn.constructor.name;
  } else {
    return fn.prototype.constructor.name;
  }
}

function parseValue(str) {
  if ('true' === str) return true;else if ('false' === str) return false;else if (!isNaN(str * 1)) return parseFloat(str);
  return str;
} // Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580


function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

var Box = {
  ImNotTouchingYou: ImNotTouchingYou,
  OverlapArea: OverlapArea,
  GetDimensions: GetDimensions,
  GetOffsets: GetOffsets,
  GetExplicitOffsets: GetExplicitOffsets
  /**
   * Compares the dimensions of an element to a container and determines collision events with container.
   * @function
   * @param {jQuery} element - jQuery object to test for collisions.
   * @param {jQuery} parent - jQuery object to use as bounding container.
   * @param {Boolean} lrOnly - set to true to check left and right values only.
   * @param {Boolean} tbOnly - set to true to check top and bottom values only.
   * @default if no parent object passed, detects collisions with `window`.
   * @returns {Boolean} - true if collision free, false if a collision in any direction.
   */

};

function ImNotTouchingYou(element, parent, lrOnly, tbOnly, ignoreBottom) {
  return OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) === 0;
}

function OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) {
  var eleDims = GetDimensions(element),
      topOver,
      bottomOver,
      leftOver,
      rightOver;

  if (parent) {
    var parDims = GetDimensions(parent);
    bottomOver = parDims.height + parDims.offset.top - (eleDims.offset.top + eleDims.height);
    topOver = eleDims.offset.top - parDims.offset.top;
    leftOver = eleDims.offset.left - parDims.offset.left;
    rightOver = parDims.width + parDims.offset.left - (eleDims.offset.left + eleDims.width);
  } else {
    bottomOver = eleDims.windowDims.height + eleDims.windowDims.offset.top - (eleDims.offset.top + eleDims.height);
    topOver = eleDims.offset.top - eleDims.windowDims.offset.top;
    leftOver = eleDims.offset.left - eleDims.windowDims.offset.left;
    rightOver = eleDims.windowDims.width - (eleDims.offset.left + eleDims.width);
  }

  bottomOver = ignoreBottom ? 0 : Math.min(bottomOver, 0);
  topOver = Math.min(topOver, 0);
  leftOver = Math.min(leftOver, 0);
  rightOver = Math.min(rightOver, 0);

  if (lrOnly) {
    return leftOver + rightOver;
  }

  if (tbOnly) {
    return topOver + bottomOver;
  } // use sum of squares b/c we care about overlap area.


  return Math.sqrt(topOver * topOver + bottomOver * bottomOver + leftOver * leftOver + rightOver * rightOver);
}
/**
 * Uses native methods to return an object of dimension values.
 * @function
 * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
 * @returns {Object} - nested object of integer pixel values
 * TODO - if element is window, return only those values.
 */


function GetDimensions(elem) {
  elem = elem.length ? elem[0] : elem;

  if (elem === window || elem === document) {
    throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
  }

  var rect = elem.getBoundingClientRect(),
      parRect = elem.parentNode.getBoundingClientRect(),
      winRect = document.body.getBoundingClientRect(),
      winY = window.pageYOffset,
      winX = window.pageXOffset;
  return {
    width: rect.width,
    height: rect.height,
    offset: {
      top: rect.top + winY,
      left: rect.left + winX
    },
    parentDims: {
      width: parRect.width,
      height: parRect.height,
      offset: {
        top: parRect.top + winY,
        left: parRect.left + winX
      }
    },
    windowDims: {
      width: winRect.width,
      height: winRect.height,
      offset: {
        top: winY,
        left: winX
      }
    }
  };
}
/**
 * Returns an object of top and left integer pixel values for dynamically rendered elements,
 * such as: Tooltip, Reveal, and Dropdown. Maintained for backwards compatibility, and where
 * you don't know alignment, but generally from
 * 6.4 forward you should use GetExplicitOffsets, as GetOffsets conflates position and alignment.
 * @function
 * @param {jQuery} element - jQuery object for the element being positioned.
 * @param {jQuery} anchor - jQuery object for the element's anchor point.
 * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
 * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
 * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
 * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
 * TODO alter/rewrite to work with `em` values as well/instead of pixels
 */


function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
  console.log("NOTE: GetOffsets is deprecated in favor of GetExplicitOffsets and will be removed in 6.5");

  switch (position) {
    case 'top':
      return rtl() ? GetExplicitOffsets(element, anchor, 'top', 'left', vOffset, hOffset, isOverflow) : GetExplicitOffsets(element, anchor, 'top', 'right', vOffset, hOffset, isOverflow);

    case 'bottom':
      return rtl() ? GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow) : GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);

    case 'center top':
      return GetExplicitOffsets(element, anchor, 'top', 'center', vOffset, hOffset, isOverflow);

    case 'center bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'center', vOffset, hOffset, isOverflow);

    case 'center left':
      return GetExplicitOffsets(element, anchor, 'left', 'center', vOffset, hOffset, isOverflow);

    case 'center right':
      return GetExplicitOffsets(element, anchor, 'right', 'center', vOffset, hOffset, isOverflow);

    case 'left bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow);

    case 'right bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
    // Backwards compatibility... this along with the reveal and reveal full
    // classes are the only ones that didn't reference anchor

    case 'center':
      return {
        left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2 + hOffset,
        top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - ($eleDims.height / 2 + vOffset)
      };

    case 'reveal':
      return {
        left: ($eleDims.windowDims.width - $eleDims.width) / 2 + hOffset,
        top: $eleDims.windowDims.offset.top + vOffset
      };

    case 'reveal full':
      return {
        left: $eleDims.windowDims.offset.left,
        top: $eleDims.windowDims.offset.top
      };
      break;

    default:
      return {
        left: rtl() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset : $anchorDims.offset.left + hOffset,
        top: $anchorDims.offset.top + $anchorDims.height + vOffset
      };
  }
}

function GetExplicitOffsets(element, anchor, position, alignment, vOffset, hOffset, isOverflow) {
  var $eleDims = GetDimensions(element),
      $anchorDims = anchor ? GetDimensions(anchor) : null;
  var topVal, leftVal; // set position related attribute

  switch (position) {
    case 'top':
      topVal = $anchorDims.offset.top - ($eleDims.height + vOffset);
      break;

    case 'bottom':
      topVal = $anchorDims.offset.top + $anchorDims.height + vOffset;
      break;

    case 'left':
      leftVal = $anchorDims.offset.left - ($eleDims.width + hOffset);
      break;

    case 'right':
      leftVal = $anchorDims.offset.left + $anchorDims.width + hOffset;
      break;
  } // set alignment related attribute


  switch (position) {
    case 'top':
    case 'bottom':
      switch (alignment) {
        case 'left':
          leftVal = $anchorDims.offset.left + hOffset;
          break;

        case 'right':
          leftVal = $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset;
          break;

        case 'center':
          leftVal = isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2 + hOffset;
          break;
      }

      break;

    case 'right':
    case 'left':
      switch (alignment) {
        case 'bottom':
          topVal = $anchorDims.offset.top - vOffset + $anchorDims.height - $eleDims.height;
          break;

        case 'top':
          topVal = $anchorDims.offset.top + vOffset;
          break;

        case 'center':
          topVal = $anchorDims.offset.top + vOffset + $anchorDims.height / 2 - $eleDims.height / 2;
          break;
      }

      break;
  }

  return {
    top: topVal,
    left: leftVal
  };
}

/**
 * Runs a callback function when images are fully loaded.
 * @param {Object} images - Image(s) to check if loaded.
 * @param {Func} callback - Function to execute when image is fully loaded.
 */

function onImagesLoaded(images, callback) {
  var unloaded = images.length;

  if (unloaded === 0) {
    callback();
  }

  images.each(function () {
    // Check if image is loaded
    if (this.complete && typeof this.naturalWidth !== 'undefined') {
      singleImageLoaded();
    } else {
      // If the above check failed, simulate loading on detached element.
      var image = new Image(); // Still count image as loaded if it finalizes with an error.

      var events = "load.zf.images error.zf.images";
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(image).one(events, function me(event) {
        // Unbind the event listeners. We're using 'one' but only one of the two events will have fired.
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).off(events, me);
        singleImageLoaded();
      });
      image.src = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('src');
    }
  });

  function singleImageLoaded() {
    unloaded--;

    if (unloaded === 0) {
      callback();
    }
  }
}

/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/
var keyCodes = {
  9: 'TAB',
  13: 'ENTER',
  27: 'ESCAPE',
  32: 'SPACE',
  35: 'END',
  36: 'HOME',
  37: 'ARROW_LEFT',
  38: 'ARROW_UP',
  39: 'ARROW_RIGHT',
  40: 'ARROW_DOWN'
};
var commands = {}; // Functions pulled out to be referenceable from internals

function findFocusable($element) {
  if (!$element) {
    return false;
  }

  return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {
    if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is(':visible') || __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('tabindex') < 0) {
      return false;
    } //only have visible elements and those that have a tabindex greater or equal 0


    return true;
  });
}

function parseKey(event) {
  var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase(); // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events

  key = key.replace(/\W+/, '');
  if (event.shiftKey) key = "SHIFT_".concat(key);
  if (event.ctrlKey) key = "CTRL_".concat(key);
  if (event.altKey) key = "ALT_".concat(key); // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)

  key = key.replace(/_$/, '');
  return key;
}

var Keyboard = {
  keys: getKeyCodes(keyCodes),

  /**
   * Parses the (keyboard) event and returns a String that represents its key
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   * @param {Event} event - the event generated by the event handler
   * @return String key - String that represents the key pressed
   */
  parseKey: parseKey,

  /**
   * Handles the given (keyboard) event
   * @param {Event} event - the event generated by the event handler
   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
   * @param {Objects} functions - collection of functions that are to be executed
   */
  handleKey: function handleKey(event, component, functions) {
    var commandList = commands[component],
        keyCode = this.parseKey(event),
        cmds,
        command,
        fn;
    if (!commandList) return console.warn('Component not defined!');

    if (typeof commandList.ltr === 'undefined') {
      // this component does not differentiate between ltr and rtl
      cmds = commandList; // use plain list
    } else {
      // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
      if (rtl()) cmds = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, commandList.ltr, commandList.rtl);else cmds = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, commandList.rtl, commandList.ltr);
    }

    command = cmds[keyCode];
    fn = functions[command];

    if (fn && typeof fn === 'function') {
      // execute function  if exists
      var returnValue = fn.apply();

      if (functions.handled || typeof functions.handled === 'function') {
        // execute function when event was handled
        functions.handled(returnValue);
      }
    } else {
      if (functions.unhandled || typeof functions.unhandled === 'function') {
        // execute function when event was not handled
        functions.unhandled();
      }
    }
  },

  /**
   * Finds all focusable elements within the given `$element`
   * @param {jQuery} $element - jQuery object to search within
   * @return {jQuery} $focusable - all focusable elements within `$element`
   */
  findFocusable: findFocusable,

  /**
   * Returns the component name name
   * @param {Object} component - Foundation component, e.g. Slider or Reveal
   * @return String componentName
   */
  register: function register(componentName, cmds) {
    commands[componentName] = cmds;
  },
  // TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
  //

  /**
   * Traps the focus in the given element.
   * @param  {jQuery} $element  jQuery object to trap the foucs into.
   */
  trapFocus: function trapFocus($element) {
    var $focusable = findFocusable($element),
        $firstFocusable = $focusable.eq(0),
        $lastFocusable = $focusable.eq(-1);
    $element.on('keydown.zf.trapfocus', function (event) {
      if (event.target === $lastFocusable[0] && parseKey(event) === 'TAB') {
        event.preventDefault();
        $firstFocusable.focus();
      } else if (event.target === $firstFocusable[0] && parseKey(event) === 'SHIFT_TAB') {
        event.preventDefault();
        $lastFocusable.focus();
      }
    });
  },

  /**
   * Releases the trapped focus from the given element.
   * @param  {jQuery} $element  jQuery object to release the focus for.
   */
  releaseFocus: function releaseFocus($element) {
    $element.off('keydown.zf.trapfocus');
  }
};
/*
 * Constants for easier comparing.
 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
 */

function getKeyCodes(kcs) {
  var k = {};

  for (var kc in kcs) {
    k[kcs[kc]] = kcs[kc];
  }

  return k;
}

/**
 * Motion module.
 * @module foundation.motion
 */

var initClasses = ['mui-enter', 'mui-leave'];
var activeClasses = ['mui-enter-active', 'mui-leave-active'];
var Motion = {
  animateIn: function animateIn(element, animation, cb) {
    animate(true, element, animation, cb);
  },
  animateOut: function animateOut(element, animation, cb) {
    animate(false, element, animation, cb);
  }
};

function Move(duration, elem, fn) {
  var anim,
      prog,
      start = null; // console.log('called');

  if (duration === 0) {
    fn.apply(elem);
    elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    return;
  }

  function move(ts) {
    if (!start) start = ts; // console.log(start, ts);

    prog = ts - start;
    fn.apply(elem);

    if (prog < duration) {
      anim = window.requestAnimationFrame(move, elem);
    } else {
      window.cancelAnimationFrame(anim);
      elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    }
  }

  anim = window.requestAnimationFrame(move);
}
/**
 * Animates an element in or out using a CSS transition class.
 * @function
 * @private
 * @param {Boolean} isIn - Defines if the animation is in or out.
 * @param {Object} element - jQuery or HTML object to animate.
 * @param {String} animation - CSS class to use.
 * @param {Function} cb - Callback to run when animation is finished.
 */


function animate(isIn, element, animation, cb) {
  element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).eq(0);
  if (!element.length) return;
  var initClass = isIn ? initClasses[0] : initClasses[1];
  var activeClass = isIn ? activeClasses[0] : activeClasses[1]; // Set up the animation

  reset();
  element.addClass(animation).css('transition', 'none');
  requestAnimationFrame(function () {
    element.addClass(initClass);
    if (isIn) element.show();
  }); // Start the animation

  requestAnimationFrame(function () {
    element[0].offsetWidth;
    element.css('transition', '').addClass(activeClass);
  }); // Clean up the animation when it finishes

  element.one(transitionend(element), finish); // Hides the element (for out animations), resets the element, and runs a callback

  function finish() {
    if (!isIn) element.hide();
    reset();
    if (cb) cb.apply(element);
  } // Resets transitions and removes motion-specific classes


  function reset() {
    element[0].style.transitionDuration = 0;
    element.removeClass("".concat(initClass, " ").concat(activeClass, " ").concat(animation));
  }
}

var Nest = {
  Feather: function Feather(menu) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zf';
    menu.attr('role', 'menubar');
    var items = menu.find('li').attr({
      'role': 'menuitem'
    }),
        subMenuClass = "is-".concat(type, "-submenu"),
        subItemClass = "".concat(subMenuClass, "-item"),
        hasSubClass = "is-".concat(type, "-submenu-parent"),
        applyAria = type !== 'accordion'; // Accordions handle their own ARIA attriutes.

    items.each(function () {
      var $item = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $sub = $item.children('ul');

      if ($sub.length) {
        $item.addClass(hasSubClass);

        if (applyAria) {
          $item.attr({
            'aria-haspopup': true,
            'aria-label': $item.children('a:first').text()
          }); // Note:  Drilldowns behave differently in how they hide, and so need
          // additional attributes.  We should look if this possibly over-generalized
          // utility (Nest) is appropriate when we rework menus in 6.4

          if (type === 'drilldown') {
            $item.attr({
              'aria-expanded': false
            });
          }
        }

        $sub.addClass("submenu ".concat(subMenuClass)).attr({
          'data-submenu': '',
          'role': 'menubar'
        });

        if (type === 'drilldown') {
          $sub.attr({
            'aria-hidden': true
          });
        }
      }

      if ($item.parent('[data-submenu]').length) {
        $item.addClass("is-submenu-item ".concat(subItemClass));
      }
    });
    return;
  },
  Burn: function Burn(menu, type) {
    var //items = menu.find('li'),
    subMenuClass = "is-".concat(type, "-submenu"),
        subItemClass = "".concat(subMenuClass, "-item"),
        hasSubClass = "is-".concat(type, "-submenu-parent");
    menu.find('>li, > li > ul, .menu, .menu > li, [data-submenu] > li').removeClass("".concat(subMenuClass, " ").concat(subItemClass, " ").concat(hasSubClass, " is-submenu-item submenu is-active")).removeAttr('data-submenu').css('display', '');
  }
};

function Timer(elem, options, cb) {
  var _this = this,
      duration = options.duration,
      //options is an object for easily adding features later.
  nameSpace = Object.keys(elem.data())[0] || 'timer',
      remain = -1,
      start,
      timer;

  this.isPaused = false;

  this.restart = function () {
    remain = -1;
    clearTimeout(timer);
    this.start();
  };

  this.start = function () {
    this.isPaused = false; // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.

    clearTimeout(timer);
    remain = remain <= 0 ? duration : remain;
    elem.data('paused', false);
    start = Date.now();
    timer = setTimeout(function () {
      if (options.infinite) {
        _this.restart(); //rerun the timer.

      }

      if (cb && typeof cb === 'function') {
        cb();
      }
    }, remain);
    elem.trigger("timerstart.zf.".concat(nameSpace));
  };

  this.pause = function () {
    this.isPaused = true; //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.

    clearTimeout(timer);
    elem.data('paused', true);
    var end = Date.now();
    remain = remain - (end - start);
    elem.trigger("timerpaused.zf.".concat(nameSpace));
  };
}

var Touch = {};
var startPosX,
    startPosY,
    startTime,
    elapsedTime,
    startEvent,
    isMoving = false,
    didMoved = false;

function onTouchEnd(e) {
  this.removeEventListener('touchmove', onTouchMove);
  this.removeEventListener('touchend', onTouchEnd); // If the touch did not move, consider it as a "tap"

  if (!didMoved) {
    var tapEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event('tap', startEvent || e);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger(tapEvent);
  }

  startEvent = null;
  isMoving = false;
  didMoved = false;
}

function onTouchMove(e) {
  if (__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.spotSwipe.preventDefault) {
    e.preventDefault();
  }

  if (isMoving) {
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
    var dx = startPosX - x;
    var dir;
    didMoved = true;
    elapsedTime = new Date().getTime() - startTime;

    if (Math.abs(dx) >= __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.spotSwipe.moveThreshold && elapsedTime <= __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.spotSwipe.timeThreshold) {
      dir = dx > 0 ? 'left' : 'right';
    } // else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
    //   dir = dy > 0 ? 'down' : 'up';
    // }


    if (dir) {
      e.preventDefault();
      onTouchEnd.apply(this, arguments);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event('swipe', e), dir).trigger(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event("swipe".concat(dir), e));
    }
  }
}

function onTouchStart(e) {
  if (e.touches.length == 1) {
    startPosX = e.touches[0].pageX;
    startPosY = e.touches[0].pageY;
    startEvent = e;
    isMoving = true;
    didMoved = false;
    startTime = new Date().getTime();
    this.addEventListener('touchmove', onTouchMove, false);
    this.addEventListener('touchend', onTouchEnd, false);
  }
}

function init() {
  this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
}

var SpotSwipe =
/*#__PURE__*/
function () {
  function SpotSwipe($$$1) {
    _classCallCheck(this, SpotSwipe);

    this.version = '1.0.0';
    this.enabled = 'ontouchstart' in document.documentElement;
    this.preventDefault = false;
    this.moveThreshold = 75;
    this.timeThreshold = 200;
    this.$ = $$$1;

    this._init();
  }

  _createClass(SpotSwipe, [{
    key: "_init",
    value: function _init() {
      var $$$1 = this.$;
      $$$1.event.special.swipe = {
        setup: init
      };
      $$$1.event.special.tap = {
        setup: init
      };
      $$$1.each(['left', 'up', 'down', 'right'], function () {
        $$$1.event.special["swipe".concat(this)] = {
          setup: function setup() {
            $$$1(this).on('swipe', $$$1.noop);
          }
        };
      });
    }
  }]);

  return SpotSwipe;
}();
/****************************************************
 * As far as I can tell, both setupSpotSwipe and    *
 * setupTouchHandler should be idempotent,          *
 * because they directly replace functions &        *
 * values, and do not add event handlers directly.  *
 ****************************************************/


Touch.setupSpotSwipe = function ($$$1) {
  $$$1.spotSwipe = new SpotSwipe($$$1);
};
/****************************************************
 * Method for adding pseudo drag events to elements *
 ***************************************************/


Touch.setupTouchHandler = function ($$$1) {
  $$$1.fn.addTouch = function () {
    this.each(function (i, el) {
      $$$1(el).bind('touchstart touchmove touchend touchcancel', function (event) {
        //we pass the original event object because the jQuery event
        //object is normalized to w3c specs and does not provide the TouchList
        handleTouch(event);
      });
    });

    var handleTouch = function handleTouch(event) {
      var touches = event.changedTouches,
          first = touches[0],
          eventTypes = {
        touchstart: 'mousedown',
        touchmove: 'mousemove',
        touchend: 'mouseup'
      },
          type = eventTypes[event.type],
          simulatedEvent;

      if ('MouseEvent' in window && typeof window.MouseEvent === 'function') {
        simulatedEvent = new window.MouseEvent(type, {
          'bubbles': true,
          'cancelable': true,
          'screenX': first.screenX,
          'screenY': first.screenY,
          'clientX': first.clientX,
          'clientY': first.clientY
        });
      } else {
        simulatedEvent = document.createEvent('MouseEvent');
        simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0
        /*left*/
        , null);
      }

      first.target.dispatchEvent(simulatedEvent);
    };
  };
};

Touch.init = function ($$$1) {
  if (typeof $$$1.spotSwipe === 'undefined') {
    Touch.setupSpotSwipe($$$1);
    Touch.setupTouchHandler($$$1);
  }
};

var MutationObserver = function () {
  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];

  for (var i = 0; i < prefixes.length; i++) {
    if ("".concat(prefixes[i], "MutationObserver") in window) {
      return window["".concat(prefixes[i], "MutationObserver")];
    }
  }

  return false;
}();

var triggers = function triggers(el, type) {
  el.data(type).split(' ').forEach(function (id) {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat(id))[type === 'close' ? 'trigger' : 'triggerHandler']("".concat(type, ".zf.trigger"), [el]);
  });
};

var Triggers = {
  Listeners: {
    Basic: {},
    Global: {}
  },
  Initializers: {}
};
Triggers.Listeners.Basic = {
  openListener: function openListener() {
    triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'open');
  },
  closeListener: function closeListener() {
    var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('close');

    if (id) {
      triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'close');
    } else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('close.zf.trigger');
    }
  },
  toggleListener: function toggleListener() {
    var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle');

    if (id) {
      triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'toggle');
    } else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('toggle.zf.trigger');
    }
  },
  closeableListener: function closeableListener(e) {
    e.stopPropagation();
    var animation = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('closable');

    if (animation !== '') {
      Motion.animateOut(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), animation, function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('closed.zf');
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).fadeOut().trigger('closed.zf');
    }
  },
  toggleFocusListener: function toggleFocusListener() {
    var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle-focus');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat(id)).triggerHandler('toggle.zf.trigger', [__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)]);
  }
}; // Elements with [data-open] will reveal a plugin that supports it when clicked.

Triggers.Initializers.addOpenListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.openListener);
  $elem.on('click.zf.trigger', '[data-open]', Triggers.Listeners.Basic.openListener);
}; // Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.


Triggers.Initializers.addCloseListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.closeListener);
  $elem.on('click.zf.trigger', '[data-close]', Triggers.Listeners.Basic.closeListener);
}; // Elements with [data-toggle] will toggle a plugin that supports it when clicked.


Triggers.Initializers.addToggleListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.toggleListener);
  $elem.on('click.zf.trigger', '[data-toggle]', Triggers.Listeners.Basic.toggleListener);
}; // Elements with [data-closable] will respond to close.zf.trigger events.


Triggers.Initializers.addCloseableListener = function ($elem) {
  $elem.off('close.zf.trigger', Triggers.Listeners.Basic.closeableListener);
  $elem.on('close.zf.trigger', '[data-closeable], [data-closable]', Triggers.Listeners.Basic.closeableListener);
}; // Elements with [data-toggle-focus] will respond to coming in and out of focus


Triggers.Initializers.addToggleFocusListener = function ($elem) {
  $elem.off('focus.zf.trigger blur.zf.trigger', Triggers.Listeners.Basic.toggleFocusListener);
  $elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.Listeners.Basic.toggleFocusListener);
}; // More Global/complex listeners and triggers


Triggers.Listeners.Global = {
  resizeListener: function resizeListener($nodes) {
    if (!MutationObserver) {
      //fallback for IE 9
      $nodes.each(function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).triggerHandler('resizeme.zf.trigger');
      });
    } //trigger all listening elements and signal a resize event


    $nodes.attr('data-events', "resize");
  },
  scrollListener: function scrollListener($nodes) {
    if (!MutationObserver) {
      //fallback for IE 9
      $nodes.each(function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).triggerHandler('scrollme.zf.trigger');
      });
    } //trigger all listening elements and signal a scroll event


    $nodes.attr('data-events', "scroll");
  },
  closeMeListener: function closeMeListener(e, pluginId) {
    var plugin = e.namespace.split('.')[0];
    var plugins = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("[data-".concat(plugin, "]")).not("[data-yeti-box=\"".concat(pluginId, "\"]"));
    plugins.each(function () {
      var _this = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);

      _this.triggerHandler('close.zf.trigger', [_this]);
    });
  } // Global, parses whole document.

};

Triggers.Initializers.addClosemeListener = function (pluginName) {
  var yetiBoxes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-yeti-box]'),
      plugNames = ['dropdown', 'tooltip', 'reveal'];

  if (pluginName) {
    if (typeof pluginName === 'string') {
      plugNames.push(pluginName);
    } else if (_typeof(pluginName) === 'object' && typeof pluginName[0] === 'string') {
      plugNames = plugNames.concat(pluginName);
    } else {
      console.error('Plugin names must be strings');
    }
  }

  if (yetiBoxes.length) {
    var listeners = plugNames.map(function (name) {
      return "closeme.zf.".concat(name);
    }).join(' ');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);
  }
};

function debounceGlobalListener(debounce, trigger, listener) {
  var timer,
      args = Array.prototype.slice.call(arguments, 3);
  __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(trigger).on(trigger, function (e) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      listener.apply(null, args);
    }, debounce || 10); //default time to emit scroll event
  });
}

Triggers.Initializers.addResizeListener = function (debounce) {
  var $nodes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-resize]');

  if ($nodes.length) {
    debounceGlobalListener(debounce, 'resize.zf.trigger', Triggers.Listeners.Global.resizeListener, $nodes);
  }
};

Triggers.Initializers.addScrollListener = function (debounce) {
  var $nodes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-scroll]');

  if ($nodes.length) {
    debounceGlobalListener(debounce, 'scroll.zf.trigger', Triggers.Listeners.Global.scrollListener, $nodes);
  }
};

Triggers.Initializers.addMutationEventsListener = function ($elem) {
  if (!MutationObserver) {
    return false;
  }

  var $nodes = $elem.find('[data-resize], [data-scroll], [data-mutate]'); //element callback

  var listeningElementsMutation = function listeningElementsMutation(mutationRecordsList) {
    var $target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(mutationRecordsList[0].target); //trigger the event handler for the element depending on type

    switch (mutationRecordsList[0].type) {
      case "attributes":
        if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
        }

        if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler('resizeme.zf.trigger', [$target]);
        }

        if (mutationRecordsList[0].attributeName === "style") {
          $target.closest("[data-mutate]").attr("data-events", "mutate");
          $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
        }

        break;

      case "childList":
        $target.closest("[data-mutate]").attr("data-events", "mutate");
        $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
        break;

      default:
        return false;
      //nothing
    }
  };

  if ($nodes.length) {
    //for each element that needs to listen for resizing, scrolling, or mutation add a single observer
    for (var i = 0; i <= $nodes.length - 1; i++) {
      var elementObserver = new MutationObserver(listeningElementsMutation);
      elementObserver.observe($nodes[i], {
        attributes: true,
        childList: true,
        characterData: false,
        subtree: true,
        attributeFilter: ["data-events", "style"]
      });
    }
  }
};

Triggers.Initializers.addSimpleListeners = function () {
  var $document = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document);
  Triggers.Initializers.addOpenListener($document);
  Triggers.Initializers.addCloseListener($document);
  Triggers.Initializers.addToggleListener($document);
  Triggers.Initializers.addCloseableListener($document);
  Triggers.Initializers.addToggleFocusListener($document);
};

Triggers.Initializers.addGlobalListeners = function () {
  var $document = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document);
  Triggers.Initializers.addMutationEventsListener($document);
  Triggers.Initializers.addResizeListener();
  Triggers.Initializers.addScrollListener();
  Triggers.Initializers.addClosemeListener();
};

Triggers.init = function ($$$1, Foundation) {
  onLoad($$$1(window), function () {
    if ($$$1.triggersInitialized !== true) {
      Triggers.Initializers.addSimpleListeners();
      Triggers.Initializers.addGlobalListeners();
      $$$1.triggersInitialized = true;
    }
  });

  if (Foundation) {
    Foundation.Triggers = Triggers; // Legacy included to be backwards compatible for now.

    Foundation.IHearYou = Triggers.Initializers.addGlobalListeners;
  }
};

// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(element, options) {
    _classCallCheck(this, Plugin);

    this._setup(element, options);

    var pluginName = getPluginName(this);
    this.uuid = GetYoDigits(6, pluginName);

    if (!this.$element.attr("data-".concat(pluginName))) {
      this.$element.attr("data-".concat(pluginName), this.uuid);
    }

    if (!this.$element.data('zfPlugin')) {
      this.$element.data('zfPlugin', this);
    }
    /**
     * Fires when the plugin has initialized.
     * @event Plugin#init
     */


    this.$element.trigger("init.zf.".concat(pluginName));
  }

  _createClass(Plugin, [{
    key: "destroy",
    value: function destroy() {
      this._destroy();

      var pluginName = getPluginName(this);
      this.$element.removeAttr("data-".concat(pluginName)).removeData('zfPlugin')
      /**
       * Fires when the plugin has been destroyed.
       * @event Plugin#destroyed
       */
      .trigger("destroyed.zf.".concat(pluginName));

      for (var prop in this) {
        this[prop] = null; //clean up script to prep for garbage collection.
      }
    }
  }]);

  return Plugin;
}(); // Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580


function hyphenate$1(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function getPluginName(obj) {
  if (typeof obj.constructor.name !== 'undefined') {
    return hyphenate$1(obj.constructor.name);
  } else {
    return hyphenate$1(obj.className);
  }
}

/**
 * Abide module.
 * @module foundation.abide
 */

var Abide =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Abide, _Plugin);

  function Abide() {
    _classCallCheck(this, Abide);

    return _possibleConstructorReturn(this, _getPrototypeOf(Abide).apply(this, arguments));
  }

  _createClass(Abide, [{
    key: "_setup",

    /**
     * Creates a new instance of Abide.
     * @class
     * @name Abide
     * @fires Abide#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(true, {}, Abide.defaults, this.$element.data(), options);
      this.className = 'Abide'; // ie9 back compat

      this._init();
    }
    /**
     * Initializes the Abide plugin and calls functions to get Abide functioning on load.
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var _this2 = this;

      this.$inputs = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.merge( // Consider as input to validate:
      this.$element.find('input').not('[type=submit]'), // * all input fields expect submit
      this.$element.find('textarea, select') // * all textareas and select fields
      );
      var $globalErrors = this.$element.find('[data-abide-error]'); // Add a11y attributes to all fields

      if (this.options.a11yAttributes) {
        this.$inputs.each(function (i, input) {
          return _this2.addA11yAttributes(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(input));
        });
        $globalErrors.each(function (i, error) {
          return _this2.addGlobalErrorA11yAttributes(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(error));
        });
      }

      this._events();
    }
    /**
     * Initializes events for Abide.
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this3 = this;

      this.$element.off('.abide').on('reset.zf.abide', function () {
        _this3.resetForm();
      }).on('submit.zf.abide', function () {
        return _this3.validateForm();
      });

      if (this.options.validateOn === 'fieldChange') {
        this.$inputs.off('change.zf.abide').on('change.zf.abide', function (e) {
          _this3.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target));
        });
      }

      if (this.options.liveValidate) {
        this.$inputs.off('input.zf.abide').on('input.zf.abide', function (e) {
          _this3.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target));
        });
      }

      if (this.options.validateOnBlur) {
        this.$inputs.off('blur.zf.abide').on('blur.zf.abide', function (e) {
          _this3.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target));
        });
      }
    }
    /**
     * Calls necessary functions to update Abide upon DOM change
     * @private
     */

  }, {
    key: "_reflow",
    value: function _reflow() {
      this._init();
    }
    /**
     * Checks whether or not a form element has the required attribute and if it's checked or not
     * @param {Object} element - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */

  }, {
    key: "requiredCheck",
    value: function requiredCheck($el) {
      if (!$el.attr('required')) return true;
      var isGood = true;

      switch ($el[0].type) {
        case 'checkbox':
          isGood = $el[0].checked;
          break;

        case 'select':
        case 'select-one':
        case 'select-multiple':
          var opt = $el.find('option:selected');
          if (!opt.length || !opt.val()) isGood = false;
          break;

        default:
          if (!$el.val() || !$el.val().length) isGood = false;
      }

      return isGood;
    }
    /**
     * Get:
     * - Based on $el, the first element(s) corresponding to `formErrorSelector` in this order:
     *   1. The element's direct sibling('s).
     *   2. The element's parent's children.
     * - Element(s) with the attribute `[data-form-error-for]` set with the element's id.
     *
     * This allows for multiple form errors per input, though if none are found, no form errors will be shown.
     *
     * @param {Object} $el - jQuery object to use as reference to find the form error selector.
     * @returns {Object} jQuery object with the selector.
     */

  }, {
    key: "findFormError",
    value: function findFormError($el) {
      var id = $el[0].id;
      var $error = $el.siblings(this.options.formErrorSelector);

      if (!$error.length) {
        $error = $el.parent().find(this.options.formErrorSelector);
      }

      if (id) {
        $error = $error.add(this.$element.find("[data-form-error-for=\"".concat(id, "\"]")));
      }

      return $error;
    }
    /**
     * Get the first element in this order:
     * 2. The <label> with the attribute `[for="someInputId"]`
     * 3. The `.closest()` <label>
     *
     * @param {Object} $el - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */

  }, {
    key: "findLabel",
    value: function findLabel($el) {
      var id = $el[0].id;
      var $label = this.$element.find("label[for=\"".concat(id, "\"]"));

      if (!$label.length) {
        return $el.closest('label');
      }

      return $label;
    }
    /**
     * Get the set of labels associated with a set of radio els in this order
     * 2. The <label> with the attribute `[for="someInputId"]`
     * 3. The `.closest()` <label>
     *
     * @param {Object} $el - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */

  }, {
    key: "findRadioLabels",
    value: function findRadioLabels($els) {
      var _this4 = this;

      var labels = $els.map(function (i, el) {
        var id = el.id;

        var $label = _this4.$element.find("label[for=\"".concat(id, "\"]"));

        if (!$label.length) {
          $label = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).closest('label');
        }

        return $label[0];
      });
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(labels);
    }
    /**
     * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
     * @param {Object} $el - jQuery object to add the class to
     */

  }, {
    key: "addErrorClasses",
    value: function addErrorClasses($el) {
      var $label = this.findLabel($el);
      var $formError = this.findFormError($el);

      if ($label.length) {
        $label.addClass(this.options.labelErrorClass);
      }

      if ($formError.length) {
        $formError.addClass(this.options.formErrorClass);
      }

      $el.addClass(this.options.inputErrorClass).attr({
        'data-invalid': '',
        'aria-invalid': true
      });
    }
    /**
     * Adds [for] and [role=alert] attributes to all form error targetting $el,
     * and [aria-describedby] attribute to $el toward the first form error.
     * @param {Object} $el - jQuery object
     */

  }, {
    key: "addA11yAttributes",
    value: function addA11yAttributes($el) {
      var $errors = this.findFormError($el);
      var $labels = $errors.filter('label');
      var $error = $errors.first();
      if (!$errors.length) return; // Set [aria-describedby] on the input toward the first form error if it is not set

      if (typeof $el.attr('aria-describedby') === 'undefined') {
        // Get the first error ID or create one
        var errorId = $error.attr('id');

        if (typeof errorId === 'undefined') {
          errorId = GetYoDigits(6, 'abide-error');
          $error.attr('id', errorId);
        }
        $el.attr('aria-describedby', errorId);
      }

      if ($labels.filter('[for]').length < $labels.length) {
        // Get the input ID or create one
        var elemId = $el.attr('id');

        if (typeof elemId === 'undefined') {
          elemId = GetYoDigits(6, 'abide-input');
          $el.attr('id', elemId);
        }

        $labels.each(function (i, label) {
          var $label = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(label);
          if (typeof $label.attr('for') === 'undefined') $label.attr('for', elemId);
        });
      } // For each error targeting $el, set [role=alert] if it is not set.


      $errors.each(function (i, label) {
        var $label = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(label);
        if (typeof $label.attr('role') === 'undefined') $label.attr('role', 'alert');
      }).end();
    }
    /**
     * Adds [aria-live] attribute to the given global form error $el.
     * @param {Object} $el - jQuery object to add the attribute to
     */

  }, {
    key: "addGlobalErrorA11yAttributes",
    value: function addGlobalErrorA11yAttributes($el) {
      if (typeof $el.attr('aria-live') === 'undefined') $el.attr('aria-live', this.options.a11yErrorLevel);
    }
    /**
     * Remove CSS error classes etc from an entire radio button group
     * @param {String} groupName - A string that specifies the name of a radio button group
     *
     */

  }, {
    key: "removeRadioErrorClasses",
    value: function removeRadioErrorClasses(groupName) {
      var $els = this.$element.find(":radio[name=\"".concat(groupName, "\"]"));
      var $labels = this.findRadioLabels($els);
      var $formErrors = this.findFormError($els);

      if ($labels.length) {
        $labels.removeClass(this.options.labelErrorClass);
      }

      if ($formErrors.length) {
        $formErrors.removeClass(this.options.formErrorClass);
      }

      $els.removeClass(this.options.inputErrorClass).attr({
        'data-invalid': null,
        'aria-invalid': null
      });
    }
    /**
     * Removes CSS error class as specified by the Abide settings from the label, input, and the form
     * @param {Object} $el - jQuery object to remove the class from
     */

  }, {
    key: "removeErrorClasses",
    value: function removeErrorClasses($el) {
      // radios need to clear all of the els
      if ($el[0].type == 'radio') {
        return this.removeRadioErrorClasses($el.attr('name'));
      }

      var $label = this.findLabel($el);
      var $formError = this.findFormError($el);

      if ($label.length) {
        $label.removeClass(this.options.labelErrorClass);
      }

      if ($formError.length) {
        $formError.removeClass(this.options.formErrorClass);
      }

      $el.removeClass(this.options.inputErrorClass).attr({
        'data-invalid': null,
        'aria-invalid': null
      });
    }
    /**
     * Goes through a form to find inputs and proceeds to validate them in ways specific to their type.
     * Ignores inputs with data-abide-ignore, type="hidden" or disabled attributes set
     * @fires Abide#invalid
     * @fires Abide#valid
     * @param {Object} element - jQuery object to validate, should be an HTML input
     * @returns {Boolean} goodToGo - If the input is valid or not.
     */

  }, {
    key: "validateInput",
    value: function validateInput($el) {
      var clearRequire = this.requiredCheck($el),
          validated = false,
          customValidator = true,
          validator = $el.attr('data-validator'),
          equalTo = true; // don't validate ignored inputs or hidden inputs or disabled inputs

      if ($el.is('[data-abide-ignore]') || $el.is('[type="hidden"]') || $el.is('[disabled]')) {
        return true;
      }

      switch ($el[0].type) {
        case 'radio':
          validated = this.validateRadio($el.attr('name'));
          break;

        case 'checkbox':
          validated = clearRequire;
          break;

        case 'select':
        case 'select-one':
        case 'select-multiple':
          validated = clearRequire;
          break;

        default:
          validated = this.validateText($el);
      }

      if (validator) {
        customValidator = this.matchValidation($el, validator, $el.attr('required'));
      }

      if ($el.attr('data-equalto')) {
        equalTo = this.options.validators.equalTo($el);
      }

      var goodToGo = [clearRequire, validated, customValidator, equalTo].indexOf(false) === -1;
      var message = (goodToGo ? 'valid' : 'invalid') + '.zf.abide';

      if (goodToGo) {
        // Re-validate inputs that depend on this one with equalto
        var dependentElements = this.$element.find("[data-equalto=\"".concat($el.attr('id'), "\"]"));

        if (dependentElements.length) {
          var _this = this;

          dependentElements.each(function () {
            if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).val()) {
              _this.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
            }
          });
        }
      }

      this[goodToGo ? 'removeErrorClasses' : 'addErrorClasses']($el);
      /**
       * Fires when the input is done checking for validation. Event trigger is either `valid.zf.abide` or `invalid.zf.abide`
       * Trigger includes the DOM element of the input.
       * @event Abide#valid
       * @event Abide#invalid
       */

      $el.trigger(message, [$el]);
      return goodToGo;
    }
    /**
     * Goes through a form and if there are any invalid inputs, it will display the form error element
     * @returns {Boolean} noError - true if no errors were detected...
     * @fires Abide#formvalid
     * @fires Abide#forminvalid
     */

  }, {
    key: "validateForm",
    value: function validateForm() {
      var _this5 = this;

      var acc = [];

      var _this = this;

      this.$inputs.each(function () {
        acc.push(_this.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)));
      });
      var noError = acc.indexOf(false) === -1;
      this.$element.find('[data-abide-error]').each(function (i, elem) {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(elem); // Ensure a11y attributes are set

        if (_this5.options.a11yAttributes) _this5.addGlobalErrorA11yAttributes($elem); // Show or hide the error

        $elem.css('display', noError ? 'none' : 'block');
      });
      /**
       * Fires when the form is finished validating. Event trigger is either `formvalid.zf.abide` or `forminvalid.zf.abide`.
       * Trigger includes the element of the form.
       * @event Abide#formvalid
       * @event Abide#forminvalid
       */

      this.$element.trigger((noError ? 'formvalid' : 'forminvalid') + '.zf.abide', [this.$element]);
      return noError;
    }
    /**
     * Determines whether or a not a text input is valid based on the pattern specified in the attribute. If no matching pattern is found, returns true.
     * @param {Object} $el - jQuery object to validate, should be a text input HTML element
     * @param {String} pattern - string value of one of the RegEx patterns in Abide.options.patterns
     * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified
     */

  }, {
    key: "validateText",
    value: function validateText($el, pattern) {
      // A pattern can be passed to this function, or it will be infered from the input's "pattern" attribute, or it's "type" attribute
      pattern = pattern || $el.attr('pattern') || $el.attr('type');
      var inputText = $el.val();
      var valid = false;

      if (inputText.length) {
        // If the pattern attribute on the element is in Abide's list of patterns, then test that regexp
        if (this.options.patterns.hasOwnProperty(pattern)) {
          valid = this.options.patterns[pattern].test(inputText);
        } // If the pattern name isn't also the type attribute of the field, then test it as a regexp
        else if (pattern !== $el.attr('type')) {
            valid = new RegExp(pattern).test(inputText);
          } else {
            valid = true;
          }
      } // An empty field is valid if it's not required
      else if (!$el.prop('required')) {
          valid = true;
        }

      return valid;
    }
    /**
     * Determines whether or a not a radio input is valid based on whether or not it is required and selected. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all radio buttons in its group.
     * @param {String} groupName - A string that specifies the name of a radio button group
     * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
     */

  }, {
    key: "validateRadio",
    value: function validateRadio(groupName) {
      // If at least one radio in the group has the `required` attribute, the group is considered required
      // Per W3C spec, all radio buttons in a group should have `required`, but we're being nice
      var $group = this.$element.find(":radio[name=\"".concat(groupName, "\"]"));
      var valid = false,
          required = false; // For the group to be required, at least one radio needs to be required

      $group.each(function (i, e) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e).attr('required')) {
          required = true;
        }
      });
      if (!required) valid = true;

      if (!valid) {
        // For the group to be valid, at least one radio needs to be checked
        $group.each(function (i, e) {
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e).prop('checked')) {
            valid = true;
          }
        });
      }
      return valid;
    }
    /**
     * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator="foo bar baz"` in a space separated listed.
     * @param {Object} $el - jQuery input element.
     * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.
     * @param {Boolean} required - self explanatory?
     * @returns {Boolean} - true if validations passed.
     */

  }, {
    key: "matchValidation",
    value: function matchValidation($el, validators, required) {
      var _this6 = this;

      required = required ? true : false;
      var clear = validators.split(' ').map(function (v) {
        return _this6.options.validators[v]($el, required, $el.parent());
      });
      return clear.indexOf(false) === -1;
    }
    /**
     * Resets form inputs and styles
     * @fires Abide#formreset
     */

  }, {
    key: "resetForm",
    value: function resetForm() {
      var $form = this.$element,
          opts = this.options;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".".concat(opts.labelErrorClass), $form).not('small').removeClass(opts.labelErrorClass);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".".concat(opts.inputErrorClass), $form).not('small').removeClass(opts.inputErrorClass);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("".concat(opts.formErrorSelector, ".").concat(opts.formErrorClass)).removeClass(opts.formErrorClass);
      $form.find('[data-abide-error]').css('display', 'none');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(':input', $form).not(':button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]').val('').attr({
        'data-invalid': null,
        'aria-invalid': null
      });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(':input:radio', $form).not('[data-abide-ignore]').prop('checked', false).attr({
        'data-invalid': null,
        'aria-invalid': null
      });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(':input:checkbox', $form).not('[data-abide-ignore]').prop('checked', false).attr({
        'data-invalid': null,
        'aria-invalid': null
      });
      /**
       * Fires when the form has been reset.
       * @event Abide#formreset
       */

      $form.trigger('formreset.zf.abide', [$form]);
    }
    /**
     * Destroys an instance of Abide.
     * Removes error styles and classes from elements, without resetting their values.
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      var _this = this;

      this.$element.off('.abide').find('[data-abide-error]').css('display', 'none');
      this.$inputs.off('.abide').each(function () {
        _this.removeErrorClasses(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
      });
    }
  }]);

  return Abide;
}(Plugin);
/**
 * Default settings for plugin
 */


Abide.defaults = {
  /**
   * The default event to validate inputs. Checkboxes and radios validate immediately.
   * Remove or change this value for manual validation.
   * @option
   * @type {?string}
   * @default 'fieldChange'
   */
  validateOn: 'fieldChange',

  /**
   * Class to be applied to input labels on failed validation.
   * @option
   * @type {string}
   * @default 'is-invalid-label'
   */
  labelErrorClass: 'is-invalid-label',

  /**
   * Class to be applied to inputs on failed validation.
   * @option
   * @type {string}
   * @default 'is-invalid-input'
   */
  inputErrorClass: 'is-invalid-input',

  /**
   * Class selector to use to target Form Errors for show/hide.
   * @option
   * @type {string}
   * @default '.form-error'
   */
  formErrorSelector: '.form-error',

  /**
   * Class added to Form Errors on failed validation.
   * @option
   * @type {string}
   * @default 'is-visible'
   */
  formErrorClass: 'is-visible',

  /**
   * If true, automatically insert when possible:
   * - `[aria-describedby]` on fields
   * - `[role=alert]` on form errors and `[for]` on form error labels
   * - `[aria-live]` on global errors `[data-abide-error]` (see option `a11yErrorLevel`).
   * @option
   * @type {boolean}
   * @default true
   */
  a11yAttributes: true,

  /**
   * [aria-live] attribute value to be applied on global errors `[data-abide-error]`.
   * Options are: 'assertive', 'polite' and 'off'/null
   * @option
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
   * @type {string}
   * @default 'assertive'
   */
  a11yErrorLevel: 'assertive',

  /**
   * Set to true to validate text inputs on any value change.
   * @option
   * @type {boolean}
   * @default false
   */
  liveValidate: false,

  /**
   * Set to true to validate inputs on blur.
   * @option
   * @type {boolean}
   * @default false
   */
  validateOnBlur: false,
  patterns: {
    alpha: /^[a-zA-Z]+$/,
    alpha_numeric: /^[a-zA-Z0-9]+$/,
    integer: /^[-+]?\d+$/,
    number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
    // amex, visa, diners
    card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(?:222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    cvv: /^([0-9]){3,4}$/,
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    // From CommonRegexJS (@talyssonoc)
    // https://github.com/talyssonoc/CommonRegexJS/blob/e2901b9f57222bc14069dc8f0598d5f412555411/lib/commonregex.js#L76
    // For more restrictive URL Regexs, see https://mathiasbynens.be/demo/url-regex.
    url: /^((?:(https?|ftps?|file|ssh|sftp):\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))$/,
    // abc.de
    domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
    datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
    // YYYY-MM-DD
    date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
    // HH:MM:SS
    time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
    dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
    // MM/DD/YYYY
    month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
    // DD/MM/YYYY
    day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
    // #FFF or #FFFFFF
    color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    // Domain || URL
    website: {
      test: function test(text) {
        return Abide.defaults.patterns['domain'].test(text) || Abide.defaults.patterns['url'].test(text);
      }
    }
  },

  /**
   * Optional validation functions to be used. `equalTo` being the only default included function.
   * Functions should return only a boolean if the input is valid or not. Functions are given the following arguments:
   * el : The jQuery element to validate.
   * required : Boolean value of the required attribute be present or not.
   * parent : The direct parent of the input.
   * @option
   */
  validators: {
    equalTo: function equalTo(el, required, parent) {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat(el.attr('data-equalto'))).val() === el.val();
    }
  }
};

/**
 * Accordion module.
 * @module foundation.accordion
 * @requires foundation.util.keyboard
 */

var Accordion =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Accordion, _Plugin);

  function Accordion() {
    _classCallCheck(this, Accordion);

    return _possibleConstructorReturn(this, _getPrototypeOf(Accordion).apply(this, arguments));
  }

  _createClass(Accordion, [{
    key: "_setup",

    /**
     * Creates a new instance of an accordion.
     * @class
     * @name Accordion
     * @fires Accordion#init
     * @param {jQuery} element - jQuery object to make into an accordion.
     * @param {Object} options - a plain object with settings to override the default options.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Accordion.defaults, this.$element.data(), options);
      this.className = 'Accordion'; // ie9 back compat

      this._init();

      Keyboard.register('Accordion', {
        'ENTER': 'toggle',
        'SPACE': 'toggle',
        'ARROW_DOWN': 'next',
        'ARROW_UP': 'previous'
      });
    }
    /**
     * Initializes the accordion by animating the preset active pane(s).
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var _this2 = this;

      this._isInitializing = true;
      this.$element.attr('role', 'tablist');
      this.$tabs = this.$element.children('[data-accordion-item]');
      this.$tabs.each(function (idx, el) {
        var $el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el),
            $content = $el.children('[data-tab-content]'),
            id = $content[0].id || GetYoDigits(6, 'accordion'),
            linkId = el.id ? "".concat(el.id, "-label") : "".concat(id, "-label");
        $el.find('a:first').attr({
          'aria-controls': id,
          'role': 'tab',
          'id': linkId,
          'aria-expanded': false,
          'aria-selected': false
        });
        $content.attr({
          'role': 'tabpanel',
          'aria-labelledby': linkId,
          'aria-hidden': true,
          'id': id
        });
      });
      var $initActive = this.$element.find('.is-active').children('[data-tab-content]');

      if ($initActive.length) {
        // Save up the initial hash to return to it later when going back in history
        this._initialAnchor = $initActive.prev('a').attr('href');

        this._openSingleTab($initActive);
      }

      this._checkDeepLink = function () {
        var anchor = window.location.hash;

        if (!anchor.length) {
          // If we are still initializing and there is no anchor, then there is nothing to do
          if (_this2._isInitializing) return; // Otherwise, move to the initial anchor

          if (_this2._initialAnchor) anchor = _this2._initialAnchor;
        }

        var $anchor = anchor && __WEBPACK_IMPORTED_MODULE_0_jquery___default()(anchor);

        var $link = anchor && _this2.$element.find("[href$=\"".concat(anchor, "\"]")); // Whether the anchor element that has been found is part of this element


        var isOwnAnchor = !!($anchor.length && $link.length); // If there is an anchor for the hash, open it (if not already active)

        if ($anchor && $link && $link.length) {
          if (!$link.parent('[data-accordion-item]').hasClass('is-active')) {
            _this2._openSingleTab($anchor);
          }
        } // Otherwise, close everything
        else {
            _this2._closeAllTabs();
          }

        if (isOwnAnchor) {
          // Roll up a little to show the titles
          if (_this2.options.deepLinkSmudge) {
            onLoad(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window), function () {
              var offset = _this2.$element.offset();

              __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({
                scrollTop: offset.top
              }, _this2.options.deepLinkSmudgeDelay);
            });
          }
          /**
           * Fires when the plugin has deeplinked at pageload
           * @event Accordion#deeplink
           */


          _this2.$element.trigger('deeplink.zf.accordion', [$link, $anchor]);
        }
      }; //use browser to open a tab, if it exists in this tabset


      if (this.options.deepLink) {
        this._checkDeepLink();
      }

      this._events();

      this._isInitializing = false;
    }
    /**
     * Adds event handlers for items within the accordion.
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this = this;

      this.$tabs.each(function () {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
        var $tabContent = $elem.children('[data-tab-content]');

        if ($tabContent.length) {
          $elem.children('a').off('click.zf.accordion keydown.zf.accordion').on('click.zf.accordion', function (e) {
            e.preventDefault();

            _this.toggle($tabContent);
          }).on('keydown.zf.accordion', function (e) {
            Keyboard.handleKey(e, 'Accordion', {
              toggle: function toggle() {
                _this.toggle($tabContent);
              },
              next: function next() {
                var $a = $elem.next().find('a').focus();

                if (!_this.options.multiExpand) {
                  $a.trigger('click.zf.accordion');
                }
              },
              previous: function previous() {
                var $a = $elem.prev().find('a').focus();

                if (!_this.options.multiExpand) {
                  $a.trigger('click.zf.accordion');
                }
              },
              handled: function handled() {
                e.preventDefault();
                e.stopPropagation();
              }
            });
          });
        }
      });

      if (this.options.deepLink) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('hashchange', this._checkDeepLink);
      }
    }
    /**
     * Toggles the selected content pane's open/close state.
     * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).
     * @function
     */

  }, {
    key: "toggle",
    value: function toggle($target) {
      if ($target.closest('[data-accordion]').is('[disabled]')) {
        console.info('Cannot toggle an accordion that is disabled.');
        return;
      }

      if ($target.parent().hasClass('is-active')) {
        this.up($target);
      } else {
        this.down($target);
      } //either replace or update browser history


      if (this.options.deepLink) {
        var anchor = $target.prev('a').attr('href');

        if (this.options.updateHistory) {
          history.pushState({}, '', anchor);
        } else {
          history.replaceState({}, '', anchor);
        }
      }
    }
    /**
     * Opens the accordion tab defined by `$target`.
     * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).
     * @fires Accordion#down
     * @function
     */

  }, {
    key: "down",
    value: function down($target) {
      if ($target.closest('[data-accordion]').is('[disabled]')) {
        console.info('Cannot call down on an accordion that is disabled.');
        return;
      }

      if (this.options.multiExpand) this._openTab($target);else this._openSingleTab($target);
    }
    /**
     * Closes the tab defined by `$target`.
     * It may be ignored if the Accordion options don't allow it.
     *
     * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
     * @fires Accordion#up
     * @function
     */

  }, {
    key: "up",
    value: function up($target) {
      if (this.$element.is('[disabled]')) {
        console.info('Cannot call up on an accordion that is disabled.');
        return;
      } // Don't close the item if it is already closed


      var $targetItem = $target.parent();
      if (!$targetItem.hasClass('is-active')) return; // Don't close the item if there is no other active item (unless with `allowAllClosed`)

      var $othersItems = $targetItem.siblings();
      if (!this.options.allowAllClosed && !$othersItems.hasClass('is-active')) return;

      this._closeTab($target);
    }
    /**
     * Make the tab defined by `$target` the only opened tab, closing all others tabs.
     * @param {jQuery} $target - Accordion tab to open (`.accordion-content`).
     * @function
     * @private
     */

  }, {
    key: "_openSingleTab",
    value: function _openSingleTab($target) {
      // Close all the others active tabs.
      var $activeContents = this.$element.children('.is-active').children('[data-tab-content]');

      if ($activeContents.length) {
        this._closeTab($activeContents.not($target));
      } // Then open the target.


      this._openTab($target);
    }
    /**
     * Opens the tab defined by `$target`.
     * @param {jQuery} $target - Accordion tab to open (`.accordion-content`).
     * @fires Accordion#down
     * @function
     * @private
     */

  }, {
    key: "_openTab",
    value: function _openTab($target) {
      var _this3 = this;

      var $targetItem = $target.parent();
      var targetContentId = $target.attr('aria-labelledby');
      $target.attr('aria-hidden', false);
      $targetItem.addClass('is-active');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat(targetContentId)).attr({
        'aria-expanded': true,
        'aria-selected': true
      });
      $target.slideDown(this.options.slideSpeed, function () {
        /**
         * Fires when the tab is done opening.
         * @event Accordion#down
         */
        _this3.$element.trigger('down.zf.accordion', [$target]);
      });
    }
    /**
     * Closes the tab defined by `$target`.
     * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
     * @fires Accordion#up
     * @function
     * @private
     */

  }, {
    key: "_closeTab",
    value: function _closeTab($target) {
      var _this4 = this;

      var $targetItem = $target.parent();
      var targetContentId = $target.attr('aria-labelledby');
      $target.attr('aria-hidden', true);
      $targetItem.removeClass('is-active');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat(targetContentId)).attr({
        'aria-expanded': false,
        'aria-selected': false
      });
      $target.slideUp(this.options.slideSpeed, function () {
        /**
         * Fires when the tab is done collapsing up.
         * @event Accordion#up
         */
        _this4.$element.trigger('up.zf.accordion', [$target]);
      });
    }
    /**
     * Closes all active tabs
     * @fires Accordion#up
     * @function
     * @private
     */

  }, {
    key: "_closeAllTabs",
    value: function _closeAllTabs() {
      var $activeTabs = this.$element.children('.is-active').children('[data-tab-content]');

      if ($activeTabs.length) {
        this._closeTab($activeTabs);
      }
    }
    /**
     * Destroys an instance of an accordion.
     * @fires Accordion#destroyed
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.find('[data-tab-content]').stop(true).slideUp(0).css('display', '');
      this.$element.find('a').off('.zf.accordion');

      if (this.options.deepLink) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('hashchange', this._checkDeepLink);
      }
    }
  }]);

  return Accordion;
}(Plugin);

Accordion.defaults = {
  /**
   * Amount of time to animate the opening of an accordion pane.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,

  /**
   * Allow the accordion to have multiple open panes.
   * @option
   * @type {boolean}
   * @default false
   */
  multiExpand: false,

  /**
   * Allow the accordion to close all panes.
   * @option
   * @type {boolean}
   * @default false
   */
  allowAllClosed: false,

  /**
   * Link the location hash to the open pane.
   * Set the location hash when the opened pane changes, and open and scroll to the corresponding pane when the location changes.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the accordion panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * If `deepLink` is enabled, update the browser history with the open accordion
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false
};

/**
 * AccordionMenu module.
 * @module foundation.accordionMenu
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 */

var AccordionMenu =
/*#__PURE__*/
function (_Plugin) {
  _inherits(AccordionMenu, _Plugin);

  function AccordionMenu() {
    _classCallCheck(this, AccordionMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(AccordionMenu).apply(this, arguments));
  }

  _createClass(AccordionMenu, [{
    key: "_setup",

    /**
     * Creates a new instance of an accordion menu.
     * @class
     * @name AccordionMenu
     * @fires AccordionMenu#init
     * @param {jQuery} element - jQuery object to make into an accordion menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, AccordionMenu.defaults, this.$element.data(), options);
      this.className = 'AccordionMenu'; // ie9 back compat

      this._init();

      Keyboard.register('AccordionMenu', {
        'ENTER': 'toggle',
        'SPACE': 'toggle',
        'ARROW_RIGHT': 'open',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'close',
        'ESCAPE': 'closeAll'
      });
    }
    /**
     * Initializes the accordion menu by hiding all nested menus.
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      Nest.Feather(this.$element, 'accordion');

      var _this = this;

      this.$element.find('[data-submenu]').not('.is-active').slideUp(0); //.find('a').css('padding-left', '1rem');

      this.$element.attr({
        'role': 'tree',
        'aria-multiselectable': this.options.multiOpen
      });
      this.$menuLinks = this.$element.find('.is-accordion-submenu-parent');
      this.$menuLinks.each(function () {
        var linkId = this.id || GetYoDigits(6, 'acc-menu-link'),
            $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            $sub = $elem.children('[data-submenu]'),
            subId = $sub[0].id || GetYoDigits(6, 'acc-menu'),
            isActive = $sub.hasClass('is-active');

        if (_this.options.parentLink) {
          var $anchor = $elem.children('a');
          $anchor.clone().prependTo($sub).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-accordion-submenu-item"></li>');
        }

        if (_this.options.submenuToggle) {
          $elem.addClass('has-submenu-toggle');
          $elem.children('a').after('<button id="' + linkId + '" class="submenu-toggle" aria-controls="' + subId + '" aria-expanded="' + isActive + '" title="' + _this.options.submenuToggleText + '"><span class="submenu-toggle-text">' + _this.options.submenuToggleText + '</span></button>');
        } else {
          $elem.attr({
            'aria-controls': subId,
            'aria-expanded': isActive,
            'id': linkId
          });
        }

        $sub.attr({
          'aria-labelledby': linkId,
          'aria-hidden': !isActive,
          'role': 'group',
          'id': subId
        });
      });
      this.$element.find('li').attr({
        'role': 'treeitem'
      });
      var initPanes = this.$element.find('.is-active');

      if (initPanes.length) {
        var _this = this;

        initPanes.each(function () {
          _this.down(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
        });
      }

      this._events();
    }
    /**
     * Adds event handlers for items within the menu.
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this = this;

      this.$element.find('li').each(function () {
        var $submenu = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('[data-submenu]');

        if ($submenu.length) {
          if (_this.options.submenuToggle) {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('.submenu-toggle').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function (e) {
              _this.toggle($submenu);
            });
          } else {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function (e) {
              e.preventDefault();

              _this.toggle($submenu);
            });
          }
        }
      }).on('keydown.zf.accordionmenu', function (e) {
        var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            $elements = $element.parent('ul').children('li'),
            $prevElement,
            $nextElement,
            $target = $element.children('[data-submenu]');
        $elements.each(function (i) {
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
            $prevElement = $elements.eq(Math.max(0, i - 1)).find('a').first();
            $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)).find('a').first();

            if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('[data-submenu]:visible').length) {
              // has open sub menu
              $nextElement = $element.find('li:first-child').find('a').first();
            }

            if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is(':first-child')) {
              // is first element of sub menu
              $prevElement = $element.parents('li').first().find('a').first();
            } else if ($prevElement.parents('li').first().children('[data-submenu]:visible').length) {
              // if previous element has open sub menu
              $prevElement = $prevElement.parents('li').find('li:last-child').find('a').first();
            }

            if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is(':last-child')) {
              // is last element of sub menu
              $nextElement = $element.parents('li').first().next('li').find('a').first();
            }

            return;
          }
        });
        Keyboard.handleKey(e, 'AccordionMenu', {
          open: function open() {
            if ($target.is(':hidden')) {
              _this.down($target);

              $target.find('li').first().find('a').first().focus();
            }
          },
          close: function close() {
            if ($target.length && !$target.is(':hidden')) {
              // close active sub of this item
              _this.up($target);
            } else if ($element.parent('[data-submenu]').length) {
              // close currently open sub
              _this.up($element.parent('[data-submenu]'));

              $element.parents('li').first().find('a').first().focus();
            }
          },
          up: function up() {
            $prevElement.focus();
            return true;
          },
          down: function down() {
            $nextElement.focus();
            return true;
          },
          toggle: function toggle() {
            if (_this.options.submenuToggle) {
              return false;
            }

            if ($element.children('[data-submenu]').length) {
              _this.toggle($element.children('[data-submenu]'));

              return true;
            }
          },
          closeAll: function closeAll() {
            _this.hideAll();
          },
          handled: function handled(preventDefault) {
            if (preventDefault) {
              e.preventDefault();
            }

            e.stopImmediatePropagation();
          }
        });
      }); //.attr('tabindex', 0);
    }
    /**
     * Closes all panes of the menu.
     * @function
     */

  }, {
    key: "hideAll",
    value: function hideAll() {
      this.up(this.$element.find('[data-submenu]'));
    }
    /**
     * Opens all panes of the menu.
     * @function
     */

  }, {
    key: "showAll",
    value: function showAll() {
      this.down(this.$element.find('[data-submenu]'));
    }
    /**
     * Toggles the open/close state of a submenu.
     * @function
     * @param {jQuery} $target - the submenu to toggle
     */

  }, {
    key: "toggle",
    value: function toggle($target) {
      if (!$target.is(':animated')) {
        if (!$target.is(':hidden')) {
          this.up($target);
        } else {
          this.down($target);
        }
      }
    }
    /**
     * Opens the sub-menu defined by `$target`.
     * @param {jQuery} $target - Sub-menu to open.
     * @fires AccordionMenu#down
     */

  }, {
    key: "down",
    value: function down($target) {
      var _this2 = this;

      // If having multiple submenus active is disabled, close all the submenus
      // that are not parents or children of the targeted submenu.
      if (!this.options.multiOpen) {
        // The "branch" of the targetted submenu, from the component root to
        // the active submenus nested in it.
        var $targetBranch = $target.parentsUntil(this.$element).add($target).add($target.find('.is-active')); // All the active submenus that are not in the branch.

        var $othersActiveSubmenus = this.$element.find('.is-active').not($targetBranch);
        this.up($othersActiveSubmenus);
      }

      $target.addClass('is-active').attr({
        'aria-hidden': false
      });

      if (this.options.submenuToggle) {
        $target.prev('.submenu-toggle').attr({
          'aria-expanded': true
        });
      } else {
        $target.parent('.is-accordion-submenu-parent').attr({
          'aria-expanded': true
        });
      }

      $target.slideDown(this.options.slideSpeed, function () {
        /**
         * Fires when the menu is done opening.
         * @event AccordionMenu#down
         */
        _this2.$element.trigger('down.zf.accordionMenu', [$target]);
      });
    }
    /**
     * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
     * @param {jQuery} $target - Sub-menu to close.
     * @fires AccordionMenu#up
     */

  }, {
    key: "up",
    value: function up($target) {
      var _this3 = this;

      var $submenus = $target.find('[data-submenu]');
      var $allmenus = $target.add($submenus);
      $submenus.slideUp(0);
      $allmenus.removeClass('is-active').attr('aria-hidden', true);

      if (this.options.submenuToggle) {
        $allmenus.prev('.submenu-toggle').attr('aria-expanded', false);
      } else {
        $allmenus.parent('.is-accordion-submenu-parent').attr('aria-expanded', false);
      }

      $target.slideUp(this.options.slideSpeed, function () {
        /**
         * Fires when the menu is done collapsing up.
         * @event AccordionMenu#up
         */
        _this3.$element.trigger('up.zf.accordionMenu', [$target]);
      });
    }
    /**
     * Destroys an instance of accordion menu.
     * @fires AccordionMenu#destroyed
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.find('[data-submenu]').slideDown(0).css('display', '');
      this.$element.find('a').off('click.zf.accordionMenu');
      this.$element.find('[data-is-parent-link]').detach();

      if (this.options.submenuToggle) {
        this.$element.find('.has-submenu-toggle').removeClass('has-submenu-toggle');
        this.$element.find('.submenu-toggle').remove();
      }

      Nest.Burn(this.$element, 'accordion');
    }
  }]);

  return AccordionMenu;
}(Plugin);

AccordionMenu.defaults = {
  /**
   * Adds the parent link to the submenu.
   * @option
   * @type {boolean}
   * @default false
   */
  parentLink: false,

  /**
   * Amount of time to animate the opening of a submenu in ms.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,

  /**
   * Adds a separate submenu toggle button. This allows the parent item to have a link.
   * @option
   * @example true
   */
  submenuToggle: false,

  /**
   * The text used for the submenu toggle if enabled. This is used for screen readers only.
   * @option
   * @example true
   */
  submenuToggleText: 'Toggle menu',

  /**
   * Allow the menu to have multiple open panes.
   * @option
   * @type {boolean}
   * @default true
   */
  multiOpen: true
};

/**
 * Drilldown module.
 * @module foundation.drilldown
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 * @requires foundation.util.box
 */

var Drilldown =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Drilldown, _Plugin);

  function Drilldown() {
    _classCallCheck(this, Drilldown);

    return _possibleConstructorReturn(this, _getPrototypeOf(Drilldown).apply(this, arguments));
  }

  _createClass(Drilldown, [{
    key: "_setup",

    /**
     * Creates a new instance of a drilldown menu.
     * @class
     * @name Drilldown
     * @param {jQuery} element - jQuery object to make into an accordion menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Drilldown.defaults, this.$element.data(), options);
      this.className = 'Drilldown'; // ie9 back compat

      this._init();

      Keyboard.register('Drilldown', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'previous',
        'ESCAPE': 'close',
        'TAB': 'down',
        'SHIFT_TAB': 'up'
      });
    }
    /**
     * Initializes the drilldown by creating jQuery collections of elements
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      Nest.Feather(this.$element, 'drilldown');

      if (this.options.autoApplyClass) {
        this.$element.addClass('drilldown');
      }

      this.$element.attr({
        'role': 'tree',
        'aria-multiselectable': false
      });
      this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent').children('a');
      this.$submenus = this.$submenuAnchors.parent('li').children('[data-submenu]').attr('role', 'group');
      this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'treeitem').find('a'); // Set the main menu as current by default (unless a submenu is selected)
      // Used to set the wrapper height when the drilldown is closed/reopened from any (sub)menu

      this.$currentMenu = this.$element;
      this.$element.attr('data-mutate', this.$element.attr('data-drilldown') || GetYoDigits(6, 'drilldown'));

      this._prepareMenu();

      this._registerEvents();

      this._keyboardEvents();
    }
    /**
     * prepares drilldown menu by setting attributes to links and elements
     * sets a min height to prevent content jumping
     * wraps the element if not already wrapped
     * @private
     * @function
     */

  }, {
    key: "_prepareMenu",
    value: function _prepareMenu() {
      var _this = this; // if(!this.options.holdOpen){
      //   this._menuLinkEvents();
      // }


      this.$submenuAnchors.each(function () {
        var $link = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
        var $sub = $link.parent();

        if (_this.options.parentLink) {
          $link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menuitem"></li>');
        }

        $link.data('savedHref', $link.attr('href')).removeAttr('href').attr('tabindex', 0);
        $link.children('[data-submenu]').attr({
          'aria-hidden': true,
          'tabindex': 0,
          'role': 'group'
        });

        _this._events($link);
      });
      this.$submenus.each(function () {
        var $menu = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            $back = $menu.find('.js-drilldown-back');

        if (!$back.length) {
          switch (_this.options.backButtonPosition) {
            case "bottom":
              $menu.append(_this.options.backButton);
              break;

            case "top":
              $menu.prepend(_this.options.backButton);
              break;

            default:
              console.error("Unsupported backButtonPosition value '" + _this.options.backButtonPosition + "'");
          }
        }

        _this._back($menu);
      });
      this.$submenus.addClass('invisible');

      if (!this.options.autoHeight) {
        this.$submenus.addClass('drilldown-submenu-cover-previous');
      } // create a wrapper on element if it doesn't exist.


      if (!this.$element.parent().hasClass('is-drilldown')) {
        this.$wrapper = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.wrapper).addClass('is-drilldown');
        if (this.options.animateHeight) this.$wrapper.addClass('animate-height');
        this.$element.wrap(this.$wrapper);
      } // set wrapper


      this.$wrapper = this.$element.parent();
      this.$wrapper.css(this._getMaxDims());
    }
  }, {
    key: "_resize",
    value: function _resize() {
      this.$wrapper.css({
        'max-width': 'none',
        'min-height': 'none'
      }); // _getMaxDims has side effects (boo) but calling it should update all other necessary heights & widths

      this.$wrapper.css(this._getMaxDims());
    }
    /**
     * Adds event handlers to elements in the menu.
     * @function
     * @private
     * @param {jQuery} $elem - the current menu item to add handlers to.
     */

  }, {
    key: "_events",
    value: function _events($elem) {
      var _this = this;

      $elem.off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')) {
          e.stopImmediatePropagation();
          e.preventDefault();
        } // if(e.target !== e.currentTarget.firstElementChild){
        //   return false;
        // }


        _this._show($elem.parent('li'));

        if (_this.options.closeOnClick) {
          var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body');
          $body.off('.zf.drilldown').on('click.zf.drilldown', function (e) {
            if (e.target === _this.$element[0] || __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(_this.$element[0], e.target)) {
              return;
            }

            e.preventDefault();

            _this._hideAll();

            $body.off('.zf.drilldown');
          });
        }
      });
    }
    /**
     * Adds event handlers to the menu element.
     * @function
     * @private
     */

  }, {
    key: "_registerEvents",
    value: function _registerEvents() {
      if (this.options.scrollTop) {
        this._bindHandler = this._scrollTop.bind(this);
        this.$element.on('open.zf.drilldown hide.zf.drilldown closed.zf.drilldown', this._bindHandler);
      }

      this.$element.on('mutateme.zf.trigger', this._resize.bind(this));
    }
    /**
     * Scroll to Top of Element or data-scroll-top-element
     * @function
     * @fires Drilldown#scrollme
     */

  }, {
    key: "_scrollTop",
    value: function _scrollTop() {
      var _this = this;

      var $scrollTopElement = _this.options.scrollTopElement != '' ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this.options.scrollTopElement) : _this.$element,
          scrollPos = parseInt($scrollTopElement.offset().top + _this.options.scrollTopOffset, 10);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').stop(true).animate({
        scrollTop: scrollPos
      }, _this.options.animationDuration, _this.options.animationEasing, function () {
        /**
          * Fires after the menu has scrolled
          * @event Drilldown#scrollme
          */
        if (this === __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html')[0]) _this.$element.trigger('scrollme.zf.drilldown');
      });
    }
    /**
     * Adds keydown event listener to `li`'s in the menu.
     * @private
     */

  }, {
    key: "_keyboardEvents",
    value: function _keyboardEvents() {
      var _this = this;

      this.$menuItems.add(this.$element.find('.js-drilldown-back > a, .is-submenu-parent-item > a')).on('keydown.zf.drilldown', function (e) {
        var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            $elements = $element.parent('li').parent('ul').children('li').children('a'),
            $prevElement,
            $nextElement;
        $elements.each(function (i) {
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
            $prevElement = $elements.eq(Math.max(0, i - 1));
            $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
            return;
          }
        });
        Keyboard.handleKey(e, 'Drilldown', {
          next: function next() {
            if ($element.is(_this.$submenuAnchors)) {
              _this._show($element.parent('li'));

              $element.parent('li').one(transitionend($element), function () {
                $element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();
              });
              return true;
            }
          },
          previous: function previous() {
            _this._hide($element.parent('li').parent('ul'));

            $element.parent('li').parent('ul').one(transitionend($element), function () {
              setTimeout(function () {
                $element.parent('li').parent('ul').parent('li').children('a').first().focus();
              }, 1);
            });
            return true;
          },
          up: function up() {
            $prevElement.focus(); // Don't tap focus on first element in root ul

            return !$element.is(_this.$element.find('> li:first-child > a'));
          },
          down: function down() {
            $nextElement.focus(); // Don't tap focus on last element in root ul

            return !$element.is(_this.$element.find('> li:last-child > a'));
          },
          close: function close() {
            // Don't close on element in root ul
            if (!$element.is(_this.$element.find('> li > a'))) {
              _this._hide($element.parent().parent());

              $element.parent().parent().siblings('a').focus();
            }
          },
          open: function open() {
            if (_this.options.parentLink && $element.attr('href')) {
              // Link with href
              return false;
            } else if (!$element.is(_this.$menuItems)) {
              // not menu item means back button
              _this._hide($element.parent('li').parent('ul'));

              $element.parent('li').parent('ul').one(transitionend($element), function () {
                setTimeout(function () {
                  $element.parent('li').parent('ul').parent('li').children('a').first().focus();
                }, 1);
              });
              return true;
            } else if ($element.is(_this.$submenuAnchors)) {
              // Sub menu item
              _this._show($element.parent('li'));

              $element.parent('li').one(transitionend($element), function () {
                $element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();
              });
              return true;
            }
          },
          handled: function handled(preventDefault) {
            if (preventDefault) {
              e.preventDefault();
            }

            e.stopImmediatePropagation();
          }
        });
      }); // end keyboardAccess
    }
    /**
     * Closes all open elements, and returns to root menu.
     * @function
     * @fires Drilldown#closed
     */

  }, {
    key: "_hideAll",
    value: function _hideAll() {
      var $elem = this.$element.find('.is-drilldown-submenu.is-active').addClass('is-closing');
      if (this.options.autoHeight) this.$wrapper.css({
        height: $elem.parent().closest('ul').data('calcHeight')
      });
      $elem.one(transitionend($elem), function (e) {
        $elem.removeClass('is-active is-closing');
      });
      /**
       * Fires when the menu is fully closed.
       * @event Drilldown#closed
       */

      this.$element.trigger('closed.zf.drilldown');
    }
    /**
     * Adds event listener for each `back` button, and closes open menus.
     * @function
     * @fires Drilldown#back
     * @param {jQuery} $elem - the current sub-menu to add `back` event.
     */

  }, {
    key: "_back",
    value: function _back($elem) {
      var _this = this;

      $elem.off('click.zf.drilldown');
      $elem.children('.js-drilldown-back').on('click.zf.drilldown', function (e) {
        e.stopImmediatePropagation(); // console.log('mouseup on back');

        _this._hide($elem); // If there is a parent submenu, call show


        var parentSubMenu = $elem.parent('li').parent('ul').parent('li');

        if (parentSubMenu.length) {
          _this._show(parentSubMenu);
        }
      });
    }
    /**
     * Adds event listener to menu items w/o submenus to close open menus on click.
     * @function
     * @private
     */

  }, {
    key: "_menuLinkEvents",
    value: function _menuLinkEvents() {
      var _this = this;

      this.$menuItems.not('.is-drilldown-submenu-parent').off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
        // e.stopImmediatePropagation();
        setTimeout(function () {
          _this._hideAll();
        }, 0);
      });
    }
    /**
     * Sets the CSS classes for submenu to show it.
     * @function
     * @private
     * @param {jQuery} $elem - the target submenu (`ul` tag)
     * @param {boolean} trigger - trigger drilldown event
     */

  }, {
    key: "_setShowSubMenuClasses",
    value: function _setShowSubMenuClasses($elem, trigger) {
      $elem.addClass('is-active').removeClass('invisible').attr('aria-hidden', false);
      $elem.parent('li').attr('aria-expanded', true);

      if (trigger === true) {
        this.$element.trigger('open.zf.drilldown', [$elem]);
      }
    }
    /**
     * Sets the CSS classes for submenu to hide it.
     * @function
     * @private
     * @param {jQuery} $elem - the target submenu (`ul` tag)
     * @param {boolean} trigger - trigger drilldown event
     */

  }, {
    key: "_setHideSubMenuClasses",
    value: function _setHideSubMenuClasses($elem, trigger) {
      $elem.removeClass('is-active').addClass('invisible').attr('aria-hidden', true);
      $elem.parent('li').attr('aria-expanded', false);

      if (trigger === true) {
        $elem.trigger('hide.zf.drilldown', [$elem]);
      }
    }
    /**
     * Opens a specific drilldown (sub)menu no matter which (sub)menu in it is currently visible.
     * Compared to _show() this lets you jump into any submenu without clicking through every submenu on the way to it.
     * @function
     * @fires Drilldown#open
     * @param {jQuery} $elem - the target (sub)menu (`ul` tag)
     * @param {boolean} autoFocus - if true the first link in the target (sub)menu gets auto focused
     */

  }, {
    key: "_showMenu",
    value: function _showMenu($elem, autoFocus) {
      var _this = this; // Reset drilldown


      var $expandedSubmenus = this.$element.find('li[aria-expanded="true"] > ul[data-submenu]');
      $expandedSubmenus.each(function (index) {
        _this._setHideSubMenuClasses(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
      }); // Save the menu as the currently displayed one.

      this.$currentMenu = $elem; // If target menu is root, focus first link & exit

      if ($elem.is('[data-drilldown]')) {
        if (autoFocus === true) $elem.find('li[role="treeitem"] > a').first().focus();
        if (this.options.autoHeight) this.$wrapper.css('height', $elem.data('calcHeight'));
        return;
      } // Find all submenus on way to root incl. the element itself


      var $submenus = $elem.children().first().parentsUntil('[data-drilldown]', '[data-submenu]'); // Open target menu and all submenus on its way to root

      $submenus.each(function (index) {
        // Update height of first child (target menu) if autoHeight option true
        if (index === 0 && _this.options.autoHeight) {
          _this.$wrapper.css('height', __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('calcHeight'));
        }

        var isLastChild = index == $submenus.length - 1; // Add transitionsend listener to last child (root due to reverse order) to open target menu's first link
        // Last child makes sure the event gets always triggered even if going through several menus

        if (isLastChild === true) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).one(transitionend(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)), function () {
            if (autoFocus === true) {
              $elem.find('li[role="treeitem"] > a').first().focus();
            }
          });
        }

        _this._setShowSubMenuClasses(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), isLastChild);
      });
    }
    /**
     * Opens a submenu.
     * @function
     * @fires Drilldown#open
     * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
     */

  }, {
    key: "_show",
    value: function _show($elem) {
      var $submenu = $elem.children('[data-submenu]');
      $elem.attr('aria-expanded', true);
      this.$currentMenu = $submenu;
      $submenu.addClass('is-active').removeClass('invisible').attr('aria-hidden', false);

      if (this.options.autoHeight) {
        this.$wrapper.css({
          height: $submenu.data('calcHeight')
        });
      }
      /**
       * Fires when the submenu has opened.
       * @event Drilldown#open
       */


      this.$element.trigger('open.zf.drilldown', [$elem]);
    }
    /**
     * Hides a submenu
     * @function
     * @fires Drilldown#hide
     * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
     */

  }, {
    key: "_hide",
    value: function _hide($elem) {
      if (this.options.autoHeight) this.$wrapper.css({
        height: $elem.parent().closest('ul').data('calcHeight')
      });

      $elem.parent('li').attr('aria-expanded', false);
      $elem.attr('aria-hidden', true);
      $elem.addClass('is-closing').one(transitionend($elem), function () {
        $elem.removeClass('is-active is-closing');
        $elem.blur().addClass('invisible');
      });
      /**
       * Fires when the submenu has closed.
       * @event Drilldown#hide
       */

      $elem.trigger('hide.zf.drilldown', [$elem]);
    }
    /**
     * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
     * Prevents content jumping.
     * @function
     * @private
     */

  }, {
    key: "_getMaxDims",
    value: function _getMaxDims() {
      var maxHeight = 0,
          result = {},
          _this = this; // Recalculate menu heights and total max height


      this.$submenus.add(this.$element).each(function () {
        var numOfElems = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('li').length;
        var height = Box.GetDimensions(this).height;
        maxHeight = height > maxHeight ? height : maxHeight;

        if (_this.options.autoHeight) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('calcHeight', height);
        }
      });
      if (this.options.autoHeight) result['height'] = this.$currentMenu.data('calcHeight');else result['min-height'] = "".concat(maxHeight, "px");
      result['max-width'] = "".concat(this.$element[0].getBoundingClientRect().width, "px");
      return result;
    }
    /**
     * Destroys the Drilldown Menu
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      if (this.options.scrollTop) this.$element.off('.zf.drilldown', this._bindHandler);

      this._hideAll();

      this.$element.off('mutateme.zf.trigger');
      Nest.Burn(this.$element, 'drilldown');
      this.$element.unwrap().find('.js-drilldown-back, .is-submenu-parent-item').remove().end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu').end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');
      this.$submenuAnchors.each(function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).off('.zf.drilldown');
      });
      this.$element.find('[data-is-parent-link]').detach();
      this.$submenus.removeClass('drilldown-submenu-cover-previous invisible');
      this.$element.find('a').each(function () {
        var $link = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
        $link.removeAttr('tabindex');

        if ($link.data('savedHref')) {
          $link.attr('href', $link.data('savedHref')).removeData('savedHref');
        } else {
          return;
        }
      });
    }
  }]);

  return Drilldown;
}(Plugin);

Drilldown.defaults = {
  /**
   * Drilldowns depend on styles in order to function properly; in the default build of Foundation these are
   * on the `drilldown` class. This option auto-applies this class to the drilldown upon initialization.
   * @option
   * @type {boolian}
   * @default true
   */
  autoApplyClass: true,

  /**
   * Markup used for JS generated back button. Prepended  or appended (see backButtonPosition) to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>'
   */
  backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',

  /**
   * Position the back button either at the top or bottom of drilldown submenus. Can be `'left'` or `'bottom'`.
   * @option
   * @type {string}
   * @default top
   */
  backButtonPosition: 'top',

  /**
   * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<div></div>'
   */
  wrapper: '<div></div>',

  /**
   * Adds the parent link to the submenu.
   * @option
   * @type {boolean}
   * @default false
   */
  parentLink: false,

  /**
   * Allow the menu to return to root list on body click.
   * @option
   * @type {boolean}
   * @default false
   */
  closeOnClick: false,

  /**
   * Allow the menu to auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
  autoHeight: false,

  /**
   * Animate the auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
  animateHeight: false,

  /**
   * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button
   * @option
   * @type {boolean}
   * @default false
   */
  scrollTop: false,

  /**
   * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken
   * @option
   * @type {string}
   * @default ''
   */
  scrollTopElement: '',

  /**
   * ScrollTop offset
   * @option
   * @type {number}
   * @default 0
   */
  scrollTopOffset: 0,

  /**
   * Scroll animation duration
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,

  /**
   * Scroll animation easing. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @see {@link https://api.jquery.com/animate|JQuery animate}
   * @default 'swing'
   */
  animationEasing: 'swing' // holdOpen: false

};

var POSITIONS = ['left', 'right', 'top', 'bottom'];
var VERTICAL_ALIGNMENTS = ['top', 'bottom', 'center'];
var HORIZONTAL_ALIGNMENTS = ['left', 'right', 'center'];
var ALIGNMENTS = {
  'left': VERTICAL_ALIGNMENTS,
  'right': VERTICAL_ALIGNMENTS,
  'top': HORIZONTAL_ALIGNMENTS,
  'bottom': HORIZONTAL_ALIGNMENTS
};

function nextItem(item, array) {
  var currentIdx = array.indexOf(item);

  if (currentIdx === array.length - 1) {
    return array[0];
  } else {
    return array[currentIdx + 1];
  }
}

var Positionable =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Positionable, _Plugin);

  function Positionable() {
    _classCallCheck(this, Positionable);

    return _possibleConstructorReturn(this, _getPrototypeOf(Positionable).apply(this, arguments));
  }

  _createClass(Positionable, [{
    key: "_init",

    /**
     * Abstract class encapsulating the tether-like explicit positioning logic
     * including repositioning based on overlap.
     * Expects classes to define defaults for vOffset, hOffset, position,
     * alignment, allowOverlap, and allowBottomOverlap. They can do this by
     * extending the defaults, or (for now recommended due to the way docs are
     * generated) by explicitly declaring them.
     *
     **/
    value: function _init() {
      this.triedPositions = {};
      this.position = this.options.position === 'auto' ? this._getDefaultPosition() : this.options.position;
      this.alignment = this.options.alignment === 'auto' ? this._getDefaultAlignment() : this.options.alignment;
      this.originalPosition = this.position;
      this.originalAlignment = this.alignment;
    }
  }, {
    key: "_getDefaultPosition",
    value: function _getDefaultPosition() {
      return 'bottom';
    }
  }, {
    key: "_getDefaultAlignment",
    value: function _getDefaultAlignment() {
      switch (this.position) {
        case 'bottom':
        case 'top':
          return rtl() ? 'right' : 'left';

        case 'left':
        case 'right':
          return 'bottom';
      }
    }
    /**
     * Adjusts the positionable possible positions by iterating through alignments
     * and positions.
     * @function
     * @private
     */

  }, {
    key: "_reposition",
    value: function _reposition() {
      if (this._alignmentsExhausted(this.position)) {
        this.position = nextItem(this.position, POSITIONS);
        this.alignment = ALIGNMENTS[this.position][0];
      } else {
        this._realign();
      }
    }
    /**
     * Adjusts the dropdown pane possible positions by iterating through alignments
     * on the current position.
     * @function
     * @private
     */

  }, {
    key: "_realign",
    value: function _realign() {
      this._addTriedPosition(this.position, this.alignment);

      this.alignment = nextItem(this.alignment, ALIGNMENTS[this.position]);
    }
  }, {
    key: "_addTriedPosition",
    value: function _addTriedPosition(position, alignment) {
      this.triedPositions[position] = this.triedPositions[position] || [];
      this.triedPositions[position].push(alignment);
    }
  }, {
    key: "_positionsExhausted",
    value: function _positionsExhausted() {
      var isExhausted = true;

      for (var i = 0; i < POSITIONS.length; i++) {
        isExhausted = isExhausted && this._alignmentsExhausted(POSITIONS[i]);
      }

      return isExhausted;
    }
  }, {
    key: "_alignmentsExhausted",
    value: function _alignmentsExhausted(position) {
      return this.triedPositions[position] && this.triedPositions[position].length == ALIGNMENTS[position].length;
    } // When we're trying to center, we don't want to apply offset that's going to
    // take us just off center, so wrap around to return 0 for the appropriate
    // offset in those alignments.  TODO: Figure out if we want to make this
    // configurable behavior... it feels more intuitive, especially for tooltips, but
    // it's possible someone might actually want to start from center and then nudge
    // slightly off.

  }, {
    key: "_getVOffset",
    value: function _getVOffset() {
      return this.options.vOffset;
    }
  }, {
    key: "_getHOffset",
    value: function _getHOffset() {
      return this.options.hOffset;
    }
  }, {
    key: "_setPosition",
    value: function _setPosition($anchor, $element, $parent) {
      if ($anchor.attr('aria-expanded') === 'false') {
        return false;
      }

      var $eleDims = Box.GetDimensions($element),
          $anchorDims = Box.GetDimensions($anchor);

      if (!this.options.allowOverlap) {
        // restore original position & alignment before checking overlap
        this.position = this.originalPosition;
        this.alignment = this.originalAlignment;
      }

      $element.offset(Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));

      if (!this.options.allowOverlap) {
        var minOverlap = 100000000; // default coordinates to how we start, in case we can't figure out better

        var minCoordinates = {
          position: this.position,
          alignment: this.alignment
        };

        while (!this._positionsExhausted()) {
          var overlap = Box.OverlapArea($element, $parent, false, false, this.options.allowBottomOverlap);

          if (overlap === 0) {
            return;
          }

          if (overlap < minOverlap) {
            minOverlap = overlap;
            minCoordinates = {
              position: this.position,
              alignment: this.alignment
            };
          }

          this._reposition();

          $element.offset(Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
        } // If we get through the entire loop, there was no non-overlapping
        // position available. Pick the version with least overlap.


        this.position = minCoordinates.position;
        this.alignment = minCoordinates.alignment;
        $element.offset(Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
      }
    }
  }]);

  return Positionable;
}(Plugin);

Positionable.defaults = {
  /**
   * Position of positionable relative to anchor. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',

  /**
   * Alignment of positionable relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',

  /**
   * Allow overlap of container/window. If false, dropdown positionable first
   * try to position as defined by data-position and data-alignment, but
   * reposition if it would cause an overflow.
   * @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,

  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * @option
   * @type {boolean}
   * @default true
   */
  allowBottomOverlap: true,

  /**
   * Number of pixels the positionable should be separated vertically from anchor
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,

  /**
   * Number of pixels the positionable should be separated horizontally from anchor
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0
};

/**
 * Dropdown module.
 * @module foundation.dropdown
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.triggers
 */

var Dropdown =
/*#__PURE__*/
function (_Positionable) {
  _inherits(Dropdown, _Positionable);

  function Dropdown() {
    _classCallCheck(this, Dropdown);

    return _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).apply(this, arguments));
  }

  _createClass(Dropdown, [{
    key: "_setup",

    /**
     * Creates a new instance of a dropdown.
     * @class
     * @name Dropdown
     * @param {jQuery} element - jQuery object to make into a dropdown.
     *        Object should be of the dropdown panel, rather than its anchor.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Dropdown.defaults, this.$element.data(), options);
      this.className = 'Dropdown'; // ie9 back compat
      // Triggers init is idempotent, just need to make sure it is initialized

      Triggers.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

      this._init();

      Keyboard.register('Dropdown', {
        'ENTER': 'toggle',
        'SPACE': 'toggle',
        'ESCAPE': 'close'
      });
    }
    /**
     * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
     * @function
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var $id = this.$element.attr('id');
      this.$anchors = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("[data-toggle=\"".concat($id, "\"]")).length ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()("[data-toggle=\"".concat($id, "\"]")) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()("[data-open=\"".concat($id, "\"]"));
      this.$anchors.attr({
        'aria-controls': $id,
        'data-is-focus': false,
        'data-yeti-box': $id,
        'aria-haspopup': true,
        'aria-expanded': false
      });

      this._setCurrentAnchor(this.$anchors.first());

      if (this.options.parentClass) {
        this.$parent = this.$element.parents('.' + this.options.parentClass);
      } else {
        this.$parent = null;
      } // Set [aria-labelledby] on the Dropdown if it is not set


      if (typeof this.$element.attr('aria-labelledby') === 'undefined') {
        // Get the anchor ID or create one
        if (typeof this.$currentAnchor.attr('id') === 'undefined') {
          this.$currentAnchor.attr('id', GetYoDigits(6, 'dd-anchor'));
        }
        this.$element.attr('aria-labelledby', this.$currentAnchor.attr('id'));
      }

      this.$element.attr({
        'aria-hidden': 'true',
        'data-yeti-box': $id,
        'data-resize': $id
      });

      _get(_getPrototypeOf(Dropdown.prototype), "_init", this).call(this);

      this._events();
    }
  }, {
    key: "_getDefaultPosition",
    value: function _getDefaultPosition() {
      // handle legacy classnames
      var position = this.$element[0].className.match(/(top|left|right|bottom)/g);

      if (position) {
        return position[0];
      } else {
        return 'bottom';
      }
    }
  }, {
    key: "_getDefaultAlignment",
    value: function _getDefaultAlignment() {
      // handle legacy float approach
      var horizontalPosition = /float-(\S+)/.exec(this.$currentAnchor.attr('class'));

      if (horizontalPosition) {
        return horizontalPosition[1];
      }

      return _get(_getPrototypeOf(Dropdown.prototype), "_getDefaultAlignment", this).call(this);
    }
    /**
     * Sets the position and orientation of the dropdown pane, checks for collisions if allow-overlap is not true.
     * Recursively calls itself if a collision is detected, with a new position class.
     * @function
     * @private
     */

  }, {
    key: "_setPosition",
    value: function _setPosition() {
      this.$element.removeClass("has-position-".concat(this.position, " has-alignment-").concat(this.alignment));

      _get(_getPrototypeOf(Dropdown.prototype), "_setPosition", this).call(this, this.$currentAnchor, this.$element, this.$parent);

      this.$element.addClass("has-position-".concat(this.position, " has-alignment-").concat(this.alignment));
    }
    /**
     * Make it a current anchor.
     * Current anchor as the reference for the position of Dropdown panes.
     * @param {HTML} el - DOM element of the anchor.
     * @function
     * @private
     */

  }, {
    key: "_setCurrentAnchor",
    value: function _setCurrentAnchor(el) {
      this.$currentAnchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el);
    }
    /**
     * Adds event listeners to the element utilizing the triggers utility library.
     * @function
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this = this;

      this.$element.on({
        'open.zf.trigger': this.open.bind(this),
        'close.zf.trigger': this.close.bind(this),
        'toggle.zf.trigger': this.toggle.bind(this),
        'resizeme.zf.trigger': this._setPosition.bind(this)
      });
      this.$anchors.off('click.zf.trigger').on('click.zf.trigger', function () {
        _this._setCurrentAnchor(this);
      });

      if (this.options.hover) {
        this.$anchors.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
          _this._setCurrentAnchor(this);

          var bodyData = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').data();

          if (typeof bodyData.whatinput === 'undefined' || bodyData.whatinput === 'mouse') {
            clearTimeout(_this.timeout);
            _this.timeout = setTimeout(function () {
              _this.open();

              _this.$anchors.data('hover', true);
            }, _this.options.hoverDelay);
          }
        }).on('mouseleave.zf.dropdown', ignoreMousedisappear(function () {
          clearTimeout(_this.timeout);
          _this.timeout = setTimeout(function () {
            _this.close();

            _this.$anchors.data('hover', false);
          }, _this.options.hoverDelay);
        }));

        if (this.options.hoverPane) {
          this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
            clearTimeout(_this.timeout);
          }).on('mouseleave.zf.dropdown', ignoreMousedisappear(function () {
            clearTimeout(_this.timeout);
            _this.timeout = setTimeout(function () {
              _this.close();

              _this.$anchors.data('hover', false);
            }, _this.options.hoverDelay);
          }));
        }
      }

      this.$anchors.add(this.$element).on('keydown.zf.dropdown', function (e) {
        var $target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            visibleFocusableElements = Keyboard.findFocusable(_this.$element);
        Keyboard.handleKey(e, 'Dropdown', {
          open: function open() {
            if ($target.is(_this.$anchors) && !$target.is('input, textarea')) {
              _this.open();

              _this.$element.attr('tabindex', -1).focus();

              e.preventDefault();
            }
          },
          close: function close() {
            _this.close();

            _this.$anchors.focus();
          }
        });
      });
    }
    /**
     * Adds an event handler to the body to close any dropdowns on a click.
     * @function
     * @private
     */

  }, {
    key: "_addBodyHandler",
    value: function _addBodyHandler() {
      var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).not(this.$element),
          _this = this;

      $body.off('click.zf.dropdown').on('click.zf.dropdown', function (e) {
        if (_this.$anchors.is(e.target) || _this.$anchors.find(e.target).length) {
          return;
        }

        if (_this.$element.is(e.target) || _this.$element.find(e.target).length) {
          return;
        }

        _this.close();

        $body.off('click.zf.dropdown');
      });
    }
    /**
     * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.
     * @function
     * @fires Dropdown#closeme
     * @fires Dropdown#show
     */

  }, {
    key: "open",
    value: function open() {
      // var _this = this;

      /**
       * Fires to close other open dropdowns, typically when dropdown is opening
       * @event Dropdown#closeme
       */
      this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
      this.$anchors.addClass('hover').attr({
        'aria-expanded': true
      }); // this.$element/*.show()*/;

      this.$element.addClass('is-opening');

      this._setPosition();

      this.$element.removeClass('is-opening').addClass('is-open').attr({
        'aria-hidden': false
      });

      if (this.options.autoFocus) {
        var $focusable = Keyboard.findFocusable(this.$element);

        if ($focusable.length) {
          $focusable.eq(0).focus();
        }
      }

      if (this.options.closeOnClick) {
        this._addBodyHandler();
      }

      if (this.options.trapFocus) {
        Keyboard.trapFocus(this.$element);
      }
      /**
       * Fires once the dropdown is visible.
       * @event Dropdown#show
       */


      this.$element.trigger('show.zf.dropdown', [this.$element]);
    }
    /**
     * Closes the open dropdown pane.
     * @function
     * @fires Dropdown#hide
     */

  }, {
    key: "close",
    value: function close() {
      if (!this.$element.hasClass('is-open')) {
        return false;
      }

      this.$element.removeClass('is-open').attr({
        'aria-hidden': true
      });
      this.$anchors.removeClass('hover').attr('aria-expanded', false);
      /**
       * Fires once the dropdown is no longer visible.
       * @event Dropdown#hide
       */

      this.$element.trigger('hide.zf.dropdown', [this.$element]);

      if (this.options.trapFocus) {
        Keyboard.releaseFocus(this.$element);
      }
    }
    /**
     * Toggles the dropdown pane's visibility.
     * @function
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this.$element.hasClass('is-open')) {
        if (this.$anchors.data('hover')) return;
        this.close();
      } else {
        this.open();
      }
    }
    /**
     * Destroys the dropdown.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.off('.zf.trigger').hide();
      this.$anchors.off('.zf.dropdown');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).off('click.zf.dropdown');
    }
  }]);

  return Dropdown;
}(Positionable);

Dropdown.defaults = {
  /**
   * Class that designates bounding container of Dropdown (default: window)
   * @option
   * @type {?string}
   * @default null
   */
  parentClass: null,

  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 250
   */
  hoverDelay: 250,

  /**
   * Allow submenus to open on hover events
   * @option
   * @type {boolean}
   * @default false
   */
  hover: false,

  /**
   * Don't close dropdown when hovering over dropdown pane
   * @option
   * @type {boolean}
   * @default false
   */
  hoverPane: false,

  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,

  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,

  /**
   * Position of dropdown. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',

  /**
   * Alignment of dropdown relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',

  /**
   * Allow overlap of container/window. If false, dropdown will first try to position as defined by data-position and data-alignment, but reposition if it would cause an overflow.
   * @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,

  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * @option
   * @type {boolean}
   * @default true
   */
  allowBottomOverlap: true,

  /**
   * Allow the plugin to trap focus to the dropdown pane if opened with keyboard commands.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false,

  /**
   * Allow the plugin to set focus to the first focusable element within the pane, regardless of method of opening.
   * @option
   * @type {boolean}
   * @default false
   */
  autoFocus: false,

  /**
   * Allows a click on the body to close the dropdown.
   * @option
   * @type {boolean}
   * @default false
   */
  closeOnClick: false
};

/**
 * DropdownMenu module.
 * @module foundation.dropdown-menu
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.nest
 */

var DropdownMenu =
/*#__PURE__*/
function (_Plugin) {
  _inherits(DropdownMenu, _Plugin);

  function DropdownMenu() {
    _classCallCheck(this, DropdownMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropdownMenu).apply(this, arguments));
  }

  _createClass(DropdownMenu, [{
    key: "_setup",

    /**
     * Creates a new instance of DropdownMenu.
     * @class
     * @name DropdownMenu
     * @fires DropdownMenu#init
     * @param {jQuery} element - jQuery object to make into a dropdown menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, DropdownMenu.defaults, this.$element.data(), options);
      this.className = 'DropdownMenu'; // ie9 back compat

      this._init();

      Keyboard.register('DropdownMenu', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'previous',
        'ESCAPE': 'close'
      });
    }
    /**
     * Initializes the plugin, and calls _prepareMenu
     * @private
     * @function
     */

  }, {
    key: "_init",
    value: function _init() {
      Nest.Feather(this.$element, 'dropdown');
      var subs = this.$element.find('li.is-dropdown-submenu-parent');
      this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');
      this.$menuItems = this.$element.find('[role="menuitem"]');
      this.$tabs = this.$element.children('[role="menuitem"]');
      this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

      if (this.options.alignment === 'auto') {
        if (this.$element.hasClass(this.options.rightClass) || rtl() || this.$element.parents('.top-bar-right').is('*')) {
          this.options.alignment = 'right';
          subs.addClass('opens-left');
        } else {
          this.options.alignment = 'left';
          subs.addClass('opens-right');
        }
      } else {
        if (this.options.alignment === 'right') {
          subs.addClass('opens-left');
        } else {
          subs.addClass('opens-right');
        }
      }

      this.changed = false;

      this._events();
    }
  }, {
    key: "_isVertical",
    value: function _isVertical() {
      return this.$tabs.css('display') === 'block' || this.$element.css('flex-direction') === 'column';
    }
  }, {
    key: "_isRtl",
    value: function _isRtl() {
      return this.$element.hasClass('align-right') || rtl() && !this.$element.hasClass('align-left');
    }
    /**
     * Adds event listeners to elements within the menu
     * @private
     * @function
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this = this,
          hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined',
          parClass = 'is-dropdown-submenu-parent'; // used for onClick and in the keyboard handlers


      var handleClickFn = function handleClickFn(e) {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).parentsUntil('ul', ".".concat(parClass)),
            hasSub = $elem.hasClass(parClass),
            hasClicked = $elem.attr('data-is-click') === 'true',
            $sub = $elem.children('.is-dropdown-submenu');

        if (hasSub) {
          if (hasClicked) {
            if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {
              return;
            } else {
              e.stopImmediatePropagation();
              e.preventDefault();

              _this._hide($elem);
            }
          } else {
            e.preventDefault();
            e.stopImmediatePropagation();

            _this._show($sub);

            $elem.add($elem.parentsUntil(_this.$element, ".".concat(parClass))).attr('data-is-click', true);
          }
        }
      };

      if (this.options.clickOpen || hasTouch) {
        this.$menuItems.on('click.zf.dropdownmenu touchstart.zf.dropdownmenu', handleClickFn);
      } // Handle Leaf element Clicks


      if (_this.options.closeOnClickInside) {
        this.$menuItems.on('click.zf.dropdownmenu', function (e) {
          var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
              hasSub = $elem.hasClass(parClass);

          if (!hasSub) {
            _this._hide();
          }
        });
      }

      if (!this.options.disableHover) {
        this.$menuItems.on('mouseenter.zf.dropdownmenu', function (e) {
          var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
              hasSub = $elem.hasClass(parClass);

          if (hasSub) {
            clearTimeout($elem.data('_delay'));
            $elem.data('_delay', setTimeout(function () {
              _this._show($elem.children('.is-dropdown-submenu'));
            }, _this.options.hoverDelay));
          }
        }).on('mouseleave.zf.dropdownMenu', ignoreMousedisappear(function (e) {
          var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
              hasSub = $elem.hasClass(parClass);

          if (hasSub && _this.options.autoclose) {
            if ($elem.attr('data-is-click') === 'true' && _this.options.clickOpen) {
              return false;
            }

            clearTimeout($elem.data('_delay'));
            $elem.data('_delay', setTimeout(function () {
              _this._hide($elem);
            }, _this.options.closingTime));
          }
        }));
      }

      this.$menuItems.on('keydown.zf.dropdownmenu', function (e) {
        var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).parentsUntil('ul', '[role="menuitem"]'),
            isTab = _this.$tabs.index($element) > -1,
            $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),
            $prevElement,
            $nextElement;
        $elements.each(function (i) {
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
            $prevElement = $elements.eq(i - 1);
            $nextElement = $elements.eq(i + 1);
            return;
          }
        });

        var nextSibling = function nextSibling() {
          $nextElement.children('a:first').focus();
          e.preventDefault();
        },
            prevSibling = function prevSibling() {
          $prevElement.children('a:first').focus();
          e.preventDefault();
        },
            openSub = function openSub() {
          var $sub = $element.children('ul.is-dropdown-submenu');

          if ($sub.length) {
            _this._show($sub);

            $element.find('li > a:first').focus();
            e.preventDefault();
          } else {
            return;
          }
        },
            closeSub = function closeSub() {
          //if ($element.is(':first-child')) {
          var close = $element.parent('ul').parent('li');
          close.children('a:first').focus();

          _this._hide(close);

          e.preventDefault(); //}
        };

        var functions = {
          open: openSub,
          close: function close() {
            _this._hide(_this.$element);

            _this.$menuItems.eq(0).children('a').focus(); // focus to first element


            e.preventDefault();
          },
          handled: function handled() {
            e.stopImmediatePropagation();
          }
        };

        if (isTab) {
          if (_this._isVertical()) {
            // vertical menu
            if (_this._isRtl()) {
              // right aligned
              __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
                down: nextSibling,
                up: prevSibling,
                next: closeSub,
                previous: openSub
              });
            } else {
              // left aligned
              __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
                down: nextSibling,
                up: prevSibling,
                next: openSub,
                previous: closeSub
              });
            }
          } else {
            // horizontal menu
            if (_this._isRtl()) {
              // right aligned
              __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
                next: prevSibling,
                previous: nextSibling,
                down: openSub,
                up: closeSub
              });
            } else {
              // left aligned
              __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
                next: nextSibling,
                previous: prevSibling,
                down: openSub,
                up: closeSub
              });
            }
          }
        } else {
          // not tabs -> one sub
          if (_this._isRtl()) {
            // right aligned
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
              next: closeSub,
              previous: openSub,
              down: nextSibling,
              up: prevSibling
            });
          } else {
            // left aligned
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
              next: openSub,
              previous: closeSub,
              down: nextSibling,
              up: prevSibling
            });
          }
        }

        Keyboard.handleKey(e, 'DropdownMenu', functions);
      });
    }
    /**
     * Adds an event handler to the body to close any dropdowns on a click.
     * @function
     * @private
     */

  }, {
    key: "_addBodyHandler",
    value: function _addBodyHandler() {
      var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body),
          _this = this;

      $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu').on('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu', function (e) {
        var $link = _this.$element.find(e.target);

        if ($link.length) {
          return;
        }

        _this._hide();

        $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu');
      });
    }
    /**
     * Opens a dropdown pane, and checks for collisions first.
     * @param {jQuery} $sub - ul element that is a submenu to show
     * @function
     * @private
     * @fires Dropdownmenu#show
     */

  }, {
    key: "_show",
    value: function _show($sub) {
      var idx = this.$tabs.index(this.$tabs.filter(function (i, el) {
        return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).find($sub).length > 0;
      }));
      var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');

      this._hide($sibs, idx);

      $sub.css('visibility', 'hidden').addClass('js-dropdown-active').parent('li.is-dropdown-submenu-parent').addClass('is-active');
      var clear = Box.ImNotTouchingYou($sub, null, true);

      if (!clear) {
        var oldClass = this.options.alignment === 'left' ? '-right' : '-left',
            $parentLi = $sub.parent('.is-dropdown-submenu-parent');
        $parentLi.removeClass("opens".concat(oldClass)).addClass("opens-".concat(this.options.alignment));
        clear = Box.ImNotTouchingYou($sub, null, true);

        if (!clear) {
          $parentLi.removeClass("opens-".concat(this.options.alignment)).addClass('opens-inner');
        }

        this.changed = true;
      }

      $sub.css('visibility', '');

      if (this.options.closeOnClick) {
        this._addBodyHandler();
      }
      /**
       * Fires when the new dropdown pane is visible.
       * @event Dropdownmenu#show
       */


      this.$element.trigger('show.zf.dropdownmenu', [$sub]);
    }
    /**
     * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
     * @function
     * @param {jQuery} $elem - element with a submenu to hide
     * @param {Number} idx - index of the $tabs collection to hide
     * @private
     */

  }, {
    key: "_hide",
    value: function _hide($elem, idx) {
      var $toClose;

      if ($elem && $elem.length) {
        $toClose = $elem;
      } else if (typeof idx !== 'undefined') {
        $toClose = this.$tabs.not(function (i, el) {
          return i === idx;
        });
      } else {
        $toClose = this.$element;
      }

      var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;

      if (somethingToClose) {
        $toClose.find('li.is-active').add($toClose).attr({
          'data-is-click': false
        }).removeClass('is-active');
        $toClose.find('ul.js-dropdown-active').removeClass('js-dropdown-active');

        if (this.changed || $toClose.find('opens-inner').length) {
          var oldClass = this.options.alignment === 'left' ? 'right' : 'left';
          $toClose.find('li.is-dropdown-submenu-parent').add($toClose).removeClass("opens-inner opens-".concat(this.options.alignment)).addClass("opens-".concat(oldClass));
          this.changed = false;
        }
        /**
         * Fires when the open menus are closed.
         * @event Dropdownmenu#hide
         */


        this.$element.trigger('hide.zf.dropdownmenu', [$toClose]);
      }
    }
    /**
     * Destroys the plugin.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$menuItems.off('.zf.dropdownmenu').removeAttr('data-is-click').removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).off('.zf.dropdownmenu');
      Nest.Burn(this.$element, 'dropdown');
    }
  }]);

  return DropdownMenu;
}(Plugin);
/**
 * Default settings for plugin
 */


DropdownMenu.defaults = {
  /**
   * Disallows hover events from opening submenus
   * @option
   * @type {boolean}
   * @default false
   */
  disableHover: false,

  /**
   * Allow a submenu to automatically close on a mouseleave event, if not clicked open.
   * @option
   * @type {boolean}
   * @default true
   */
  autoclose: true,

  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 50
   */
  hoverDelay: 50,

  /**
   * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
   * @option
   * @type {boolean}
   * @default false
   */
  clickOpen: false,

  /**
   * Amount of time to delay closing a submenu on a mouseleave event.
   * @option
   * @type {number}
   * @default 500
   */
  closingTime: 500,

  /**
   * Position of the menu relative to what direction the submenus should open. Handled by JS. Can be `'auto'`, `'left'` or `'right'`.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',

  /**
   * Allow clicks on the body to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,

  /**
   * Allow clicks on leaf anchor links to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClickInside: true,

  /**
   * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'vertical'
   */
  verticalClass: 'vertical',

  /**
   * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'align-right'
   */
  rightClass: 'align-right',

  /**
   * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.
   * @option
   * @type {boolean}
   * @default true
   */
  forceFollow: true
};

/**
 * Equalizer module.
 * @module foundation.equalizer
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.imageLoader if equalizer contains images
 */

var Equalizer =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Equalizer, _Plugin);

  function Equalizer() {
    _classCallCheck(this, Equalizer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Equalizer).apply(this, arguments));
  }

  _createClass(Equalizer, [{
    key: "_setup",

    /**
     * Creates a new instance of Equalizer.
     * @class
     * @name Equalizer
     * @fires Equalizer#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Equalizer.defaults, this.$element.data(), options);
      this.className = 'Equalizer'; // ie9 back compat

      this._init();
    }
    /**
     * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var eqId = this.$element.attr('data-equalizer') || '';
      var $watched = this.$element.find("[data-equalizer-watch=\"".concat(eqId, "\"]"));

      MediaQuery._init();

      this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');
      this.$element.attr('data-resize', eqId || GetYoDigits(6, 'eq'));
      this.$element.attr('data-mutate', eqId || GetYoDigits(6, 'eq'));
      this.hasNested = this.$element.find('[data-equalizer]').length > 0;
      this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;
      this.isOn = false;
      this._bindHandler = {
        onResizeMeBound: this._onResizeMe.bind(this),
        onPostEqualizedBound: this._onPostEqualized.bind(this)
      };
      var imgs = this.$element.find('img');
      var tooSmall;

      if (this.options.equalizeOn) {
        tooSmall = this._checkMQ();
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._checkMQ.bind(this));
      } else {
        this._events();
      }

      if (typeof tooSmall !== 'undefined' && tooSmall === false || typeof tooSmall === 'undefined') {
        if (imgs.length) {
          onImagesLoaded(imgs, this._reflow.bind(this));
        } else {
          this._reflow();
        }
      }
    }
    /**
     * Removes event listeners if the breakpoint is too small.
     * @private
     */

  }, {
    key: "_pauseEvents",
    value: function _pauseEvents() {
      this.isOn = false;
      this.$element.off({
        '.zf.equalizer': this._bindHandler.onPostEqualizedBound,
        'resizeme.zf.trigger': this._bindHandler.onResizeMeBound,
        'mutateme.zf.trigger': this._bindHandler.onResizeMeBound
      });
    }
    /**
     * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
     * @private
     */

  }, {
    key: "_onResizeMe",
    value: function _onResizeMe(e) {
      this._reflow();
    }
    /**
     * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
     * @private
     */

  }, {
    key: "_onPostEqualized",
    value: function _onPostEqualized(e) {
      if (e.target !== this.$element[0]) {
        this._reflow();
      }
    }
    /**
     * Initializes events for Equalizer.
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {

      this._pauseEvents();

      if (this.hasNested) {
        this.$element.on('postequalized.zf.equalizer', this._bindHandler.onPostEqualizedBound);
      } else {
        this.$element.on('resizeme.zf.trigger', this._bindHandler.onResizeMeBound);
        this.$element.on('mutateme.zf.trigger', this._bindHandler.onResizeMeBound);
      }

      this.isOn = true;
    }
    /**
     * Checks the current breakpoint to the minimum required size.
     * @private
     */

  }, {
    key: "_checkMQ",
    value: function _checkMQ() {
      var tooSmall = !MediaQuery.is(this.options.equalizeOn);

      if (tooSmall) {
        if (this.isOn) {
          this._pauseEvents();

          this.$watched.css('height', 'auto');
        }
      } else {
        if (!this.isOn) {
          this._events();
        }
      }

      return tooSmall;
    }
    /**
     * A noop version for the plugin
     * @private
     */

  }, {
    key: "_killswitch",
    value: function _killswitch() {
      return;
    }
    /**
     * Calls necessary functions to update Equalizer upon DOM change
     * @private
     */

  }, {
    key: "_reflow",
    value: function _reflow() {
      if (!this.options.equalizeOnStack) {
        if (this._isStacked()) {
          this.$watched.css('height', 'auto');
          return false;
        }
      }

      if (this.options.equalizeByRow) {
        this.getHeightsByRow(this.applyHeightByRow.bind(this));
      } else {
        this.getHeights(this.applyHeight.bind(this));
      }
    }
    /**
     * Manually determines if the first 2 elements are *NOT* stacked.
     * @private
     */

  }, {
    key: "_isStacked",
    value: function _isStacked() {
      if (!this.$watched[0] || !this.$watched[1]) {
        return true;
      }

      return this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top;
    }
    /**
     * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
     * @param {Function} cb - A non-optional callback to return the heights array to.
     * @returns {Array} heights - An array of heights of children within Equalizer container
     */

  }, {
    key: "getHeights",
    value: function getHeights(cb) {
      var heights = [];

      for (var i = 0, len = this.$watched.length; i < len; i++) {
        this.$watched[i].style.height = 'auto';
        heights.push(this.$watched[i].offsetHeight);
      }

      cb(heights);
    }
    /**
     * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
     * @param {Function} cb - A non-optional callback to return the heights array to.
     * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
     */

  }, {
    key: "getHeightsByRow",
    value: function getHeightsByRow(cb) {
      var lastElTopOffset = this.$watched.length ? this.$watched.first().offset().top : 0,
          groups = [],
          group = 0; //group by Row

      groups[group] = [];

      for (var i = 0, len = this.$watched.length; i < len; i++) {
        this.$watched[i].style.height = 'auto'; //maybe could use this.$watched[i].offsetTop

        var elOffsetTop = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.$watched[i]).offset().top;

        if (elOffsetTop != lastElTopOffset) {
          group++;
          groups[group] = [];
          lastElTopOffset = elOffsetTop;
        }

        groups[group].push([this.$watched[i], this.$watched[i].offsetHeight]);
      }

      for (var j = 0, ln = groups.length; j < ln; j++) {
        var heights = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(groups[j]).map(function () {
          return this[1];
        }).get();
        var max = Math.max.apply(null, heights);
        groups[j].push(max);
      }

      cb(groups);
    }
    /**
     * Changes the CSS height property of each child in an Equalizer parent to match the tallest
     * @param {array} heights - An array of heights of children within Equalizer container
     * @fires Equalizer#preequalized
     * @fires Equalizer#postequalized
     */

  }, {
    key: "applyHeight",
    value: function applyHeight(heights) {
      var max = Math.max.apply(null, heights);
      /**
       * Fires before the heights are applied
       * @event Equalizer#preequalized
       */

      this.$element.trigger('preequalized.zf.equalizer');
      this.$watched.css('height', max);
      /**
       * Fires when the heights have been applied
       * @event Equalizer#postequalized
       */

      this.$element.trigger('postequalized.zf.equalizer');
    }
    /**
     * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
     * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
     * @fires Equalizer#preequalized
     * @fires Equalizer#preequalizedrow
     * @fires Equalizer#postequalizedrow
     * @fires Equalizer#postequalized
     */

  }, {
    key: "applyHeightByRow",
    value: function applyHeightByRow(groups) {
      /**
       * Fires before the heights are applied
       */
      this.$element.trigger('preequalized.zf.equalizer');

      for (var i = 0, len = groups.length; i < len; i++) {
        var groupsILength = groups[i].length,
            max = groups[i][groupsILength - 1];

        if (groupsILength <= 2) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(groups[i][0][0]).css({
            'height': 'auto'
          });
          continue;
        }
        /**
          * Fires before the heights per row are applied
          * @event Equalizer#preequalizedrow
          */


        this.$element.trigger('preequalizedrow.zf.equalizer');

        for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(groups[i][j][0]).css({
            'height': max
          });
        }
        /**
          * Fires when the heights per row have been applied
          * @event Equalizer#postequalizedrow
          */


        this.$element.trigger('postequalizedrow.zf.equalizer');
      }
      /**
       * Fires when the heights have been applied
       */


      this.$element.trigger('postequalized.zf.equalizer');
    }
    /**
     * Destroys an instance of Equalizer.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this._pauseEvents();

      this.$watched.css('height', 'auto');
    }
  }]);

  return Equalizer;
}(Plugin);
/**
 * Default settings for plugin
 */


Equalizer.defaults = {
  /**
   * Enable height equalization when stacked on smaller screens.
   * @option
   * @type {boolean}
   * @default false
   */
  equalizeOnStack: false,

  /**
   * Enable height equalization row by row.
   * @option
   * @type {boolean}
   * @default false
   */
  equalizeByRow: false,

  /**
   * String representing the minimum breakpoint size the plugin should equalize heights on.
   * @option
   * @type {string}
   * @default ''
   */
  equalizeOn: ''
};

/**
 * Interchange module.
 * @module foundation.interchange
 * @requires foundation.util.mediaQuery
 */

var Interchange =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Interchange, _Plugin);

  function Interchange() {
    _classCallCheck(this, Interchange);

    return _possibleConstructorReturn(this, _getPrototypeOf(Interchange).apply(this, arguments));
  }

  _createClass(Interchange, [{
    key: "_setup",

    /**
     * Creates a new instance of Interchange.
     * @class
     * @name Interchange
     * @fires Interchange#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Interchange.defaults, options);
      this.rules = [];
      this.currentPath = '';
      this.className = 'Interchange'; // ie9 back compat

      this._init();

      this._events();
    }
    /**
     * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
     * @function
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      MediaQuery._init();

      var id = this.$element[0].id || GetYoDigits(6, 'interchange');
      this.$element.attr({
        'data-resize': id,
        'id': id
      });

      this._addBreakpoints();

      this._generateRules();

      this._reflow();
    }
    /**
     * Initializes events for Interchange.
     * @function
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this2 = this;

      this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function () {
        return _this2._reflow();
      });
    }
    /**
     * Calls necessary functions to update Interchange upon DOM change
     * @function
     * @private
     */

  }, {
    key: "_reflow",
    value: function _reflow() {
      var match; // Iterate through each rule, but only save the last match

      for (var i in this.rules) {
        if (this.rules.hasOwnProperty(i)) {
          var rule = this.rules[i];

          if (window.matchMedia(rule.query).matches) {
            match = rule;
          }
        }
      }

      if (match) {
        this.replace(match.path);
      }
    }
    /**
     * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.
     * @function
     * @private
     */

  }, {
    key: "_addBreakpoints",
    value: function _addBreakpoints() {
      for (var i in MediaQuery.queries) {
        if (MediaQuery.queries.hasOwnProperty(i)) {
          var query = MediaQuery.queries[i];
          Interchange.SPECIAL_QUERIES[query.name] = query.value;
        }
      }
    }
    /**
     * Checks the Interchange element for the provided media query + content pairings
     * @function
     * @private
     * @param {Object} element - jQuery object that is an Interchange instance
     * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
     */

  }, {
    key: "_generateRules",
    value: function _generateRules(element) {
      var rulesList = [];
      var rules;

      if (this.options.rules) {
        rules = this.options.rules;
      } else {
        rules = this.$element.data('interchange');
      }

      rules = typeof rules === 'string' ? rules.match(/\[.*?, .*?\]/g) : rules;

      for (var i in rules) {
        if (rules.hasOwnProperty(i)) {
          var rule = rules[i].slice(1, -1).split(', ');
          var path = rule.slice(0, -1).join('');
          var query = rule[rule.length - 1];

          if (Interchange.SPECIAL_QUERIES[query]) {
            query = Interchange.SPECIAL_QUERIES[query];
          }

          rulesList.push({
            path: path,
            query: query
          });
        }
      }

      this.rules = rulesList;
    }
    /**
     * Update the `src` property of an image, or change the HTML of a container, to the specified path.
     * @function
     * @param {String} path - Path to the image or HTML partial.
     * @fires Interchange#replaced
     */

  }, {
    key: "replace",
    value: function replace(path) {
      if (this.currentPath === path) return;

      var _this = this,
          trigger = 'replaced.zf.interchange'; // Replacing images


      if (this.$element[0].nodeName === 'IMG') {
        this.$element.attr('src', path).on('load', function () {
          _this.currentPath = path;
        }).trigger(trigger);
      } // Replacing background images
      else if (path.match(/\.(gif|jpg|jpeg|png|svg|tiff)([?#].*)?/i)) {
          path = path.replace(/\(/g, '%28').replace(/\)/g, '%29');
          this.$element.css({
            'background-image': 'url(' + path + ')'
          }).trigger(trigger);
        } // Replacing HTML
        else {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.get(path, function (response) {
              _this.$element.html(response).trigger(trigger);

              __WEBPACK_IMPORTED_MODULE_0_jquery___default()(response).foundation();
              _this.currentPath = path;
            });
          }
      /**
       * Fires when content in an Interchange element is done being loaded.
       * @event Interchange#replaced
       */
      // this.$element.trigger('replaced.zf.interchange');

    }
    /**
     * Destroys an instance of interchange.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.off('resizeme.zf.trigger');
    }
  }]);

  return Interchange;
}(Plugin);
/**
 * Default settings for plugin
 */


Interchange.defaults = {
  /**
   * Rules to be applied to Interchange elements. Set with the `data-interchange` array notation.
   * @option
   * @type {?array}
   * @default null
   */
  rules: null
};
Interchange.SPECIAL_QUERIES = {
  'landscape': 'screen and (orientation: landscape)',
  'portrait': 'screen and (orientation: portrait)',
  'retina': 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)'
};

/**
 * SmoothScroll module.
 * @module foundation.smooth-scroll
 */

var SmoothScroll =
/*#__PURE__*/
function (_Plugin) {
  _inherits(SmoothScroll, _Plugin);

  function SmoothScroll() {
    _classCallCheck(this, SmoothScroll);

    return _possibleConstructorReturn(this, _getPrototypeOf(SmoothScroll).apply(this, arguments));
  }

  _createClass(SmoothScroll, [{
    key: "_setup",

    /**
     * Creates a new instance of SmoothScroll.
     * @class
     * @name SmoothScroll
     * @fires SmoothScroll#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, SmoothScroll.defaults, this.$element.data(), options);
      this.className = 'SmoothScroll'; // ie9 back compat

      this._init();
    }
    /**
     * Initialize the SmoothScroll plugin
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var id = this.$element[0].id || GetYoDigits(6, 'smooth-scroll');
      this.$element.attr({
        id: id
      });

      this._events();
    }
    /**
     * Initializes events for SmoothScroll.
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      this._linkClickListener = this._handleLinkClick.bind(this);
      this.$element.on('click.zf.smoothScroll', this._linkClickListener);
      this.$element.on('click.zf.smoothScroll', 'a[href^="#"]', this._linkClickListener);
    }
    /**
     * Handle the given event to smoothly scroll to the anchor pointed by the event target.
     * @param {*} e - event
     * @function
     * @private
     */

  }, {
    key: "_handleLinkClick",
    value: function _handleLinkClick(e) {
      var _this = this;

      // Follow the link if it does not point to an anchor.
      if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.currentTarget).is('a[href^="#"]')) return;
      var arrival = e.currentTarget.getAttribute('href');
      this._inTransition = true;
      SmoothScroll.scrollToLoc(arrival, this.options, function () {
        _this._inTransition = false;
      });
      e.preventDefault();
    }
  }, {
    key: "_destroy",

    /**
     * Destroys the SmoothScroll instance.
     * @function
     */
    value: function _destroy() {
      this.$element.off('click.zf.smoothScroll', this._linkClickListener);
      this.$element.off('click.zf.smoothScroll', 'a[href^="#"]', this._linkClickListener);
    }
  }], [{
    key: "scrollToLoc",

    /**
     * Function to scroll to a given location on the page.
     * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'
     * @param {Object} options - The options to use.
     * @param {Function} callback - The callback function.
     * @static
     * @function
     */
    value: function scrollToLoc(loc) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SmoothScroll.defaults;
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var $loc = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(loc); // Do nothing if target does not exist to prevent errors

      if (!$loc.length) return false;
      var scrollPos = Math.round($loc.offset().top - options.threshold / 2 - options.offset);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').stop(true).animate({
        scrollTop: scrollPos
      }, options.animationDuration, options.animationEasing, function () {
        if (typeof callback === 'function') {
          callback();
        }
      });
    }
  }]);

  return SmoothScroll;
}(Plugin);
/**
 * Default settings for plugin.
 */


SmoothScroll.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,

  /**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */
  animationEasing: 'linear',

  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
  threshold: 50,

  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
  offset: 0
};

/**
 * Magellan module.
 * @module foundation.magellan
 * @requires foundation.smoothScroll
 */

var Magellan =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Magellan, _Plugin);

  function Magellan() {
    _classCallCheck(this, Magellan);

    return _possibleConstructorReturn(this, _getPrototypeOf(Magellan).apply(this, arguments));
  }

  _createClass(Magellan, [{
    key: "_setup",

    /**
     * Creates a new instance of Magellan.
     * @class
     * @name Magellan
     * @fires Magellan#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Magellan.defaults, this.$element.data(), options);
      this.className = 'Magellan'; // ie9 back compat

      this._init();

      this.calcPoints();
    }
    /**
     * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var id = this.$element[0].id || GetYoDigits(6, 'magellan');

      this.$targets = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-magellan-target]');
      this.$links = this.$element.find('a');
      this.$element.attr({
        'data-resize': id,
        'data-scroll': id,
        'id': id
      });
      this.$active = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
      this.scrollPos = parseInt(window.pageYOffset, 10);

      this._events();
    }
    /**
     * Calculates an array of pixel values that are the demarcation lines between locations on the page.
     * Can be invoked if new elements are added or the size of a location changes.
     * @function
     */

  }, {
    key: "calcPoints",
    value: function calcPoints() {
      var _this = this,
          body = document.body,
          html = document.documentElement;

      this.points = [];
      this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
      this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));
      this.$targets.each(function () {
        var $tar = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            pt = Math.round($tar.offset().top - _this.options.threshold);
        $tar.targetPoint = pt;

        _this.points.push(pt);
      });
    }
    /**
     * Initializes events for Magellan.
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this = this,
          $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body'),
          opts = {
        duration: _this.options.animationDuration,
        easing: _this.options.animationEasing
      };

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).one('load', function () {
        if (_this.options.deepLinking) {
          if (location.hash) {
            _this.scrollToLoc(location.hash);
          }
        }

        _this.calcPoints();

        _this._updateActive();
      });
      _this.onLoadListener = onLoad(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window), function () {
        _this.$element.on({
          'resizeme.zf.trigger': _this.reflow.bind(_this),
          'scrollme.zf.trigger': _this._updateActive.bind(_this)
        }).on('click.zf.magellan', 'a[href^="#"]', function (e) {
          e.preventDefault();
          var arrival = this.getAttribute('href');

          _this.scrollToLoc(arrival);
        });
      });

      this._deepLinkScroll = function (e) {
        if (_this.options.deepLinking) {
          _this.scrollToLoc(window.location.hash);
        }
      };

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('hashchange', this._deepLinkScroll);
    }
    /**
     * Function to scroll to a given location on the page.
     * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'
     * @function
     */

  }, {
    key: "scrollToLoc",
    value: function scrollToLoc(loc) {
      this._inTransition = true;

      var _this = this;

      var options = {
        animationEasing: this.options.animationEasing,
        animationDuration: this.options.animationDuration,
        threshold: this.options.threshold,
        offset: this.options.offset
      };
      SmoothScroll.scrollToLoc(loc, options, function () {
        _this._inTransition = false;
      });
    }
    /**
     * Calls necessary functions to update Magellan upon DOM change
     * @function
     */

  }, {
    key: "reflow",
    value: function reflow() {
      this.calcPoints();

      this._updateActive();
    }
    /**
     * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.
     * @private
     * @function
     * @fires Magellan#update
     */

  }, {
    key: "_updateActive",
    value: function _updateActive()
    /*evt, elem, scrollPos*/
    {
      var _this2 = this;

      if (this._inTransition) return;
      var newScrollPos = parseInt(window.pageYOffset, 10);
      var isScrollingUp = this.scrollPos > newScrollPos;
      this.scrollPos = newScrollPos;
      var activeIdx; // Before the first point: no link

      if (newScrollPos < this.points[0]) ;
      /* do nothing */
      // At the bottom of the page: last link
      else if (newScrollPos + this.winHeight === this.docHeight) {
          activeIdx = this.points.length - 1;
        } // Otherwhise, use the last visible link
        else {
            var visibleLinks = this.points.filter(function (p, i) {
              return p - _this2.options.offset - (isScrollingUp ? _this2.options.threshold : 0) <= newScrollPos;
            });
            activeIdx = visibleLinks.length ? visibleLinks.length - 1 : 0;
          } // Get the new active link


      var $oldActive = this.$active;
      var activeHash = '';

      if (typeof activeIdx !== 'undefined') {
        this.$active = this.$links.filter('[href="#' + this.$targets.eq(activeIdx).data('magellan-target') + '"]');
        if (this.$active.length) activeHash = this.$active[0].getAttribute('href');
      } else {
        this.$active = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
      }

      var isNewActive = !(!this.$active.length && !$oldActive.length) && !this.$active.is($oldActive);
      var isNewHash = activeHash !== window.location.hash; // Update the active link element

      if (isNewActive) {
        $oldActive.removeClass(this.options.activeClass);
        this.$active.addClass(this.options.activeClass);
      } // Update the hash (it may have changed with the same active link)


      if (this.options.deepLinking && isNewHash) {
        if (window.history.pushState) {
          // Set or remove the hash (see: https://stackoverflow.com/a/5298684/4317384
          var url = activeHash ? activeHash : window.location.pathname + window.location.search;
          window.history.pushState(null, null, url);
        } else {
          window.location.hash = activeHash;
        }
      }

      if (isNewActive) {
        /**
         * Fires when magellan is finished updating to the new active element.
         * @event Magellan#update
         */
        this.$element.trigger('update.zf.magellan', [this.$active]);
      }
    }
    /**
     * Destroys an instance of Magellan and resets the url of the window.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.off('.zf.trigger .zf.magellan').find(".".concat(this.options.activeClass)).removeClass(this.options.activeClass);

      if (this.options.deepLinking) {
        var hash = this.$active[0].getAttribute('href');
        window.location.hash.replace(hash, '');
      }

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('hashchange', this._deepLinkScroll);
      if (this.onLoadListener) __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(this.onLoadListener);
    }
  }]);

  return Magellan;
}(Plugin);
/**
 * Default settings for plugin
 */


Magellan.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,

  /**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */
  animationEasing: 'linear',

  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
  threshold: 50,

  /**
   * Class applied to the active locations link on the magellan container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  activeClass: 'is-active',

  /**
   * Allows the script to manipulate the url of the current page, and if supported, alter the history.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinking: false,

  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
  offset: 0
};

/**
 * OffCanvas module.
 * @module foundation.offcanvas
 * @requires foundation.util.keyboard
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */

var OffCanvas =
/*#__PURE__*/
function (_Plugin) {
  _inherits(OffCanvas, _Plugin);

  function OffCanvas() {
    _classCallCheck(this, OffCanvas);

    return _possibleConstructorReturn(this, _getPrototypeOf(OffCanvas).apply(this, arguments));
  }

  _createClass(OffCanvas, [{
    key: "_setup",

    /**
     * Creates a new instance of an off-canvas wrapper.
     * @class
     * @name OffCanvas
     * @fires OffCanvas#init
     * @param {Object} element - jQuery object to initialize.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      var _this2 = this;

      this.className = 'OffCanvas'; // ie9 back compat

      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, OffCanvas.defaults, this.$element.data(), options);
      this.contentClasses = {
        base: [],
        reveal: []
      };
      this.$lastTrigger = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
      this.$triggers = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
      this.position = 'left';
      this.$content = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
      this.nested = !!this.options.nested; // Defines the CSS transition/position classes of the off-canvas content container.

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(['push', 'overlap']).each(function (index, val) {
        _this2.contentClasses.base.push('has-transition-' + val);
      });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(['left', 'right', 'top', 'bottom']).each(function (index, val) {
        _this2.contentClasses.base.push('has-position-' + val);

        _this2.contentClasses.reveal.push('has-reveal-' + val);
      }); // Triggers init is idempotent, just need to make sure it is initialized

      Triggers.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

      MediaQuery._init();

      this._init();

      this._events();

      Keyboard.register('OffCanvas', {
        'ESCAPE': 'close'
      });
    }
    /**
     * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
     * @function
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var id = this.$element.attr('id');
      this.$element.attr('aria-hidden', 'true'); // Find off-canvas content, either by ID (if specified), by siblings or by closest selector (fallback)

      if (this.options.contentId) {
        this.$content = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + this.options.contentId);
      } else if (this.$element.siblings('[data-off-canvas-content]').length) {
        this.$content = this.$element.siblings('[data-off-canvas-content]').first();
      } else {
        this.$content = this.$element.closest('[data-off-canvas-content]').first();
      }

      if (!this.options.contentId) {
        // Assume that the off-canvas element is nested if it isn't a sibling of the content
        this.nested = this.$element.siblings('[data-off-canvas-content]').length === 0;
      } else if (this.options.contentId && this.options.nested === null) {
        // Warning if using content ID without setting the nested option
        // Once the element is nested it is required to work properly in this case
        console.warn('Remember to use the nested option if using the content ID option!');
      }

      if (this.nested === true) {
        // Force transition overlap if nested
        this.options.transition = 'overlap'; // Remove appropriate classes if already assigned in markup

        this.$element.removeClass('is-transition-push');
      }

      this.$element.addClass("is-transition-".concat(this.options.transition, " is-closed")); // Find triggers that affect this element and add aria-expanded to them

      this.$triggers = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).find('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr('aria-expanded', 'false').attr('aria-controls', id); // Get position by checking for related CSS class

      this.position = this.$element.is('.position-left, .position-top, .position-right, .position-bottom') ? this.$element.attr('class').match(/position\-(left|top|right|bottom)/)[1] : this.position; // Add an overlay over the content if necessary

      if (this.options.contentOverlay === true) {
        var overlay = document.createElement('div');
        var overlayPosition = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.$element).css("position") === 'fixed' ? 'is-overlay-fixed' : 'is-overlay-absolute';
        overlay.setAttribute('class', 'js-off-canvas-overlay ' + overlayPosition);
        this.$overlay = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(overlay);

        if (overlayPosition === 'is-overlay-fixed') {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.$overlay).insertAfter(this.$element);
        } else {
          this.$content.append(this.$overlay);
        }
      } // Get the revealOn option from the class.


      var revealOnRegExp = new RegExp(RegExpEscape(this.options.revealClass) + '([^\\s]+)', 'g');
      var revealOnClass = revealOnRegExp.exec(this.$element[0].className);

      if (revealOnClass) {
        this.options.isRevealed = true;
        this.options.revealOn = this.options.revealOn || revealOnClass[1];
      } // Ensure the `reveal-on-*` class is set.


      if (this.options.isRevealed === true && this.options.revealOn) {
        this.$element.first().addClass("".concat(this.options.revealClass).concat(this.options.revealOn));

        this._setMQChecker();
      }

      if (this.options.transitionTime) {
        this.$element.css('transition-duration', this.options.transitionTime);
      } // Initally remove all transition/position CSS classes from off-canvas content container.


      this._removeContentClasses();
    }
    /**
     * Adds event handlers to the off-canvas wrapper and the exit overlay.
     * @function
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      this.$element.off('.zf.trigger .zf.offcanvas').on({
        'open.zf.trigger': this.open.bind(this),
        'close.zf.trigger': this.close.bind(this),
        'toggle.zf.trigger': this.toggle.bind(this),
        'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
      });

      if (this.options.closeOnClick === true) {
        var $target = this.options.contentOverlay ? this.$overlay : this.$content;
        $target.on({
          'click.zf.offcanvas': this.close.bind(this)
        });
      }
    }
    /**
     * Applies event listener for elements that will reveal at certain breakpoints.
     * @private
     */

  }, {
    key: "_setMQChecker",
    value: function _setMQChecker() {
      var _this = this;

      this.onLoadListener = onLoad(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window), function () {
        if (MediaQuery.atLeast(_this.options.revealOn)) {
          _this.reveal(true);
        }
      });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', function () {
        if (MediaQuery.atLeast(_this.options.revealOn)) {
          _this.reveal(true);
        } else {
          _this.reveal(false);
        }
      });
    }
    /**
     * Removes the CSS transition/position classes of the off-canvas content container.
     * Removing the classes is important when another off-canvas gets opened that uses the same content container.
     * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
     * @private
     */

  }, {
    key: "_removeContentClasses",
    value: function _removeContentClasses(hasReveal) {
      if (typeof hasReveal !== 'boolean') {
        this.$content.removeClass(this.contentClasses.base.join(' '));
      } else if (hasReveal === false) {
        this.$content.removeClass("has-reveal-".concat(this.position));
      }
    }
    /**
     * Adds the CSS transition/position classes of the off-canvas content container, based on the opening off-canvas element.
     * Beforehand any transition/position class gets removed.
     * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
     * @private
     */

  }, {
    key: "_addContentClasses",
    value: function _addContentClasses(hasReveal) {
      this._removeContentClasses(hasReveal);

      if (typeof hasReveal !== 'boolean') {
        this.$content.addClass("has-transition-".concat(this.options.transition, " has-position-").concat(this.position));
      } else if (hasReveal === true) {
        this.$content.addClass("has-reveal-".concat(this.position));
      }
    }
    /**
     * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
     * @param {Boolean} isRevealed - true if element should be revealed.
     * @function
     */

  }, {
    key: "reveal",
    value: function reveal(isRevealed) {
      if (isRevealed) {
        this.close();
        this.isRevealed = true;
        this.$element.attr('aria-hidden', 'false');
        this.$element.off('open.zf.trigger toggle.zf.trigger');
        this.$element.removeClass('is-closed');
      } else {
        this.isRevealed = false;
        this.$element.attr('aria-hidden', 'true');
        this.$element.off('open.zf.trigger toggle.zf.trigger').on({
          'open.zf.trigger': this.open.bind(this),
          'toggle.zf.trigger': this.toggle.bind(this)
        });
        this.$element.addClass('is-closed');
      }

      this._addContentClasses(isRevealed);
    }
    /**
     * Stops scrolling of the body when offcanvas is open on mobile Safari and other troublesome browsers.
     * @private
     */

  }, {
    key: "_stopScrolling",
    value: function _stopScrolling(event) {
      return false;
    } // Taken and adapted from http://stackoverflow.com/questions/16889447/prevent-full-page-scrolling-ios
    // Only really works for y, not sure how to extend to x or if we need to.

  }, {
    key: "_recordScrollable",
    value: function _recordScrollable(event) {
      var elem = this; // called from event handler context with this as elem
      // If the element is scrollable (content overflows), then...

      if (elem.scrollHeight !== elem.clientHeight) {
        // If we're at the top, scroll down one pixel to allow scrolling up
        if (elem.scrollTop === 0) {
          elem.scrollTop = 1;
        } // If we're at the bottom, scroll up one pixel to allow scrolling down


        if (elem.scrollTop === elem.scrollHeight - elem.clientHeight) {
          elem.scrollTop = elem.scrollHeight - elem.clientHeight - 1;
        }
      }

      elem.allowUp = elem.scrollTop > 0;
      elem.allowDown = elem.scrollTop < elem.scrollHeight - elem.clientHeight;
      elem.lastY = event.originalEvent.pageY;
    }
  }, {
    key: "_stopScrollPropagation",
    value: function _stopScrollPropagation(event) {
      var elem = this; // called from event handler context with this as elem

      var up = event.pageY < elem.lastY;
      var down = !up;
      elem.lastY = event.pageY;

      if (up && elem.allowUp || down && elem.allowDown) {
        event.stopPropagation();
      } else {
        event.preventDefault();
      }
    }
    /**
     * Opens the off-canvas menu.
     * @function
     * @param {Object} event - Event object passed from listener.
     * @param {jQuery} trigger - element that triggered the off-canvas to open.
     * @fires Offcanvas#opened
     * @todo also trigger 'open' event?
     */

  }, {
    key: "open",
    value: function open(event, trigger) {
      if (this.$element.hasClass('is-open') || this.isRevealed) {
        return;
      }

      var _this = this;

      if (trigger) {
        this.$lastTrigger = trigger;
      }

      if (this.options.forceTo === 'top') {
        window.scrollTo(0, 0);
      } else if (this.options.forceTo === 'bottom') {
        window.scrollTo(0, document.body.scrollHeight);
      }

      if (this.options.transitionTime && this.options.transition !== 'overlap') {
        this.$element.siblings('[data-off-canvas-content]').css('transition-duration', this.options.transitionTime);
      } else {
        this.$element.siblings('[data-off-canvas-content]').css('transition-duration', '');
      }

      this.$element.addClass('is-open').removeClass('is-closed');
      this.$triggers.attr('aria-expanded', 'true');
      this.$element.attr('aria-hidden', 'false');
      this.$content.addClass('is-open-' + this.position); // If `contentScroll` is set to false, add class and disable scrolling on touch devices.

      if (this.options.contentScroll === false) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').addClass('is-off-canvas-open').on('touchmove', this._stopScrolling);
        this.$element.on('touchstart', this._recordScrollable);
        this.$element.on('touchmove', this._stopScrollPropagation);
      }

      if (this.options.contentOverlay === true) {
        this.$overlay.addClass('is-visible');
      }

      if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
        this.$overlay.addClass('is-closable');
      }

      if (this.options.autoFocus === true) {
        this.$element.one(transitionend(this.$element), function () {
          if (!_this.$element.hasClass('is-open')) {
            return; // exit if prematurely closed
          }

          var canvasFocus = _this.$element.find('[data-autofocus]');

          if (canvasFocus.length) {
            canvasFocus.eq(0).focus();
          } else {
            _this.$element.find('a, button').eq(0).focus();
          }
        });
      }

      if (this.options.trapFocus === true) {
        this.$content.attr('tabindex', '-1');
        Keyboard.trapFocus(this.$element);
      }

      this._addContentClasses();
      /**
       * Fires when the off-canvas menu opens.
       * @event Offcanvas#opened
       */


      this.$element.trigger('opened.zf.offcanvas');
    }
    /**
     * Closes the off-canvas menu.
     * @function
     * @param {Function} cb - optional cb to fire after closure.
     * @fires Offcanvas#closed
     */

  }, {
    key: "close",
    value: function close(cb) {
      if (!this.$element.hasClass('is-open') || this.isRevealed) {
        return;
      }

      var _this = this;

      this.$element.removeClass('is-open');
      this.$element.attr('aria-hidden', 'true')
      /**
       * Fires when the off-canvas menu opens.
       * @event Offcanvas#closed
       */
      .trigger('closed.zf.offcanvas');
      this.$content.removeClass('is-open-left is-open-top is-open-right is-open-bottom'); // If `contentScroll` is set to false, remove class and re-enable scrolling on touch devices.

      if (this.options.contentScroll === false) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').removeClass('is-off-canvas-open').off('touchmove', this._stopScrolling);
        this.$element.off('touchstart', this._recordScrollable);
        this.$element.off('touchmove', this._stopScrollPropagation);
      }

      if (this.options.contentOverlay === true) {
        this.$overlay.removeClass('is-visible');
      }

      if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
        this.$overlay.removeClass('is-closable');
      }

      this.$triggers.attr('aria-expanded', 'false');

      if (this.options.trapFocus === true) {
        this.$content.removeAttr('tabindex');
        Keyboard.releaseFocus(this.$element);
      } // Listen to transitionEnd and add class when done.


      this.$element.one(transitionend(this.$element), function (e) {
        _this.$element.addClass('is-closed');

        _this._removeContentClasses();
      });
    }
    /**
     * Toggles the off-canvas menu open or closed.
     * @function
     * @param {Object} event - Event object passed from listener.
     * @param {jQuery} trigger - element that triggered the off-canvas to open.
     */

  }, {
    key: "toggle",
    value: function toggle(event, trigger) {
      if (this.$element.hasClass('is-open')) {
        this.close(event, trigger);
      } else {
        this.open(event, trigger);
      }
    }
    /**
     * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
     * @function
     * @private
     */

  }, {
    key: "_handleKeyboard",
    value: function _handleKeyboard(e) {
      var _this3 = this;

      Keyboard.handleKey(e, 'OffCanvas', {
        close: function close() {
          _this3.close();

          _this3.$lastTrigger.focus();

          return true;
        },
        handled: function handled() {
          e.stopPropagation();
          e.preventDefault();
        }
      });
    }
    /**
     * Destroys the offcanvas plugin.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.close();
      this.$element.off('.zf.trigger .zf.offcanvas');
      this.$overlay.off('.zf.offcanvas');
      if (this.onLoadListener) __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(this.onLoadListener);
    }
  }]);

  return OffCanvas;
}(Plugin);

OffCanvas.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,

  /**
   * Adds an overlay on top of `[data-off-canvas-content]`.
   * @option
   * @type {boolean}
   * @default true
   */
  contentOverlay: true,

  /**
   * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.
   * @option
   * @type {?string}
   * @default null
   */
  contentId: null,

  /**
   * Define the off-canvas element is nested in an off-canvas content. This is required when using the contentId option for a nested element.
   * @option
   * @type {boolean}
   * @default null
   */
  nested: null,

  /**
   * Enable/disable scrolling of the main content when an off canvas panel is open.
   * @option
   * @type {boolean}
   * @default true
   */
  contentScroll: true,

  /**
   * Amount of time in ms the open and close transition requires. If none selected, pulls from body style.
   * @option
   * @type {number}
   * @default null
   */
  transitionTime: null,

  /**
   * Type of transition for the offcanvas menu. Options are 'push', 'detached' or 'slide'.
   * @option
   * @type {string}
   * @default push
   */
  transition: 'push',

  /**
   * Force the page to scroll to top or bottom on open.
   * @option
   * @type {?string}
   * @default null
   */
  forceTo: null,

  /**
   * Allow the offcanvas to remain open for certain breakpoints.
   * @option
   * @type {boolean}
   * @default false
   */
  isRevealed: false,

  /**
   * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.
   * @option
   * @type {?string}
   * @default null
   */
  revealOn: null,

  /**
   * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.
   * @option
   * @type {boolean}
   * @default true
   */
  autoFocus: true,

  /**
   * Class used to force an offcanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.
   * @option
   * @type {string}
   * @default reveal-for-
   * @todo improve the regex testing for this.
   */
  revealClass: 'reveal-for-',

  /**
   * Triggers optional focus trapping when opening an offcanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false
};

/**
 * Orbit module.
 * @module foundation.orbit
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 * @requires foundation.util.timer
 * @requires foundation.util.imageLoader
 * @requires foundation.util.touch
 */

var Orbit =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Orbit, _Plugin);

  function Orbit() {
    _classCallCheck(this, Orbit);

    return _possibleConstructorReturn(this, _getPrototypeOf(Orbit).apply(this, arguments));
  }

  _createClass(Orbit, [{
    key: "_setup",

    /**
    * Creates a new instance of an orbit carousel.
    * @class
    * @name Orbit
    * @param {jQuery} element - jQuery object to make into an Orbit Carousel.
    * @param {Object} options - Overrides to the default plugin settings.
    */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Orbit.defaults, this.$element.data(), options);
      this.className = 'Orbit'; // ie9 back compat

      Touch.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a); // Touch init is idempotent, we just need to make sure it's initialied.

      this._init();

      Keyboard.register('Orbit', {
        'ltr': {
          'ARROW_RIGHT': 'next',
          'ARROW_LEFT': 'previous'
        },
        'rtl': {
          'ARROW_LEFT': 'next',
          'ARROW_RIGHT': 'previous'
        }
      });
    }
    /**
    * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
    * @function
    * @private
    */

  }, {
    key: "_init",
    value: function _init() {
      // @TODO: consider discussion on PR #9278 about DOM pollution by changeSlide
      this._reset();

      this.$wrapper = this.$element.find(".".concat(this.options.containerClass));
      this.$slides = this.$element.find(".".concat(this.options.slideClass));
      var $images = this.$element.find('img'),
          initActive = this.$slides.filter('.is-active'),
          id = this.$element[0].id || GetYoDigits(6, 'orbit');
      this.$element.attr({
        'data-resize': id,
        'id': id
      });

      if (!initActive.length) {
        this.$slides.eq(0).addClass('is-active');
      }

      if (!this.options.useMUI) {
        this.$slides.addClass('no-motionui');
      }

      if ($images.length) {
        onImagesLoaded($images, this._prepareForOrbit.bind(this));
      } else {
        this._prepareForOrbit(); //hehe

      }

      if (this.options.bullets) {
        this._loadBullets();
      }

      this._events();

      if (this.options.autoPlay && this.$slides.length > 1) {
        this.geoSync();
      }

      if (this.options.accessible) {
        // allow wrapper to be focusable to enable arrow navigation
        this.$wrapper.attr('tabindex', 0);
      }
    }
    /**
    * Creates a jQuery collection of bullets, if they are being used.
    * @function
    * @private
    */

  }, {
    key: "_loadBullets",
    value: function _loadBullets() {
      this.$bullets = this.$element.find(".".concat(this.options.boxOfBullets)).find('button');
    }
    /**
    * Sets a `timer` object on the orbit, and starts the counter for the next slide.
    * @function
    */

  }, {
    key: "geoSync",
    value: function geoSync() {
      var _this = this;

      this.timer = new Timer(this.$element, {
        duration: this.options.timerDelay,
        infinite: false
      }, function () {
        _this.changeSlide(true);
      });
      this.timer.start();
    }
    /**
    * Sets wrapper and slide heights for the orbit.
    * @function
    * @private
    */

  }, {
    key: "_prepareForOrbit",
    value: function _prepareForOrbit() {

      this._setWrapperHeight();
    }
    /**
    * Calulates the height of each slide in the collection, and uses the tallest one for the wrapper height.
    * @function
    * @private
    * @param {Function} cb - a callback function to fire when complete.
    */

  }, {
    key: "_setWrapperHeight",
    value: function _setWrapperHeight(cb) {
      //rewrite this to `for` loop
      var max = 0,
          temp,
          counter = 0,
          _this = this;

      this.$slides.each(function () {
        temp = this.getBoundingClientRect().height;
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('data-slide', counter); // hide all slides but the active one

        if (!/mui/g.test(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)[0].className) && _this.$slides.filter('.is-active')[0] !== _this.$slides.eq(counter)[0]) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css({
            'display': 'none'
          });
        }

        max = temp > max ? temp : max;
        counter++;
      });

      if (counter === this.$slides.length) {
        this.$wrapper.css({
          'height': max
        }); //only change the wrapper height property once.

        if (cb) {
          cb(max);
        } //fire callback with max height dimension.

      }
    }
    /**
    * Sets the max-height of each slide.
    * @function
    * @private
    */

  }, {
    key: "_setSlideHeight",
    value: function _setSlideHeight(height) {
      this.$slides.each(function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css('max-height', height);
      });
    }
    /**
    * Adds event listeners to basically everything within the element.
    * @function
    * @private
    */

  }, {
    key: "_events",
    value: function _events() {
      var _this = this; //***************************************
      //**Now using custom event - thanks to:**
      //**      Yohai Ararat of Toronto      **
      //***************************************
      //


      this.$element.off('.resizeme.zf.trigger').on({
        'resizeme.zf.trigger': this._prepareForOrbit.bind(this)
      });

      if (this.$slides.length > 1) {
        if (this.options.swipe) {
          this.$slides.off('swipeleft.zf.orbit swiperight.zf.orbit').on('swipeleft.zf.orbit', function (e) {
            e.preventDefault();

            _this.changeSlide(true);
          }).on('swiperight.zf.orbit', function (e) {
            e.preventDefault();

            _this.changeSlide(false);
          });
        } //***************************************


        if (this.options.autoPlay) {
          this.$slides.on('click.zf.orbit', function () {
            _this.$element.data('clickedOn', _this.$element.data('clickedOn') ? false : true);

            _this.timer[_this.$element.data('clickedOn') ? 'pause' : 'start']();
          });

          if (this.options.pauseOnHover) {
            this.$element.on('mouseenter.zf.orbit', function () {
              _this.timer.pause();
            }).on('mouseleave.zf.orbit', function () {
              if (!_this.$element.data('clickedOn')) {
                _this.timer.start();
              }
            });
          }
        }

        if (this.options.navButtons) {
          var $controls = this.$element.find(".".concat(this.options.nextClass, ", .").concat(this.options.prevClass));
          $controls.attr('tabindex', 0) //also need to handle enter/return and spacebar key presses
          .on('click.zf.orbit touchend.zf.orbit', function (e) {
            e.preventDefault();

            _this.changeSlide(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).hasClass(_this.options.nextClass));
          });
        }

        if (this.options.bullets) {
          this.$bullets.on('click.zf.orbit touchend.zf.orbit', function () {
            if (/is-active/g.test(this.className)) {
              return false;
            } //if this is active, kick out of function.


            var idx = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('slide'),
                ltr = idx > _this.$slides.filter('.is-active').data('slide'),
                $slide = _this.$slides.eq(idx);

            _this.changeSlide(ltr, $slide, idx);
          });
        }

        if (this.options.accessible) {
          this.$wrapper.add(this.$bullets).on('keydown.zf.orbit', function (e) {
            // handle keyboard event with keyboard util
            Keyboard.handleKey(e, 'Orbit', {
              next: function next() {
                _this.changeSlide(true);
              },
              previous: function previous() {
                _this.changeSlide(false);
              },
              handled: function handled() {
                // if bullet is focused, make sure focus moves
                if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).is(_this.$bullets)) {
                  _this.$bullets.filter('.is-active').focus();
                }
              }
            });
          });
        }
      }
    }
    /**
     * Resets Orbit so it can be reinitialized
     */

  }, {
    key: "_reset",
    value: function _reset() {
      // Don't do anything if there are no slides (first run)
      if (typeof this.$slides == 'undefined') {
        return;
      }

      if (this.$slides.length > 1) {
        // Remove old events
        this.$element.off('.zf.orbit').find('*').off('.zf.orbit'); // Restart timer if autoPlay is enabled

        if (this.options.autoPlay) {
          this.timer.restart();
        } // Reset all sliddes


        this.$slides.each(function (el) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).removeClass('is-active is-active is-in').removeAttr('aria-live').hide();
        }); // Show the first slide

        this.$slides.first().addClass('is-active').show(); // Triggers when the slide has finished animating

        this.$element.trigger('slidechange.zf.orbit', [this.$slides.first()]); // Select first bullet if bullets are present

        if (this.options.bullets) {
          this._updateBullets(0);
        }
      }
    }
    /**
    * Changes the current slide to a new one.
    * @function
    * @param {Boolean} isLTR - if true the slide moves from right to left, if false the slide moves from left to right.
    * @param {jQuery} chosenSlide - the jQuery element of the slide to show next, if one is selected.
    * @param {Number} idx - the index of the new slide in its collection, if one chosen.
    * @fires Orbit#slidechange
    */

  }, {
    key: "changeSlide",
    value: function changeSlide(isLTR, chosenSlide, idx) {
      if (!this.$slides) {
        return;
      } // Don't freak out if we're in the middle of cleanup


      var $curSlide = this.$slides.filter('.is-active').eq(0);

      if (/mui/g.test($curSlide[0].className)) {
        return false;
      } //if the slide is currently animating, kick out of the function


      var $firstSlide = this.$slides.first(),
          $lastSlide = this.$slides.last(),
          dirIn = isLTR ? 'Right' : 'Left',
          dirOut = isLTR ? 'Left' : 'Right',
          _this = this,
          $newSlide;

      if (!chosenSlide) {
        //most of the time, this will be auto played or clicked from the navButtons.
        $newSlide = isLTR ? //if wrapping enabled, check to see if there is a `next` or `prev` sibling, if not, select the first or last slide to fill in. if wrapping not enabled, attempt to select `next` or `prev`, if there's nothing there, the function will kick out on next step. CRAZY NESTED TERNARIES!!!!!
        this.options.infiniteWrap ? $curSlide.next(".".concat(this.options.slideClass)).length ? $curSlide.next(".".concat(this.options.slideClass)) : $firstSlide : $curSlide.next(".".concat(this.options.slideClass)) : //pick next slide if moving left to right
        this.options.infiniteWrap ? $curSlide.prev(".".concat(this.options.slideClass)).length ? $curSlide.prev(".".concat(this.options.slideClass)) : $lastSlide : $curSlide.prev(".".concat(this.options.slideClass)); //pick prev slide if moving right to left
      } else {
        $newSlide = chosenSlide;
      }

      if ($newSlide.length) {
        /**
        * Triggers before the next slide starts animating in and only if a next slide has been found.
        * @event Orbit#beforeslidechange
        */
        this.$element.trigger('beforeslidechange.zf.orbit', [$curSlide, $newSlide]);

        if (this.options.bullets) {
          idx = idx || this.$slides.index($newSlide); //grab index to update bullets

          this._updateBullets(idx);
        }

        if (this.options.useMUI && !this.$element.is(':hidden')) {
          Motion.animateIn($newSlide.addClass('is-active'), this.options["animInFrom".concat(dirIn)], function () {
            $newSlide.css({
              'display': 'block'
            }).attr('aria-live', 'polite');
          });
          Motion.animateOut($curSlide.removeClass('is-active'), this.options["animOutTo".concat(dirOut)], function () {
            $curSlide.removeAttr('aria-live');

            if (_this.options.autoPlay && !_this.timer.isPaused) {
              _this.timer.restart();
            } //do stuff?

          });
        } else {
          $curSlide.removeClass('is-active is-in').removeAttr('aria-live').hide();
          $newSlide.addClass('is-active is-in').attr('aria-live', 'polite').show();

          if (this.options.autoPlay && !this.timer.isPaused) {
            this.timer.restart();
          }
        }
        /**
        * Triggers when the slide has finished animating in.
        * @event Orbit#slidechange
        */


        this.$element.trigger('slidechange.zf.orbit', [$newSlide]);
      }
    }
    /**
    * Updates the active state of the bullets, if displayed.
    * @function
    * @private
    * @param {Number} idx - the index of the current slide.
    */

  }, {
    key: "_updateBullets",
    value: function _updateBullets(idx) {
      var $oldBullet = this.$element.find(".".concat(this.options.boxOfBullets)).find('.is-active').removeClass('is-active').blur(),
          span = $oldBullet.find('span:last').detach(),
          $newBullet = this.$bullets.eq(idx).addClass('is-active').append(span);
    }
    /**
    * Destroys the carousel and hides the element.
    * @function
    */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.off('.zf.orbit').find('*').off('.zf.orbit').end().hide();
    }
  }]);

  return Orbit;
}(Plugin);

Orbit.defaults = {
  /**
  * Tells the JS to look for and loadBullets.
  * @option
   * @type {boolean}
  * @default true
  */
  bullets: true,

  /**
  * Tells the JS to apply event listeners to nav buttons
  * @option
   * @type {boolean}
  * @default true
  */
  navButtons: true,

  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-in-right'
  */
  animInFromRight: 'slide-in-right',

  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-out-right'
  */
  animOutToRight: 'slide-out-right',

  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-in-left'
  *
  */
  animInFromLeft: 'slide-in-left',

  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-out-left'
  */
  animOutToLeft: 'slide-out-left',

  /**
  * Allows Orbit to automatically animate on page load.
  * @option
   * @type {boolean}
  * @default true
  */
  autoPlay: true,

  /**
  * Amount of time, in ms, between slide transitions
  * @option
   * @type {number}
  * @default 5000
  */
  timerDelay: 5000,

  /**
  * Allows Orbit to infinitely loop through the slides
  * @option
   * @type {boolean}
  * @default true
  */
  infiniteWrap: true,

  /**
  * Allows the Orbit slides to bind to swipe events for mobile, requires an additional util library
  * @option
   * @type {boolean}
  * @default true
  */
  swipe: true,

  /**
  * Allows the timing function to pause animation on hover.
  * @option
   * @type {boolean}
  * @default true
  */
  pauseOnHover: true,

  /**
  * Allows Orbit to bind keyboard events to the slider, to animate frames with arrow keys
  * @option
   * @type {boolean}
  * @default true
  */
  accessible: true,

  /**
  * Class applied to the container of Orbit
  * @option
   * @type {string}
  * @default 'orbit-container'
  */
  containerClass: 'orbit-container',

  /**
  * Class applied to individual slides.
  * @option
   * @type {string}
  * @default 'orbit-slide'
  */
  slideClass: 'orbit-slide',

  /**
  * Class applied to the bullet container. You're welcome.
  * @option
   * @type {string}
  * @default 'orbit-bullets'
  */
  boxOfBullets: 'orbit-bullets',

  /**
  * Class applied to the `next` navigation button.
  * @option
   * @type {string}
  * @default 'orbit-next'
  */
  nextClass: 'orbit-next',

  /**
  * Class applied to the `previous` navigation button.
  * @option
   * @type {string}
  * @default 'orbit-previous'
  */
  prevClass: 'orbit-previous',

  /**
  * Boolean to flag the js to use motion ui classes or not. Default to true for backwards compatibility.
  * @option
   * @type {boolean}
  * @default true
  */
  useMUI: true
};

var MenuPlugins = {
  dropdown: {
    cssClass: 'dropdown',
    plugin: DropdownMenu
  },
  drilldown: {
    cssClass: 'drilldown',
    plugin: Drilldown
  },
  accordion: {
    cssClass: 'accordion-menu',
    plugin: AccordionMenu
  }
}; // import "foundation.util.triggers.js";

/**
 * ResponsiveMenu module.
 * @module foundation.responsiveMenu
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */

var ResponsiveMenu =
/*#__PURE__*/
function (_Plugin) {
  _inherits(ResponsiveMenu, _Plugin);

  function ResponsiveMenu() {
    _classCallCheck(this, ResponsiveMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(ResponsiveMenu).apply(this, arguments));
  }

  _createClass(ResponsiveMenu, [{
    key: "_setup",

    /**
     * Creates a new instance of a responsive menu.
     * @class
     * @name ResponsiveMenu
     * @fires ResponsiveMenu#init
     * @param {jQuery} element - jQuery object to make into a dropdown menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element);
      this.rules = this.$element.data('responsive-menu');
      this.currentMq = null;
      this.currentPlugin = null;
      this.className = 'ResponsiveMenu'; // ie9 back compat

      this._init();

      this._events();
    }
    /**
     * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
     * @function
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      MediaQuery._init(); // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules


      if (typeof this.rules === 'string') {
        var rulesTree = {}; // Parse rules from "classes" pulled from data attribute

        var rules = this.rules.split(' '); // Iterate through every rule found

        for (var i = 0; i < rules.length; i++) {
          var rule = rules[i].split('-');
          var ruleSize = rule.length > 1 ? rule[0] : 'small';
          var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

          if (MenuPlugins[rulePlugin] !== null) {
            rulesTree[ruleSize] = MenuPlugins[rulePlugin];
          }
        }

        this.rules = rulesTree;
      }

      if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.isEmptyObject(this.rules)) {
        this._checkMediaQueries();
      } // Add data-mutate since children may need it.


      this.$element.attr('data-mutate', this.$element.attr('data-mutate') || GetYoDigits(6, 'responsive-menu'));
    }
    /**
     * Initializes events for the Menu.
     * @function
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', function () {
        _this._checkMediaQueries();
      }); // $(window).on('resize.zf.ResponsiveMenu', function() {
      //   _this._checkMediaQueries();
      // });
    }
    /**
     * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
     * @function
     * @private
     */

  }, {
    key: "_checkMediaQueries",
    value: function _checkMediaQueries() {
      var matchedMq,
          _this = this; // Iterate through each rule and find the last matching rule


      __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(this.rules, function (key) {
        if (MediaQuery.atLeast(key)) {
          matchedMq = key;
        }
      }); // No match? No dice

      if (!matchedMq) return; // Plugin already initialized? We good

      if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return; // Remove existing plugin-specific CSS classes

      __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(MenuPlugins, function (key, value) {
        _this.$element.removeClass(value.cssClass);
      }); // Add the CSS class for the new plugin

      this.$element.addClass(this.rules[matchedMq].cssClass); // Create an instance of the new plugin

      if (this.currentPlugin) this.currentPlugin.destroy();
      this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
    }
    /**
     * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.currentPlugin.destroy();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('.zf.ResponsiveMenu');
    }
  }]);

  return ResponsiveMenu;
}(Plugin);

ResponsiveMenu.defaults = {};

/**
 * ResponsiveToggle module.
 * @module foundation.responsiveToggle
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion
 */

var ResponsiveToggle =
/*#__PURE__*/
function (_Plugin) {
  _inherits(ResponsiveToggle, _Plugin);

  function ResponsiveToggle() {
    _classCallCheck(this, ResponsiveToggle);

    return _possibleConstructorReturn(this, _getPrototypeOf(ResponsiveToggle).apply(this, arguments));
  }

  _createClass(ResponsiveToggle, [{
    key: "_setup",

    /**
     * Creates a new instance of Tab Bar.
     * @class
     * @name ResponsiveToggle
     * @fires ResponsiveToggle#init
     * @param {jQuery} element - jQuery object to attach tab bar functionality to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element);
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);
      this.className = 'ResponsiveToggle'; // ie9 back compat

      this._init();

      this._events();
    }
    /**
     * Initializes the tab bar by finding the target element, toggling element, and running update().
     * @function
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      MediaQuery._init();

      var targetID = this.$element.data('responsive-toggle');

      if (!targetID) {
        console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');
      }

      this.$targetMenu = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat(targetID));
      this.$toggler = this.$element.find('[data-toggle]').filter(function () {
        var target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle');
        return target === targetID || target === "";
      });
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, this.options, this.$targetMenu.data()); // If they were set, parse the animation classes

      if (this.options.animate) {
        var input = this.options.animate.split(' ');
        this.animationIn = input[0];
        this.animationOut = input[1] || null;
      }

      this._update();
    }
    /**
     * Adds necessary event handlers for the tab bar to work.
     * @function
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {

      this._updateMqHandler = this._update.bind(this);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._updateMqHandler);
      this.$toggler.on('click.zf.responsiveToggle', this.toggleMenu.bind(this));
    }
    /**
     * Checks the current media query to determine if the tab bar should be visible or hidden.
     * @function
     * @private
     */

  }, {
    key: "_update",
    value: function _update() {
      // Mobile
      if (!MediaQuery.atLeast(this.options.hideFor)) {
        this.$element.show();
        this.$targetMenu.hide();
      } // Desktop
      else {
          this.$element.hide();
          this.$targetMenu.show();
        }
    }
    /**
     * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
     * @function
     * @fires ResponsiveToggle#toggled
     */

  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      var _this2 = this;

      if (!MediaQuery.atLeast(this.options.hideFor)) {
        /**
         * Fires when the element attached to the tab bar toggles.
         * @event ResponsiveToggle#toggled
         */
        if (this.options.animate) {
          if (this.$targetMenu.is(':hidden')) {
            Motion.animateIn(this.$targetMenu, this.animationIn, function () {
              _this2.$element.trigger('toggled.zf.responsiveToggle');

              _this2.$targetMenu.find('[data-mutate]').triggerHandler('mutateme.zf.trigger');
            });
          } else {
            Motion.animateOut(this.$targetMenu, this.animationOut, function () {
              _this2.$element.trigger('toggled.zf.responsiveToggle');
            });
          }
        } else {
          this.$targetMenu.toggle(0);
          this.$targetMenu.find('[data-mutate]').trigger('mutateme.zf.trigger');
          this.$element.trigger('toggled.zf.responsiveToggle');
        }
      }
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.off('.zf.responsiveToggle');
      this.$toggler.off('.zf.responsiveToggle');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('changed.zf.mediaquery', this._updateMqHandler);
    }
  }]);

  return ResponsiveToggle;
}(Plugin);

ResponsiveToggle.defaults = {
  /**
   * The breakpoint after which the menu is always shown, and the tab bar is hidden.
   * @option
   * @type {string}
   * @default 'medium'
   */
  hideFor: 'medium',

  /**
   * To decide if the toggle should be animated or not.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};

/**
 * Reveal module.
 * @module foundation.reveal
 * @requires foundation.util.keyboard
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion if using animations
 */

var Reveal =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Reveal, _Plugin);

  function Reveal() {
    _classCallCheck(this, Reveal);

    return _possibleConstructorReturn(this, _getPrototypeOf(Reveal).apply(this, arguments));
  }

  _createClass(Reveal, [{
    key: "_setup",

    /**
     * Creates a new instance of Reveal.
     * @class
     * @name Reveal
     * @param {jQuery} element - jQuery object to use for the modal.
     * @param {Object} options - optional parameters.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Reveal.defaults, this.$element.data(), options);
      this.className = 'Reveal'; // ie9 back compat

      this._init(); // Triggers init is idempotent, just need to make sure it is initialized


      Triggers.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);
      Keyboard.register('Reveal', {
        'ESCAPE': 'close'
      });
    }
    /**
     * Initializes the modal by adding the overlay and close buttons, (if selected).
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var _this2 = this;

      MediaQuery._init();

      this.id = this.$element.attr('id');
      this.isActive = false;
      this.cached = {
        mq: MediaQuery.current
      };
      this.$anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("[data-open=\"".concat(this.id, "\"]")).length ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()("[data-open=\"".concat(this.id, "\"]")) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()("[data-toggle=\"".concat(this.id, "\"]"));
      this.$anchor.attr({
        'aria-controls': this.id,
        'aria-haspopup': true,
        'tabindex': 0
      });

      if (this.options.fullScreen || this.$element.hasClass('full')) {
        this.options.fullScreen = true;
        this.options.overlay = false;
      }

      if (this.options.overlay && !this.$overlay) {
        this.$overlay = this._makeOverlay(this.id);
      }

      this.$element.attr({
        'role': 'dialog',
        'aria-hidden': true,
        'data-yeti-box': this.id,
        'data-resize': this.id
      });

      if (this.$overlay) {
        this.$element.detach().appendTo(this.$overlay);
      } else {
        this.$element.detach().appendTo(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.appendTo));
        this.$element.addClass('without-overlay');
      }

      this._events();

      if (this.options.deepLink && window.location.hash === "#".concat(this.id)) {
        this.onLoadListener = onLoad(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window), function () {
          return _this2.open();
        });
      }
    }
    /**
     * Creates an overlay div to display behind the modal.
     * @private
     */

  }, {
    key: "_makeOverlay",
    value: function _makeOverlay() {
      var additionalOverlayClasses = '';

      if (this.options.additionalOverlayClasses) {
        additionalOverlayClasses = ' ' + this.options.additionalOverlayClasses;
      }

      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div></div>').addClass('reveal-overlay' + additionalOverlayClasses).appendTo(this.options.appendTo);
    }
    /**
     * Updates position of modal
     * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
     * @private
     */

  }, {
    key: "_updatePosition",
    value: function _updatePosition() {
      var width = this.$element.outerWidth();
      var outerWidth = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).width();
      var height = this.$element.outerHeight();
      var outerHeight = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height();
      var left,
          top = null;

      if (this.options.hOffset === 'auto') {
        left = parseInt((outerWidth - width) / 2, 10);
      } else {
        left = parseInt(this.options.hOffset, 10);
      }

      if (this.options.vOffset === 'auto') {
        if (height > outerHeight) {
          top = parseInt(Math.min(100, outerHeight / 10), 10);
        } else {
          top = parseInt((outerHeight - height) / 4, 10);
        }
      } else if (this.options.vOffset !== null) {
        top = parseInt(this.options.vOffset, 10);
      }

      if (top !== null) {
        this.$element.css({
          top: top + 'px'
        });
      } // only worry about left if we don't have an overlay or we have a horizontal offset,
      // otherwise we're perfectly in the middle


      if (!this.$overlay || this.options.hOffset !== 'auto') {
        this.$element.css({
          left: left + 'px'
        });
        this.$element.css({
          margin: '0px'
        });
      }
    }
    /**
     * Adds event handlers for the modal.
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this3 = this;

      var _this = this;

      this.$element.on({
        'open.zf.trigger': this.open.bind(this),
        'close.zf.trigger': function closeZfTrigger(event, $element) {
          if (event.target === _this.$element[0] || __WEBPACK_IMPORTED_MODULE_0_jquery___default()(event.target).parents('[data-closable]')[0] === $element) {
            // only close reveal when it's explicitly called
            return _this3.close.apply(_this3);
          }
        },
        'toggle.zf.trigger': this.toggle.bind(this),
        'resizeme.zf.trigger': function resizemeZfTrigger() {
          _this._updatePosition();
        }
      });

      if (this.options.closeOnClick && this.options.overlay) {
        this.$overlay.off('.zf.reveal').on('click.zf.reveal', function (e) {
          if (e.target === _this.$element[0] || __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(_this.$element[0], e.target) || !__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(document, e.target)) {
            return;
          }

          _this.close();
        });
      }

      if (this.options.deepLink) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on("hashchange.zf.reveal:".concat(this.id), this._handleState.bind(this));
      }
    }
    /**
     * Handles modal methods on back/forward button clicks or any other event that triggers hashchange.
     * @private
     */

  }, {
    key: "_handleState",
    value: function _handleState(e) {
      if (window.location.hash === '#' + this.id && !this.isActive) {
        this.open();
      } else {
        this.close();
      }
    }
    /**
    * Disables the scroll when Reveal is shown to prevent the background from shifting
    * @param {number} scrollTop - Scroll to visually apply, window current scroll by default
    */

  }, {
    key: "_disableScroll",
    value: function _disableScroll(scrollTop) {
      scrollTop = scrollTop || __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop();

      if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).height() > __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height()) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()("html").css("top", -scrollTop);
      }
    }
    /**
    * Reenables the scroll when Reveal closes
    * @param {number} scrollTop - Scroll to restore, html "top" property by default (as set by `_disableScroll`)
    */

  }, {
    key: "_enableScroll",
    value: function _enableScroll(scrollTop) {
      scrollTop = scrollTop || parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()("html").css("top"));

      if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).height() > __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height()) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()("html").css("top", "");
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop(-scrollTop);
      }
    }
    /**
     * Opens the modal controlled by `this.$anchor`, and closes all others by default.
     * @function
     * @fires Reveal#closeme
     * @fires Reveal#open
     */

  }, {
    key: "open",
    value: function open() {
      var _this4 = this;

      // either update or replace browser history
      var hash = "#".concat(this.id);

      if (this.options.deepLink && window.location.hash !== hash) {
        if (window.history.pushState) {
          if (this.options.updateHistory) {
            window.history.pushState({}, '', hash);
          } else {
            window.history.replaceState({}, '', hash);
          }
        } else {
          window.location.hash = hash;
        }
      } // Remember anchor that opened it to set focus back later, have general anchors as fallback


      this.$activeAnchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.activeElement).is(this.$anchor) ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.activeElement) : this.$anchor;
      this.isActive = true; // Make elements invisible, but remove display: none so we can get size and positioning

      this.$element.css({
        'visibility': 'hidden'
      }).show().scrollTop(0);

      if (this.options.overlay) {
        this.$overlay.css({
          'visibility': 'hidden'
        }).show();
      }

      this._updatePosition();

      this.$element.hide().css({
        'visibility': ''
      });

      if (this.$overlay) {
        this.$overlay.css({
          'visibility': ''
        }).hide();

        if (this.$element.hasClass('fast')) {
          this.$overlay.addClass('fast');
        } else if (this.$element.hasClass('slow')) {
          this.$overlay.addClass('slow');
        }
      }

      if (!this.options.multipleOpened) {
        /**
         * Fires immediately before the modal opens.
         * Closes any other modals that are currently open
         * @event Reveal#closeme
         */
        this.$element.trigger('closeme.zf.reveal', this.id);
      }

      this._disableScroll();

      var _this = this; // Motion UI method of reveal


      if (this.options.animationIn) {
        var afterAnimation = function afterAnimation() {
          _this.$element.attr({
            'aria-hidden': false,
            'tabindex': -1
          }).focus();

          _this._addGlobalClasses();

          Keyboard.trapFocus(_this.$element);
        };

        if (this.options.overlay) {
          Motion.animateIn(this.$overlay, 'fade-in');
        }

        Motion.animateIn(this.$element, this.options.animationIn, function () {
          if (_this4.$element) {
            // protect against object having been removed
            _this4.focusableElements = Keyboard.findFocusable(_this4.$element);
            afterAnimation();
          }
        });
      } // jQuery method of reveal
      else {
          if (this.options.overlay) {
            this.$overlay.show(0);
          }

          this.$element.show(this.options.showDelay);
        } // handle accessibility


      this.$element.attr({
        'aria-hidden': false,
        'tabindex': -1
      }).focus();
      Keyboard.trapFocus(this.$element);

      this._addGlobalClasses();

      this._addGlobalListeners();
      /**
       * Fires when the modal has successfully opened.
       * @event Reveal#open
       */


      this.$element.trigger('open.zf.reveal');
    }
    /**
     * Adds classes and listeners on document required by open modals.
     *
     * The following classes are added and updated:
     * - `.is-reveal-open` - Prevents the scroll on document
     * - `.zf-has-scroll`  - Displays a disabled scrollbar on document if required like if the
     *                       scroll was not disabled. This prevent a "shift" of the page content due
     *                       the scrollbar disappearing when the modal opens.
     *
     * @private
     */

  }, {
    key: "_addGlobalClasses",
    value: function _addGlobalClasses() {
      var updateScrollbarClass = function updateScrollbarClass() {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html').toggleClass('zf-has-scroll', !!(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).height() > __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height()));
      };

      this.$element.on('resizeme.zf.trigger.revealScrollbarListener', function () {
        return updateScrollbarClass();
      });
      updateScrollbarClass();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html').addClass('is-reveal-open');
    }
    /**
     * Removes classes and listeners on document that were required by open modals.
     * @private
     */

  }, {
    key: "_removeGlobalClasses",
    value: function _removeGlobalClasses() {
      this.$element.off('resizeme.zf.trigger.revealScrollbarListener');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html').removeClass('is-reveal-open');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html').removeClass('zf-has-scroll');
    }
    /**
     * Adds extra event handlers for the body and window if necessary.
     * @private
     */

  }, {
    key: "_addGlobalListeners",
    value: function _addGlobalListeners() {
      var _this = this;

      if (!this.$element) {
        return;
      } // If we're in the middle of cleanup, don't freak out


      this.focusableElements = Keyboard.findFocusable(this.$element);

      if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').on('click.zf.reveal', function (e) {
          if (e.target === _this.$element[0] || __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(_this.$element[0], e.target) || !__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(document, e.target)) {
            return;
          }

          _this.close();
        });
      }

      if (this.options.closeOnEsc) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('keydown.zf.reveal', function (e) {
          Keyboard.handleKey(e, 'Reveal', {
            close: function close() {
              if (_this.options.closeOnEsc) {
                _this.close();
              }
            }
          });
        });
      }
    }
    /**
     * Closes the modal.
     * @function
     * @fires Reveal#closed
     */

  }, {
    key: "close",
    value: function close() {
      if (!this.isActive || !this.$element.is(':visible')) {
        return false;
      }

      var _this = this; // Motion UI method of hiding


      if (this.options.animationOut) {
        if (this.options.overlay) {
          Motion.animateOut(this.$overlay, 'fade-out');
        }

        Motion.animateOut(this.$element, this.options.animationOut, finishUp);
      } // jQuery method of hiding
      else {
          this.$element.hide(this.options.hideDelay);

          if (this.options.overlay) {
            this.$overlay.hide(0, finishUp);
          } else {
            finishUp();
          }
        } // Conditionals to remove extra event listeners added on open


      if (this.options.closeOnEsc) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('keydown.zf.reveal');
      }

      if (!this.options.overlay && this.options.closeOnClick) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').off('click.zf.reveal');
      }

      this.$element.off('keydown.zf.reveal');

      function finishUp() {
        // Get the current top before the modal is closed and restore the scroll after.
        // TODO: use component properties instead of HTML properties
        // See https://github.com/zurb/foundation-sites/pull/10786
        var scrollTop = parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()("html").css("top"));

        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.reveal:visible').length === 0) {
          _this._removeGlobalClasses(); // also remove .is-reveal-open from the html element when there is no opened reveal

        }

        Keyboard.releaseFocus(_this.$element);

        _this.$element.attr('aria-hidden', true);

        _this._enableScroll(scrollTop);
        /**
        * Fires when the modal is done closing.
        * @event Reveal#closed
        */


        _this.$element.trigger('closed.zf.reveal');
      }
      /**
      * Resets the modal content
      * This prevents a running video to keep going in the background
      */


      if (this.options.resetOnClose) {
        this.$element.html(this.$element.html());
      }

      this.isActive = false; // If deepLink and we did not switched to an other modal...

      if (_this.options.deepLink && window.location.hash === "#".concat(this.id)) {
        // Remove the history hash
        if (window.history.replaceState) {
          var urlWithoutHash = window.location.pathname + window.location.search;

          if (this.options.updateHistory) {
            window.history.pushState({}, '', urlWithoutHash); // remove the hash
          } else {
            window.history.replaceState('', document.title, urlWithoutHash);
          }
        } else {
          window.location.hash = '';
        }
      }

      this.$activeAnchor.focus();
    }
    /**
     * Toggles the open/closed state of a modal.
     * @function
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isActive) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: "_destroy",

    /**
     * Destroys an instance of a modal.
     * @function
     */
    value: function _destroy() {
      if (this.options.overlay) {
        this.$element.appendTo(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.appendTo)); // move $element outside of $overlay to prevent error unregisterPlugin()

        this.$overlay.hide().off().remove();
      }

      this.$element.hide().off();
      this.$anchor.off('.zf');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(".zf.reveal:".concat(this.id));
      if (this.onLoadListener) __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(this.onLoadListener);

      if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.reveal:visible').length === 0) {
        this._removeGlobalClasses(); // also remove .is-reveal-open from the html element when there is no opened reveal

      }
    }
  }]);

  return Reveal;
}(Plugin);

Reveal.defaults = {
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
  animationIn: '',

  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
  animationOut: '',

  /**
   * Time, in ms, to delay the opening of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
  showDelay: 0,

  /**
   * Time, in ms, to delay the closing of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
  hideDelay: 0,

  /**
   * Allows a click on the body/overlay to close the modal.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,

  /**
   * Allows the modal to close if the user presses the `ESCAPE` key.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnEsc: true,

  /**
   * If true, allows multiple modals to be displayed at once.
   * @option
   * @type {boolean}
   * @default false
   */
  multipleOpened: false,

  /**
   * Distance, in pixels, the modal should push down from the top of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
  vOffset: 'auto',

  /**
   * Distance, in pixels, the modal should push in from the side of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
  hOffset: 'auto',

  /**
   * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
   * @option
   * @type {boolean}
   * @default false
   */
  fullScreen: false,

  /**
   * Allows the modal to generate an overlay div, which will cover the view when modal opens.
   * @option
   * @type {boolean}
   * @default true
   */
  overlay: true,

  /**
   * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
   * @option
   * @type {boolean}
   * @default false
   */
  resetOnClose: false,

  /**
   * Link the location hash to the modal.
   * Set the location hash when the modal is opened/closed, and open/close the modal when the location changes.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * If `deepLink` is enabled, update the browser history with the open modal
   * @option
   * @default false
   */
  updateHistory: false,

  /**
  * Allows the modal to append to custom div.
  * @option
  * @type {string}
  * @default "body"
  */
  appendTo: "body",

  /**
   * Allows adding additional class names to the reveal overlay.
   * @option
   * @type {string}
   * @default ''
   */
  additionalOverlayClasses: ''
};

/**
 * Slider module.
 * @module foundation.slider
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 * @requires foundation.util.keyboard
 * @requires foundation.util.touch
 */

var Slider =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Slider, _Plugin);

  function Slider() {
    _classCallCheck(this, Slider);

    return _possibleConstructorReturn(this, _getPrototypeOf(Slider).apply(this, arguments));
  }

  _createClass(Slider, [{
    key: "_setup",

    /**
     * Creates a new instance of a slider control.
     * @class
     * @name Slider
     * @param {jQuery} element - jQuery object to make into a slider control.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Slider.defaults, this.$element.data(), options);
      this.className = 'Slider'; // ie9 back compat
      // Touch and Triggers inits are idempotent, we just need to make sure it's initialied.

      Touch.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);
      Triggers.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

      this._init();

      Keyboard.register('Slider', {
        'ltr': {
          'ARROW_RIGHT': 'increase',
          'ARROW_UP': 'increase',
          'ARROW_DOWN': 'decrease',
          'ARROW_LEFT': 'decrease',
          'SHIFT_ARROW_RIGHT': 'increase_fast',
          'SHIFT_ARROW_UP': 'increase_fast',
          'SHIFT_ARROW_DOWN': 'decrease_fast',
          'SHIFT_ARROW_LEFT': 'decrease_fast',
          'HOME': 'min',
          'END': 'max'
        },
        'rtl': {
          'ARROW_LEFT': 'increase',
          'ARROW_RIGHT': 'decrease',
          'SHIFT_ARROW_LEFT': 'increase_fast',
          'SHIFT_ARROW_RIGHT': 'decrease_fast'
        }
      });
    }
    /**
     * Initilizes the plugin by reading/setting attributes, creating collections and setting the initial position of the handle(s).
     * @function
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      this.inputs = this.$element.find('input');
      this.handles = this.$element.find('[data-slider-handle]');
      this.$handle = this.handles.eq(0);
      this.$input = this.inputs.length ? this.inputs.eq(0) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat(this.$handle.attr('aria-controls')));
      this.$fill = this.$element.find('[data-slider-fill]').css(this.options.vertical ? 'height' : 'width', 0);

      if (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) {
        this.options.disabled = true;
        this.$element.addClass(this.options.disabledClass);
      }

      if (!this.inputs.length) {
        this.inputs = __WEBPACK_IMPORTED_MODULE_0_jquery___default()().add(this.$input);
        this.options.binding = true;
      }

      this._setInitAttr(0);

      if (this.handles[1]) {
        this.options.doubleSided = true;
        this.$handle2 = this.handles.eq(1);
        this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat(this.$handle2.attr('aria-controls')));

        if (!this.inputs[1]) {
          this.inputs = this.inputs.add(this.$input2);
        }

        this._setInitAttr(1);
      } // Set handle positions


      this.setHandles();

      this._events();
    }
  }, {
    key: "setHandles",
    value: function setHandles() {
      var _this2 = this;

      if (this.handles[1]) {
        this._setHandlePos(this.$handle, this.inputs.eq(0).val(), true, function () {
          _this2._setHandlePos(_this2.$handle2, _this2.inputs.eq(1).val(), true);
        });
      } else {
        this._setHandlePos(this.$handle, this.inputs.eq(0).val(), true);
      }
    }
  }, {
    key: "_reflow",
    value: function _reflow() {
      this.setHandles();
    }
    /**
    * @function
    * @private
    * @param {Number} value - floating point (the value) to be transformed using to a relative position on the slider (the inverse of _value)
    */

  }, {
    key: "_pctOfBar",
    value: function _pctOfBar(value) {
      var pctOfBar = percent(value - this.options.start, this.options.end - this.options.start);

      switch (this.options.positionValueFunction) {
        case "pow":
          pctOfBar = this._logTransform(pctOfBar);
          break;

        case "log":
          pctOfBar = this._powTransform(pctOfBar);
          break;
      }

      return pctOfBar.toFixed(2);
    }
    /**
    * @function
    * @private
    * @param {Number} pctOfBar - floating point, the relative position of the slider (typically between 0-1) to be transformed to a value
    */

  }, {
    key: "_value",
    value: function _value(pctOfBar) {
      switch (this.options.positionValueFunction) {
        case "pow":
          pctOfBar = this._powTransform(pctOfBar);
          break;

        case "log":
          pctOfBar = this._logTransform(pctOfBar);
          break;
      }

      var value = (this.options.end - this.options.start) * pctOfBar + parseFloat(this.options.start);
      return value;
    }
    /**
    * @function
    * @private
    * @param {Number} value - floating point (typically between 0-1) to be transformed using the log function
    */

  }, {
    key: "_logTransform",
    value: function _logTransform(value) {
      return baseLog(this.options.nonLinearBase, value * (this.options.nonLinearBase - 1) + 1);
    }
    /**
    * @function
    * @private
    * @param {Number} value - floating point (typically between 0-1) to be transformed using the power function
    */

  }, {
    key: "_powTransform",
    value: function _powTransform(value) {
      return (Math.pow(this.options.nonLinearBase, value) - 1) / (this.options.nonLinearBase - 1);
    }
    /**
     * Sets the position of the selected handle and fill bar.
     * @function
     * @private
     * @param {jQuery} $hndl - the selected handle to move.
     * @param {Number} location - floating point between the start and end values of the slider bar.
     * @param {Function} cb - callback function to fire on completion.
     * @fires Slider#moved
     * @fires Slider#changed
     */

  }, {
    key: "_setHandlePos",
    value: function _setHandlePos($hndl, location, noInvert, cb) {
      // don't move if the slider has been disabled since its initialization
      if (this.$element.hasClass(this.options.disabledClass)) {
        return;
      } //might need to alter that slightly for bars that will have odd number selections.


      location = parseFloat(location); //on input change events, convert string to number...grumble.
      // prevent slider from running out of bounds, if value exceeds the limits set through options, override the value to min/max

      if (location < this.options.start) {
        location = this.options.start;
      } else if (location > this.options.end) {
        location = this.options.end;
      }

      var isDbl = this.options.doubleSided; //this is for single-handled vertical sliders, it adjusts the value to account for the slider being "upside-down"
      //for click and drag events, it's weird due to the scale(-1, 1) css property

      if (this.options.vertical && !noInvert) {
        location = this.options.end - location;
      }

      if (isDbl) {
        //this block is to prevent 2 handles from crossing eachother. Could/should be improved.
        if (this.handles.index($hndl) === 0) {
          var h2Val = parseFloat(this.$handle2.attr('aria-valuenow'));
          location = location >= h2Val ? h2Val - this.options.step : location;
        } else {
          var h1Val = parseFloat(this.$handle.attr('aria-valuenow'));
          location = location <= h1Val ? h1Val + this.options.step : location;
        }
      }

      var _this = this,
          vert = this.options.vertical,
          hOrW = vert ? 'height' : 'width',
          lOrT = vert ? 'top' : 'left',
          handleDim = $hndl[0].getBoundingClientRect()[hOrW],
          elemDim = this.$element[0].getBoundingClientRect()[hOrW],
          //percentage of bar min/max value based on click or drag point
      pctOfBar = this._pctOfBar(location),
          //number of actual pixels to shift the handle, based on the percentage obtained above
      pxToMove = (elemDim - handleDim) * pctOfBar,
          //percentage of bar to shift the handle
      movement = (percent(pxToMove, elemDim) * 100).toFixed(this.options.decimal); //fixing the decimal value for the location number, is passed to other methods as a fixed floating-point value


      location = parseFloat(location.toFixed(this.options.decimal)); // declare empty object for css adjustments, only used with 2 handled-sliders

      var css = {};

      this._setValues($hndl, location); // TODO update to calculate based on values set to respective inputs??


      if (isDbl) {
        var isLeftHndl = this.handles.index($hndl) === 0,
            //empty variable, will be used for min-height/width for fill bar
        dim,
            //percentage w/h of the handle compared to the slider bar
        handlePct = ~~(percent(handleDim, elemDim) * 100); //if left handle, the math is slightly different than if it's the right handle, and the left/top property needs to be changed for the fill bar

        if (isLeftHndl) {
          //left or top percentage value to apply to the fill bar.
          css[lOrT] = "".concat(movement, "%"); //calculate the new min-height/width for the fill bar.

          dim = parseFloat(this.$handle2[0].style[lOrT]) - movement + handlePct; //this callback is necessary to prevent errors and allow the proper placement and initialization of a 2-handled slider
          //plus, it means we don't care if 'dim' isNaN on init, it won't be in the future.

          if (cb && typeof cb === 'function') {
            cb();
          } //this is only needed for the initialization of 2 handled sliders

        } else {
          //just caching the value of the left/bottom handle's left/top property
          var handlePos = parseFloat(this.$handle[0].style[lOrT]); //calculate the new min-height/width for the fill bar. Use isNaN to prevent false positives for numbers <= 0
          //based on the percentage of movement of the handle being manipulated, less the opposing handle's left/top position, plus the percentage w/h of the handle itself

          dim = movement - (isNaN(handlePos) ? (this.options.initialStart - this.options.start) / ((this.options.end - this.options.start) / 100) : handlePos) + handlePct;
        } // assign the min-height/width to our css object


        css["min-".concat(hOrW)] = "".concat(dim, "%");
      }

      this.$element.one('finished.zf.animate', function () {
        /**
         * Fires when the handle is done moving.
         * @event Slider#moved
         */
        _this.$element.trigger('moved.zf.slider', [$hndl]);
      }); //because we don't know exactly how the handle will be moved, check the amount of time it should take to move.

      var moveTime = this.$element.data('dragging') ? 1000 / 60 : this.options.moveTime;
      Move(moveTime, $hndl, function () {
        // adjusting the left/top property of the handle, based on the percentage calculated above
        // if movement isNaN, that is because the slider is hidden and we cannot determine handle width,
        // fall back to next best guess.
        if (isNaN(movement)) {
          $hndl.css(lOrT, "".concat(pctOfBar * 100, "%"));
        } else {
          $hndl.css(lOrT, "".concat(movement, "%"));
        }

        if (!_this.options.doubleSided) {
          //if single-handled, a simple method to expand the fill bar
          _this.$fill.css(hOrW, "".concat(pctOfBar * 100, "%"));
        } else {
          //otherwise, use the css object we created above
          _this.$fill.css(css);
        }
      });
      /**
       * Fires when the value has not been change for a given time.
       * @event Slider#changed
       */

      clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        _this.$element.trigger('changed.zf.slider', [$hndl]);
      }, _this.options.changedDelay);
    }
    /**
     * Sets the initial attribute for the slider element.
     * @function
     * @private
     * @param {Number} idx - index of the current handle/input to use.
     */

  }, {
    key: "_setInitAttr",
    value: function _setInitAttr(idx) {
      var initVal = idx === 0 ? this.options.initialStart : this.options.initialEnd;
      var id = this.inputs.eq(idx).attr('id') || GetYoDigits(6, 'slider');
      this.inputs.eq(idx).attr({
        'id': id,
        'max': this.options.end,
        'min': this.options.start,
        'step': this.options.step
      });
      this.inputs.eq(idx).val(initVal);
      this.handles.eq(idx).attr({
        'role': 'slider',
        'aria-controls': id,
        'aria-valuemax': this.options.end,
        'aria-valuemin': this.options.start,
        'aria-valuenow': initVal,
        'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal',
        'tabindex': 0
      });
    }
    /**
     * Sets the input and `aria-valuenow` values for the slider element.
     * @function
     * @private
     * @param {jQuery} $handle - the currently selected handle.
     * @param {Number} val - floating point of the new value.
     */

  }, {
    key: "_setValues",
    value: function _setValues($handle, val) {
      var idx = this.options.doubleSided ? this.handles.index($handle) : 0;
      this.inputs.eq(idx).val(val);
      $handle.attr('aria-valuenow', val);
    }
    /**
     * Handles events on the slider element.
     * Calculates the new location of the current handle.
     * If there are two handles and the bar was clicked, it determines which handle to move.
     * @function
     * @private
     * @param {Object} e - the `event` object passed from the listener.
     * @param {jQuery} $handle - the current handle to calculate for, if selected.
     * @param {Number} val - floating point number for the new value of the slider.
     * TODO clean this up, there's a lot of repeated code between this and the _setHandlePos fn.
     */

  }, {
    key: "_handleEvent",
    value: function _handleEvent(e, $handle, val) {
      var value, hasVal;

      if (!val) {
        //click or drag events
        e.preventDefault();

        var _this = this,
            vertical = this.options.vertical,
            param = vertical ? 'height' : 'width',
            direction = vertical ? 'top' : 'left',
            eventOffset = vertical ? e.pageY : e.pageX,
            halfOfHandle = this.$handle[0].getBoundingClientRect()[param] / 2,
            barDim = this.$element[0].getBoundingClientRect()[param],
            windowScroll = vertical ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollLeft();

        var elemOffset = this.$element.offset()[direction]; // touch events emulated by the touch util give position relative to screen, add window.scroll to event coordinates...
        // best way to guess this is simulated is if clientY == pageY

        if (e.clientY === e.pageY) {
          eventOffset = eventOffset + windowScroll;
        }

        var eventFromBar = eventOffset - elemOffset;
        var barXY;

        if (eventFromBar < 0) {
          barXY = 0;
        } else if (eventFromBar > barDim) {
          barXY = barDim;
        } else {
          barXY = eventFromBar;
        }

        var offsetPct = percent(barXY, barDim);
        value = this._value(offsetPct); // turn everything around for RTL, yay math!

        if (rtl() && !this.options.vertical) {
          value = this.options.end - value;
        }

        value = _this._adjustValue(null, value); //boolean flag for the setHandlePos fn, specifically for vertical sliders

        hasVal = false;

        if (!$handle) {
          //figure out which handle it is, pass it to the next function.
          var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
              secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
          $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
        }
      } else {
        //change event on input
        value = this._adjustValue(null, val);
        hasVal = true;
      }

      this._setHandlePos($handle, value, hasVal);
    }
    /**
     * Adjustes value for handle in regard to step value. returns adjusted value
     * @function
     * @private
     * @param {jQuery} $handle - the selected handle.
     * @param {Number} value - value to adjust. used if $handle is falsy
     */

  }, {
    key: "_adjustValue",
    value: function _adjustValue($handle, value) {
      var val,
          step = this.options.step,
          div = parseFloat(step / 2),
          left,
          prev_val,
          next_val;

      if (!!$handle) {
        val = parseFloat($handle.attr('aria-valuenow'));
      } else {
        val = value;
      }

      if (val >= 0) {
        left = val % step;
      } else {
        left = step + val % step;
      }

      prev_val = val - left;
      next_val = prev_val + step;

      if (left === 0) {
        return val;
      }

      val = val >= prev_val + div ? next_val : prev_val;
      return val;
    }
    /**
     * Adds event listeners to the slider elements.
     * @function
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      this._eventsForHandle(this.$handle);

      if (this.handles[1]) {
        this._eventsForHandle(this.$handle2);
      }
    }
    /**
     * Adds event listeners a particular handle
     * @function
     * @private
     * @param {jQuery} $handle - the current handle to apply listeners to.
     */

  }, {
    key: "_eventsForHandle",
    value: function _eventsForHandle($handle) {
      var _this = this,
          curHandle;

      var handleChangeEvent = function handleChangeEvent(e) {
        var idx = _this.inputs.index(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));

        _this._handleEvent(e, _this.handles.eq(idx), __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).val());
      }; // IE only triggers the change event when the input loses focus which strictly follows the HTML specification
      // listen for the enter key and trigger a change
      // @see https://html.spec.whatwg.org/multipage/input.html#common-input-element-events


      this.inputs.off('keyup.zf.slider').on('keyup.zf.slider', function (e) {
        if (e.keyCode == 13) handleChangeEvent.call(this, e);
      });
      this.inputs.off('change.zf.slider').on('change.zf.slider', handleChangeEvent);

      if (this.options.clickSelect) {
        this.$element.off('click.zf.slider').on('click.zf.slider', function (e) {
          if (_this.$element.data('dragging')) {
            return false;
          }

          if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).is('[data-slider-handle]')) {
            if (_this.options.doubleSided) {
              _this._handleEvent(e);
            } else {
              _this._handleEvent(e, _this.$handle);
            }
          }
        });
      }

      if (this.options.draggable) {
        this.handles.addTouch();
        var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body');
        $handle.off('mousedown.zf.slider').on('mousedown.zf.slider', function (e) {
          $handle.addClass('is-dragging');

          _this.$fill.addClass('is-dragging'); //


          _this.$element.data('dragging', true);

          curHandle = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.currentTarget);
          $body.on('mousemove.zf.slider', function (e) {
            e.preventDefault();

            _this._handleEvent(e, curHandle);
          }).on('mouseup.zf.slider', function (e) {
            _this._handleEvent(e, curHandle);

            $handle.removeClass('is-dragging');

            _this.$fill.removeClass('is-dragging');

            _this.$element.data('dragging', false);

            $body.off('mousemove.zf.slider mouseup.zf.slider');
          });
        }) // prevent events triggered by touch
        .on('selectstart.zf.slider touchmove.zf.slider', function (e) {
          e.preventDefault();
        });
      }

      $handle.off('keydown.zf.slider').on('keydown.zf.slider', function (e) {
        var _$handle = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            idx = _this.options.doubleSided ? _this.handles.index(_$handle) : 0,
            oldValue = parseFloat(_this.inputs.eq(idx).val()),
            newValue; // handle keyboard event with keyboard util


        Keyboard.handleKey(e, 'Slider', {
          decrease: function decrease() {
            newValue = oldValue - _this.options.step;
          },
          increase: function increase() {
            newValue = oldValue + _this.options.step;
          },
          decrease_fast: function decrease_fast() {
            newValue = oldValue - _this.options.step * 10;
          },
          increase_fast: function increase_fast() {
            newValue = oldValue + _this.options.step * 10;
          },
          min: function min() {
            newValue = _this.options.start;
          },
          max: function max() {
            newValue = _this.options.end;
          },
          handled: function handled() {
            // only set handle pos when event was handled specially
            e.preventDefault();

            _this._setHandlePos(_$handle, newValue, true);
          }
        });
        /*if (newValue) { // if pressed key has special function, update value
          e.preventDefault();
          _this._setHandlePos(_$handle, newValue);
        }*/
      });
    }
    /**
     * Destroys the slider plugin.
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.handles.off('.zf.slider');
      this.inputs.off('.zf.slider');
      this.$element.off('.zf.slider');
      clearTimeout(this.timeout);
    }
  }]);

  return Slider;
}(Plugin);

Slider.defaults = {
  /**
   * Minimum value for the slider scale.
   * @option
   * @type {number}
   * @default 0
   */
  start: 0,

  /**
   * Maximum value for the slider scale.
   * @option
   * @type {number}
   * @default 100
   */
  end: 100,

  /**
   * Minimum value change per change event.
   * @option
   * @type {number}
   * @default 1
   */
  step: 1,

  /**
   * Value at which the handle/input *(left handle/first input)* should be set to on initialization.
   * @option
   * @type {number}
   * @default 0
   */
  initialStart: 0,

  /**
   * Value at which the right handle/second input should be set to on initialization.
   * @option
   * @type {number}
   * @default 100
   */
  initialEnd: 100,

  /**
   * Allows the input to be located outside the container and visible. Set to by the JS
   * @option
   * @type {boolean}
   * @default false
   */
  binding: false,

  /**
   * Allows the user to click/tap on the slider bar to select a value.
   * @option
   * @type {boolean}
   * @default true
   */
  clickSelect: true,

  /**
   * Set to true and use the `vertical` class to change alignment to vertical.
   * @option
   * @type {boolean}
   * @default false
   */
  vertical: false,

  /**
   * Allows the user to drag the slider handle(s) to select a value.
   * @option
   * @type {boolean}
   * @default true
   */
  draggable: true,

  /**
   * Disables the slider and prevents event listeners from being applied. Double checked by JS with `disabledClass`.
   * @option
   * @type {boolean}
   * @default false
   */
  disabled: false,

  /**
   * Allows the use of two handles. Double checked by the JS. Changes some logic handling.
   * @option
   * @type {boolean}
   * @default false
   */
  doubleSided: false,

  /**
   * Potential future feature.
   */
  // steps: 100,

  /**
   * Number of decimal places the plugin should go to for floating point precision.
   * @option
   * @type {number}
   * @default 2
   */
  decimal: 2,

  /**
   * Time delay for dragged elements.
   */
  // dragDelay: 0,

  /**
   * Time, in ms, to animate the movement of a slider handle if user clicks/taps on the bar. Needs to be manually set if updating the transition time in the Sass settings.
   * @option
   * @type {number}
   * @default 200
   */
  moveTime: 200,
  //update this if changing the transition time in the sass

  /**
   * Class applied to disabled sliders.
   * @option
   * @type {string}
   * @default 'disabled'
   */
  disabledClass: 'disabled',

  /**
   * Will invert the default layout for a vertical<span data-tooltip title="who would do this???"> </span>slider.
   * @option
   * @type {boolean}
   * @default false
   */
  invertVertical: false,

  /**
   * Milliseconds before the `changed.zf-slider` event is triggered after value change.
   * @option
   * @type {number}
   * @default 500
   */
  changedDelay: 500,

  /**
  * Basevalue for non-linear sliders
  * @option
  * @type {number}
  * @default 5
  */
  nonLinearBase: 5,

  /**
  * Basevalue for non-linear sliders, possible values are: `'linear'`, `'pow'` & `'log'`. Pow and Log use the nonLinearBase setting.
  * @option
  * @type {string}
  * @default 'linear'
  */
  positionValueFunction: 'linear'
};

function percent(frac, num) {
  return frac / num;
}

function absPosition($handle, dir, clickPos, param) {
  return Math.abs($handle.position()[dir] + $handle[param]() / 2 - clickPos);
}

function baseLog(base, value) {
  return Math.log(value) / Math.log(base);
}

/**
 * Sticky module.
 * @module foundation.sticky
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */

var Sticky =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Sticky, _Plugin);

  function Sticky() {
    _classCallCheck(this, Sticky);

    return _possibleConstructorReturn(this, _getPrototypeOf(Sticky).apply(this, arguments));
  }

  _createClass(Sticky, [{
    key: "_setup",

    /**
     * Creates a new instance of a sticky thing.
     * @class
     * @name Sticky
     * @param {jQuery} element - jQuery object to make sticky.
     * @param {Object} options - options object passed when creating the element programmatically.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Sticky.defaults, this.$element.data(), options);
      this.className = 'Sticky'; // ie9 back compat
      // Triggers init is idempotent, just need to make sure it is initialized

      Triggers.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

      this._init();
    }
    /**
     * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
     * @function
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      MediaQuery._init();

      var $parent = this.$element.parent('[data-sticky-container]'),
          id = this.$element[0].id || GetYoDigits(6, 'sticky'),
          _this = this;

      if ($parent.length) {
        this.$container = $parent;
      } else {
        this.wasWrapped = true;
        this.$element.wrap(this.options.container);
        this.$container = this.$element.parent();
      }

      this.$container.addClass(this.options.containerClass);
      this.$element.addClass(this.options.stickyClass).attr({
        'data-resize': id,
        'data-mutate': id
      });

      if (this.options.anchor !== '') {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + _this.options.anchor).attr({
          'data-mutate': id
        });
      }

      this.scrollCount = this.options.checkEvery;
      this.isStuck = false;
      this.onLoadListener = onLoad(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window), function () {
        //We calculate the container height to have correct values for anchor points offset calculation.
        _this.containerHeight = _this.$element.css("display") == "none" ? 0 : _this.$element[0].getBoundingClientRect().height;

        _this.$container.css('height', _this.containerHeight);

        _this.elemHeight = _this.containerHeight;

        if (_this.options.anchor !== '') {
          _this.$anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + _this.options.anchor);
        } else {
          _this._parsePoints();
        }

        _this._setSizes(function () {
          var scroll = window.pageYOffset;

          _this._calc(false, scroll); //Unstick the element will ensure that proper classes are set.


          if (!_this.isStuck) {
            _this._removeSticky(scroll >= _this.topPoint ? false : true);
          }
        });

        _this._events(id.split('-').reverse().join('-'));
      });
    }
    /**
     * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.
     * @function
     * @private
     */

  }, {
    key: "_parsePoints",
    value: function _parsePoints() {
      var top = this.options.topAnchor == "" ? 1 : this.options.topAnchor,
          btm = this.options.btmAnchor == "" ? document.documentElement.scrollHeight : this.options.btmAnchor,
          pts = [top, btm],
          breaks = {};

      for (var i = 0, len = pts.length; i < len && pts[i]; i++) {
        var pt;

        if (typeof pts[i] === 'number') {
          pt = pts[i];
        } else {
          var place = pts[i].split(':'),
              anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat(place[0]));
          pt = anchor.offset().top;

          if (place[1] && place[1].toLowerCase() === 'bottom') {
            pt += anchor[0].getBoundingClientRect().height;
          }
        }

        breaks[i] = pt;
      }

      this.points = breaks;
      return;
    }
    /**
     * Adds event handlers for the scrolling element.
     * @private
     * @param {String} id - pseudo-random id for unique scroll event listener.
     */

  }, {
    key: "_events",
    value: function _events(id) {
      var _this = this,
          scrollListener = this.scrollListener = "scroll.zf.".concat(id);

      if (this.isOn) {
        return;
      }

      if (this.canStick) {
        this.isOn = true;
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(scrollListener).on(scrollListener, function (e) {
          if (_this.scrollCount === 0) {
            _this.scrollCount = _this.options.checkEvery;

            _this._setSizes(function () {
              _this._calc(false, window.pageYOffset);
            });
          } else {
            _this.scrollCount--;

            _this._calc(false, window.pageYOffset);
          }
        });
      }

      this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function (e, el) {
        _this._eventsHandler(id);
      });
      this.$element.on('mutateme.zf.trigger', function (e, el) {
        _this._eventsHandler(id);
      });

      if (this.$anchor) {
        this.$anchor.on('mutateme.zf.trigger', function (e, el) {
          _this._eventsHandler(id);
        });
      }
    }
    /**
     * Handler for events.
     * @private
     * @param {String} id - pseudo-random id for unique scroll event listener.
     */

  }, {
    key: "_eventsHandler",
    value: function _eventsHandler(id) {
      var _this = this,
          scrollListener = this.scrollListener = "scroll.zf.".concat(id);

      _this._setSizes(function () {
        _this._calc(false);

        if (_this.canStick) {
          if (!_this.isOn) {
            _this._events(id);
          }
        } else if (_this.isOn) {
          _this._pauseListeners(scrollListener);
        }
      });
    }
    /**
     * Removes event handlers for scroll and change events on anchor.
     * @fires Sticky#pause
     * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
     */

  }, {
    key: "_pauseListeners",
    value: function _pauseListeners(scrollListener) {
      this.isOn = false;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(scrollListener);
      /**
       * Fires when the plugin is paused due to resize event shrinking the view.
       * @event Sticky#pause
       * @private
       */

      this.$element.trigger('pause.zf.sticky');
    }
    /**
     * Called on every `scroll` event and on `_init`
     * fires functions based on booleans and cached values
     * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
     * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.
     */

  }, {
    key: "_calc",
    value: function _calc(checkSizes, scroll) {
      if (checkSizes) {
        this._setSizes();
      }

      if (!this.canStick) {
        if (this.isStuck) {
          this._removeSticky(true);
        }

        return false;
      }

      if (!scroll) {
        scroll = window.pageYOffset;
      }

      if (scroll >= this.topPoint) {
        if (scroll <= this.bottomPoint) {
          if (!this.isStuck) {
            this._setSticky();
          }
        } else {
          if (this.isStuck) {
            this._removeSticky(false);
          }
        }
      } else {
        if (this.isStuck) {
          this._removeSticky(true);
        }
      }
    }
    /**
     * Causes the $element to become stuck.
     * Adds `position: fixed;`, and helper classes.
     * @fires Sticky#stuckto
     * @function
     * @private
     */

  }, {
    key: "_setSticky",
    value: function _setSticky() {
      var _this = this,
          stickTo = this.options.stickTo,
          mrgn = stickTo === 'top' ? 'marginTop' : 'marginBottom',
          notStuckTo = stickTo === 'top' ? 'bottom' : 'top',
          css = {};

      css[mrgn] = "".concat(this.options[mrgn], "em");
      css[stickTo] = 0;
      css[notStuckTo] = 'auto';
      this.isStuck = true;
      this.$element.removeClass("is-anchored is-at-".concat(notStuckTo)).addClass("is-stuck is-at-".concat(stickTo)).css(css)
      /**
       * Fires when the $element has become `position: fixed;`
       * Namespaced to `top` or `bottom`, e.g. `sticky.zf.stuckto:top`
       * @event Sticky#stuckto
       */
      .trigger("sticky.zf.stuckto:".concat(stickTo));
      this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
        _this._setSizes();
      });
    }
    /**
     * Causes the $element to become unstuck.
     * Removes `position: fixed;`, and helper classes.
     * Adds other helper classes.
     * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
     * @fires Sticky#unstuckfrom
     * @private
     */

  }, {
    key: "_removeSticky",
    value: function _removeSticky(isTop) {
      var stickTo = this.options.stickTo,
          stickToTop = stickTo === 'top',
          css = {},
          anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
          mrgn = stickToTop ? 'marginTop' : 'marginBottom',
          topOrBottom = isTop ? 'top' : 'bottom';
      css[mrgn] = 0;
      css['bottom'] = 'auto';

      if (isTop) {
        css['top'] = 0;
      } else {
        css['top'] = anchorPt;
      }

      this.isStuck = false;
      this.$element.removeClass("is-stuck is-at-".concat(stickTo)).addClass("is-anchored is-at-".concat(topOrBottom)).css(css)
      /**
       * Fires when the $element has become anchored.
       * Namespaced to `top` or `bottom`, e.g. `sticky.zf.unstuckfrom:bottom`
       * @event Sticky#unstuckfrom
       */
      .trigger("sticky.zf.unstuckfrom:".concat(topOrBottom));
    }
    /**
     * Sets the $element and $container sizes for plugin.
     * Calls `_setBreakPoints`.
     * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
     * @private
     */

  }, {
    key: "_setSizes",
    value: function _setSizes(cb) {
      this.canStick = MediaQuery.is(this.options.stickyOn);

      if (!this.canStick) {
        if (cb && typeof cb === 'function') {
          cb();
        }
      }

      var newElemWidth = this.$container[0].getBoundingClientRect().width,
          comp = window.getComputedStyle(this.$container[0]),
          pdngl = parseInt(comp['padding-left'], 10),
          pdngr = parseInt(comp['padding-right'], 10);

      if (this.$anchor && this.$anchor.length) {
        this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;
      } else {
        this._parsePoints();
      }

      this.$element.css({
        'max-width': "".concat(newElemWidth - pdngl - pdngr, "px")
      });
      var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;

      if (this.$element.css("display") == "none") {
        newContainerHeight = 0;
      }

      this.containerHeight = newContainerHeight;
      this.$container.css({
        height: newContainerHeight
      });
      this.elemHeight = newContainerHeight;

      if (!this.isStuck) {
        if (this.$element.hasClass('is-at-bottom')) {
          var anchorPt = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
          this.$element.css('top', anchorPt);
        }
      }

      this._setBreakPoints(newContainerHeight, function () {
        if (cb && typeof cb === 'function') {
          cb();
        }
      });
    }
    /**
     * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
     * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
     * @param {Function} cb - optional callback function to be called on completion.
     * @private
     */

  }, {
    key: "_setBreakPoints",
    value: function _setBreakPoints(elemHeight, cb) {
      if (!this.canStick) {
        if (cb && typeof cb === 'function') {
          cb();
        } else {
          return false;
        }
      }

      var mTop = emCalc(this.options.marginTop),
          mBtm = emCalc(this.options.marginBottom),
          topPoint = this.points ? this.points[0] : this.$anchor.offset().top,
          bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight,
          // topPoint = this.$anchor.offset().top || this.points[0],
      // bottomPoint = topPoint + this.anchorHeight || this.points[1],
      winHeight = window.innerHeight;

      if (this.options.stickTo === 'top') {
        topPoint -= mTop;
        bottomPoint -= elemHeight + mTop;
      } else if (this.options.stickTo === 'bottom') {
        topPoint -= winHeight - (elemHeight + mBtm);
        bottomPoint -= winHeight - mBtm;
      }

      this.topPoint = topPoint;
      this.bottomPoint = bottomPoint;

      if (cb && typeof cb === 'function') {
        cb();
      }
    }
    /**
     * Destroys the current sticky element.
     * Resets the element to the top position first.
     * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this._removeSticky(true);

      this.$element.removeClass("".concat(this.options.stickyClass, " is-anchored is-at-top")).css({
        height: '',
        top: '',
        bottom: '',
        'max-width': ''
      }).off('resizeme.zf.trigger').off('mutateme.zf.trigger');

      if (this.$anchor && this.$anchor.length) {
        this.$anchor.off('change.zf.sticky');
      }

      if (this.scrollListener) __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(this.scrollListener);
      if (this.onLoadListener) __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(this.onLoadListener);

      if (this.wasWrapped) {
        this.$element.unwrap();
      } else {
        this.$container.removeClass(this.options.containerClass).css({
          height: ''
        });
      }
    }
  }]);

  return Sticky;
}(Plugin);

Sticky.defaults = {
  /**
   * Customizable container template. Add your own classes for styling and sizing.
   * @option
   * @type {string}
   * @default '&lt;div data-sticky-container&gt;&lt;/div&gt;'
   */
  container: '<div data-sticky-container></div>',

  /**
   * Location in the view the element sticks to. Can be `'top'` or `'bottom'`.
   * @option
   * @type {string}
   * @default 'top'
   */
  stickTo: 'top',

  /**
   * If anchored to a single element, the id of that element.
   * @option
   * @type {string}
   * @default ''
   */
  anchor: '',

  /**
   * If using more than one element as anchor points, the id of the top anchor.
   * @option
   * @type {string}
   * @default ''
   */
  topAnchor: '',

  /**
   * If using more than one element as anchor points, the id of the bottom anchor.
   * @option
   * @type {string}
   * @default ''
   */
  btmAnchor: '',

  /**
   * Margin, in `em`'s to apply to the top of the element when it becomes sticky.
   * @option
   * @type {number}
   * @default 1
   */
  marginTop: 1,

  /**
   * Margin, in `em`'s to apply to the bottom of the element when it becomes sticky.
   * @option
   * @type {number}
   * @default 1
   */
  marginBottom: 1,

  /**
   * Breakpoint string that is the minimum screen size an element should become sticky.
   * @option
   * @type {string}
   * @default 'medium'
   */
  stickyOn: 'medium',

  /**
   * Class applied to sticky element, and removed on destruction. Foundation defaults to `sticky`.
   * @option
   * @type {string}
   * @default 'sticky'
   */
  stickyClass: 'sticky',

  /**
   * Class applied to sticky container. Foundation defaults to `sticky-container`.
   * @option
   * @type {string}
   * @default 'sticky-container'
   */
  containerClass: 'sticky-container',

  /**
   * Number of scroll events between the plugin's recalculating sticky points. Setting it to `0` will cause it to recalc every scroll event, setting it to `-1` will prevent recalc on scroll.
   * @option
   * @type {number}
   * @default -1
   */
  checkEvery: -1
};
/**
 * Helper function to calculate em values
 * @param Number {em} - number of em's to calculate into pixels
 */

function emCalc(em) {
  return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
}

/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 * @requires foundation.util.imageLoader if tabs contain images
 */

var Tabs =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Tabs, _Plugin);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tabs).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: "_setup",

    /**
     * Creates a new instance of tabs.
     * @class
     * @name Tabs
     * @fires Tabs#init
     * @param {jQuery} element - jQuery object to make into tabs.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Tabs.defaults, this.$element.data(), options);
      this.className = 'Tabs'; // ie9 back compat

      this._init();

      Keyboard.register('Tabs', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'previous',
        'ARROW_DOWN': 'next',
        'ARROW_LEFT': 'previous' // 'TAB': 'next',
        // 'SHIFT_TAB': 'previous'

      });
    }
    /**
     * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var _this2 = this;

      var _this = this;

      this._isInitializing = true;
      this.$element.attr({
        'role': 'tablist'
      });
      this.$tabTitles = this.$element.find(".".concat(this.options.linkClass));
      this.$tabContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("[data-tabs-content=\"".concat(this.$element[0].id, "\"]"));
      this.$tabTitles.each(function () {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            $link = $elem.find('a'),
            isActive = $elem.hasClass("".concat(_this.options.linkActiveClass)),
            hash = $link.attr('data-tabs-target') || $link[0].hash.slice(1),
            linkId = $link[0].id ? $link[0].id : "".concat(hash, "-label"),
            $tabContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat(hash));
        $elem.attr({
          'role': 'presentation'
        });
        $link.attr({
          'role': 'tab',
          'aria-controls': hash,
          'aria-selected': isActive,
          'id': linkId,
          'tabindex': isActive ? '0' : '-1'
        });
        $tabContent.attr({
          'role': 'tabpanel',
          'aria-labelledby': linkId
        }); // Save up the initial hash to return to it later when going back in history

        if (isActive) {
          _this._initialAnchor = "#".concat(hash);
        }

        if (!isActive) {
          $tabContent.attr('aria-hidden', 'true');
        }

        if (isActive && _this.options.autoFocus) {
          _this.onLoadListener = onLoad(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window), function () {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({
              scrollTop: $elem.offset().top
            }, _this.options.deepLinkSmudgeDelay, function () {
              $link.focus();
            });
          });
        }
      });

      if (this.options.matchHeight) {
        var $images = this.$tabContent.find('img');

        if ($images.length) {
          onImagesLoaded($images, this._setHeight.bind(this));
        } else {
          this._setHeight();
        }
      } // Current context-bound function to open tabs on page load or history hashchange


      this._checkDeepLink = function () {
        var anchor = window.location.hash;

        if (!anchor.length) {
          // If we are still initializing and there is no anchor, then there is nothing to do
          if (_this2._isInitializing) return; // Otherwise, move to the initial anchor

          if (_this2._initialAnchor) anchor = _this2._initialAnchor;
        }

        var $anchor = anchor && __WEBPACK_IMPORTED_MODULE_0_jquery___default()(anchor);

        var $link = anchor && _this2.$element.find('[href$="' + anchor + '"]'); // Whether the anchor element that has been found is part of this element


        var isOwnAnchor = !!($anchor.length && $link.length); // If there is an anchor for the hash, select it

        if ($anchor && $anchor.length && $link && $link.length) {
          _this2.selectTab($anchor, true);
        } // Otherwise, collapse everything
        else {
            _this2._collapse();
          }

        if (isOwnAnchor) {
          // Roll up a little to show the titles
          if (_this2.options.deepLinkSmudge) {
            var offset = _this2.$element.offset();

            __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({
              scrollTop: offset.top
            }, _this2.options.deepLinkSmudgeDelay);
          }
          /**
           * Fires when the plugin has deeplinked at pageload
           * @event Tabs#deeplink
           */


          _this2.$element.trigger('deeplink.zf.tabs', [$link, $anchor]);
        }
      }; //use browser to open a tab, if it exists in this tabset


      if (this.options.deepLink) {
        this._checkDeepLink();
      }

      this._events();

      this._isInitializing = false;
    }
    /**
     * Adds event handlers for items within the tabs.
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      this._addKeyHandler();

      this._addClickHandler();

      this._setHeightMqHandler = null;

      if (this.options.matchHeight) {
        this._setHeightMqHandler = this._setHeight.bind(this);
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._setHeightMqHandler);
      }

      if (this.options.deepLink) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('hashchange', this._checkDeepLink);
      }
    }
    /**
     * Adds click handlers for items within the tabs.
     * @private
     */

  }, {
    key: "_addClickHandler",
    value: function _addClickHandler() {
      var _this = this;

      this.$element.off('click.zf.tabs').on('click.zf.tabs', ".".concat(this.options.linkClass), function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this._handleTabChange(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
      });
    }
    /**
     * Adds keyboard event handlers for items within the tabs.
     * @private
     */

  }, {
    key: "_addKeyHandler",
    value: function _addKeyHandler() {
      var _this = this;

      this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function (e) {
        if (e.which === 9) return;
        var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            $elements = $element.parent('ul').children('li'),
            $prevElement,
            $nextElement;
        $elements.each(function (i) {
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
            if (_this.options.wrapOnKeys) {
              $prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);
              $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1);
            } else {
              $prevElement = $elements.eq(Math.max(0, i - 1));
              $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
            }

            return;
          }
        }); // handle keyboard event with keyboard util

        Keyboard.handleKey(e, 'Tabs', {
          open: function open() {
            $element.find('[role="tab"]').focus();

            _this._handleTabChange($element);
          },
          previous: function previous() {
            $prevElement.find('[role="tab"]').focus();

            _this._handleTabChange($prevElement);
          },
          next: function next() {
            $nextElement.find('[role="tab"]').focus();

            _this._handleTabChange($nextElement);
          },
          handled: function handled() {
            e.stopPropagation();
            e.preventDefault();
          }
        });
      });
    }
    /**
     * Opens the tab `$targetContent` defined by `$target`. Collapses active tab.
     * @param {jQuery} $target - Tab to open.
     * @param {boolean} historyHandled - browser has already handled a history update
     * @fires Tabs#change
     * @function
     */

  }, {
    key: "_handleTabChange",
    value: function _handleTabChange($target, historyHandled) {
      // With `activeCollapse`, if the target is the active Tab, collapse it.
      if ($target.hasClass("".concat(this.options.linkActiveClass))) {
        if (this.options.activeCollapse) {
          this._collapse();
        }

        return;
      }

      var $oldTab = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass)),
          $tabLink = $target.find('[role="tab"]'),
          target = $tabLink.attr('data-tabs-target'),
          anchor = target && target.length ? "#".concat(target) : $tabLink[0].hash,
          $targetContent = this.$tabContent.find(anchor); //close old tab

      this._collapseTab($oldTab); //open new tab


      this._openTab($target); //either replace or update browser history


      if (this.options.deepLink && !historyHandled) {
        if (this.options.updateHistory) {
          history.pushState({}, '', anchor);
        } else {
          history.replaceState({}, '', anchor);
        }
      }
      /**
       * Fires when the plugin has successfully changed tabs.
       * @event Tabs#change
       */


      this.$element.trigger('change.zf.tabs', [$target, $targetContent]); //fire to children a mutation event

      $targetContent.find("[data-mutate]").trigger("mutateme.zf.trigger");
    }
    /**
     * Opens the tab `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to open.
     * @function
     */

  }, {
    key: "_openTab",
    value: function _openTab($target) {
      var $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find("#".concat(hash));
      $target.addClass("".concat(this.options.linkActiveClass));
      $tabLink.attr({
        'aria-selected': 'true',
        'tabindex': '0'
      });
      $targetContent.addClass("".concat(this.options.panelActiveClass)).removeAttr('aria-hidden');
    }
    /**
     * Collapses `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to collapse.
     * @function
     */

  }, {
    key: "_collapseTab",
    value: function _collapseTab($target) {
      var $target_anchor = $target.removeClass("".concat(this.options.linkActiveClass)).find('[role="tab"]').attr({
        'aria-selected': 'false',
        'tabindex': -1
      });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#".concat($target_anchor.attr('aria-controls'))).removeClass("".concat(this.options.panelActiveClass)).attr({
        'aria-hidden': 'true'
      });
    }
    /**
     * Collapses the active Tab.
     * @fires Tabs#collapse
     * @function
     */

  }, {
    key: "_collapse",
    value: function _collapse() {
      var $activeTab = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass));

      if ($activeTab.length) {
        this._collapseTab($activeTab);
        /**
        * Fires when the plugin has successfully collapsed tabs.
        * @event Tabs#collapse
        */


        this.$element.trigger('collapse.zf.tabs', [$activeTab]);
      }
    }
    /**
     * Public method for selecting a content pane to display.
     * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
     * @param {boolean} historyHandled - browser has already handled a history update
     * @function
     */

  }, {
    key: "selectTab",
    value: function selectTab(elem, historyHandled) {
      var idStr;

      if (_typeof(elem) === 'object') {
        idStr = elem[0].id;
      } else {
        idStr = elem;
      }

      if (idStr.indexOf('#') < 0) {
        idStr = "#".concat(idStr);
      }

      var $target = this.$tabTitles.has("[href$=\"".concat(idStr, "\"]"));

      this._handleTabChange($target, historyHandled);
    }
  }, {
    key: "_setHeight",

    /**
     * Sets the height of each panel to the height of the tallest panel.
     * If enabled in options, gets called on media query change.
     * If loading content via external source, can be called directly or with _reflow.
     * If enabled with `data-match-height="true"`, tabs sets to equal height
     * @function
     * @private
     */
    value: function _setHeight() {
      var max = 0,
          _this = this; // Lock down the `this` value for the root tabs object


      this.$tabContent.find(".".concat(this.options.panelClass)).css('height', '').each(function () {
        var panel = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            isActive = panel.hasClass("".concat(_this.options.panelActiveClass)); // get the options from the parent instead of trying to get them from the child

        if (!isActive) {
          panel.css({
            'visibility': 'hidden',
            'display': 'block'
          });
        }

        var temp = this.getBoundingClientRect().height;

        if (!isActive) {
          panel.css({
            'visibility': '',
            'display': ''
          });
        }

        max = temp > max ? temp : max;
      }).css('height', "".concat(max, "px"));
    }
    /**
     * Destroys an instance of tabs.
     * @fires Tabs#destroyed
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.find(".".concat(this.options.linkClass)).off('.zf.tabs').hide().end().find(".".concat(this.options.panelClass)).hide();

      if (this.options.matchHeight) {
        if (this._setHeightMqHandler != null) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('changed.zf.mediaquery', this._setHeightMqHandler);
        }
      }

      if (this.options.deepLink) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('hashchange', this._checkDeepLink);
      }

      if (this.onLoadListener) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(this.onLoadListener);
      }
    }
  }]);

  return Tabs;
}(Plugin);

Tabs.defaults = {
  /**
   * Link the location hash to the active pane.
   * Set the location hash when the active pane changes, and open the corresponding pane when the location changes.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the tab panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * If `deepLink` is enabled, update the browser history with the open tab
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false,

  /**
   * Allows the window to scroll to content of active pane on load.
   * Not recommended if more than one tab panel per page.
   * @option
   * @type {boolean}
   * @default false
   */
  autoFocus: false,

  /**
   * Allows keyboard input to 'wrap' around the tab links.
   * @option
   * @type {boolean}
   * @default true
   */
  wrapOnKeys: true,

  /**
   * Allows the tab content panes to match heights if set to true.
   * @option
   * @type {boolean}
   * @default false
   */
  matchHeight: false,

  /**
   * Allows active tabs to collapse when clicked.
   * @option
   * @type {boolean}
   * @default false
   */
  activeCollapse: false,

  /**
   * Class applied to `li`'s in tab link list.
   * @option
   * @type {string}
   * @default 'tabs-title'
   */
  linkClass: 'tabs-title',

  /**
   * Class applied to the active `li` in tab link list.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  linkActiveClass: 'is-active',

  /**
   * Class applied to the content containers.
   * @option
   * @type {string}
   * @default 'tabs-panel'
   */
  panelClass: 'tabs-panel',

  /**
   * Class applied to the active content container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  panelActiveClass: 'is-active'
};

/**
 * Toggler module.
 * @module foundation.toggler
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 */

var Toggler =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Toggler, _Plugin);

  function Toggler() {
    _classCallCheck(this, Toggler);

    return _possibleConstructorReturn(this, _getPrototypeOf(Toggler).apply(this, arguments));
  }

  _createClass(Toggler, [{
    key: "_setup",

    /**
     * Creates a new instance of Toggler.
     * @class
     * @name Toggler
     * @fires Toggler#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Toggler.defaults, element.data(), options);
      this.className = '';
      this.className = 'Toggler'; // ie9 back compat
      // Triggers init is idempotent, just need to make sure it is initialized

      Triggers.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

      this._init();

      this._events();
    }
    /**
     * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
     * @function
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var input; // Parse animation classes if they were set

      if (this.options.animate) {
        input = this.options.animate.split(' ');
        this.animationIn = input[0];
        this.animationOut = input[1] || null;
      } // Otherwise, parse toggle class
      else {
          input = this.$element.data('toggler'); // Allow for a . at the beginning of the string

          this.className = input[0] === '.' ? input.slice(1) : input;
        } // Add ARIA attributes to triggers:


      var id = this.$element[0].id,
          $triggers = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("[data-open~=\"".concat(id, "\"], [data-close~=\"").concat(id, "\"], [data-toggle~=\"").concat(id, "\"]")); // - aria-expanded: according to the element visibility.

      $triggers.attr('aria-expanded', !this.$element.is(':hidden')); // - aria-controls: adding the element id to it if not already in it.

      $triggers.each(function (index, trigger) {
        var $trigger = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(trigger);
        var controls = $trigger.attr('aria-controls') || '';
        var containsId = new RegExp("\\b".concat(RegExpEscape(id), "\\b")).test(controls);
        if (!containsId) $trigger.attr('aria-controls', controls ? "".concat(controls, " ").concat(id) : id);
      });
    }
    /**
     * Initializes events for the toggle trigger.
     * @function
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger', this.toggle.bind(this));
    }
    /**
     * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
     * @function
     * @fires Toggler#on
     * @fires Toggler#off
     */

  }, {
    key: "toggle",
    value: function toggle() {
      this[this.options.animate ? '_toggleAnimate' : '_toggleClass']();
    }
  }, {
    key: "_toggleClass",
    value: function _toggleClass() {
      this.$element.toggleClass(this.className);
      var isOn = this.$element.hasClass(this.className);

      if (isOn) {
        /**
         * Fires if the target element has the class after a toggle.
         * @event Toggler#on
         */
        this.$element.trigger('on.zf.toggler');
      } else {
        /**
         * Fires if the target element does not have the class after a toggle.
         * @event Toggler#off
         */
        this.$element.trigger('off.zf.toggler');
      }

      this._updateARIA(isOn);

      this.$element.find('[data-mutate]').trigger('mutateme.zf.trigger');
    }
  }, {
    key: "_toggleAnimate",
    value: function _toggleAnimate() {
      var _this = this;

      if (this.$element.is(':hidden')) {
        Motion.animateIn(this.$element, this.animationIn, function () {
          _this._updateARIA(true);

          this.trigger('on.zf.toggler');
          this.find('[data-mutate]').trigger('mutateme.zf.trigger');
        });
      } else {
        Motion.animateOut(this.$element, this.animationOut, function () {
          _this._updateARIA(false);

          this.trigger('off.zf.toggler');
          this.find('[data-mutate]').trigger('mutateme.zf.trigger');
        });
      }
    }
  }, {
    key: "_updateARIA",
    value: function _updateARIA(isOn) {
      var id = this.$element[0].id;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("[data-open=\"".concat(id, "\"], [data-close=\"").concat(id, "\"], [data-toggle=\"").concat(id, "\"]")).attr({
        'aria-expanded': isOn ? true : false
      });
    }
    /**
     * Destroys the instance of Toggler on the element.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.off('.zf.toggler');
    }
  }]);

  return Toggler;
}(Plugin);

Toggler.defaults = {
  /**
   * Tells the plugin if the element should animated when toggled.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};

/**
 * Tooltip module.
 * @module foundation.tooltip
 * @requires foundation.util.box
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */

var Tooltip =
/*#__PURE__*/
function (_Positionable) {
  _inherits(Tooltip, _Positionable);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).apply(this, arguments));
  }

  _createClass(Tooltip, [{
    key: "_setup",

    /**
     * Creates a new instance of a Tooltip.
     * @class
     * @name Tooltip
     * @fires Tooltip#init
     * @param {jQuery} element - jQuery object to attach a tooltip to.
     * @param {Object} options - object to extend the default configuration.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Tooltip.defaults, this.$element.data(), options);
      this.className = 'Tooltip'; // ie9 back compat

      this.isActive = false;
      this.isClick = false; // Triggers init is idempotent, just need to make sure it is initialized

      Triggers.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

      this._init();
    }
    /**
     * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      MediaQuery._init();

      var elemId = this.$element.attr('aria-describedby') || GetYoDigits(6, 'tooltip');
      this.options.tipText = this.options.tipText || this.$element.attr('title');
      this.template = this.options.template ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.template) : this._buildTemplate(elemId);

      if (this.options.allowHtml) {
        this.template.appendTo(document.body).html(this.options.tipText).hide();
      } else {
        this.template.appendTo(document.body).text(this.options.tipText).hide();
      }

      this.$element.attr({
        'title': '',
        'aria-describedby': elemId,
        'data-yeti-box': elemId,
        'data-toggle': elemId,
        'data-resize': elemId
      }).addClass(this.options.triggerClass);

      _get(_getPrototypeOf(Tooltip.prototype), "_init", this).call(this);

      this._events();
    }
  }, {
    key: "_getDefaultPosition",
    value: function _getDefaultPosition() {
      // handle legacy classnames
      var position = this.$element[0].className.match(/\b(top|left|right|bottom)\b/g);
      return position ? position[0] : 'top';
    }
  }, {
    key: "_getDefaultAlignment",
    value: function _getDefaultAlignment() {
      return 'center';
    }
  }, {
    key: "_getHOffset",
    value: function _getHOffset() {
      if (this.position === 'left' || this.position === 'right') {
        return this.options.hOffset + this.options.tooltipWidth;
      } else {
        return this.options.hOffset;
      }
    }
  }, {
    key: "_getVOffset",
    value: function _getVOffset() {
      if (this.position === 'top' || this.position === 'bottom') {
        return this.options.vOffset + this.options.tooltipHeight;
      } else {
        return this.options.vOffset;
      }
    }
    /**
     * builds the tooltip element, adds attributes, and returns the template.
     * @private
     */

  }, {
    key: "_buildTemplate",
    value: function _buildTemplate(id) {
      var templateClasses = "".concat(this.options.tooltipClass, " ").concat(this.options.templateClasses).trim();
      var $template = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div></div>').addClass(templateClasses).attr({
        'role': 'tooltip',
        'aria-hidden': true,
        'data-is-active': false,
        'data-is-focus': false,
        'id': id
      });
      return $template;
    }
    /**
     * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
     * if the tooltip is larger than the screen width, default to full width - any user selected margin
     * @private
     */

  }, {
    key: "_setPosition",
    value: function _setPosition() {
      _get(_getPrototypeOf(Tooltip.prototype), "_setPosition", this).call(this, this.$element, this.template);
    }
    /**
     * reveals the tooltip, and fires an event to close any other open tooltips on the page
     * @fires Tooltip#closeme
     * @fires Tooltip#show
     * @function
     */

  }, {
    key: "show",
    value: function show() {
      if (this.options.showOn !== 'all' && !MediaQuery.is(this.options.showOn)) {
        // console.error('The screen is too small to display this tooltip');
        return false;
      }

      var _this = this;

      this.template.css('visibility', 'hidden').show();

      this._setPosition();

      this.template.removeClass('top bottom left right').addClass(this.position);
      this.template.removeClass('align-top align-bottom align-left align-right align-center').addClass('align-' + this.alignment);
      /**
       * Fires to close all other open tooltips on the page
       * @event Closeme#tooltip
       */

      this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));
      this.template.attr({
        'data-is-active': true,
        'aria-hidden': false
      });
      _this.isActive = true; // console.log(this.template);

      this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function () {//maybe do stuff?
      });
      /**
       * Fires when the tooltip is shown
       * @event Tooltip#show
       */

      this.$element.trigger('show.zf.tooltip');
    }
    /**
     * Hides the current tooltip, and resets the positioning class if it was changed due to collision
     * @fires Tooltip#hide
     * @function
     */

  }, {
    key: "hide",
    value: function hide() {
      // console.log('hiding', this.$element.data('yeti-box'));
      var _this = this;

      this.template.stop().attr({
        'aria-hidden': true,
        'data-is-active': false
      }).fadeOut(this.options.fadeOutDuration, function () {
        _this.isActive = false;
        _this.isClick = false;
      });
      /**
       * fires when the tooltip is hidden
       * @event Tooltip#hide
       */

      this.$element.trigger('hide.zf.tooltip');
    }
    /**
     * adds event listeners for the tooltip and its anchor
     * TODO combine some of the listeners like focus and mouseenter, etc.
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this = this;

      var $template = this.template;
      var isFocus = false;

      if (!this.options.disableHover) {
        this.$element.on('mouseenter.zf.tooltip', function (e) {
          if (!_this.isActive) {
            _this.timeout = setTimeout(function () {
              _this.show();
            }, _this.options.hoverDelay);
          }
        }).on('mouseleave.zf.tooltip', ignoreMousedisappear(function (e) {
          clearTimeout(_this.timeout);

          if (!isFocus || _this.isClick && !_this.options.clickOpen) {
            _this.hide();
          }
        }));
      }

      if (this.options.clickOpen) {
        this.$element.on('mousedown.zf.tooltip', function (e) {
          e.stopImmediatePropagation();

          if (_this.isClick) ; else {
            _this.isClick = true;

            if ((_this.options.disableHover || !_this.$element.attr('tabindex')) && !_this.isActive) {
              _this.show();
            }
          }
        });
      } else {
        this.$element.on('mousedown.zf.tooltip', function (e) {
          e.stopImmediatePropagation();
          _this.isClick = true;
        });
      }

      if (!this.options.disableForTouch) {
        this.$element.on('tap.zf.tooltip touchend.zf.tooltip', function (e) {
          _this.isActive ? _this.hide() : _this.show();
        });
      }

      this.$element.on({
        // 'toggle.zf.trigger': this.toggle.bind(this),
        // 'close.zf.trigger': this.hide.bind(this)
        'close.zf.trigger': this.hide.bind(this)
      });
      this.$element.on('focus.zf.tooltip', function (e) {
        isFocus = true;

        if (_this.isClick) {
          // If we're not showing open on clicks, we need to pretend a click-launched focus isn't
          // a real focus, otherwise on hover and come back we get bad behavior
          if (!_this.options.clickOpen) {
            isFocus = false;
          }

          return false;
        } else {
          _this.show();
        }
      }).on('focusout.zf.tooltip', function (e) {
        isFocus = false;
        _this.isClick = false;

        _this.hide();
      }).on('resizeme.zf.trigger', function () {
        if (_this.isActive) {
          _this._setPosition();
        }
      });
    }
    /**
     * adds a toggle method, in addition to the static show() & hide() functions
     * @function
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isActive) {
        this.hide();
      } else {
        this.show();
      }
    }
    /**
     * Destroys an instance of tooltip, removes template element from the view.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.attr('title', this.template.text()).off('.zf.trigger .zf.tooltip').removeClass(this.options.triggerClass).removeClass('top right left bottom').removeAttr('aria-describedby data-disable-hover data-resize data-toggle data-tooltip data-yeti-box');
      this.template.remove();
    }
  }]);

  return Tooltip;
}(Positionable);

Tooltip.defaults = {
  disableForTouch: false,

  /**
   * Time, in ms, before a tooltip should open on hover.
   * @option
   * @type {number}
   * @default 200
   */
  hoverDelay: 200,

  /**
   * Time, in ms, a tooltip should take to fade into view.
   * @option
   * @type {number}
   * @default 150
   */
  fadeInDuration: 150,

  /**
   * Time, in ms, a tooltip should take to fade out of view.
   * @option
   * @type {number}
   * @default 150
   */
  fadeOutDuration: 150,

  /**
   * Disables hover events from opening the tooltip if set to true
   * @option
   * @type {boolean}
   * @default false
   */
  disableHover: false,

  /**
   * Optional addtional classes to apply to the tooltip template on init.
   * @option
   * @type {string}
   * @default ''
   */
  templateClasses: '',

  /**
   * Non-optional class added to tooltip templates. Foundation default is 'tooltip'.
   * @option
   * @type {string}
   * @default 'tooltip'
   */
  tooltipClass: 'tooltip',

  /**
   * Class applied to the tooltip anchor element.
   * @option
   * @type {string}
   * @default 'has-tip'
   */
  triggerClass: 'has-tip',

  /**
   * Minimum breakpoint size at which to open the tooltip.
   * @option
   * @type {string}
   * @default 'small'
   */
  showOn: 'small',

  /**
   * Custom template to be used to generate markup for tooltip.
   * @option
   * @type {string}
   * @default ''
   */
  template: '',

  /**
   * Text displayed in the tooltip template on open.
   * @option
   * @type {string}
   * @default ''
   */
  tipText: '',
  touchCloseText: 'Tap to close.',

  /**
   * Allows the tooltip to remain open if triggered with a click or touch event.
   * @option
   * @type {boolean}
   * @default true
   */
  clickOpen: true,

  /**
   * Position of tooltip. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',

  /**
   * Alignment of tooltip relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',

  /**
   * Allow overlap of container/window. If false, tooltip will first try to
   * position as defined by data-position and data-alignment, but reposition if
   * it would cause an overflow.  @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,

  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * Less common for tooltips.
   * @option
   * @type {boolean}
   * @default false
   */
  allowBottomOverlap: false,

  /**
   * Distance, in pixels, the template should push away from the anchor on the Y axis.
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,

  /**
   * Distance, in pixels, the template should push away from the anchor on the X axis
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,

  /**
   * Distance, in pixels, the template spacing auto-adjust for a vertical tooltip
   * @option
   * @type {number}
   * @default 14
   */
  tooltipHeight: 14,

  /**
   * Distance, in pixels, the template spacing auto-adjust for a horizontal tooltip
   * @option
   * @type {number}
   * @default 12
   */
  tooltipWidth: 12,

  /**
  * Allow HTML in tooltip. Warning: If you are loading user-generated content into tooltips,
  * allowing HTML may open yourself up to XSS attacks.
  * @option
  * @type {boolean}
  * @default false
  */
  allowHtml: false
};

var MenuPlugins$1 = {
  tabs: {
    cssClass: 'tabs',
    plugin: Tabs
  },
  accordion: {
    cssClass: 'accordion',
    plugin: Accordion
  }
};
/**
 * ResponsiveAccordionTabs module.
 * @module foundation.responsiveAccordionTabs
 * @requires foundation.util.motion
 * @requires foundation.accordion
 * @requires foundation.tabs
 */

var ResponsiveAccordionTabs =
/*#__PURE__*/
function (_Plugin) {
  _inherits(ResponsiveAccordionTabs, _Plugin);

  function ResponsiveAccordionTabs() {
    _classCallCheck(this, ResponsiveAccordionTabs);

    return _possibleConstructorReturn(this, _getPrototypeOf(ResponsiveAccordionTabs).apply(this, arguments));
  }

  _createClass(ResponsiveAccordionTabs, [{
    key: "_setup",

    /**
     * Creates a new instance of a responsive accordion tabs.
     * @class
     * @name ResponsiveAccordionTabs
     * @fires ResponsiveAccordionTabs#init
     * @param {jQuery} element - jQuery object to make into Responsive Accordion Tabs.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element);
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, this.$element.data(), options);
      this.rules = this.$element.data('responsive-accordion-tabs');
      this.currentMq = null;
      this.currentPlugin = null;
      this.className = 'ResponsiveAccordionTabs'; // ie9 back compat

      if (!this.$element.attr('id')) {
        this.$element.attr('id', GetYoDigits(6, 'responsiveaccordiontabs'));
      }

      this._init();

      this._events();
    }
    /**
     * Initializes the Menu by parsing the classes from the 'data-responsive-accordion-tabs' attribute on the element.
     * @function
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      MediaQuery._init(); // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules


      if (typeof this.rules === 'string') {
        var rulesTree = {}; // Parse rules from "classes" pulled from data attribute

        var rules = this.rules.split(' '); // Iterate through every rule found

        for (var i = 0; i < rules.length; i++) {
          var rule = rules[i].split('-');
          var ruleSize = rule.length > 1 ? rule[0] : 'small';
          var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

          if (MenuPlugins$1[rulePlugin] !== null) {
            rulesTree[ruleSize] = MenuPlugins$1[rulePlugin];
          }
        }

        this.rules = rulesTree;
      }

      this._getAllOptions();

      if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.isEmptyObject(this.rules)) {
        this._checkMediaQueries();
      }
    }
  }, {
    key: "_getAllOptions",
    value: function _getAllOptions() {
      //get all defaults and options
      var _this = this;

      _this.allOptions = {};

      for (var key in MenuPlugins$1) {
        if (MenuPlugins$1.hasOwnProperty(key)) {
          var obj = MenuPlugins$1[key];

          try {
            var dummyPlugin = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<ul></ul>');
            var tmpPlugin = new obj.plugin(dummyPlugin, _this.options);

            for (var keyKey in tmpPlugin.options) {
              if (tmpPlugin.options.hasOwnProperty(keyKey) && keyKey !== 'zfPlugin') {
                var objObj = tmpPlugin.options[keyKey];
                _this.allOptions[keyKey] = objObj;
              }
            }

            tmpPlugin.destroy();
          } catch (e) {}
        }
      }
    }
    /**
     * Initializes events for the Menu.
     * @function
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      this._changedZfMediaQueryHandler = this._checkMediaQueries.bind(this);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._changedZfMediaQueryHandler);
    }
    /**
     * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
     * @function
     * @private
     */

  }, {
    key: "_checkMediaQueries",
    value: function _checkMediaQueries() {
      var matchedMq,
          _this = this; // Iterate through each rule and find the last matching rule


      __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(this.rules, function (key) {
        if (MediaQuery.atLeast(key)) {
          matchedMq = key;
        }
      }); // No match? No dice

      if (!matchedMq) return; // Plugin already initialized? We good

      if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return; // Remove existing plugin-specific CSS classes

      __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(MenuPlugins$1, function (key, value) {
        _this.$element.removeClass(value.cssClass);
      }); // Add the CSS class for the new plugin

      this.$element.addClass(this.rules[matchedMq].cssClass); // Create an instance of the new plugin

      if (this.currentPlugin) {
        //don't know why but on nested elements data zfPlugin get's lost
        if (!this.currentPlugin.$element.data('zfPlugin') && this.storezfData) this.currentPlugin.$element.data('zfPlugin', this.storezfData);
        this.currentPlugin.destroy();
      }

      this._handleMarkup(this.rules[matchedMq].cssClass);

      this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
      this.storezfData = this.currentPlugin.$element.data('zfPlugin');
    }
  }, {
    key: "_handleMarkup",
    value: function _handleMarkup(toSet) {
      var _this = this,
          fromString = 'accordion';

      var $panels = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-tabs-content=' + this.$element.attr('id') + ']');
      if ($panels.length) fromString = 'tabs';

      if (fromString === toSet) {
        return;
      }
      var tabsTitle = _this.allOptions.linkClass ? _this.allOptions.linkClass : 'tabs-title';
      var tabsPanel = _this.allOptions.panelClass ? _this.allOptions.panelClass : 'tabs-panel';
      this.$element.removeAttr('role');
      var $liHeads = this.$element.children('.' + tabsTitle + ',[data-accordion-item]').removeClass(tabsTitle).removeClass('accordion-item').removeAttr('data-accordion-item');
      var $liHeadsA = $liHeads.children('a').removeClass('accordion-title');

      if (fromString === 'tabs') {
        $panels = $panels.children('.' + tabsPanel).removeClass(tabsPanel).removeAttr('role').removeAttr('aria-hidden').removeAttr('aria-labelledby');
        $panels.children('a').removeAttr('role').removeAttr('aria-controls').removeAttr('aria-selected');
      } else {
        $panels = $liHeads.children('[data-tab-content]').removeClass('accordion-content');
      }
      $panels.css({
        display: '',
        visibility: ''
      });
      $liHeads.css({
        display: '',
        visibility: ''
      });

      if (toSet === 'accordion') {
        $panels.each(function (key, value) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).appendTo($liHeads.get(key)).addClass('accordion-content').attr('data-tab-content', '').removeClass('is-active').css({
            height: ''
          });
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-tabs-content=' + _this.$element.attr('id') + ']').after('<div id="tabs-placeholder-' + _this.$element.attr('id') + '"></div>').detach();
          $liHeads.addClass('accordion-item').attr('data-accordion-item', '');
          $liHeadsA.addClass('accordion-title');
        });
      } else if (toSet === 'tabs') {
        var $tabsContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-tabs-content=' + _this.$element.attr('id') + ']');
        var $placeholder = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#tabs-placeholder-' + _this.$element.attr('id'));

        if ($placeholder.length) {
          $tabsContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div class="tabs-content"></div>').insertAfter($placeholder).attr('data-tabs-content', _this.$element.attr('id'));
          $placeholder.remove();
        } else {
          $tabsContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div class="tabs-content"></div>').insertAfter(_this.$element).attr('data-tabs-content', _this.$element.attr('id'));
        }
        $panels.each(function (key, value) {
          var tempValue = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).appendTo($tabsContent).addClass(tabsPanel);
          var hash = $liHeadsA.get(key).hash.slice(1);
          var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).attr('id') || GetYoDigits(6, 'accordion');

          if (hash !== id) {
            if (hash !== '') {
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).attr('id', hash);
            } else {
              hash = id;
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).attr('id', hash);
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()($liHeadsA.get(key)).attr('href', __WEBPACK_IMPORTED_MODULE_0_jquery___default()($liHeadsA.get(key)).attr('href').replace('#', '') + '#' + hash);
            }
          }
          var isActive = __WEBPACK_IMPORTED_MODULE_0_jquery___default()($liHeads.get(key)).hasClass('is-active');

          if (isActive) {
            tempValue.addClass('is-active');
          }
        });
        $liHeads.addClass(tabsTitle);
      }
    }
    /**
     * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
     * @function
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      if (this.currentPlugin) this.currentPlugin.destroy();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('changed.zf.mediaquery', this._changedZfMediaQueryHandler);
    }
  }]);

  return ResponsiveAccordionTabs;
}(Plugin);

ResponsiveAccordionTabs.defaults = {};

Foundation.addToJquery(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a); // Add Foundation Utils to Foundation global namespace for backwards
// compatibility.

Foundation.rtl = rtl;
Foundation.GetYoDigits = GetYoDigits;
Foundation.transitionend = transitionend;
Foundation.RegExpEscape = RegExpEscape;
Foundation.onLoad = onLoad;
Foundation.Box = Box;
Foundation.onImagesLoaded = onImagesLoaded;
Foundation.Keyboard = Keyboard;
Foundation.MediaQuery = MediaQuery;
Foundation.Motion = Motion;
Foundation.Move = Move;
Foundation.Nest = Nest;
Foundation.Timer = Timer; // Touch and Triggers previously were almost purely sede effect driven,
// so no need to add it to Foundation, just init them.

Touch.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);
Triggers.init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a, Foundation);

MediaQuery._init();

Foundation.plugin(Abide, 'Abide');
Foundation.plugin(Accordion, 'Accordion');
Foundation.plugin(AccordionMenu, 'AccordionMenu');
Foundation.plugin(Drilldown, 'Drilldown');
Foundation.plugin(Dropdown, 'Dropdown');
Foundation.plugin(DropdownMenu, 'DropdownMenu');
Foundation.plugin(Equalizer, 'Equalizer');
Foundation.plugin(Interchange, 'Interchange');
Foundation.plugin(Magellan, 'Magellan');
Foundation.plugin(OffCanvas, 'OffCanvas');
Foundation.plugin(Orbit, 'Orbit');
Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');
Foundation.plugin(Reveal, 'Reveal');
Foundation.plugin(Slider, 'Slider');
Foundation.plugin(SmoothScroll, 'SmoothScroll');
Foundation.plugin(Sticky, 'Sticky');
Foundation.plugin(Tabs, 'Tabs');
Foundation.plugin(Toggler, 'Toggler');
Foundation.plugin(Tooltip, 'Tooltip');
Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');

/* harmony default export */ __webpack_exports__["default"] = (Foundation);

//# sourceMappingURL=foundation.esm.js.map


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports=__webpack_require__(51)

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
    // 调用use时候执行该方法
    install: function (Vue, options) {
        var GLOBLEsize = 0;
        // 声明
        Vue.directive("rightMenu", {
            // 插入时候触发
            bind(el, binding, vnode) {
                // 设置body宽高（为了遮照）
                // document.body.style.position = "fixed";
                // document.body.style.width = "100%";
                // document.body.style.height = "100%";
                // 防止id重复  每次累计加一 
                if(binding.value){
                    let currentSize = GLOBLEsize;
                    if (el.style.position == "") {
                        el.style.position = "relative";
                    }
                    // 设置菜单层级高于遮罩层
                    el.style.zIndex = "99998";
                    /**
                     * 增加一个遮罩层方便我控制菜单显示时候取消其余事件
                     */
                    var Mask = document.createElement("div");
                    var Maskstyle = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:99997;"
                    Mask.style = Maskstyle + "display:none";
                    Mask.setAttribute("id", "TT_MASK");
                    document.body.appendChild(Mask);
                    el.addEventListener("contextmenu", (e) => {
                        // debugger;
                        
                        var e = event || window.event;
                        e.stopPropagation();//阻止冒泡事件
                        e.cancelBubble = true;//阻止冒泡事件ie
                        e.preventDefault();//阻止默认事件 
                        // 隐藏所有菜单
                        for (let i = 0; i < GLOBLEsize; i++) {
                            if (document.getElementById("tt_right_menu" + i)) {
                                document.getElementById("tt_right_menu" + i).style = `display:none`
                            }
                        }
                        // 菜单位置
                        var menuX = e.pageX || e.pageY ? e.pageX : e.clientX + document.body.scrollLeft - document.body.clientLeft;//获取pageX 兼容ie
                        var menuY = e.pageX || e.pageY ? e.pageY : e.clientY + document.body.scrollTop - document.body.clientTop;
                        // 右键显示遮罩层
                        document.getElementById("TT_MASK").style = Maskstyle + "display:block";
                        // 找不到这个节点时候 新增一个menu 用于多个菜单的兼容问题
                        if (!document.getElementById("tt_right_menu" + currentSize)) {
                            // 创建div
                            let boxDiv = document.createElement("div");
                            // 指令的绑定值进行遍历 生成菜单的节点
                            binding.value["menus"].map((item) => {
                                let optionp = document.createElement("div");
                                // 控制icon位置
                                let iconPosition = "";
                                // icon内容
                                let icon = "";
                                // 文字内容
                                let content = "";
                                // 设置节点文字不可选中
                                optionp.setAttribute("unselectable", "on");

                                /**
                                 * 兼容用户没有callback的情况
                                 */
                                if (item.callback) {
                                    optionp.onclick = function(){
                                        // 隐藏菜单的父级节点
                                        optionp.parentNode.style.display = "none";
                                        // 隐藏遮罩层
                                        Mask.style = Maskstyle + "display:none";
                                        
                                        return vnode.context[item.callback](item);
                                    }

                                } else {
                                    // 无callback情况
                                    optionp.onclick = function () {
                                        // 隐藏菜单的父级节点
                                        optionp.parentNode.style.display = "none";
                                        // 隐藏遮罩层
                                        Mask.style = Maskstyle + "display:none";
                                        return false;
                                    }
                                }
                                /**
                                 * 兼容在展开的选项上右击会出现默认右键，以及禁用穿透事件
                                 */
                                optionp.addEventListener("contextmenu", (e) => {
                                    var e = event || window.event;
                                    e.stopPropagation();//阻止冒泡事件
                                    e.cancelBubble = true;//阻止冒泡事件ie
                                    e.preventDefault();//阻止默认事件 
                                })
                                // 如果用户设置了icon
                                if(item.icon){
                                    // 判断icon位置是左还是右面 -》 可扩展为一个函数 让用户更高程度自定义
                                    if(item.iconPosition && (item.iconPosition == "left" || item.iconPosition == "right")){
                                        iconPosition = item.iconPosition
                                    }else{
                                        // 默认值 left
                                        iconPosition = "left";
                                    }
                                    icon = item.icon;
                                }
                                // 判断content文字 也可以升级为一个函数提高可扩展性
                                if (item.content) {
                                    content = item.content;
                                }
                                // 判断icon是否有
                                if(icon != ""){
                                    // 剧左或者右 
                                    if(iconPosition == "right"){
                                        // 生成img
                                        let img = new Image();
                                        img.src = icon;
                                        img.style = (item.iconStyle || "")+"vertical-align:middle;";
                                        optionp.innerHTML = content; 
                                        // 追加到option
                                        optionp.appendChild(img);

                                    }else{
                                        let img = new Image();
                                        img.src = icon;
                                        img.style = (item.iconStyle || "")+"vertical-align:middle;";
                                        optionp.appendChild(img);
                                        optionp.innerHTML += content; 
                                        
                                    }
                                }else{
                                    // 设置文字内容
                                    optionp.innerHTML = content; 
                                }
                                /**
                                 * 兼容屏幕出界的情况；
                                 */
                                optionp.style = `text-align:center;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;margin-block-start: 0em;margin-block-end: 0em;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;${binding.value["optionStyle"] ? binding.value["optionStyle"] : ""};${item["style"] ? item["style"] : ""};`
                                // 追加选项到总菜单
                                boxDiv.appendChild(optionp);
                            })
                            // 设置唯一id
                            boxDiv.setAttribute("id", "tt_right_menu" + currentSize);
                            boxDiv.setAttribute("class", "toby_style");
                            // 菜单的样式
                            boxDiv.style = `background:#fff;color:#333;${binding.value["boxStyle"] ? binding.value["boxStyle"] : ""};position:fixed;z-index:99999;top:${menuY}px;left:${menuX}px;`
                        //    追加到页面
                            document.body.appendChild(boxDiv);
                            let divWidth = boxDiv.clientWidth || boxDiv.offsetWidth;
                            

                        } else {
                            // 节点已经存在则不需要重复创建 节省性能，只需要获取后设置位置即可
                            let boxDiv = document.getElementById("tt_right_menu" + currentSize);
                            boxDiv.style = `color:#333;background:#fff;${binding.value["boxStyle"] ? binding.value["boxStyle"] : ""};position:fixed;z-index:99999;top:${menuY}px;left:${menuX}px;`
                            /**
                              * 判断是否超出屏幕宽度
                              */
                            if (menuX + boxDiv.clientWidth >= document.body.clientWidth) {
                         
                                boxDiv.style.left = menuX - boxDiv.clientWidth + "px";
                            }
                            /**
                             * 判断是否超出屏幕高度
                             */
                            if (menuY + boxDiv.clientHeight >= document.body.clientHeight) {
                                
                                boxDiv.style.top = menuY - boxDiv.clientHeight + "px";
                            }
                        }
                    })
                    // 每次创建都会使得唯一遍量增加 防止重复
                    GLOBLEsize++;
                    // 增加遮罩层的点击事件 （在空白处点击移除右键菜单）-》包含左键和右键点击
                    document.getElementById("TT_MASK").addEventListener("click", () => {
                        if (document.getElementById("tt_right_menu" + currentSize)) {
                            document.getElementById("tt_right_menu" + currentSize).style = `display:none`
                        }
                        document.getElementById("TT_MASK").style = "display:none";
                    })
                    document.getElementById("TT_MASK").addEventListener("contextmenu", () => {
                        if (document.getElementById("tt_right_menu" + currentSize)) {
                            document.getElementById("tt_right_menu" + currentSize).style = `display:none`
                        }
                        document.getElementById("TT_MASK").style = "display:none";
                    })
                }
                    

            },
            unbind(el) {
                // 解绑时候移除右键监听防止影响其他页面
                el.removeEventListener("contextmenu",this,true);
            }
        })
    }
});


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(55)()

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectToString = Object.prototype.toString

module.exports = function(v) {
    return objectToString.apply(v) === '[object Function]'
}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectToString = Object.prototype.toString

module.exports = function(v){
    return !!v && objectToString.call(v) === '[object Object]'
}



/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var camelize     = __webpack_require__(34)
var hyphenate    = __webpack_require__(35)
var toLowerFirst = __webpack_require__(58)
var toUpperFirst = __webpack_require__(36)

var prefixInfo = __webpack_require__(32)
var prefixProperties = __webpack_require__(33)

var docStyle = typeof document == 'undefined'?
                {}:
                document.documentElement.style

module.exports = function(asStylePrefix){

    return function(name, config){
        config = config || {}

        var styleName = toLowerFirst(camelize(name)),
            cssName   = hyphenate(name),

            theName   = asStylePrefix?
                            styleName:
                            cssName,

            thePrefix = prefixInfo.style?
                            asStylePrefix?
                                prefixInfo.style:
                                prefixInfo.css
                            :
                            ''

        if ( styleName in docStyle ) {
            return config.asString?
                              theName :
                            [ theName ]
        }

        //not a valid style name, so we'll return the value with a prefix

        var upperCased     = theName,
            prefixProperty = prefixProperties[cssName],
            result         = []

        if (asStylePrefix){
            upperCased = toUpperFirst(theName)
        }

        if (typeof prefixProperty == 'function'){
            var prefixedCss = prefixProperty(theName, thePrefix) || []
            if (prefixedCss && !Array.isArray(prefixedCss)){
                prefixedCss = [prefixedCss]
            }

            if (prefixedCss.length){
                prefixedCss = prefixedCss.map(function(property){
                    return asStylePrefix?
                                toLowerFirst(camelize(property)):
                                hyphenate(property)

                })
            }

            result = result.concat(prefixedCss)
        }

        if (thePrefix){
            result.push(thePrefix + upperCased)
        }

        result.push(theName)

        if (config.asString || result.length == 1){
            return result[0]
        }

        return result
    }
}

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = /[-\s]+(.)?/g

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var doubleColonRe      = /::/g
var upperToLowerRe     = /([A-Z]+)([A-Z][a-z])/g
var lowerToUpperRe     = /([a-z\d])([A-Z])/g
var underscoreToDashRe = /_/g

module.exports = function(name, separator){

   return name?
           name.replace(doubleColonRe, '/')
                .replace(upperToLowerRe, '$1_$2')
                .replace(lowerToUpperRe, '$1_$2')
                .replace(underscoreToDashRe, separator || '-')
            :
            ''
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(value){
    return value.length?
                value.charAt(0).toLowerCase() + value.substring(1):
                value
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStyleObject = __webpack_require__(37)
var hasOwn        = __webpack_require__(31)

/**
 * @ignore
 * @method toStyleString
 *
 * @param  {Object} styles The object to convert to a style string.
 * @param  {Object} config
 * @param  {Boolean} config.addUnits=true True if you want to add units when numerical values are encountered. Defaults to true
 * @param  {Object}  config.cssUnitless An object whose keys represent css numerical property names that will not be appended with units.
 * @param  {Object}  config.prefixProperties An object whose keys represent css property names that should be prefixed
 * @param  {String}  config.cssUnit='px' The css unit to append to numerical values. Defaults to 'px'
 * @param  {String}  config.scope
 *
 * @return {Object} The object, normalized with css style names
 */
module.exports = function(styles, config){
    styles = toStyleObject(styles, config)

    var result = []
    var prop

    for(prop in styles) if (hasOwn(styles, prop)){
        result.push(prop + ': ' + styles[prop])
    }

    return result.join('; ')
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * vue-highlight-text v1.6.2
 * (c) 2018-present Chanwit Piromplad <kingkong2103@gmail.com>
 * Released under the MIT License.
 */
!function(e,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):e.vueHighlightText=n()}(this,function(){"use strict";var e=__webpack_require__(29).string,n={color:"#00C1E8"},t=function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\<\>]/g,"\\$&")},r=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},i={highlightSearch:function(i,c){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"g",l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:n,o='style="'.concat(e(l),'"'),u=c,p="";if("string"==typeof c){if(/^\s*$/.test(c))return r(i);p=t(u)}else{if(!(Array.isArray(c)&&c.length>0))return console.warn("type is not String or Array"),r(i);if(0===c.filter(function(e){return!/^\s*$/.test(c)}).length)return r(i);p=c.map(function(e){return t(e)}).join("|")}var s=new RegExp("(".concat(p,")"),a);if(s.test(i)){var f=i.replace(s,":;{{:;$&:;}}:;"),g=new RegExp(":;{{:;(".concat(r(p),"):;}}:;"),a);return r(f).replace(g,'<span class="highlighted" '.concat(o,">$1</span>"))}return r(i)},defaultStyle:n,escapeHtml:r,unescapeHtml:function(e){return e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'")}},c=function(e,n,t){var r=n.value,c=r.keyword,l=r.sensitive,o=r.overWriteStyle;if(c&&""!==c){var u,p=(u=i.defaultStyle,JSON.parse(JSON.stringify(u)));(function(e){return!!e&&"{}"!==JSON.stringify(e)})(o)&&(p=Object.assign(p,o));var s=void 0===l||l,f=i.highlightSearch(t,c,function(e){var n="g";return n=e?n:n+"i"}(s),p);e.innerHTML=a(i.escapeHtml(t),f)}else{var g=i.escapeHtml(t);e.innerHTML=a(g,g)}},a=function(e,n){return'<p style="display:none;">'.concat(e,"</p>").concat(n)};return{bind:function(e,n){var t=e.innerHTML+"";e.innerHTML=a(t,t),c(e,n,i.unescapeHtml(t))},componentUpdated:function(e,n,t){var r=i.escapeHtml(t.children[0].text);e.innerHTML=a(r,r),c(e,n,i.unescapeHtml(r))},unbind:function(e){e.innerHTML=e.children[0].innerHTML}}});
//# sourceMappingURL=directive.min.js.map


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * vue-highlight-text v1.6.2
 * (c) 2018-present Chanwit Piromplad <kingkong2103@gmail.com>
 * Released under the MIT License.
 */
!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.vueHighlightText=t()}(this,function(){"use strict";var e=__webpack_require__(29).string,t={color:"#00C1E8"},n=function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\<\>]/g,"\\$&")},r=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},i={highlightSearch:function(i,c){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"g",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t,s='style="'.concat(e(a),'"'),l=c,u="";if("string"==typeof c){if(/^\s*$/.test(c))return r(i);u=n(l)}else{if(!(Array.isArray(c)&&c.length>0))return console.warn("type is not String or Array"),r(i);if(0===c.filter(function(e){return!/^\s*$/.test(c)}).length)return r(i);u=c.map(function(e){return n(e)}).join("|")}var p=new RegExp("(".concat(u,")"),o);if(p.test(i)){var f=i.replace(p,":;{{:;$&:;}}:;"),g=new RegExp(":;{{:;(".concat(r(u),"):;}}:;"),o);return r(f).replace(g,'<span class="highlighted" '.concat(s,">$1</span>"))}return r(i)},defaultStyle:t,escapeHtml:r,unescapeHtml:function(e){return e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'")}},c=function(e,t,n){var r=t.value,c=r.keyword,a=r.sensitive,s=r.overWriteStyle;if(c&&""!==c){var l,u=(l=i.defaultStyle,JSON.parse(JSON.stringify(l)));(function(e){return!!e&&"{}"!==JSON.stringify(e)})(s)&&(u=Object.assign(u,s));var p=void 0===a||a,f=i.highlightSearch(n,c,function(e){var t="g";return t=e?t:t+"i"}(p),u);e.innerHTML=o(i.escapeHtml(n),f)}else{var g=i.escapeHtml(n);e.innerHTML=o(g,g)}},o=function(e,t){return'<p style="display:none;">'.concat(e,"</p>").concat(t)};const a={props:{keyword:{type:[String,Array],required:!0},sensitive:{type:Boolean,default:!0},overWriteStyle:{type:Object,default:function(){return{}}}},directives:{highlight:{bind:function(e,t){var n=e.innerHTML+"";e.innerHTML=o(n,n),c(e,t,i.unescapeHtml(n))},componentUpdated:function(e,t,n){var r=i.escapeHtml(n.children[0].text);e.innerHTML=o(r,r),c(e,t,i.unescapeHtml(r))},unbind:function(e){e.innerHTML=e.children[0].innerHTML}}}};var s=function(){var e=this.$createElement;return(this._self._c||e)("span",{directives:[{name:"highlight",rawName:"v-highlight",value:{keyword:this.keyword,sensitive:this.sensitive,overWriteStyle:this.overWriteStyle},expression:"{keyword, sensitive, overWriteStyle}"}]},[this._t("default")],2)};s._withStripped=!0;return function(e,t,n,r,i,c,o,a){const s=("function"==typeof n?n.options:n)||{};return s.__file="/home/travis/build/TonPC64/vue-highlight-text/src/components/VueHighlightText.vue",s.render||(s.render=e.render,s.staticRenderFns=e.staticRenderFns,s._compiled=!0,i&&(s.functional=!0)),s._scopeId=r,s}({render:s,staticRenderFns:[]},0,a,void 0,!1)});
//# sourceMappingURL=vue-highlight-text.min.js.map


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Vue-html5-editor 1.1.1
 * https://github.com/PeakTai/vue-html5-editor
 * build at Thu Apr 20 2017 16:31:37 GMT+0800 (CST)
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueHtml5Editor = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}

var polyfill = function () {
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function value(searchElement, fromIndex) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined')
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If len is 0, return false.
                if (len === 0) {
                    return false
                }

                // 4. Let n be ? ToInteger(fromIndex).
                //    (If fromIndex is undefined, this step produces the value 0.)
                var n = fromIndex | 0;

                // 5. If n ≥ 0, then
                //  a. Let k be n.
                // 6. Else n < 0,
                //  a. Let k be len + n.
                //  b. If k < 0, let k be 0.
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                // 7. Repeat, while k < len
                while (k < len) {
                    // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                    // b. If SameValueZero(searchElement, elementK) is true, return true.
                    // c. Increase k by 1.
                    // NOTE: === provides the correct "SameValueZero" comparison needed here.
                    if (o[k] === searchElement) {
                        return true
                    }
                    k++;
                }

                // 8. Return false
                return false
            }
        });
    }
    // text.contains()
    if (!Text.prototype.contains) {
        Text.prototype.contains = function contains(node) {
            return this === node
        };
    }
};

var template = "<div> <button type=\"button\" @click=\"$parent.execCommand('justifyLeft')\"> {{$parent.locale[\"left justify\"]}} </button> <button type=\"button\" @click=\"$parent.execCommand('justifyCenter')\"> {{$parent.locale[\"center justify\"]}} </button> <button type=\"button\" @click=\"$parent.execCommand('justifyRight')\"> {{$parent.locale[\"right justify\"]}} </button> </div>";

/**
 * Created by peak on 2017/2/10.
 */
var dashboard = {
    template: template
};

/**
 * text align
 * Created by peak on 16/8/18.
 */
var align = {
    name: 'align',
    icon: 'fa fa-align-center',
    i18n: 'align',
    dashboard: dashboard
};

var template$1 = "<div> <div> <label> <input type=\"radio\" value=\"foreColor\" v-model=\"command\">&nbsp; {{$parent.locale[\"fore color\"]}} </label> <label> <input type=\"radio\" value=\"backColor\" v-model=\"command\">&nbsp; {{$parent.locale[\"background color\"]}} </label> </div> <div> <div v-for=\"color in colors\" :style=\"{'background-color':color}\" class=\"color-card\" @click=\"changeColor(color)\"> </div> <div style=\"clear: both\"></div> </div> </div> ";

__$styleInject(".vue-html5-editor .color-card{margin:2px;width:30px;height:30px;float:left;cursor:pointer}",undefined);

/**
 * Created by peak on 2017/2/10.
 */
var dashboard$1 = {
    template: template$1,
    data: function data(){
        return {
            // foreColor,backColor
            command: 'foreColor',
            colors: [
                '#000000', '#000033', '#000066', '#000099', '#003300', '#003333', '#003366',
                '#003399', '#006600', '#006633', '#009900', '#330000', '#330033', '#330066',
                '#333300', '#333366', '#660000', '#660033', '#663300', '#666600', '#666633',
                '#666666', '#666699', '#990000', '#990033', '#9900CC', '#996600', '#FFCC00',
                '#FFCCCC', '#FFCC99', '#FFFF00', '#FF9900', '#CCFFCC', '#CCFFFF', '#CCFF99'
            ]
        }
    },
    methods: {
        changeColor: function changeColor(color){
            this.$parent.execCommand(this.command, color);
        }
    }
};

/**
 * fore color and back color
 * Created by peak on 16/8/18.
 */
var color = {
    name: 'color',
    icon: 'fa fa-paint-brush',
    i18n: 'color',
    dashboard: dashboard$1
};

/**
 * remove format of selection
 * Created by peak on 16/8/18.
 */
var eraser = {
    name: 'eraser',
    icon: 'fa fa-eraser',
    i18n: 'eraser',
    handler: function handler(editor) {
        editor.execCommand('removeFormat');
    }
};

var template$2 = "<div class=\"dashboard-font\" style=\"line-height: 36px\"> <div> <label>{{$parent.locale[\"heading\"]}}:</label> <button v-for=\"h in 6\" type=\"button\" @click=\"setHeading(h)\">H{{h}}</button> </div> <div> <label> {{$parent.locale[\"font name\"]}}: </label> <button v-for=\"name in nameList\" type=\"button\" @click=\"setFontName(name)\">{{name}}</button> </div> <div> <label> {{$parent.locale[\"font size\"]}}: </label> <button v-for=\"size in fontSizeList\" type=\"button\" @click=\"setFontSize(size)\">{{size}}</button> </div> <div> <label> {{$parent.locale[\"line height\"]}}: </label> <button v-for=\"lh in lineHeightList\" type=\"button\" @click=\"setLineHeight(lh)\"> {{lh}} </button> </div> </div>";

/**
 * Created by peak on 2017/2/14.
 */
var Command = {
    JUSTIFY_LEFT: 'justifyLeft',
    JUSTIFY_CENTER: 'justifyCenter',
    JUSTIFY_RIGHT: 'justifyRight',
    FORE_COLOR: 'foreColor',
    BACK_COLOR: 'backColor',
    REMOVE_FORMAT: 'removeFormat',
    FONT_NAME: 'fontName',
    FONT_SIZE: 'fontSize',
    FORMAT_BLOCK: 'formatBlock',
    LINE_HEIGHT: 'lineHeight',
    INSERT_HORIZONTAL_RULE: 'insertHorizontalRule',
    INSERT_IMAGE: 'insertImage',
    CREATE_LINK: 'createLink',
    INSERT_ORDERED_LIST: 'insertOrderedList',
    INSERT_UNORDERED_LIST: 'insertUnorderedList',
    INSERT_HTML: 'insertHTML',
    BOLD: 'bold',
    ITALIC: 'italic',
    UNDERLINE: 'underline',
    STRIKE_THROUGH: 'strikeThrough',
    SUBSCRIPT: 'subscript',
    SUPERSCRIPT: 'superscript',
    UNDO: 'undo',
    UNLINK: 'unlink'
};

/**
 * Created by peak on 2017/2/10.
 */
var dashboard$2 = {
    template: template$2,
    data: function data(){
        return {
            nameList: [
                'Microsoft YaHei',
                'Helvetica Neue',
                'Helvetica',
                'Arial',
                'sans-serif',
                'Verdana',
                'Georgia',
                'Times New Roman',
                'Trebuchet MS',
                'Microsoft JhengHei',
                'Courier New',
                'Impact',
                'Comic Sans MS',
                'Consolas'
            ],
            lineHeightList: [
                '1.0', '1.2', '1.5', '1.8', '2.0', '2.5', '3.0'
            ],
            fontSizeList: [
                '12px', '14px', '16px', '18px', '20px', '22px', '24px'
            ]
        }
    },
    methods: {
        setFontName: function setFontName(name){
            this.$parent.execCommand('fontName', name);
        },
        setFontSize: function setFontSize(size){
            this.$parent.execCommand('fontSize', size);
        },
        setHeading: function setHeading(heading){
            this.$parent.execCommand('formatBlock', ("h" + heading));
        },
        setLineHeight: function setLineHeight(lh){
            this.$parent.execCommand(Command.LINE_HEIGHT, lh);
        }
    },
    created: function created(){
        var config = this.$options.module.config;
        // font name
        if (!config) {
            return
        }
        if (Array.isArray(config.fontNames)) {
            this.nameList = config.fontNames;
        }
    }
};

/**
 * font name and font size
 * Created by peak on 16/8/18.
 */
var font = {
    name: 'font',
    icon: 'fa fa-font',
    i18n: 'font',
    dashboard: dashboard$2
};

/**
 * toggle full screen mode
 * Created by peak on 16/8/18.
 */
var fullScreen$1 = {
    name: 'full-screen',
    icon: 'fa fa-arrows-alt',
    i18n: 'full screen',
    handler: function handler(editor) {
        editor.toggleFullScreen();
    }
};

/**
 * hr
 * Created by peak on 16/8/20.
 */
var hr = {
    name: 'hr',
    icon: 'fa fa-minus',
    i18n: 'hr',
    handler: function handler(editor) {
        editor.execCommand('insertHorizontalRule');
    }
    // init (editor) {
    //
    // },
    // destroyed(editor){
    //
    // },
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lrz_all_bundle = createCommonjsModule(function (module, exports) {
!function(e,t){if("object"==typeof exports&&"object"==typeof module){ module.exports=t(); }else if(false){ undefined([],t); }else{var n=t();for(var r in n){ ("object"==typeof exports?exports:e)[r]=n[r]; }}}(commonjsGlobal,function(){return function(e){function t(r){if(n[r]){ return n[r].exports; }var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(6),n(7),e.exports=n(8);},function(e,t,n){(function(t){!function(n){function r(e,t){return function(){e.apply(t,arguments);}}function i(e){if("object"!=typeof this){ throw new TypeError("Promises must be constructed via new"); }if("function"!=typeof e){ throw new TypeError("not a function"); }this._state=null,this._value=null,this._deferreds=[],l(e,r(a,this),r(s,this));}function o(e){var t=this;return null===this._state?void this._deferreds.push(e):void f(function(){var n=t._state?e.onFulfilled:e.onRejected;if(null===n){ return void(t._state?e.resolve:e.reject)(t._value); }var r;try{r=n(t._value);}catch(i){return void e.reject(i)}e.resolve(r);})}function a(e){try{if(e===this){ throw new TypeError("A promise cannot be resolved with itself."); }if(e&&("object"==typeof e||"function"==typeof e)){var t=e.then;if("function"==typeof t){ return void l(r(t,e),r(a,this),r(s,this)) }}this._state=!0,this._value=e,u.call(this);}catch(n){s.call(this,n);}}function s(e){this._state=!1,this._value=e,u.call(this);}function u(){
var this$1 = this;
for(var e=0,t=this._deferreds.length;t>e;e++){ o.call(this$1,this$1._deferreds[e]); }this._deferreds=null;}function c(e,t,n,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=r;}function l(e,t,n){var r=!1;try{e(function(e){r||(r=!0,t(e));},function(e){r||(r=!0,n(e));});}catch(i){if(r){ return; }r=!0,n(i);}}var f="function"==typeof t&&t||function(e){setTimeout(e,1);},d=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};i.prototype["catch"]=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=this;return new i(function(r,i){o.call(n,new c(e,t,r,i));})},i.all=function(){var e=Array.prototype.slice.call(1===arguments.length&&d(arguments[0])?arguments[0]:arguments);return new i(function(t,n){function r(o,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s){ return void s.call(a,function(e){r(o,e);},n) }}e[o]=a,0===--i&&t(e);}catch(u){n(u);}}if(0===e.length){ return t([]); }for(var i=e.length,o=0;o<e.length;o++){ r(o,e[o]); }})},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i(function(t){t(e);})},i.reject=function(e){return new i(function(t,n){n(e);})},i.race=function(e){return new i(function(t,n){for(var r=0,i=e.length;i>r;r++){ e[r].then(t,n); }})},i._setImmediateFn=function(e){f=e;},i.prototype.always=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){throw n})})},"undefined"!=typeof e&&e.exports?e.exports=i:n.Promise||(n.Promise=i);}(this);}).call(t,n(2).setImmediate);},function(e,t,n){(function(e,r){function i(e,t){this._id=e,this._clearFn=t;}var o=n(3).nextTick,a=Function.prototype.apply,s=Array.prototype.slice,u={},c=0;t.setTimeout=function(){return new i(a.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new i(a.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e.close();},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(window,this._id);},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t;},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1;},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout();},t));},t.setImmediate="function"==typeof e?e:function(e){var n=c++,r=arguments.length<2?!1:s.call(arguments,1);return u[n]=!0,o(function(){u[n]&&(r?e.apply(null,r):e.call(null),t.clearImmediate(n));}),n},t.clearImmediate="function"==typeof r?r:function(e){delete u[e];};}).call(t,n(2).setImmediate,n(2).clearImmediate);},function(e,t){function n(){c=!1,a.length?u=a.concat(u):l=-1,u.length&&r();}function r(){if(!c){var e=setTimeout(n);c=!0;for(var t=u.length;t;){for(a=u,u=[];++l<t;){ a&&a[l].run(); }l=-1,t=u.length;}a=null,c=!1,clearTimeout(e);}}function i(e,t){this.fun=e,this.array=t;}function o(){}var a,s=e.exports={},u=[],c=!1,l=-1;s.nextTick=function(e){
var arguments$1 = arguments;
var t=new Array(arguments.length-1);if(arguments.length>1){ for(var n=1;n<arguments.length;n++){ t[n-1]=arguments$1[n]; } }u.push(new i(e,t)),1!==u.length||c||setTimeout(r,0);},i.prototype.run=function(){this.fun.apply(null,this.array);},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=o,s.addListener=o,s.once=o,s.off=o,s.removeListener=o,s.removeAllListeners=o,s.emit=o,s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0};},function(e,t){function n(){var e=~navigator.userAgent.indexOf("Android")&&~navigator.vendor.indexOf("Google")&&!~navigator.userAgent.indexOf("Chrome");return e&&navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop()<=534||/MQQBrowser/g.test(navigator.userAgent)}var r=function(){try{return new Blob,!0}catch(e){return!1}}()?window.Blob:function(e,t){var n=new(window.BlobBuilder||window.WebKitBlobBuilder||window.MSBlobBuilder||window.MozBlobBuilder);return e.forEach(function(e){n.append(e);}),n.getBlob(t?t.type:void 0)},i=function(){function e(){var e=this,n=[],i=Array(21).join("-")+(+new Date*(1e16*Math.random())).toString(36),o=XMLHttpRequest.prototype.send;this.getParts=function(){return n.toString()},this.append=function(e,t,r){n.push("--"+i+'\r\nContent-Disposition: form-data; name="'+e+'"'),t instanceof Blob?(n.push('; filename="'+(r||"blob")+'"\r\nContent-Type: '+t.type+"\r\n\r\n"),n.push(t)):n.push("\r\n\r\n"+t),n.push("\r\n");},t++,XMLHttpRequest.prototype.send=function(a){var s,u,c=this;a===e?(n.push("--"+i+"--\r\n"),u=new r(n),s=new FileReader,s.onload=function(){o.call(c,s.result);},s.onerror=function(e){throw e},s.readAsArrayBuffer(u),this.setRequestHeader("Content-Type","multipart/form-data; boundary="+i),t--,0==t&&(XMLHttpRequest.prototype.send=o)):o.call(this,a);};}var t=0;return e.prototype=Object.create(FormData.prototype),e}();e.exports={Blob:r,FormData:n()?i:FormData};},function(e,t,n){var r,i;(function(){function n(e){return!!e.exifdata}function o(e,t){t=t||e.match(/^data\:([^\;]+)\;base64,/im)[1]||"",e=e.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var n=atob(e),r=n.length,i=new ArrayBuffer(r),o=new Uint8Array(i),a=0;r>a;a++){ o[a]=n.charCodeAt(a); }return i}function a(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="blob",n.onload=function(e){(200==this.status||0===this.status)&&t(this.response);},n.send();}function s(e,t){function n(n){var r=u(n),i=c(n);e.exifdata=r||{},e.iptcdata=i||{},t&&t.call(e);}if(e.src){ if(/^data\:/i.test(e.src)){var r=o(e.src);n(r);}else if(/^blob\:/i.test(e.src)){var i=new FileReader;i.onload=function(e){n(e.target.result);},a(e.src,function(e){i.readAsArrayBuffer(e);});}else{var s=new XMLHttpRequest;s.onload=function(){200==this.status||0===this.status?n(s.response):t(new Error("Could not load image")),s=null;},s.open("GET",e.src,!0),s.responseType="arraybuffer",s.send(null);} }else if(window.FileReader&&(e instanceof window.Blob||e instanceof window.File)){var i=new FileReader;i.onload=function(e){p&&console.log("Got file of length "+e.target.result.byteLength),n(e.target.result);},i.readAsArrayBuffer(e);}}function u(e){var t=new DataView(e);if(p&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1)){ return p&&console.log("Not a valid JPEG"),!1; }for(var n,r=2,i=e.byteLength;i>r;){if(255!=t.getUint8(r)){ return p&&console.log("Not a valid marker at offset "+r+", found: "+t.getUint8(r)),!1; }if(n=t.getUint8(r+1),p&&console.log(n),225==n){ return p&&console.log("Found 0xFFE1 marker"),g(t,r+4,t.getUint16(r+2)-2); }r+=2+t.getUint16(r+2);}}function c(e){var t=new DataView(e);if(p&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1)){ return p&&console.log("Not a valid JPEG"),!1; }for(var n=2,r=e.byteLength,i=function(e,t){return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5)};r>n;){if(i(t,n)){var o=t.getUint8(n+7);o%2!==0&&(o+=1),0===o&&(o=4);var a=n+8+o,s=t.getUint16(n+6+o);return l(e,a,s)}n++;}}function l(e,t,n){for(var r,i,o,a,s,u=new DataView(e),c={},l=t;t+n>l;){ 28===u.getUint8(l)&&2===u.getUint8(l+1)&&(a=u.getUint8(l+2),a in S&&(o=u.getInt16(l+3),s=o+5,i=S[a],r=h(u,l+5,o),c.hasOwnProperty(i)?c[i]instanceof Array?c[i].push(r):c[i]=[c[i],r]:c[i]=r)),l++; }return c}function f(e,t,n,r,i){var o,a,s,u=e.getUint16(n,!i),c={};for(s=0;u>s;s++){ o=n+12*s+2,a=r[e.getUint16(o,!i)],!a&&p&&console.log("Unknown tag: "+e.getUint16(o,!i)),c[a]=d(e,o,t,n,i); }return c}function d(e,t,n,r,i){var o,a,s,u,c,l,f=e.getUint16(t+2,!i),d=e.getUint32(t+4,!i),g=e.getUint32(t+8,!i)+n;switch(f){case 1:case 7:if(1==d){ return e.getUint8(t+8,!i); }for(o=d>4?g:t+8,a=[],u=0;d>u;u++){ a[u]=e.getUint8(o+u); }return a;case 2:return o=d>4?g:t+8,h(e,o,d-1);case 3:if(1==d){ return e.getUint16(t+8,!i); }for(o=d>2?g:t+8,a=[],u=0;d>u;u++){ a[u]=e.getUint16(o+2*u,!i); }return a;case 4:if(1==d){ return e.getUint32(t+8,!i); }for(a=[],u=0;d>u;u++){ a[u]=e.getUint32(g+4*u,!i); }return a;case 5:if(1==d){ return c=e.getUint32(g,!i),l=e.getUint32(g+4,!i),s=new Number(c/l),s.numerator=c,s.denominator=l,s; }for(a=[],u=0;d>u;u++){ c=e.getUint32(g+8*u,!i),l=e.getUint32(g+4+8*u,!i),a[u]=new Number(c/l),a[u].numerator=c,a[u].denominator=l; }return a;case 9:if(1==d){ return e.getInt32(t+8,!i); }for(a=[],u=0;d>u;u++){ a[u]=e.getInt32(g+4*u,!i); }return a;case 10:if(1==d){ return e.getInt32(g,!i)/e.getInt32(g+4,!i); }for(a=[],u=0;d>u;u++){ a[u]=e.getInt32(g+8*u,!i)/e.getInt32(g+4+8*u,!i); }return a}}function h(e,t,n){var r,i="";for(r=t;t+n>r;r++){ i+=String.fromCharCode(e.getUint8(r)); }return i}function g(e,t){if("Exif"!=h(e,t,4)){ return p&&console.log("Not valid EXIF data! "+h(e,t,4)),!1; }var n,r,i,o,a,s=t+6;if(18761==e.getUint16(s)){ n=!1; }else{if(19789!=e.getUint16(s)){ return p&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1; }n=!0;}if(42!=e.getUint16(s+2,!n)){ return p&&console.log("Not valid TIFF data! (no 0x002A)"),!1; }var u=e.getUint32(s+4,!n);if(8>u){ return p&&console.log("Not valid TIFF data! (First offset less than 8)",e.getUint32(s+4,!n)),!1; }if(r=f(e,s,s+u,v,n),r.ExifIFDPointer){o=f(e,s,s+r.ExifIFDPointer,w,n);for(i in o){switch(i){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":o[i]=b[i][o[i]];break;case"ExifVersion":case"FlashpixVersion":o[i]=String.fromCharCode(o[i][0],o[i][1],o[i][2],o[i][3]);break;case"ComponentsConfiguration":o[i]=b.Components[o[i][0]]+b.Components[o[i][1]]+b.Components[o[i][2]]+b.Components[o[i][3]];}r[i]=o[i];}}if(r.GPSInfoIFDPointer){a=f(e,s,s+r.GPSInfoIFDPointer,y,n);for(i in a){switch(i){case"GPSVersionID":a[i]=a[i][0]+"."+a[i][1]+"."+a[i][2]+"."+a[i][3];}r[i]=a[i];}}return r}var p=!1,m=function(e){return e instanceof m?e:this instanceof m?void(this.EXIFwrapped=e):new m(e)};"undefined"!=typeof e&&e.exports&&(t=e.exports=m),t.EXIF=m;var w=m.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},v=m.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},y=m.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},b=m.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},S={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};m.getData=function(e,t){return(e instanceof Image||e instanceof HTMLImageElement)&&!e.complete?!1:(n(e)?t&&t.call(e):s(e,t),!0)},m.getTag=function(e,t){return n(e)?e.exifdata[t]:void 0},m.getAllTags=function(e){if(!n(e)){ return{}; }var t,r=e.exifdata,i={};for(t in r){ r.hasOwnProperty(t)&&(i[t]=r[t]); }return i},m.pretty=function(e){if(!n(e)){ return""; }var t,r=e.exifdata,i="";for(t in r){ r.hasOwnProperty(t)&&(i+="object"==typeof r[t]?r[t]instanceof Number?t+" : "+r[t]+" ["+r[t].numerator+"/"+r[t].denominator+"]\r\n":t+" : ["+r[t].length+" values]\r\n":t+" : "+r[t]+"\r\n"); }return i},m.readFromBinaryFile=function(e){return u(e)},r=[],i=function(){return m}.apply(t,r),!(void 0!==i&&(e.exports=i));}).call(this);},function(e,t,n){var r,i;!function(){function n(e){var t=e.naturalWidth,n=e.naturalHeight;if(t*n>1048576){var r=document.createElement("canvas");r.width=r.height=1;var i=r.getContext("2d");return i.drawImage(e,-t+1,0),0===i.getImageData(0,0,1,1).data[3]}return!1}function o(e,t,n){var r=document.createElement("canvas");r.width=1,r.height=n;var i=r.getContext("2d");i.drawImage(e,0,0);for(var o=i.getImageData(0,0,1,n).data,a=0,s=n,u=n;u>a;){var c=o[4*(u-1)+3];0===c?s=u:a=u,u=s+a>>1;}var l=u/n;return 0===l?1:l}function a(e,t,n){var r=document.createElement("canvas");return s(e,r,t,n),r.toDataURL("image/jpeg",t.quality||.8)}function s(e,t,r,i){var a=e.naturalWidth,s=e.naturalHeight,c=r.width,l=r.height,f=t.getContext("2d");f.save(),u(t,f,c,l,r.orientation);var d=n(e);d&&(a/=2,s/=2);var h=1024,g=document.createElement("canvas");g.width=g.height=h;for(var p=g.getContext("2d"),m=i?o(e,a,s):1,w=Math.ceil(h*c/a),v=Math.ceil(h*l/s/m),y=0,b=0;s>y;){for(var S=0,I=0;a>S;){ p.clearRect(0,0,h,h),p.drawImage(e,-S,-y),f.drawImage(g,0,0,h,h,I,b,w,v),S+=h,I+=w; }y+=h,b+=v;}f.restore(),g=p=null;}function u(e,t,n,r,i){switch(i){case 5:case 6:case 7:case 8:e.width=r,e.height=n;break;default:e.width=n,e.height=r;}switch(i){case 2:t.translate(n,0),t.scale(-1,1);break;case 3:t.translate(n,r),t.rotate(Math.PI);break;case 4:t.translate(0,r),t.scale(1,-1);break;case 5:t.rotate(.5*Math.PI),t.scale(1,-1);break;case 6:t.rotate(.5*Math.PI),t.translate(0,-r);break;case 7:t.rotate(.5*Math.PI),t.translate(n,-r),t.scale(-1,1);break;case 8:t.rotate(-.5*Math.PI),t.translate(-n,0);}}function c(e){if(window.Blob&&e instanceof Blob){var t=new Image,n=window.URL&&window.URL.createObjectURL?window.URL:window.webkitURL&&window.webkitURL.createObjectURL?window.webkitURL:null;if(!n){ throw Error("No createObjectURL function found to create blob url"); }t.src=n.createObjectURL(e),this.blob=e,e=t;}if(!e.naturalWidth&&!e.naturalHeight){var r=this;e.onload=function(){var e=r.imageLoadListeners;if(e){r.imageLoadListeners=null;for(var t=0,n=e.length;n>t;t++){ e[t](); }}},this.imageLoadListeners=[];}this.srcImage=e;}c.prototype.render=function(e,t,n){if(this.imageLoadListeners){var r=this;return void this.imageLoadListeners.push(function(){r.render(e,t,n);})}t=t||{};var i=this.srcImage,o=i.src,u=o.length,c=i.naturalWidth,l=i.naturalHeight,f=t.width,d=t.height,h=t.maxWidth,g=t.maxHeight,p=this.blob&&"image/jpeg"===this.blob.type||0===o.indexOf("data:image/jpeg")||o.indexOf(".jpg")===u-4||o.indexOf(".jpeg")===u-5;f&&!d?d=l*f/c<<0:d&&!f?f=c*d/l<<0:(f=c,d=l),h&&f>h&&(f=h,d=l*f/c<<0),g&&d>g&&(d=g,f=c*d/l<<0);var m={width:f,height:d};for(var w in t){ m[w]=t[w]; }var v=e.tagName.toLowerCase();"img"===v?e.src=a(this.srcImage,m,p):"canvas"===v&&s(this.srcImage,e,m,p),"function"==typeof this.onrender&&this.onrender(e),n&&n();},r=[],i=function(){return c}.apply(t,r),!(void 0!==i&&(e.exports=i));}();},function(e,t){function n(e){function t(e){for(var t=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],n=0;64>n;n++){var r=F((t[n]*e+50)/100);1>r?r=1:r>255&&(r=255),D[N[n]]=r;}for(var i=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],o=0;64>o;o++){var a=F((i[o]*e+50)/100);1>a?a=1:a>255&&(a=255),x[N[o]]=a;}for(var s=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],u=0,c=0;8>c;c++){ for(var l=0;8>l;l++){ U[u]=1/(D[N[u]]*s[c]*s[l]*8),C[u]=1/(x[N[u]]*s[c]*s[l]*8),u++; } }}function n(e,t){for(var n=0,r=0,i=new Array,o=1;16>=o;o++){for(var a=1;a<=e[o];a++){ i[t[r]]=[],i[t[r]][0]=n,i[t[r]][1]=o,r++,n++; }n*=2;}return i}function r(){y=n(W,H),b=n(V,X),S=n(z,q),I=n(Q,Y);}function i(){for(var e=1,t=2,n=1;15>=n;n++){for(var r=e;t>r;r++){ A[32767+r]=n,T[32767+r]=[],T[32767+r][1]=n,T[32767+r][0]=r; }for(var i=-(t-1);-e>=i;i++){ A[32767+i]=n,T[32767+i]=[],T[32767+i][1]=n,T[32767+i][0]=t-1+i; }e<<=1,t<<=1;}}function o(){for(var e=0;256>e;e++){ k[e]=19595*e,k[e+256>>0]=38470*e,k[e+512>>0]=7471*e+32768,k[e+768>>0]=-11059*e,k[e+1024>>0]=-21709*e,k[e+1280>>0]=32768*e+8421375,k[e+1536>>0]=-27439*e,k[e+1792>>0]=-5329*e; }}function a(e){for(var t=e[0],n=e[1]-1;n>=0;){ t&1<<n&&(G|=1<<O),n--,O--,0>O&&(255==G?(s(255),s(0)):s(G),O=7,G=0); }}function s(e){M.push(j[e]);}function u(e){s(e>>8&255),s(255&e);}function c(e,t){var n,r,i,o,a,s,u,c,l,f=0;var d=8,h=64;for(l=0;d>l;++l){n=e[f],r=e[f+1],i=e[f+2],o=e[f+3],a=e[f+4],s=e[f+5],u=e[f+6],c=e[f+7];var g=n+c,p=n-c,m=r+u,w=r-u,v=i+s,y=i-s,b=o+a,S=o-a,I=g+b,P=g-b,F=m+v,D=m-v;e[f]=I+F,e[f+4]=I-F;var x=.707106781*(D+P);e[f+2]=P+x,e[f+6]=P-x,I=S+y,F=y+w,D=w+p;var U=.382683433*(I-D),C=.5411961*I+U,T=1.306562965*D+U,A=.707106781*F,R=p+A,M=p-A;e[f+5]=M+C,e[f+3]=M-C,e[f+1]=R+T,e[f+7]=R-T,f+=8;}for(f=0,l=0;d>l;++l){n=e[f],r=e[f+8],i=e[f+16],o=e[f+24],a=e[f+32],s=e[f+40],u=e[f+48],c=e[f+56];var G=n+c,O=n-c,_=r+u,B=r-u,E=i+s,j=i-s,k=o+a,N=o-a,W=G+k,H=G-k,z=_+E,q=_-E;e[f]=W+z,e[f+32]=W-z;var V=.707106781*(q+H);e[f+16]=H+V,e[f+48]=H-V,W=N+j,z=j+B,q=B+O;var X=.382683433*(W-q),Q=.5411961*W+X,Y=1.306562965*q+X,K=.707106781*z,J=O+K,Z=O-K;e[f+40]=Z+Q,e[f+24]=Z-Q,e[f+8]=J+Y,e[f+56]=J-Y,f++;}var $;for(l=0;h>l;++l){ $=e[l]*t[l],L[l]=$>0?$+.5|0:$-.5|0; }return L}function l(){u(65504),u(16),s(74),s(70),s(73),s(70),s(0),s(1),s(1),s(0),u(1),u(1),s(0),s(0);}function f(e,t){u(65472),u(17),s(8),u(t),u(e),s(3),s(1),s(17),s(0),s(2),s(17),s(1),s(3),s(17),s(1);}function d(){u(65499),u(132),s(0);for(var e=0;64>e;e++){ s(D[e]); }s(1);for(var t=0;64>t;t++){ s(x[t]); }}function h(){u(65476),u(418),s(0);for(var e=0;16>e;e++){ s(W[e+1]); }for(var t=0;11>=t;t++){ s(H[t]); }s(16);for(var n=0;16>n;n++){ s(z[n+1]); }for(var r=0;161>=r;r++){ s(q[r]); }s(1);for(var i=0;16>i;i++){ s(V[i+1]); }for(var o=0;11>=o;o++){ s(X[o]); }s(17);for(var a=0;16>a;a++){ s(Q[a+1]); }for(var c=0;161>=c;c++){ s(Y[c]); }}function g(){u(65498),u(12),s(3),s(1),s(0),s(2),s(17),s(3),s(17),s(0),s(63),s(0);}function p(e,t,n,r,i){var o,s=i[0],u=i[240];var l=16,f=63,d=64;for(var h=c(e,t),g=0;d>g;++g){ R[N[g]]=h[g]; }var p=R[0]-n;n=R[0],0==p?a(r[0]):(o=32767+p,a(r[A[o]]),a(T[o]));for(var m=63;m>0&&0==R[m];m--){  }if(0==m){ return a(s),n; }for(var w,v=1;m>=v;){for(var y=v;0==R[v]&&m>=v;++v){  }var b=v-y;if(b>=l){w=b>>4;for(var S=1;w>=S;++S){ a(u); }b=15&b;}o=32767+R[v],a(i[(b<<4)+A[o]]),a(T[o]),v++;}return m!=f&&a(s),n}function m(){for(var e=String.fromCharCode,t=0;256>t;t++){ j[t]=e(t); }}function w(e){if(0>=e&&(e=1),e>100&&(e=100),P!=e){var n=0;n=50>e?Math.floor(5e3/e):Math.floor(200-2*e),t(n),P=e;}}function v(){var t=(new Date).getTime();e||(e=50),m(),r(),i(),o(),w(e);(new Date).getTime()-t;}var y,b,S,I,P,F=(Math.round,Math.floor),D=new Array(64),x=new Array(64),U=new Array(64),C=new Array(64),T=new Array(65535),A=new Array(65535),L=new Array(64),R=new Array(64),M=[],G=0,O=7,_=new Array(64),B=new Array(64),E=new Array(64),j=new Array(256),k=new Array(2048),N=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],W=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],H=[0,1,2,3,4,5,6,7,8,9,10,11],z=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],q=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],V=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],X=[0,1,2,3,4,5,6,7,8,9,10,11],Q=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],Y=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];this.encode=function(e,t,n){var r=(new Date).getTime();t&&w(t),M=new Array,G=0,O=7,u(65496),l(),d(),f(e.width,e.height),h(),g();var i=0,o=0,s=0;G=0,O=7,this.encode.displayName="_encode_";for(var c,m,v,P,F,D,x,T,A,L=e.data,R=e.width,j=e.height,N=4*R,W=0;j>W;){for(c=0;N>c;){for(F=N*W+c,D=F,x=-1,T=0,A=0;64>A;A++){ T=A>>3,x=4*(7&A),D=F+T*N+x,W+T>=j&&(D-=N*(W+1+T-j)),c+x>=N&&(D-=c+x-N+4),m=L[D++],v=L[D++],P=L[D++],_[A]=(k[m]+k[v+256>>0]+k[P+512>>0]>>16)-128,B[A]=(k[m+768>>0]+k[v+1024>>0]+k[P+1280>>0]>>16)-128,E[A]=(k[m+1280>>0]+k[v+1536>>0]+k[P+1792>>0]>>16)-128; }i=p(_,U,i,y,S),o=p(B,C,o,b,I),s=p(E,C,s,b,I),c+=32;}W+=8;}if(O>=0){var H=[];H[1]=O+1,H[0]=(1<<O+1)-1,a(H);}if(u(65497),n){for(var z=M.length,q=new Uint8Array(z),V=0;z>V;V++){ q[V]=M[V].charCodeAt(); }M=[];(new Date).getTime()-r;return q}var X="data:image/jpeg;base64,"+btoa(M.join(""));M=[];(new Date).getTime()-r;return X},v();}e.exports=n;},function(e,t,n){function r(e,t){var n=this;if(!e){ throw new Error("没有收到图片，可能的解决方案：https://github.com/think2011/localResizeIMG/issues/7"); }t=t||{},n.defaults={width:null,height:null,fieldName:"file",quality:.7},n.file=e;for(var r in t){ t.hasOwnProperty(r)&&(n.defaults[r]=t[r]); }return this.init()}function i(e){var t=null;return t=e?[].filter.call(document.scripts,function(t){return-1!==t.src.indexOf(e)})[0]:document.scripts[document.scripts.length-1],t?t.src.substr(0,t.src.lastIndexOf("/")):null}function o(e){var t;t=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):unescape(e.split(",")[1]);for(var n=e.split(",")[0].split(":")[1].split(";")[0],r=new Uint8Array(t.length),i=0;i<t.length;i++){ r[i]=t.charCodeAt(i); }return new s.Blob([r.buffer],{type:n})}n.p=i("lrz")+"/",window.URL=window.URL||window.webkitURL;var a=n(1),s=n(4),u=n(5),c=function(e){var t=/OS (\d)_.* like Mac OS X/g.exec(e),n=/Android (\d.*?);/g.exec(e)||/Android\/(\d.*?) /g.exec(e);return{oldIOS:t?+t.pop()<8:!1,oldAndroid:n?+n.pop().substr(0,3)<4.5:!1,iOS:/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(e),android:/Android/g.test(e),mQQBrowser:/MQQBrowser/g.test(e)}}(navigator.userAgent);r.prototype.init=function(){var e=this,t=e.file,n="string"==typeof t,r=/^data:/.test(t),i=new Image,u=document.createElement("canvas"),c=n?t:URL.createObjectURL(t);if(e.img=i,e.blob=c,e.canvas=u,n?e.fileName=r?"base64.jpg":t.split("/").pop():e.fileName=t.name,!document.createElement("canvas").getContext){ throw new Error("浏览器不支持canvas"); }return new a(function(n,a){i.onerror=function(){var e=new Error("加载图片文件失败");throw a(e),e},i.onload=function(){e._getBase64().then(function(e){if(e.length<10){var t=new Error("生成base64失败");throw a(t),t}return e}).then(function(r){var i=null;"object"==typeof e.file&&r.length>e.file.size?(i=new FormData,t=e.file):(i=new s.FormData,t=o(r)),i.append(e.defaults.fieldName,t,e.fileName.replace(/\..+/g,".jpg")),n({formData:i,fileLen:+t.size,base64:r,base64Len:r.length,origin:e.file,file:t});for(var a in e){ e.hasOwnProperty(a)&&(e[a]=null); }URL.revokeObjectURL(e.blob);});},!r&&(i.crossOrigin="*"),i.src=c;})},r.prototype._getBase64=function(){var e=this,t=e.img,n=e.file,r=e.canvas;return new a(function(i){try{u.getData("object"==typeof n?n:t,function(){e.orientation=u.getTag(this,"Orientation"),e.resize=e._getResize(),e.ctx=r.getContext("2d"),r.width=e.resize.width,r.height=e.resize.height,e.ctx.fillStyle="#fff",e.ctx.fillRect(0,0,r.width,r.height),c.oldIOS?e._createBase64ForOldIOS().then(i):e._createBase64().then(i);});}catch(o){throw new Error(o)}})},r.prototype._createBase64ForOldIOS=function(){var e=this,t=e.img,r=e.canvas,i=e.defaults,o=e.orientation;return new a(function(e){!function(){var a=[n(6)];(function(n){var a=new n(t);"5678".indexOf(o)>-1?a.render(r,{width:r.height,height:r.width,orientation:o}):a.render(r,{width:r.width,height:r.height,orientation:o}),e(r.toDataURL("image/jpeg",i.quality));}).apply(null,a);}();})},r.prototype._createBase64=function(){var e=this,t=e.resize,r=e.img,i=e.canvas,o=e.ctx,s=e.defaults,u=e.orientation;switch(u){case 3:o.rotate(180*Math.PI/180),o.drawImage(r,-t.width,-t.height,t.width,t.height);break;case 6:o.rotate(90*Math.PI/180),o.drawImage(r,0,-t.width,t.height,t.width);break;case 8:o.rotate(270*Math.PI/180),o.drawImage(r,-t.height,0,t.height,t.width);break;case 2:o.translate(t.width,0),o.scale(-1,1),o.drawImage(r,0,0,t.width,t.height);break;case 4:o.translate(t.width,0),o.scale(-1,1),o.rotate(180*Math.PI/180),o.drawImage(r,-t.width,-t.height,t.width,t.height);break;case 5:o.translate(t.width,0),o.scale(-1,1),o.rotate(90*Math.PI/180),o.drawImage(r,0,-t.width,t.height,t.width);break;case 7:o.translate(t.width,0),o.scale(-1,1),o.rotate(270*Math.PI/180),o.drawImage(r,-t.height,0,t.height,t.width);break;default:o.drawImage(r,0,0,t.width,t.height);}return new a(function(e){c.oldAndroid||c.mQQBrowser||!navigator.userAgent?!function(){var t=[n(7)];(function(t){var n=new t,r=o.getImageData(0,0,i.width,i.height);e(n.encode(r,100*s.quality));}).apply(null,t);}():e(i.toDataURL("image/jpeg",s.quality));})},r.prototype._getResize=function(){var e=this,t=e.img,n=e.defaults,r=n.width,i=n.height,o=e.orientation,a={width:t.width,height:t.height};if("5678".indexOf(o)>-1&&(a.width=t.height,a.height=t.width),a.width<r||a.height<i){ return a; }var s=a.width/a.height;for(r&&i?s>=r/i?a.width>r&&(a.width=r,a.height=Math.ceil(r/s)):a.height>i&&(a.height=i,a.width=Math.ceil(i*s)):r?r<a.width&&(a.width=r,a.height=Math.ceil(r/s)):i&&i<a.height&&(a.width=Math.ceil(i*s),a.height=i);a.width>=3264||a.height>=2448;){ a.width*=.8,a.height*=.8; }return a},window.lrz=function(e,t){return new r(e,t)},window.lrz.version="4.9.40",
e.exports=window.lrz;}])});
});

var template$3 = "<div> <div v-show=\"upload.status=='ready'\"> <input type=\"file\" ref=\"file\" style=\"display: none !important\" @change=\"process\" accept=\"image/png,image/jpeg,image/gif,image/jpg\"> <button type=\"button\" @click=\"pick\">{{$parent.locale.upload}}</button> </div> <div v-if=\"upload.status=='progress'\"> {{$parent.locale.progress}}:{{upload.progressComputable ? $parent.locale.unknown : upload.complete}} </div> <div v-if=\"upload.status=='success'\"> {{$parent.locale[\"please wait\"]}}... </div> <div v-if=\"upload.status=='error'\"> {{$parent.locale.error}}:{{upload.errorMsg}} <button type=\"button\" @click=\"reset\">{{$parent.locale.reset}}</button> </div> <div v-if=\"upload.status=='abort'\"> {{$parent.locale.upload}}&nbsp;{{$parent.locale.abort}}, <button type=\"button\" @click=\"reset\">{{$parent.locale.reset}}</button> </div> </div> ";

/**
 * Created by peak on 2017/2/10.
 */
var dashboard$3 = {
    template: template$3,
    data: function data() {
        return {
            imageUrl: '',
            upload: {
                status: 'ready', // progress,success,error,abort
                errorMsg: null,
                progressComputable: false,
                complete: 0
            }
        }
    },
    methods: {
        reset: function reset(){
            this.upload.status = 'ready';
        },
        insertImageUrl: function insertImageUrl() {
            if (!this.imageUrl) {
                return
            }
            this.$parent.execCommand(Command.INSERT_IMAGE, this.imageUrl);
            this.imageUrl = null;
        },
        pick: function pick() {
            this.$refs.file.click();
        },
        setUploadError: function setUploadError(msg){
            this.upload.status = 'error';
            this.upload.errorMsg = msg;
        },
        process: function process() {
            var this$1 = this;

            var component = this;
            var config = this.$options.module.config;
            // compatibility with older format
            // {
            //     server: null,
            //     fieldName: 'image',
            //     compress: true,
            //     width: 1600,
            //     height: 1600,
            //     quality: 80
            // }
            // ----------- divider ----------------
            // {
            //     upload: {
            //         url: null,
            //         headers: {},
            //         params: {},
            //         fieldName: {}
            //     },
            //     compress: {
            //         width: 1600,
            //         height: 1600,
            //         quality: 80
            //     },
            // }

            if (!config.upload && typeof config.server === 'string') {
                config.upload = {url: config.server};
            }
            if (config.upload && !config.upload.url) {
                config.upload = null;
            }
            if (config.upload && typeof config.fieldName === 'string') {
                config.upload.fieldName = config.fieldName;
            }

            if (typeof config.compress === 'boolean') {
                config.compress = {
                    width: config.width,
                    height: config.height,
                    quality: config.quality
                };
            }

            var file = this.$refs.file.files[0];
            if (file.size > config.sizeLimit) {
                this.setUploadError(this.$parent.locale['exceed size limit']);
                return
            }
            this.$refs.file.value = null;

            if (config.compress) {
                config.compress.fieldName = config.upload && config.upload.fieldName
                    ? config.upload.fieldName : 'image';
                lrz_all_bundle(file, config.compress).then(function (rst) {
                    if (config.upload) {
                        component.uploadToServer(rst.file);
                    } else {
                        component.insertBase64(rst.base64);
                    }
                }).catch(function (err) {
                    this$1.setUploadError(err.toString());
                });
                return
            }
            // 不需要压缩
            // base64
            if (!config.upload) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    component.insertBase64(e.target.result);
                };
                reader.readAsDataURL(file);
                return
            }
            // 上传服务器
            component.uploadToServer(file);
        },
        insertBase64: function insertBase64(data) {
            this.$parent.execCommand(Command.INSERT_IMAGE, data);
        },
        uploadToServer: function uploadToServer(file) {
            var this$1 = this;

            var config = this.$options.module.config;

            var formData = new FormData();
            formData.append(config.upload.fieldName || 'image', file);

            if (typeof config.upload.params === 'object') {
                Object.keys(config.upload.params).forEach(function (key) {
                    var value = config.upload.params[key];
                    if (Array.isArray(value)) {
                        value.forEach(function (v) {
                            formData.append(key, v);
                        });
                    } else {
                        formData.append(key, value);
                    }
                });
            }

            var xhr = new XMLHttpRequest();

            xhr.onprogress = function (e) {
                this$1.upload.status = 'progress';
                if (e.lengthComputable) {
                    this$1.upload.progressComputable = true;
                    var percentComplete = e.loaded / e.total;
                    this$1.upload.complete = (percentComplete * 100).toFixed(2);
                } else {
                    this$1.upload.progressComputable = false;
                }
            };

            xhr.onload = function () {
                if (xhr.status >= 300) {
                    this$1.setUploadError(("request error,code " + (xhr.status)));
                    return
                }

                try {
                    var url = config.uploadHandler(xhr.responseText);
                    if (url) {
                        this$1.$parent.execCommand(Command.INSERT_IMAGE, url);
                    }
                } catch (err) {
                    this$1.setUploadError(err.toString());
                } finally {
                    this$1.upload.status = 'ready';
                }
            };

            xhr.onerror = function () {
                // find network info in brower tools
                this$1.setUploadError('request error');
            };

            xhr.onabort = function () {
                this$1.upload.status = 'abort';
            };

            xhr.open('POST', config.upload.url);
            if (typeof config.upload.headers === 'object') {
                Object.keys(config.upload.headers).forEach(function (k) {
                    xhr.setRequestHeader(k, config.upload.headers[k]);
                });
            }
            xhr.send(formData);
        }
    }
};

/**
 * insert image
 * Created by peak on 16/8/18.
 */
var image = {
    name: 'image',
    icon: 'fa fa-file-image-o',
    i18n: 'image',
    config: {
        // server: null,
        // fieldName: 'image',
        // compress: true,
        // width: 1600,
        // height: 1600,
        // quality: 80,
        sizeLimit: 512 * 1024,// 512k
        // upload: {
        //     url: null,
        //     headers: {},
        //     params: {},
        //     fieldName: {}
        // },
        compress: {
            width: 1600,
            height: 1600,
            quality: 80
        },
        uploadHandler: function uploadHandler(responseText){
            var json = JSON.parse(responseText);
            return json.ok ? json.data : null
        }
    },
    dashboard: dashboard$3
};

var template$4 = "<div> <h3 style=\"text-align: center\">Vue-html5-editor&nbsp;{{version}}</h3> <p style=\"text-align: center\"> repository: <a href=\"https://github.com/PeakTai/vue-html5-editor\" target=\"_blank\"> https://github.com/PeakTai/vue-html5-editor </a> </p> </div> ";

/**
 * Created by peak on 2017/2/10.
 */
var dashboard$4 = {
    template: template$4,
    data: function data(){
        return {
            version: "1.1.1"
        }
    }
};

/**
 * editor info
 * Created by peak on 16/8/18.
 */
var info = {
    name: 'info',
    icon: 'fa fa-info',
    i18n: 'info',
    // handler () {
    //
    // },
    // init (editor) {
    //
    // },
    // destroyed(editor){
    //
    // },
    dashboard: dashboard$4
};

var template$5 = "<form @submit.prevent=\"createLink\"> <input type=\"text\" :placeholder=\"$parent.locale['please enter a url']\" v-model=\"url\" maxlength=\"1024\"> <button type=\"submit\">{{$parent.locale[\"create link\"]}}</button> </form>";

var dashboard$5 = {
    template: template$5,
    data: function data(){
        return {url: null}
    },
    methods: {
        createLink: function createLink(){
            if (!this.url) {
                return
            }
            this.$parent.execCommand('createLink', this.url);
            this.url = null;
        }
    }
};

/**
 * create link
 * Created by peak on 16/8/18.
 */
var link = {
    name: 'link',
    icon: 'fa fa-chain',
    i18n: 'link',
    dashboard: dashboard$5
};

var template$6 = "<div> <button type=\"button\" @click=\"$parent.execCommand('insertOrderedList')\"> {{$parent.locale[\"ordered list\"]}} </button> <button type=\"button\" @click=\"$parent.execCommand('insertUnorderedList')\"> {{$parent.locale[\"unordered list\"]}} </button> </div>";

/**
 * Created by peak on 2017/2/10.
 */
var dashboard$6 = {
    template: template$6
};

/**
 * list,ul,ol
 * Created by peak on 16/8/18.
 */
var list = {
    name: 'list',
    icon: 'fa fa-list',
    i18n: 'list',
    dashboard: dashboard$6
};

var template$7 = "<form @submit.prevent=\"insertTable\"> <label> {{$parent.locale[\"row count\"]}} <input type=\"number\" style=\"width: 60px\" maxlength=\"2\" min=\"2\" max=\"10\" v-model=\"rows\"> </label> <label> {{$parent.locale[\"column count\"]}} <input type=\"number\" style=\"width: 60px\" maxlength=\"2\" min=\"2\" max=\"10\" v-model=\"cols\"> </label> <button type=\"submit\">{{$parent.locale.save}}</button> </form>";

/**
 * Created by peak on 2017/2/10.
 */
var dashboard$7 = {
    template: template$7,
    data: function data(){
        return {
            rows: 2,
            cols: 2,
            hasHead: false,
            striped: false,
            hover: false
        }
    },
    methods: {
        insertTable: function insertTable(){
            if (this.rows < 2 || this.rows > 10) {
                return
            }
            if (this.cols < 2 || this.cols > 10) {
                return
            }
            var table = '<table style="border-spacing: 0px; border-collapse: collapse; width: 100%; max-width: 100%; margin-bottom: 0px; border: 1px solid rgb(221, 221, 221); color: rgb(51, 51, 51); font-size: 14px; line-height: 20px; background-color: transparent;"><tbody>';
            for (var i = 0; i < this.rows; i++) {
                table += '<tr>';
                for (var j = 0; j < this.cols; j++) {
                    table += '<td style="padding: 8px; line-height: 1.42857; vertical-align: top; border: 1px solid rgb(221, 221, 221);">&nbsp;</td>';
                }
                table += '</tr>';
            }
            table += '</tbody></table>';
            this.$parent.execCommand('insertHTML', table);
        }
    }
};

/**
 * insert table
 * Created by peak on 16/8/18.
 */
var table = {
    // can not named table
    // dashboard.html will add to editor as a child component and named as module name
    // Do not use built-in or reserved HTML elements as component id
    name: 'tabulation',
    icon: 'fa fa-table',
    i18n: 'table',
    dashboard: dashboard$7
};

var template$8 = "<div> <button type=\"button\" @click=\"$parent.execCommand('bold')\">{{$parent.locale[\"bold\"]}}</button> <button type=\"button\" @click=\"$parent.execCommand('italic')\">{{$parent.locale[\"italic\"]}}</button> <button type=\"button\" @click=\"$parent.execCommand('underline')\">{{$parent.locale[\"underline\"]}}</button> <button type=\"button\" @click=\"$parent.execCommand('strikeThrough')\">{{$parent.locale[\"strike through\"]}} </button> <button type=\"button\" @click=\"$parent.execCommand('subscript')\">{{$parent.locale[\"subscript\"]}}</button> <button type=\"button\" @click=\"$parent.execCommand('superscript')\">{{$parent.locale[\"superscript\"]}}</button> </div> ";

var dashboard$8 = {
    template: template$8
};

/**
 * text,set the text bold or italic or underline or with strike through or subscript or superscript
 * Created by peak on 16/8/18.
 */
var text = {
    name: 'text',
    icon: 'fa fa-pencil',
    i18n: 'text',
    dashboard: dashboard$8
};

/**
 * undo
 * Created by peak on 16/8/20.
 */
var undo = {
    name: 'undo',
    icon: 'fa-undo fa',
    i18n: 'undo',
    handler: function handler(editor) {
        editor.execCommand('undo');
    }
};

/**
 * unlink
 * Created by peak on 16/8/18.
 */
var unlink = {
    name: 'unlink',
    icon: 'fa fa-chain-broken',
    i18n: 'unlink',
    handler: function handler(editor) {
        editor.execCommand('unlink');
    }
};

/**
 * build-in moduls
 * Created by peak on 2016/11/1.
 */
var buildInModules = [
    text,
    color,
    font,
    align,
    list,
    link,
    unlink,
    table,
    image,
    hr,
    eraser,
    undo,
    fullScreen$1,
    info
];

/**
 * Created by peak on 2017/2/15.
 */
/**
 * add every elements of extArr to sourceArr.
 * @param sourceArr
 * @param extArr
 */
var mergeArray = function (sourceArr, extArr) {
    // note: Array.prototype.push.apply(arr1,arr2) is unreliable
    extArr.forEach(function (el) {
        sourceArr.push(el);
    });
};

/**
 * find all the descendant text nodes of a element
 * @param ancestor
 */
var getDescendantTextNodes = function (ancestor) {
    if (ancestor.nodeType === Node.TEXT_NODE) {
        return [ancestor]
    }
    var textNodes = [];
    if (!ancestor.hasChildNodes()) {
        return textNodes
    }
    var childNodes = ancestor.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        var node = childNodes[i];
        if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            mergeArray(textNodes, getDescendantTextNodes(node));
        }
    }
    return textNodes
};
/**
 * find all the descendant text nodes of an ancestor element that before the specify end element,
 * the ancestor element must contains the end element.
 * @param ancestor
 * @param endEl
 */
var getBeforeEndDescendantTextNodes = function (ancestor, endEl) {
    var textNodes = [];
    var endIndex = 0;
    for (var i = 0; i < ancestor.childNodes.length; i++) {
        if (ancestor.childNodes[i].contains(endEl)) {
            endIndex = i;
            break
        }
    }

    for (var i$1 = 0; i$1 <= endIndex; i$1++) {
        var node = ancestor.childNodes[i$1];
        if (node === endEl) {
            mergeArray(textNodes, getDescendantTextNodes(node));
        } else if (i$1 === endIndex) {
            if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes, getBeforeEndDescendantTextNodes(node, endEl));
            }
        } else if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            mergeArray(textNodes, getDescendantTextNodes(node));
        }
    }
    return textNodes
};
/**
 * find all the descendant text nodes of an ancestor element that after the specify start element,
 * the ancestor element must contains the start element.
 * @param ancestor
 * @param startEl
 */
var getAfterStartDescendantTextNodes = function (ancestor, startEl) {
    var textNodes = [];
    var startIndex = 0;
    for (var i = 0; i < ancestor.childNodes.length; i++) {
        if (ancestor.childNodes[i].contains(startEl)) {
            startIndex = i;
            break
        }
    }

    for (var i$1 = startIndex; i$1 < ancestor.childNodes.length; i$1++) {
        var node = ancestor.childNodes[i$1];
        if (node === startEl) {
            mergeArray(textNodes, getDescendantTextNodes(node));
        } else if (i$1 === startIndex) {
            if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes,
                    getAfterStartDescendantTextNodes(node, startEl));
            }
        } else if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            mergeArray(textNodes,
                getDescendantTextNodes(node));
        }
    }
    return textNodes
};


/**
 * get the closest parent block node of a text node.
 * @param node
 * @return {Node}
 */
var getParentBlockNode = function (node) {
    var blockNodeNames = ['DIV', 'P', 'SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'OL', 'UL', 'LI', 'TR', 'TD', 'TH', 'TBODY', 'THEAD', 'TABLE', 'ARTICLE', 'HEADER', 'FOOTER'];
    var container = node;
    while (container) {
        if (blockNodeNames.includes(container.nodeName)) {
            break
        }
        container = container.parentNode;
    }
    return container
};

var isInlineElement = function (node) {
    var inlineNodeNames = ['A', 'ABBR', 'ACRONYM', 'B', 'CITE', 'CODE', 'EM', 'I',
        'FONT', 'IMG', 'S', 'SMALL', 'SPAN', 'STRIKE', 'STRONG', 'U', 'SUB', 'SUP'];
    return inlineNodeNames.includes(node.nodeName)
};

// for IE 11
if (!Text.prototype.contains) {
    Text.prototype.contains = function contains(otherNode) {
        return this === otherNode
    };
}


/**
 * Created by peak on 2017/2/14.
 */
var RangeHandler = function RangeHandler(range) {
    if (!range || !(range instanceof Range)) {
        throw new TypeError('cant\'t resolve range')
    }
    this.range = range;
};


/**
 * find all the text nodes in range
 */
RangeHandler.prototype.getAllTextNodesInRange = function getAllTextNodesInRange () {
    var startContainer = this.range.startContainer;
    var endContainer = this.range.endContainer;
    var rootEl = this.range.commonAncestorContainer;
    var textNodes = [];

    if (startContainer === endContainer) {
        if (startContainer.nodeType === Node.TEXT_NODE) {
            return [startContainer]
        }
        var childNodes = startContainer.childNodes;
        for (var i = this.range.startOffset; i < this.range.endOffset; i++) {
            mergeArray(textNodes, getDescendantTextNodes(childNodes[i]));
        }
        return textNodes
    }

    var startIndex = 0;
    var endIndex = 0;
    for (var i$1 = 0; i$1 < rootEl.childNodes.length; i$1++) {
        var node = rootEl.childNodes[i$1];
        if (node.contains(startContainer)) {
            startIndex = i$1;
        }
        if (node.contains(endContainer)) {
            endIndex = i$1;
        }
    }

    for (var i$2 = startIndex; i$2 <= endIndex; i$2++) {
        var node$1 = rootEl.childNodes[i$2];
        if (i$2 === startIndex) {
            if (node$1.nodeType === Node.TEXT_NODE) {
                textNodes.push(node$1);
            } else if (node$1.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes, getAfterStartDescendantTextNodes(node$1, startContainer));
            }
        } else if (i$2 === endIndex) {
            if (node$1.nodeType === Node.TEXT_NODE) {
                textNodes.push(node$1);
            } else if (node$1.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes, getBeforeEndDescendantTextNodes(node$1, endContainer));
            }
        } else if (node$1.nodeType === Node.TEXT_NODE) {
            textNodes.push(node$1);
        } else if (node$1.nodeType === Node.ELEMENT_NODE) {
            mergeArray(textNodes, getDescendantTextNodes(node$1));
        }
    }
    return textNodes
};

/**
 * execute edit command
 * @param {String} command
 * @param arg
 */
RangeHandler.prototype.execCommand = function execCommand (command, arg) {
        var this$1 = this;

    switch (command) {

        case Command.FONT_SIZE: {
            // 重新实现，改为直接修改样式
            var textNodes = this.getAllTextNodesInRange();
            if (!textNodes.length) {
                break
            }
            if (textNodes.length === 1 && textNodes[0] === this.range.startContainer
                && textNodes[0] === this.range.endContainer) {
                var textNode = textNodes[0];
                if (this.range.startOffset === 0
                    && this.range.endOffset === textNode.textContent.length) {
                    if (textNode.parentNode.childNodes.length === 1
                        && isInlineElement(textNode.parentNode)) {
                        textNode.parentNode.style.fontSize = arg;
                        break
                    }
                    var span = document.createElement('span');
                    span.style.fontSize = arg;
                    textNode.parentNode.insertBefore(span, textNode);
                    span.appendChild(textNode);
                    break
                }
                var span$1 = document.createElement('span');
                span$1.innerText = textNode.textContent.substring(
                    this.range.startOffset, this.range.endOffset);
                span$1.style.fontSize = arg;
                var frontPart = document.createTextNode(
                    textNode.textContent.substring(0, this.range.startOffset));
                textNode.parentNode.insertBefore(frontPart, textNode);
                textNode.parentNode.insertBefore(span$1, textNode);
                textNode.textContent = textNode.textContent.substring(this.range.endOffset);
                this.range.setStart(span$1, 0);
                this.range.setEnd(span$1, 1);
                break
            }

            textNodes.forEach(function (textNode) {
                if (textNode === this$1.range.startContainer) {
                    if (this$1.range.startOffset === 0) {
                        if (textNode.parentNode.childNodes.length === 1
                            && isInlineElement(textNode.parentNode)) {
                            textNode.parentNode.style.fontSize = arg;
                        } else {
                            var span$1 = document.createElement('span');
                            span$1.style.fontSize = arg;
                            textNode.parentNode.insertBefore(span$1, textNode);
                            span$1.appendChild(textNode);
                        }
                        return
                    }
                    var span$2 = document.createElement('span');
                    textNode.textContent = textNode.textContent.substring(
                        0, this$1.range.startOffset);
                    span$2.style.fontSize = arg;
                    textNode.parentNode.insertBefore(span$2, textNode);
                    this$1.range.setStart(textNode, 0);
                    return
                }
                if (textNode === this$1.range.endContainer) {
                    if (this$1.range.endOffset === textNode.textContent.length) {
                        if (textNode.parentNode.childNodes.length === 1
                            && isInlineElement(textNode.parentNode)) {
                            textNode.parentNode.style.fontSize = arg;
                        } else {
                            var span$3 = document.createElement('span');
                            span$3.style.fontSize = arg;
                            textNode.parentNode.insertBefore(span$3, textNode);
                            span$3.appendChild(textNode);
                        }
                        return
                    }
                    var span$4 = document.createElement('span');
                    textNode.textContent = textNode.textContent.substring(this$1.range.endOffset);
                    span$4.style.fontSize = arg;
                    textNode.parentNode.insertBefore(span$4, textNode);
                    span$4.appendChild(textNode);
                    this$1.range.setStart(textNode, textNode.textContent.length);
                    return
                }
                if (textNode.parentNode.childNodes.length === 1
                    && isInlineElement(textNode.parentNode)) {
                    textNode.parentNode.style.fontSize = arg;
                    return
                }

                var span = document.createElement('span');
                span.style.fontSize = arg;
                textNode.parentNode.insertBefore(span, textNode);
                span.appendChild(textNode);
            });
            break
        }
        case Command.FORMAT_BLOCK: {
            if (document.execCommand(Command.FORMAT_BLOCK, false, arg)) {
                break
            }
            // hack
            var element = document.createElement(arg);
            this.range.surroundContents(element);
            break
        }
        case Command.LINE_HEIGHT: {
            var textNodes$1 = this.getAllTextNodesInRange();
            textNodes$1.forEach(function (textNode) {
                var parentBlock = getParentBlockNode(textNode);
                if (parentBlock) {
                    parentBlock.style.lineHeight = arg;
                }
            });
            break
        }
        case Command.INSERT_HTML: {
            if (document.execCommand(Command.INSERT_HTML, false, arg)) {
                break
            }
            // hack
            var fragment = document.createDocumentFragment();
            var div = document.createElement('div');
            div.innerHTML = arg;
            if (div.hasChildNodes()) {
                for (var i = 0; i < div.childNodes.length; i++) {
                    fragment.appendChild(div.childNodes[i].cloneNode(true));
                }
            }
            this.range.deleteContents();
            this.range.insertNode(fragment);
            break
        }
        default: {
            document.execCommand(command, false, arg);
            break
        }
    }
};

__$styleInject(".vue-html5-editor,.vue-html5-editor *{box-sizing:border-box}.vue-html5-editor{font-size:14px;line-height:1.5;background-color:#fff;color:#333;border:1px solid #ddd;text-align:left;border-radius:5px;overflow:hidden}.vue-html5-editor.full-screen{position:fixed!important;top:0!important;left:0!important;bottom:0!important;right:0!important;border-radius:0}.vue-html5-editor>.toolbar{position:relative;background-color:inherit}.vue-html5-editor>.toolbar>ul{list-style:none;padding:0;margin:0;border-bottom:1px solid #ddd}.vue-html5-editor>.toolbar>ul>li{display:inline-block;cursor:pointer;text-align:center;line-height:36px;padding:0 10px}.vue-html5-editor>.toolbar>ul>li .icon{height:16px;width:16px;display:inline-block;vertical-align:middle}.vue-html5-editor>.toolbar>.dashboard{background-color:inherit;border-bottom:1px solid #ddd;padding:10px;position:absolute;top:100%;left:0;right:0;overflow:auto}.vue-html5-editor>.toolbar>.dashboard input[type=text],.vue-html5-editor>.toolbar>.dashboard input[type=number],.vue-html5-editor>.toolbar>.dashboard select{padding:6px 12px;color:inherit;background-color:transparent;border:1px solid #ddd;border-radius:5px}.vue-html5-editor>.toolbar>.dashboard input[type=text]:hover,.vue-html5-editor>.toolbar>.dashboard input[type=number]:hover,.vue-html5-editor>.toolbar>.dashboard select:hover{border-color:#bebebe}.vue-html5-editor>.toolbar>.dashboard input[type=text][disabled],.vue-html5-editor>.toolbar>.dashboard input[type=text][readonly],.vue-html5-editor>.toolbar>.dashboard input[type=number][disabled],.vue-html5-editor>.toolbar>.dashboard input[type=number][readonly],.vue-html5-editor>.toolbar>.dashboard select[disabled],.vue-html5-editor>.toolbar>.dashboard select[readonly]{background-color:#eee;opacity:1}.vue-html5-editor>.toolbar>.dashboard input[type=text][disabled],.vue-html5-editor>.toolbar>.dashboard input[type=number][disabled],.vue-html5-editor>.toolbar>.dashboard select[disabled]{cursor:not-allowed}.vue-html5-editor>.toolbar>.dashboard button{color:inherit;background-color:inherit;padding:6px 12px;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid #ddd;border-radius:5px;margin-right:4px;margin-bottom:4px}.vue-html5-editor>.toolbar>.dashboard button:hover{border-color:#bebebe}.vue-html5-editor>.toolbar>.dashboard button[disabled]{cursor:not-allowed;opacity:.68}.vue-html5-editor>.toolbar>.dashboard button:last-child{margin-right:0}.vue-html5-editor>.toolbar>.dashboard label{font-weight:bolder}.vue-html5-editor>.content{overflow:auto;padding:10px}.vue-html5-editor>.content:focus{outline:0}",undefined);

var template$9 = "<div class=\"vue-html5-editor\" :class=\"{'full-screen':fullScreen}\" :style=\"{'z-index':zIndex}\"> <div class=\"toolbar\" :style=\"{'z-index':zIndex+1}\" ref=\"toolbar\"> <ul> <template v-for=\"module in modules\"> <li :title=\"locale[module.i18n]\" @click=\"activeModule(module)\"> <span class=\"icon\" :class=\"module.icon\"></span> <template v-if=\"showModuleName === undefined ? defaultShowModuleName : showModuleName\"> &nbsp;{{locale[module.i18n]}} </template> </li> </template> </ul> <div class=\"dashboard\" v-show=\"dashboard\" ref=\"dashboard\"> <keep-alive> <div v-show=\"dashboard\" :is=\"dashboard\"></div> </keep-alive> </div> </div> <div class=\"content\" ref=\"content\" :style=\"contentStyle\" contenteditable @click=\"toggleDashboard(dashboard)\"> </div> </div>";

/**
 * Created by peak on 2017/2/9.
 */
var editor = {
    template: template$9,
    props: {
        content: {
            type: String,
            required: true,
            default: ''
        },
        height: {
            type: Number,
            default: 300,
            validator: function validator(val){
                return val >= 100
            }
        },
        zIndex: {
            type: Number,
            default: 1000
        },
        autoHeight: {
            type: Boolean,
            default: true
        },
        showModuleName: {}
    },
    data: function data(){
        return {
            // defaultShowModuleName:false
            // locale: {},
            // modules:{},
            fullScreen: false,
            dashboard: null
        }
    },
    watch: {
        content: function content(val) {
            var content = this.$refs.content.innerHTML;
            if (val !== content) {
                this.$refs.content.innerHTML = val;
            }
        },
        fullScreen: function fullScreen(val){
            var component = this;
            if (val) {
                component.parentEl = component.$el.parentNode;
                component.nextEl = component.$el.nextSibling;
                document.body.appendChild(component.$el);
                return
            }
            if (component.nextEl) {
                component.parentEl.insertBefore(component.$el, component.nextEl);
                return
            }
            component.parentEl.appendChild(component.$el);
        }
    },
    computed: {
        contentStyle: function contentStyle(){
            var style = {};
            if (this.fullScreen) {
                style.height = (window.innerHeight - this.$refs.toolbar.clientHeight - 1) + "px";
                return style
            }
            if (!this.autoHeight) {
                style.height = (this.height) + "px";
                return style
            }
            style['min-height'] = (this.height) + "px";
            return style
        }
    },
    methods: {
        toggleFullScreen: function toggleFullScreen(){
            this.fullScreen = !this.fullScreen;
        },
        enableFullScreen: function enableFullScreen(){
            this.fullScreen = true;
        },
        exitFullScreen: function exitFullScreen(){
            this.fullScreen = false;
        },
        focus: function focus(){
            this.$refs.content.focus();
        },
        toggleDashboard: function toggleDashboard(dashboard){
            this.dashboard = this.dashboard === dashboard ? null : dashboard;
        },
        execCommand: function execCommand(command, arg){
            this.restoreSelection();
            if (this.range) {
                new RangeHandler(this.range).execCommand(command, arg);
            }
            this.toggleDashboard();
            this.$emit('change', this.$refs.content.innerHTML);
        },
        getCurrentRange: function getCurrentRange(){
            return this.range
        },
        saveCurrentRange: function saveCurrentRange(){
            var this$1 = this;

            var selection = window.getSelection ? window.getSelection() : document.getSelection();
            if (!selection.rangeCount) {
                return
            }
            var content = this.$refs.content;
            for (var i = 0; i < selection.rangeCount; i++) {
                var range = selection.getRangeAt(0);
                var start = range.startContainer;
                var end = range.endContainer;
                // for IE11 : node.contains(textNode) always return false
                start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start;
                end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end;
                if (content.contains(start) && content.contains(end)) {
                    this$1.range = range;
                    break
                }
            }
        },
        restoreSelection: function restoreSelection(){
            var selection = window.getSelection ? window.getSelection() : document.getSelection();
            selection.removeAllRanges();
            if (this.range) {
                selection.addRange(this.range);
            } else {
                var content = this.$refs.content;
                var div = document.createElement('div');
                var range = document.createRange();
                content.appendChild(div);
                range.setStart(div, 0);
                range.setEnd(div, 0);
                selection.addRange(range);
                this.range = range;
            }
        },
        activeModule: function activeModule(module){
            if (typeof module.handler === 'function') {
                module.handler(this);
                return
            }
            if (module.hasDashboard) {
                this.toggleDashboard(("dashboard-" + (module.name)));
            }
        }
    },
    created: function created(){
        var this$1 = this;

        this.modules.forEach(function (module) {
            if (typeof module.init === 'function') {
                module.init(this$1);
            }
        });
    },
    mounted: function mounted(){
        var this$1 = this;

        var content = this.$refs.content;
        content.innerHTML = this.content;
        content.addEventListener('mouseup', this.saveCurrentRange, false);
        content.addEventListener('keyup', function () {
            this$1.$emit('change', content.innerHTML);
            this$1.saveCurrentRange();
        }, false);
        content.addEventListener('mouseout', function (e) {
            if (e.target === content) {
                this$1.saveCurrentRange();
            }
        }, false);
        this.touchHandler = function (e) {
            if (content.contains(e.target)) {
                this$1.saveCurrentRange();
            }
        };

        window.addEventListener('touchend', this.touchHandler, false);
    },
    updated: function updated(){
        // update dashboard style
        if (this.$refs.dashboard){
            this.$refs.dashboard.style.maxHeight = (this.$refs.content.clientHeight) + "px";
        }
    },
    beforeDestroy: function beforeDestroy(){
        var this$1 = this;

        window.removeEventListener('touchend', this.touchHandler);
        this.modules.forEach(function (module) {
            if (typeof module.destroyed === 'function') {
                module.destroyed(this$1);
            }
        });
    }
};

var i18nZhCn = {
    align: '对齐方式',
    image: '图片',
    list: '列表',
    link: '链接',
    unlink: '去除链接',
    table: '表格',
    font: '文字',
    'full screen': '全屏',
    text: '排版',
    eraser: '格式清除',
    info: '关于',
    color: '颜色',
    'please enter a url': '请输入地址',
    'create link': '创建链接',
    bold: '加粗',
    italic: '倾斜',
    underline: '下划线',
    'strike through': '删除线',
    subscript: '上标',
    superscript: '下标',
    heading: '标题',
    'font name': '字体',
    'font size': '文字大小',
    'left justify': '左对齐',
    'center justify': '居中',
    'right justify': '右对齐',
    'ordered list': '有序列表',
    'unordered list': '无序列表',
    'fore color': '前景色',
    'background color': '背景色',
    'row count': '行数',
    'column count': '列数',
    save: '确定',
    upload: '上传',
    progress: '进度',
    unknown: '未知',
    'please wait': '请稍等',
    error: '错误',
    abort: '中断',
    reset: '重置',
    hr: '分隔线',
    undo: '撤消',
    'line height': '行高',
    'exceed size limit': '超出大小限制'
};

var i18nEnUs = {
    align: 'align',
    image: 'image',
    list: 'list',
    link: 'link',
    unlink: 'unlink',
    table: 'table',
    font: 'font',
    'full screen': 'full screen',
    text: 'text',
    eraser: 'remove format',
    info: 'info',
    color: 'color',
    'please enter a url': 'please enter a url',
    'create link': 'create link',
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
    'strike through': 'strike through',
    subscript: 'subscript',
    superscript: 'superscript',
    heading: 'heading',
    'font name': 'font name',
    'font size': 'font size',
    'left justify': 'left justify',
    'center justify': 'center justify',
    'right justify': 'right justify',
    'ordered list': 'ordered list',
    'unordered list': 'unordered list',
    'fore color': 'fore color',
    'background color': 'background color',
    'row count': 'row count',
    'column count': 'column count',
    save: 'save',
    upload: 'upload',
    progress: 'progress',
    unknown: 'unknown',
    'please wait': 'please wait',
    error: 'error',
    abort: 'abort',
    reset: 'reset',
    hr: 'horizontal rule',
    undo: 'undo',
    'line height': 'line height',
    'exceed size limit': 'exceed size limit'
};

/**
 * Created by peak on 2017/2/24.
 */
/**
 * shadow clone
 *
 * @param source    source object
 * @param ext       extended object
 */
function mixin(source, ext) {
    if ( source === void 0 ) source = {};
    if ( ext === void 0 ) ext = {};

    Object.keys(ext).forEach(function (k) {
        // for data function
        if (k === 'data') {
            var dataSrc = source[k];
            var dataDesc = ext[k];
            if (typeof dataDesc === 'function') {
                if (typeof dataSrc !== 'function') {
                    source[k] = dataDesc;
                } else {
                    source[k] = function () { return mixin(dataSrc(), dataDesc()); };
                }
            }
        } else {
            source[k] = ext[k];
        }
    });
    return source
}

polyfill();
/**
 * Vue html5 Editor
 * @param Vue   {Vue}
 * @param options {Object}
 */
var VueHtml5Editor = function VueHtml5Editor(options) {
    if ( options === void 0 ) options = {};

    var modules = [].concat( buildInModules );
    var components = {};

    // extended modules
    if (Array.isArray(options.modules)) {
        options.modules.forEach(function (module) {
            if (module.name) {
                modules.push(module);
            }
        });
    }
    // hidden modules
    if (Array.isArray(options.hiddenModules)) {
        modules = (function () {
            var arr = [];
            modules.forEach(function (m) {
                if (!options.hiddenModules.includes(m.name)) {
                    arr.push(m);
                }
            });
            return arr
        })();
    }
    // visible modules
    if (Array.isArray(options.visibleModules)) {
        modules = (function () {
            var arr = [];
            options.visibleModules.forEach(function (name) {
                modules.forEach(function (module) {
                    if (module.name === name) {
                        arr.push(module);
                    }
                });
            });
            return arr
        })();
    }


    modules.forEach(function (module) {
        // specify the config for each module in options by name
        var config = options[module.name];
        module.config = mixin(module.config, config);

        if (module.dashboard) {
            // $options.module
            module.dashboard.module = module;
            components[("dashboard-" + (module.name))] = module.dashboard;
        }
        if (options.icons && options.icons[module.name]) {
            module.icon = options.icons[module.name];
        }

        module.hasDashboard = !!module.dashboard;
        // prevent vue sync
        module.dashboard = null;
    });

    // i18n
    var i18n = {'zh-cn': i18nZhCn, 'en-us': i18nEnUs};
    var customI18n = options.i18n || {};
    Object.keys(customI18n).forEach(function (key) {
        i18n[key] = i18n[key] ? mixin(i18n[key], customI18n[key]) : customI18n[key];
    });
    var language = options.language || 'en-us';
    var locale = i18n[language];

    // showModuleName
    var defaultShowModuleName = !!options.showModuleName;

    // ######################################
    var compo = mixin(editor, {
        data: function data() {
            return {modules: modules, locale: locale, defaultShowModuleName: defaultShowModuleName}
        },
        components: components
    });
    mixin(this, compo);
};

/**
 * global install
 *
 * @param Vue
 * @param options
 */
VueHtml5Editor.install = function install (Vue, options) {
        if ( options === void 0 ) options = {};

    Vue.component(options.name || 'vue-html5-editor', new VueHtml5Editor(options));
};

return VueHtml5Editor;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ }),
/* 63 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(46);
__webpack_require__(47);
__webpack_require__(41);
__webpack_require__(42);
__webpack_require__(43);
__webpack_require__(44);
module.exports = __webpack_require__(45);


/***/ })
/******/ ]);