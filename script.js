document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks from Local Storage
});

const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // Prevent saving back to Local Storage
}

function addTask(taskText, save = true) {
    const listItem = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = function() {
        taskList.removeChild(listItem);
        saveTasks(); // Save tasks after removal
    }

    listItem.appendChild(taskSpan);
    listItem.appendChild(removeBtn);
    taskList.appendChild(listItem);

    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

function saveTasks() {
    const tasksArray = [];
    taskList.querySelectorAll('li span').forEach(function(listItem) {
        tasksArray.push(listItem.textContent); // Push task text to the array
    });
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = ''; // Clear the input field
    } else {
        alert('Please enter a task');
    }
});

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = ''; // Clear the input field
        } else {
            alert('Please enter a task');
        }
        event.preventDefault(); // Prevent form submission
    }
});
