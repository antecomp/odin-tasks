// Let index.js handle dom events, no real reason to seperate that out.

import {lists, task} from './lists.js'
import {dom} from "./dom.js"

// Add logic to see if localstorage list is empty and then generate these demos
lists.newlist("New List")
lists.newlist("Example List")
lists.addtask(lists.activeList, "Second List Example", "Some Desc", "XXXX-XX-XX", false)
lists.changeList("New List")


lists.addtask(lists.activeList, "Example task", "example desc", "XXXX-XX-XX", true)
lists.addtask(lists.activeList, "Another task", "anoher example desc", "XXXX-XX-XX", false)

// Due to the method addtask uses to get the index, ALWAYS pass the activeList in,
// otherwise you will get an incorrect index (the active lists index instead of the list you entered.)

console.log(lists)
console.log(lists.default);

dom.init();