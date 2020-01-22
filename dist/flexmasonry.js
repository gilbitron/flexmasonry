/*!
 * FlexMasonry
 * Version: 0.2.3
 * Author: Gilbert Pellegrom <gilbert@pellegrom.me>
 * License: MIT
 */
var FlexMasonry =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/flexmasonry.css":
/*!*****************************!*\
  !*** ./src/flexmasonry.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://FlexMasonry/./src/flexmasonry.css?");

/***/ }),

/***/ "./src/flexmasonry.js":
/*!****************************!*\
  !*** ./src/flexmasonry.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst defaultOptions = {\n    /*\n     * If `responsive` is `true`, `breakpointCols` will be used to determine\n     * how many columns a grid should have at a given responsive breakpoint.\n     */\n    responsive: true,\n    /*\n     * A list of how many columns should be shown at different responsive\n     * breakpoints, defined by media queries.\n     */\n    breakpointCols: {\n        'min-width: 1500px': 6,\n        'min-width: 1200px': 5,\n        'min-width: 992px': 4,\n        'min-width: 768px': 3,\n        'min-width: 576px': 2,\n    },\n    /*\n     * If `responsive` is `false`, this number of columns will always be shown,\n     * no matter the width of the screen.\n     */\n    numCols: 4,\n};\n\nlet _resizeId = null;\nlet _options = {};\nlet _targets = [];\n\nfunction init(targets, options = {}) {\n    if (typeof targets === 'string') {\n        _targets = document.querySelectorAll(targets);\n    } else {\n        _targets = targets;\n    }\n\n    _options = Object.assign(defaultOptions, options);\n\n    _targets.forEach(function(target) {\n        setUp(target);\n        setHeight(target);\n    });\n\n    addEventListeners();\n\n    return this;\n}\n\nfunction setUp(target) {\n    target.classList.add('flexmasonry');\n\n    if (_options.responsive) {\n        target.classList.add('flexmasonry-responsive');\n    }\n\n    setColsClass(target);\n\n    Array.from(target.children).forEach(function(item) {\n        item.classList.add('flexmasonry-item');\n    });\n\n    // Check if we have fewer items than columns\n    if(target.children.length < getCurrentCols()) {\n        // Work out how many more items we would need to fill the grid\n        const itemDeficit = getCurrentCols() - target.children.length;\n        // Create an empty item ...\n        const el = document.createElement('div');\n        // ... add the right class.\n        el.classList.add('flexmasonry-item');\n        // For each new item in the grid we need\n        for (var i = 0, len = itemDeficit; i < len; i++) {\n            // Append it to the grid\n            target.appendChild(el.cloneNode(true));\n        }\n     }\n\n    addBreakElements(target);\n}\n\nfunction onLoad() {\n    _targets.forEach(function(target) {\n        setHeight(target);\n    });\n}\n\nfunction onResize() {\n    if (_resizeId) {\n        window.cancelAnimationFrame(_resizeId);\n    }\n\n    _resizeId = window.requestAnimationFrame(function() {\n        refreshAll();\n    });\n}\n\nfunction addEventListeners() {\n    window.addEventListener('load', onLoad);\n    window.addEventListener('resize', onResize);\n}\n\nfunction removeEventListeners() {\n    window.removeEventListener('load', onLoad);\n    window.removeEventListener('resize', onResize);\n}\n\nfunction setHeight(target) {\n    if (getCurrentCols() < 2) {\n        target.style.removeProperty('height');\n        return;\n    }\n\n    let heights = [];\n\n    Array.from(target.children).forEach(function(item) {\n        if (item.classList.contains('flexmasonry-break')) {\n            return;\n        }\n\n        const comp   = window.getComputedStyle(item);\n        const order  = comp.getPropertyValue('order');\n        const height = comp.getPropertyValue('height');\n\n        if (!heights[order - 1]) {\n            heights[order - 1] = 0;\n        }\n        heights[order - 1] += Math.ceil(parseFloat(height));\n    });\n\n    const maxHeight = Math.max(...heights);\n    target.style.height = maxHeight + 'px';\n}\n\nfunction addBreakElements(target) {\n    const breakEls = target.querySelectorAll('.flexmasonry-break');\n    if (Array.from(breakEls).length === (getCurrentCols() - 1)) {\n        return;\n    }\n\n    for (let i = 1; i < getCurrentCols(); i++) {\n        const breakDiv = document.createElement('div');\n        breakDiv.classList.add('flexmasonry-break');\n        breakDiv.classList.add('flexmasonry-break-' + i);\n        target.appendChild(breakDiv);\n    }\n}\n\nfunction removeBreakElements(target) {\n    const breakEls = target.querySelectorAll('.flexmasonry-break');\n    if (Array.from(breakEls).length === (getCurrentCols() - 1)) {\n        return;\n    }\n\n    Array.from(breakEls).forEach(function(breakEl) {\n        breakEl.parentNode.removeChild(breakEl);\n    });\n}\n\nfunction setColsClass(target) {\n    if (target.classList.contains('flexmasonry-cols-' + getCurrentCols())) {\n        return;\n    }\n\n    target.className = target.className.replace(/(flexmasonry-cols-\\d+)/, '');\n    target.classList.add('flexmasonry-cols-' + getCurrentCols());\n}\n\nfunction getCurrentCols() {\n    if (!_options.responsive) {\n        return _options.numCols;\n    }\n\n    const keys = Object.keys(_options.breakpointCols);\n    for (const key of keys) {\n        if (window.matchMedia('(' + key + ')').matches) {\n            return _options.breakpointCols[key];\n        }\n    }\n\n    return 1;\n}\n\nfunction refresh(target, options = {}) {\n    _options = Object.assign(defaultOptions, options);\n\n    setColsClass(target);\n    removeBreakElements(target);\n    addBreakElements(target);\n    setHeight(target);\n\n    return this;\n}\n\nfunction refreshAll(options = {}) {\n    _targets.forEach(function(target) {\n        refresh(target, options);\n    });\n\n    return this;\n}\n\nfunction destroyAll() {\n    removeEventListeners();\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    init,\n    refresh,\n    refreshAll,\n    destroyAll,\n});\n\n\n//# sourceURL=webpack://FlexMasonry/./src/flexmasonry.js?");

/***/ }),

/***/ 0:
/*!********************************************************!*\
  !*** multi ./src/flexmasonry.css ./src/flexmasonry.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/flexmasonry.css */\"./src/flexmasonry.css\");\nmodule.exports = __webpack_require__(/*! ./src/flexmasonry.js */\"./src/flexmasonry.js\");\n\n\n//# sourceURL=webpack://FlexMasonry/multi_./src/flexmasonry.css_./src/flexmasonry.js?");

/***/ })

/******/ })["default"];