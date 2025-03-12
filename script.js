document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from localStorage
    loadTasks();
    
    // Add event listener for Enter key
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const input = document.getElementById('taskInput');
    const task = input.value.trim();
    
    if (task) {
        const todoList = document.getElementById('todoList');
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.onclick = function() {
            toggleTask(li);
        };

        const taskText = document.createElement('span');
        taskText.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            deleteTask(li);
        };

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        input.value = '';
        saveTasks();
    }
}

function toggleTask(li) {
    li.classList.toggle('completed');
    saveTasks();
}

function deleteTask(li) {
    li.remove();
    saveTasks();
}

function saveTasks() {
    const todoList = document.getElementById('todoList');
    const tasks = [];
    
    todoList.querySelectorAll('.todo-item').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const todoList = document.getElementById('todoList');
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (task.completed) {
            li.classList.add('completed');
        }
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = function() {
            toggleTask(li);
        };

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            deleteTask(li);
        };

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
} 