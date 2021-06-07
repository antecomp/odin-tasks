import {dom} from "./dom.js"

let lists = {
    // default: [],
    activeList: "",
    listlist: [], // I love this stupid name
    addtask: function (listname, taskname, taskdesc, taskdue, taskprio) {
        // Pass This Objects Index Into the task param
        let passedIndex = this[this.activeList].length
        let newTask = new task(taskname, taskdesc, taskdue, taskprio, this[this.activeList])
        this[listname].push(newTask);
        this.appendTask(this[this.activeList][passedIndex])
    },
    newlist: function (listname) {
        if(!this[listname]) {
            this[listname] = [];
            this.listlist.push(listname)
            // console.log(this.listlist)
            this.appendListName(listname)
            this.changeList(listname);
            // Append to listdisplay
        } else {
            alert("List Already Exists")
        }
    },
    highlightActiveList: function (activeitem) {
        let alllistitems = document.querySelectorAll(".somelist")
            alllistitems.forEach(item => {
                item.classList.remove("active")
            })
            // let activeitem = document.querySelector(`[data-list="${listname}"]`)
            activeitem.classList.add("active")
    },
    appendListName: function (listname) {
        let newlistitem = document.createElement("li")
        newlistitem.classList.add("somelist")
        newlistitem.dataset.list = listname
        newlistitem.textContent = listname;
        newlistitem.addEventListener("click", () => {
            lists.changeList(newlistitem.dataset.list)
            this.highlightActiveList(newlistitem);
        })
        // Highlight on creation too
        this.highlightActiveList(newlistitem);
        // This whole section is a mess and I hate it, please make it less stroke inducing in the future
        let deletebutton = document.createElement("b")
        deletebutton.textContent = 'X'
        deletebutton.addEventListener("click", () => {this.deleteList(listname, newlistitem)})
        newlistitem.appendChild(deletebutton)
        dom.listDisplay.appendChild(newlistitem)
    },
    changeList: function (listname) {
        this.activeList = listname
        this.wipeAll()
        this.appendAll()
        let stupidbs = document.querySelector(`.somelist[data-list="${listname}"]`)
        this.highlightActiveList(stupidbs)
        // To verify list content matches dom
        console.log("List changed. New array below")
        console.log(this[this.activeList])
    },
    // TASK HANDLING, MOVE TO DOM OBJECT LATER!!!
    returnActiveTasks: function () {
        return this[this.activeList];
    },
    appendTask: function (item) {
        dom.mainEl.appendChild(item.renderSelf())
    },
    deleteList: function (listname, newlistitem) {
        // DEPRACATED SMEHPRACATED IT STILL WERKS!!!!111
            // Dont call the change list method on click (parent event) (prevent ubbling)
            event.stopPropagation();
            // Remove From Object
            delete this[listname]
            // Remove from DOM
            newlistitem.remove()
            // Verify object clean
            console.log("List deleted, dev verify object clean")
            console.log(this)
            // If that was the last list, make a new fallback one
            let indexinlistlist = this.listlist.indexOf(listname)
            if (indexinlistlist > -1) {
                this.listlist.splice(indexinlistlist, 1);
              }
            if (this.listlist.length == 0) {
                this.newlist("New List");
            }
            // Change list if that was the active list, fallback on first item, who cares
            // if you want to in some final revisions, have it go the next list up or down if its the first
            if (listname == this.activeList) {
                this.changeList(this.listlist[0])
            }
    },
    appendAll: function () {
        this[this.activeList].forEach(item => {
            dom.mainEl.appendChild(item.renderSelf())
        });
    },
    wipeAll: function () {
        while(dom.mainEl.firstChild) {
            dom.mainEl.removeChild(dom.mainEl.firstChild);
        }
    }
}





class task {
    // Add ability to recieve index to be used in functions
    constructor(name, desc, due, prio, list) {
            this.name = name // String
            this.desc = desc // String
            this.due = due   // String
            this.prio = prio // Boolean (High Prio or Not)
            this.completed = false
            this.hostlist = list
    }
    togglecomplete(checkbox) {
        if(checkbox.target.checked) { 
            this.completed = true
       } else {
           this.completed = false
       }
       // console.log(this.completed)
    }
    // REPLACE THE TEXTBOX WITH A BUTTON THAT TOGGLE this.completed AND THEN HAVE renderSelf() 
    // APPLY STRIKETHROUGH TO EVERYTHING IF ITS COMPLETED
    renderSelf(parent) {
        let taskcontainer = document.createElement("div")
        taskcontainer.classList.add("task")
        if(this.prio) taskcontainer.classList.add("priohigh")
        // I hate this
        // Task left
        let taskleft = document.createElement("div")
        // taskleft.innerHTML = `<input type="checkbox">`
        taskleft.classList.add("taskleft")
        let completedbox = document.createElement("input")
        completedbox.setAttribute("type","checkbox")
        // You will need to add a method for setting the checkbox based on the completed state
        // Since re-rendering the card (such as switching lists) will remove the "checked" state of the box.
        completedbox.addEventListener("change", (e) => {this.togglecomplete(e)})
        taskleft.appendChild(completedbox)
        taskcontainer.appendChild(taskleft)
        // Task Center
        let taskcenter = document.createElement("div")
        taskcenter.classList.add("taskcenter")
        // Everything inside task center
        let taskname = document.createElement("h3")
        taskname.innerText = this.name
        taskname.classList.add("taskname")
        taskcenter.appendChild(taskname)
        // EDIT TASKNAME
        // https://stackoverflow.com/questions/1391278/contenteditable-change-events
        taskname.contentEditable = true
        const nameObserver = new MutationObserver((mutationRecords) => {
            this.name = mutationRecords[0].target.data
            // console.log(this.name)
        })
        nameObserver.observe(taskname, {
            characterData: true,
            subtree: true
        })
        // -------
        let taskdesc = document.createElement("p")
        taskdesc.innerText = this.desc
        taskdesc.classList.add("desc")
        taskcenter.appendChild(taskdesc)
        // EDIT DESC
        taskdesc.contentEditable = true
        const descObserver = new MutationObserver((mutationRecords) => {
            this.desc = mutationRecords[0].target.data
        })
        descObserver.observe(taskdesc, {
            characterData: true,
            subtree: true
        })
        // ---------
        let taskdue = document.createElement("p")
        taskdue.innerText = this.due
        taskdue.classList.add("duedate")
        taskcenter.appendChild(taskdue)
        // Append Taskcenter
        taskcontainer.appendChild(taskcenter)
        // Task Right
        let taskright = document.createElement("div")
        taskright.classList.add("taskright")
        taskright.innerText = "✗"
        taskright.addEventListener("click", () => {
            // Oh that was easier than I thought. Remove from DOM
            taskcontainer.remove();
            // Remove from array -- https://stackoverflow.com/questions/6658223/javascript-item-splice-self-out-of-list
            // You may want to add a function param that the list can pass itself as
            // in lists: appendChild(item.renderSelf(this))
            // in here: passedList <- from passed param.   passedList[passedList.activeList]....
            this.hostlist.splice(this.hostlist.indexOf(this), 1)
            // Verify array is clean
            // console.log("Task deleted: New array below")
            // console.log(lists[lists.activeList])
        })
        taskcontainer.appendChild(taskright)
        return taskcontainer;
    }
}


export {lists, task}