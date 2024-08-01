document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const editModal = $('#editModal');
    const editTaskForm = document.getElementById('editTaskForm');
    const editTaskInput = document.getElementById('editTaskInput');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentTaskId = null;

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = { id: Date.now(), text: taskText };
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            renderTasks();
        }
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit')) {
            currentTaskId = parseInt(e.target.dataset.id);
            const task = tasks.find(t => t.id === currentTaskId);
            editTaskInput.value = task.text;
            editModal.modal('show');
        } else if (e.target.classList.contains('delete')) {
            const id = parseInt(e.target.dataset.id);
            tasks = tasks.filter(t => t.id !== id);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });

    editTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newText = editTaskInput.value.trim();
        if (newText !== '') {
            const taskIndex = tasks.findIndex(t => t.id === currentTaskId);
            tasks[taskIndex].text = newText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            editModal.modal('hide');
            renderTasks();
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="btn btn-secondary btn-sm edit" data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete" data-id="${task.id}">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    renderTasks();
});
