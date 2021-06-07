import {lists} from './lists.js'

let dom = {
    // Elements
    mainEl: document.querySelector(".main"),
    listDisplay: document.querySelector("#listcon"),
    newtaskbutton: document.querySelector("#newtask"),
    // taskform is the prompt container
    taskform: document.querySelector("#promptcon"),
    // new task form is the form element. Maybe you should change these names
    newtaskform: document.querySelector("#newtaskform"),
    closetaskform: document.querySelector('#promptclose'),
    newlistform: document.querySelector('#newlistform'),
    // Info button for debug only, delete later
    listinfobutton: document.querySelector('#listinfo'),
    // Methods
    listinfo: function () {
        console.log(lists)
    },
    toggleTaskForm: function () {
        // What the hell why can't I pass this but passing dom works
        (dom.taskform.style.display == "none") ? dom.taskform.style.display = "flex" : dom.taskform.style.display = "none"
    },
    newtask: function (element) { // Replace with this.newtaskform?? Or just do it in initialize
        console.log(element)
        let inputtedname = element.elements["newtaskname"].value
        let inputteddesc = element.elements["newtaskdesc"].value
        let inputteddate = element.elements["newtaskdue"].value
        let important = element.elements["importance"].checked
        // Still need radio to mark as important!!
        lists.addtask(lists.activeList, inputtedname, inputteddesc, inputteddate, important)
        element.elements["newtaskname"].value = ""
        element.elements["newtaskdesc"].value = ""
        element.elements["newtaskdue"].value = ""
        element.elements["importance"].checked = false
        this.toggleTaskForm();
        return false;
    },
    newlist: function() {
        // Why can't I pass this help help helpe gelpe hlepp
        let inputtedname = dom.newlistform.elements["newlistname"].value
        dom.newlistform.elements["newlistname"].value = ""
        // Dont accept an empty value
        if (inputtedname == "") return;
        lists.newlist(inputtedname);
        return false
    },
    // Add event listeners to each of the elements
    init: function () {
        this.listinfobutton.addEventListener("click", this.listinfo)
        this.taskform.style.display = "none"
        this.newtaskbutton.addEventListener("click", this.toggleTaskForm)
        this.newtaskform.addEventListener("submit", () => {this.newtask(dom.newtaskform)})
        this.closetaskform.addEventListener("click", this.toggleTaskForm)
        this.newlistform.addEventListener("submit", this.newlist)
    }
}

export {dom}