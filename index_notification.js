document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.createElement('ul');

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Task: ${task.task}, Deadline: ${task.date} ${task.deadline} `;

        // Increase font size with inline style
        listItem.style.fontSize = '25px'; // Adjust the size as needed

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteTask(index);
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });

    document.body.appendChild(taskList);
});

// Function to delete a task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // Remove the task at the specified index
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
    location.reload(); // Reload the page to refresh the task list
}

