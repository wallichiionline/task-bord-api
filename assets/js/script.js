// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Date.now().toString() + Math.floor(Math.random() * 1000); // Combining timestamp with random number
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    return `
        <div class="card task-card" id="${task.id}">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
            </div>
            <button class="btn btn-danger delete-btn">Delete</button>
        </div>
    `;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('#todo-cards').empty(); // Clear existing cards

    if (taskList.length > 0) {
        taskList.forEach(task => {
            let card = createTaskCard(task);
            $('#todo-cards').append(card);
        });

        // Make the cards draggable
        $('.task-card').draggable({
            revert: 'invalid', // Snap back to original position if not dropped in a valid drop target
            stack: '.task-card',
            zIndex: 1000,
        });
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve input values
    let title = $('#task-title').val();
    let description = $('#task-description').val();

    // Create a new task object
    let newTask = {
        id: generateTaskId(),
        title: title,
        description: description,
        status: 'todo', // Assuming the task is initially in the "To Do" lane
    };

    // Add the new task to the task list
    taskList.push(newTask);

    // Update localStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Re-render the task list
    renderTaskList();

    // Close the modal
    $('#formModal').modal('hide');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    let taskId = $(event.target).closest('.task-card').attr('id');

    // Remove the task from the task list
    taskList = taskList.filter(task => task.id !== taskId);

    // Update localStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Re-render the task list
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Render the task list
    renderTaskList();

    // Add event listener for form submission
    $('#task-form').submit(handleAddTask);

    // Add event listener for delete buttons
    $(document).on('click', '.delete-btn', handleDeleteTask);

    // Make lanes droppable
    $('.lane').droppable({
        accept: '.task-card',
        drop: handleDrop,
    });
});
