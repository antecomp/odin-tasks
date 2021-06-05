// Let index.js handle dom events, no real reason to seperate that out.

import {lists, task} from './lists.js'

// Add logic to see if localstorage list is empty and then generate these demos
lists.newlist("New List")
lists.newlist("Example List")
lists.addtask(lists.activeList, "Second List Example", "Some Desc", "X/XX/XX", false)
lists.changeList("New List")


lists.addtask(lists.activeList, "Example task", "example desc", "X/XX/XX", true)
lists.addtask(lists.activeList, "Another task", "anoher example desc", "X/XX/XX", false)

// Due to the method addtask uses to get the index, ALWAYS pass the activeList in,
// otherwise you will get an incorrect index (the active lists index instead of the list you entered.)

console.log(lists)
console.log(lists.default);

let listinfobutton = document.querySelector("#listinfo")

listinfobutton.addEventListener("click", () => {
    console.log(lists)
})

let newTaskButton = document.querySelector("#newtask")

// Eventually, this button should spawn a new task window and the submit
// function of that window should pass everything into addtask
/* newTaskButton.addEventListener("click", () => {
    lists.addtask(lists.activeList, prompt("Name"), prompt("Desc"), prompt("due"), true)
    console.log(lists.returnActiveTasks())
}) */

let taskform = document.querySelector("#promptcon")
taskform.style.display == "none"

function toggleTaskform() {
    (taskform.style.display == "none") ? taskform.style.display = "flex" : taskform.style.display = "none"
}

newTaskButton.addEventListener("click", () => {
    toggleTaskform()
})

let newtaskform = document.querySelector("#newtaskform")

newtaskform.addEventListener("submit", () => {
    event.preventDefault();
    let inputtedname = newtaskform.elements["newtaskname"].value
    let inputteddesc = newtaskform.elements["newtaskdesc"].value
    let inputteddate = newtaskform.elements["newtaskdue"].value
    if (inputtedname == "") return false;
    // Still need radio to mark as important!!
    lists.addtask(lists.activeList, inputtedname, inputteddesc, inputteddate, false)
    newtaskform.elements["newtaskname"].value = ""
    newtaskform.elements["newtaskdesc"].value = ""
    newtaskform.elements["newtaskdue"].value = ""
    toggleTaskform();
    return false;
})

let closetakform = document.querySelector('#promptclose')
closetakform.addEventListener("click", () => {toggleTaskform()})


let newlistform = document.querySelector('#newlistform')

newlistform.addEventListener("submit", () => {
    //  event.preventDefault()
    // alert(newlistform.elements["newlistname"].value)
    let inputtedname = newlistform.elements["newlistname"].value
    newlistform.elements["newlistname"].value = ""
    // Dont accept an empty value
    if (inputtedname == "") return;
    lists.newlist(inputtedname);
    return false
})