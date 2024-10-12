function scheduleRemainder() {
    const title = document.getElementById('title').value;
    const task = document.getElementById('task').value;
    const date = document.getElementById('date').value;
    const deadline = document.getElementById('deadline').value;

    if (title && task && date && deadline) {
        const remainderTableBody = document.getElementById('remainderTableBody');
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${title}</td>
            <td>${task}</td>
            <td>${date} ${deadline}</td>
            <td><button onclick="deleteRemainder(this)">Delete</button></td>
        `;
        remainderTableBody.appendChild(row);

        // Save task to local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ title, task, date, deadline });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Clear input fields
        document.getElementById('title').value = '';
        document.getElementById('task').value = '';
        document.getElementById('date').value = '';
        document.getElementById('deadline').value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

function deleteRemainder(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // Remove the corresponding task from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const title = row.cells[0].innerText;
    const updatedTasks = tasks.filter(task => task.title !== title);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
