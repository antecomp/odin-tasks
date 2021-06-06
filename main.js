/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dom\": () => (/* binding */ dom)\n/* harmony export */ });\n/* harmony import */ var _lists_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lists.js */ \"./src/lists.js\");\n\n\nlet dom = {\n    // Elements\n    mainEl: document.querySelector(\".main\"),\n    listDisplay: document.querySelector(\"#listcon\"),\n    newtaskbutton: document.querySelector(\"#newtask\"),\n    // taskform is the prompt container\n    taskform: document.querySelector(\"#promptcon\"),\n    // new task form is the form element. Maybe you should change these names\n    newtaskform: document.querySelector(\"#newtaskform\"),\n    closetaskform: document.querySelector('#promptclose'),\n    newlistform: document.querySelector('#newlistform'),\n    // Info button for debug only, delete later\n    listinfobutton: document.querySelector('#listinfo'),\n    // Methods\n    listinfo: function () {\n        console.log(_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists)\n    },\n    toggleTaskForm: function () {\n        // What the hell why can't I pass this but passing dom works\n        (dom.taskform.style.display == \"none\") ? dom.taskform.style.display = \"flex\" : dom.taskform.style.display = \"none\"\n    },\n    newtask: function (element) { // Replace with this.newtaskform?? Or just do it in initialize\n        console.log(element)\n        let inputtedname = element.elements[\"newtaskname\"].value\n        let inputteddesc = element.elements[\"newtaskdesc\"].value\n        let inputteddate = element.elements[\"newtaskdue\"].value\n        // Still need radio to mark as important!!\n        _lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.addtask(_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.activeList, inputtedname, inputteddesc, inputteddate, false)\n        element.elements[\"newtaskname\"].value = \"\"\n        element.elements[\"newtaskdesc\"].value = \"\"\n        element.elements[\"newtaskdue\"].value = \"\"\n        this.toggleTaskForm();\n        return false;\n    },\n    newlist: function() {\n        // Why can't I pass this help help helpe gelpe hlepp\n        let inputtedname = dom.newlistform.elements[\"newlistname\"].value\n        dom.newlistform.elements[\"newlistname\"].value = \"\"\n        // Dont accept an empty value\n        if (inputtedname == \"\") return;\n        _lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.newlist(inputtedname);\n        return false\n    },\n    // Add event listeners to each of the elements\n    init: function () {\n        this.listinfobutton.addEventListener(\"click\", this.listinfo)\n        this.taskform.style.display = \"none\"\n        this.newtaskbutton.addEventListener(\"click\", this.toggleTaskForm)\n        this.newtaskform.addEventListener(\"submit\", () => {this.newtask(dom.newtaskform)})\n        this.closetaskform.addEventListener(\"click\", this.toggleTaskForm)\n        this.newlistform.addEventListener(\"submit\", this.newlist)\n    }\n}\n\n\n\n//# sourceURL=webpack://tasks/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lists_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lists.js */ \"./src/lists.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n// Let index.js handle dom events, no real reason to seperate that out.\n\n\n\n\n// Add logic to see if localstorage list is empty and then generate these demos\n_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.newlist(\"New List\")\n_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.newlist(\"Example List\")\n_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.addtask(_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.activeList, \"Second List Example\", \"Some Desc\", \"XXXX-XX-XX\", false)\n_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.changeList(\"New List\")\n\n\n_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.addtask(_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.activeList, \"Example task\", \"example desc\", \"XXXX-XX-XX\", true)\n_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.addtask(_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.activeList, \"Another task\", \"anoher example desc\", \"XXXX-XX-XX\", false)\n\n// Due to the method addtask uses to get the index, ALWAYS pass the activeList in,\n// otherwise you will get an incorrect index (the active lists index instead of the list you entered.)\n\nconsole.log(_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists)\nconsole.log(_lists_js__WEBPACK_IMPORTED_MODULE_0__.lists.default);\n\n_dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.init();\n\n//# sourceURL=webpack://tasks/./src/index.js?");

/***/ }),

