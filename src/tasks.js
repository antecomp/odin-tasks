import {lists, UserLists} from './lists.js'

class task {
    // Add ability to recieve index to be used in functions
    constructor(name, desc, due, prio, list, complete) {
            this.name = name // String
            this.desc = desc // String
            this.due = due   // String
            this.prio = prio // Boolean (High Prio or Not)
            this.completed = complete
            this.hostlist = list
    }
    togglecomplete(taskcontainer) {
        if(this.completed) {
            this.completed = false 
            taskcontainer.classList.remove("completed")
        } else {
                this.completed = true
                taskcontainer.classList.add("completed")
            }
            console.log(this.completed)
        }
    // REPLACE THE TEXTBOX WITH A BUTTON THAT TOGGLE this.completed AND THEN HAVE renderSelf() 
    // APPLY STRIKETHROUGH TO EVERYTHING IF ITS COMPLETED
    renderSelf(parent) {
        let taskcontainer = document.createElement("div")
        taskcontainer.classList.add("task")
        if(this.prio) taskcontainer.classList.add("priohigh")
        if(this.completed) taskcontainer.classList.add("completed")
        // I hate this
        // Task left
        let taskleft = document.createElement("div")
        taskleft.innerText = `✓`
        taskleft.classList.add("taskleft")
        taskleft.addEventListener("click", () => {
            this.togglecomplete(taskcontainer)
            lists.saveToLocal()
        })
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
            lists.saveToLocal()
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
            lists.saveToLocal()
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
            lists.saveToLocal()
        })
        taskcontainer.appendChild(taskright)
        return taskcontainer;
    }
}

export {task}