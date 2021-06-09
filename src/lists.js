import {dom} from "./dom.js"
import {task} from "./tasks.js"

let lists = {
    // default: [],
    activeList: "",
    listlist: [], // I love this stupid name
    addtask: function (listname, taskname, taskdesc, taskdue, taskprio, taskcomplete) {
        // Pass This Objects Index Into the task param
        let passedIndex = UserLists[this.activeList].length
        let newTask = new task(taskname, taskdesc, taskdue, taskprio, UserLists[this.activeList], taskcomplete)
        UserLists[listname].push(newTask);
        this.appendTask(UserLists[this.activeList][passedIndex])
        this.saveToLocal()
    },
    newlist: function (listname) {
        if(!UserLists[listname]) {
            UserLists[listname] = [];
            this.listlist.push(listname)
            // console.log(this.listlist)
            this.appendListName(listname)
            this.changeList(listname);
            // Append to listdisplay
        } else {
            alert("List Already Exists")
        }
        this.saveToLocal()
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
        this.saveToLocal()
    },
    changeList: function (listname) {
        this.activeList = listname
        this.wipeAll()
        this.appendAll()
        let stupidbs = document.querySelector(`.somelist[data-list="${listname}"]`)
        this.highlightActiveList(stupidbs)
        // To verify list content matches dom
        console.log("List changed. New array below")
        console.log(UserLists[this.activeList])
        this.saveToLocal()
    },
    // TASK HANDLING, MOVE TO DOM OBJECT LATER!!!
    returnActiveTasks: function () {
        return UserLists[this.activeList];
    },
    appendTask: function (item) {
        dom.mainEl.appendChild(item.renderSelf())
    },
    deleteList: function (listname, newlistitem) {
        // DEPRACATED SMEHPRACATED IT STILL WERKS!!!!111
            // Dont call the change list method on click (parent event) (prevent ubbling)
            event.stopPropagation();
            // Remove From Object
            delete UserLists[listname]
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
            this.saveToLocal()
    },
    appendAll: function () {
        UserLists[this.activeList].forEach(item => {
            dom.mainEl.appendChild(item.renderSelf())
        });
    },
    wipeAll: function () {
        while(dom.mainEl.firstChild) {
            dom.mainEl.removeChild(dom.mainEl.firstChild);
        }
    },
    saveToLocal: function () {
        // console.log("Saving to local...")
        let localfriendly = {}
        this.listlist.forEach(listname => {
            localfriendly[listname] = []
            UserLists[listname].forEach(task => {
                let fname = task.name
                let fdesc = task.desc
                let fdue = task.due
                let fimp = task.prio
                let fcomp = task.completed
                let friendlyTask = {name: fname, desc: fdesc, due: fdue, prio: fimp , completed: fcomp}
                localfriendly[listname].push(friendlyTask)
            })
        })
    // console.log(localfriendly)
    localStorage.setItem("UserLists", JSON.stringify(localfriendly))
    }
}

let UserLists = {}
console.log(UserLists)

//Todo: read the sticky notes im going to screamfsd fsdbjsdfjiksdfgjhsdjkldlkjfdjkndfs

export {lists, UserLists}