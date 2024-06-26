// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const div = jQuery('<div>', {
        id: task.id,
        class: 'card-body',
        title: task.title
    });
    jQuery('<h3>', {
        html: task.title
    }).appendTo(div);
    jQuery('<p>', {
        html: task.description
    }).appendTo(div);
    jQuery('<p>', {
        html: "Deadline: " + task.deadline
    }).appendTo(div);
    div.appendTo("#" + task.state + "-cards");
    
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    taskList.forEach(element =>{
        createTaskCard(element);
        $("#" + element.id) //Make draggable
        $("#" + element.state + "-cards") //Add to list
    });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    const title= $("#title").val()
    const description= $("#description").val()
    const deadline= $("#deadline").val()

    const task= {
        title: title,
        description: description,
        deadline: deadline,
        state: "todo",
    };

    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksList))
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#newTask").submit(handleAddTask())
    renderTaskList()
    // add sumbit button listener
    $("#newTask").submit(handleAddTask)

}); 

