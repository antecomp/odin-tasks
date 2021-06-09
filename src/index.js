// Let index.js handle dom events, no real reason to seperate that out.

import {lists, UserLists} from './lists.js'
import {dom} from "./dom.js"

// get this out of here asap
let defaultLists = {
    "New List": [{
        name: "Very Important Task",
        desc: "This task is very important",
        due: "XXXX-XX-XX",
        prio: true
    },
    {
        name: "Another task",
        desc: "Another desc",
        due: "",
        prio: false
    }],

    "Example List": [{
        name: "Secondary List task",
        desc: "",
        due: "XXXX-XX-XX",
        prio: false
    }]
}

// Please move this and lists.saveToLocal to a different module, this is gross and should be handled by a function.
localStorage.setItem("defaultlist", JSON.stringify(defaultLists))
// localStorage.setItem("UserLists", JSON.stringify(exampleSavedList))

// If localstorage.UserList hasn't been set (new user), generate it, otherwise re-generate the exported userlist
if(localStorage.getItem("UserLists") == null) {
    Object.entries(JSON.parse(localStorage.getItem("defaultlist"))).forEach(([key, value]) => {
        lists.newlist(key)
        value.forEach(task => {
            lists.addtask(lists.activeList, task.name, task.desc, task.due, task.prio, false)
        })
    })
} else { // Load Userlist
    Object.entries(JSON.parse(localStorage.getItem("UserLists"))).forEach(([key, value]) => {
        lists.newlist(key)
        value.forEach(task => {
            lists.addtask(lists.activeList, task.name, task.desc, task.due, task.prio, task.completed)
        })
    })
}
// Set first list as active
lists.changeList(Object.keys(UserLists)[0])

dom.init();