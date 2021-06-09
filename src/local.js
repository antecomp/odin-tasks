import {lists, UserLists} from './lists.js'

let lstorage = {
    defaultLists: {
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
    },
    saveToLocal: function () {
        // console.log("Saving to local...")
        let localfriendly = {}
        lists.listlist.forEach(listname => {
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
    },
    loadLocal: function () {
        // Remember Default List, Originally Used For Testing But Doesn't Hurt To Have
        localStorage.setItem("defaultlist", JSON.stringify(this.defaultLists))
        // Check if UserLists exits, if it doesn't (New User), load the default list. Otherwise load UserList
        if(localStorage.getItem("UserLists") == null) { // Load Default List
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
    }
}

export {lstorage}