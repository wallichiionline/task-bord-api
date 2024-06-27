// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (nextId == null) {
            nextId = 1;
        } else {
            nextId = nextId + 1;
        }
        localStorage.setItem("nextId", nextId);
    }
    

// Todo: create a function to create a task card
function createTaskCard(task) {
    const carddiv = jQuery('<div>', {
        class: 'card',
        id: task.id
    })
    const div = jQuery('<div>', {
        class: 'card-body',
        title: task.title
    });
    const today = new Date();
    const deadline = new Date(task.deadline);
    today.setHours(0,0,0,0);
    deadline.setHours(0,0,0,0);
    deadline.setDate(deadline.getDate()+1)
    if(deadline.toDateString() === today.toDateString()) {
        $(div).addClass('due')
    } else if (deadline < today) {
        $(div).addClass('overdue')
    }
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
    div.appendTo(carddiv)
    carddiv.appendTo("#" + task.state + "-cards");

    jQuery('<button>', {
        html: 'X',
        class: 'btn'
    }).click(handleDeleteTask).appendTo(div);
    div.appendTo(carddiv)
    carddiv.appendTo("#" + task.state + "-cards");
    
    
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
    const title = $("#title").val();
    const description = $("#description").val();
    const deadline = $("#deadline").val();

generateTaskId();
    const task = {
        id: nextId,
        title: title,
        description: description,
        deadline: deadline,
        state: "todo"
    };

    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList))
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const divId = this.parentElement.parentElement.id;
        const index = taskList.indexOf(taskList.find(x=>x.id==divId));
        taskList.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
    }

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#newTask").submit(handleAddTask)
    renderTaskList()
    // add sumbit button listener
}); 