/***/ "./src/lists.js":
/*!**********************!*\
  !*** ./src/lists.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"lists\": () => (/* binding */ lists),\n/* harmony export */   \"task\": () => (/* binding */ task)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\nlet lists = {\n    // default: [],\n    activeList: \"\",\n    listlist: [], // I love this stupid name\n    addtask: function (listname, taskname, taskdesc, taskdue, taskprio) {\n        // Pass This Objects Index Into the task param\n        let passedIndex = this[this.activeList].length\n        let newTask = new task(taskname, taskdesc, taskdue, taskprio)\n        this[listname].push(newTask);\n        this.appendTask(this[this.activeList][passedIndex])\n    },\n    newlist: function (listname) {\n        if(!this[listname]) {\n            this[listname] = [];\n            this.listlist.push(listname)\n            // console.log(this.listlist)\n            this.appendListName(listname)\n            this.changeList(listname);\n            // Append to listdisplay\n        } else {\n            alert(\"List Already Exists\")\n        }\n    },\n    highlightActiveList: function (activeitem) {\n        let alllistitems = document.querySelectorAll(\".somelist\")\n            alllistitems.forEach(item => {\n                item.classList.remove(\"active\")\n            })\n            // let activeitem = document.querySelector(`[data-list=\"${listname}\"]`)\n            activeitem.classList.add(\"active\")\n    },\n    appendListName: function (listname) {\n        let newlistitem = document.createElement(\"li\")\n        newlistitem.classList.add(\"somelist\")\n        newlistitem.dataset.list = listname\n        newlistitem.textContent = listname;\n        newlistitem.addEventListener(\"click\", () => {\n            lists.changeList(newlistitem.dataset.list)\n            this.highlightActiveList(newlistitem);\n        })\n        // Highlight on creation too\n        this.highlightActiveList(newlistitem);\n        // This whole section is a mess and I hate it, please make it less stroke inducing in the future\n        let deletebutton = document.createElement(\"b\")\n        deletebutton.textContent = 'X'\n        deletebutton.addEventListener(\"click\", () => {this.deleteList(listname, newlistitem)})\n        newlistitem.appendChild(deletebutton)\n        _dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.listDisplay.appendChild(newlistitem)\n    },\n    changeList: function (listname) {\n        this.activeList = listname\n        this.wipeAll()\n        this.appendAll()\n        let stupidbs = document.querySelector(`.somelist[data-list=\"${listname}\"]`)\n        this.highlightActiveList(stupidbs)\n        // To verify list content matches dom\n        console.log(\"List changed. New array below\")\n        console.log(this[this.activeList])\n    },\n    // TASK HANDLING, MOVE TO DOM OBJECT LATER!!!\n    returnActiveTasks: function () {\n        return this[this.activeList];\n    },\n    appendTask: function (item) {\n        _dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.mainEl.appendChild(item.renderSelf())\n    },\n    deleteList: function (listname, newlistitem) {\n        // DEPRACATED SMEHPRACATED IT STILL WERKS!!!!111\n            // Dont call the change list method on click (parent event) (prevent ubbling)\n            event.stopPropagation();\n            // Remove From Object\n            delete this[listname]\n            // Remove from DOM\n            newlistitem.remove()\n            // Verify object clean\n            console.log(\"List deleted, dev verify object clean\")\n            console.log(this)\n            // If that was the last list, make a new fallback one\n            let indexinlistlist = this.listlist.indexOf(listname)\n            if (indexinlistlist > -1) {\n                this.listlist.splice(indexinlistlist, 1);\n              }\n            if (this.listlist.length == 0) {\n                this.newlist(\"New List\");\n            }\n            // Change list if that was the active list, fallback on first item, who cares\n            // if you want to in some final revisions, have it go the next list up or down if its the first\n            if (listname == this.activeList) {\n                this.changeList(this.listlist[0])\n            }\n    },\n    appendAll: function () {\n        this[this.activeList].forEach(item => {\n            _dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.mainEl.appendChild(item.renderSelf())\n        });\n    },\n    wipeAll: function () {\n        while(_dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.mainEl.firstChild) {\n            _dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.mainEl.removeChild(_dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.mainEl.firstChild);\n        }\n    }\n}\n\n\n\n\n\nclass task {\n    // Add ability to recieve index to be used in functions\n    constructor(name, desc, due, prio, index) {\n            this.name = name // String\n            this.desc = desc // String\n            this.due = due   // String\n            this.prio = prio // Boolean (High Prio or Not)\n            this.completed = false\n    }\n    togglecomplete(checkbox) {\n        if(checkbox.target.checked) { \n            this.completed = true\n       } else {\n           this.completed = false\n       }\n       // console.log(this.completed)\n    }\n    renderSelf(parent) {\n        let taskcontainer = document.createElement(\"div\")\n        taskcontainer.classList.add(\"task\")\n        // I hate this\n        // Task left\n        let taskleft = document.createElement(\"div\")\n        // taskleft.innerHTML = `<input type=\"checkbox\">`\n        taskleft.classList.add(\"taskleft\")\n        let completedbox = document.createElement(\"input\")\n        completedbox.setAttribute(\"type\",\"checkbox\")\n        // You will need to add a method for setting the checkbox based on the completed state\n        // Since re-rendering the card (such as switching lists) will remove the \"checked\" state of the box.\n        completedbox.addEventListener(\"change\", (e) => {this.togglecomplete(e)})\n        taskleft.appendChild(completedbox)\n        taskcontainer.appendChild(taskleft)\n        // Task Center\n        let taskcenter = document.createElement(\"div\")\n        taskcenter.classList.add(\"taskcenter\")\n        // Everything inside task center\n        let taskname = document.createElement(\"h3\")\n        taskname.innerText = this.name\n        taskname.classList.add(\"taskname\")\n        taskcenter.appendChild(taskname)\n        // -------\n        let taskdesc = document.createElement(\"p\")\n        taskdesc.innerText = this.desc\n        taskdesc.classList.add(\"desc\")\n        taskcenter.appendChild(taskdesc)\n        // ---------\n        let taskdue = document.createElement(\"p\")\n        taskdue.innerText = this.due\n        taskdue.classList.add(\"duedate\")\n        taskcenter.appendChild(taskdue)\n        // Append Taskcenter\n        taskcontainer.appendChild(taskcenter)\n        // Task Right\n        let taskright = document.createElement(\"div\")\n        taskright.classList.add(\"taskright\")\n        taskright.innerText = \"✗\"\n        taskright.addEventListener(\"click\", () => {\n            // Oh that was easier than I thought. Remove from DOM\n            taskcontainer.remove();\n            // Remove from array -- https://stackoverflow.com/questions/6658223/javascript-item-splice-self-out-of-list\n            // You may want to add a function param that the list can pass itself as\n            // in lists: appendChild(item.renderSelf(this))\n            // in here: passedList <- from passed param.   passedList[passedList.activeList]....\n            lists[lists.activeList].splice(lists[lists.activeList].indexOf(this), 1)\n            // Verify array is clean\n            console.log(\"Task deleted: New array below\")\n            console.log(lists[lists.activeList])\n        })\n        taskcontainer.appendChild(taskright)\n        return taskcontainer;\n    }\n}\n\n\n\n\n//# sourceURL=webpack://tasks/./src/lists.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;