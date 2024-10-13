// Function to retrieve study sessions from local storage
function getStudySessions() {
    return JSON.parse(localStorage.getItem('studySessions')) || [];
}

// Function to display study sessions in the dashboard
function displayStudySessions() {
    const studyLog = document.getElementById('study-log');
    studyLog.innerHTML = ''; // Clear existing log entries

    const sessions = getStudySessions();

    sessions.forEach(session => {
        const logEntry = document.createElement('div');
        logEntry.textContent = `${session.date}: ${Math.floor(session.hoursStudied)}h ${((session.hoursStudied % 1) * 60).toFixed(0)}m`;
        studyLog.appendChild(logEntry);
    });
}

// Function to add a study session to local storage
function addStudySession(date, hoursStudied) {
    const sessions = getStudySessions();
    const todaySession = sessions.find(session => session.date === date) || { date: date, hoursStudied: 0 };
    todaySession.hoursStudied += hoursStudied;
    if (!sessions.includes(todaySession)) {
        sessions.push(todaySession);
    }
    localStorage.setItem('studySessions', JSON.stringify(sessions));
}

// Pomodoro timer functionality
let pomodoroTimer;
let breakTimer;
let isInPomodoro = false;
let totalStudyTimeToday = 0; // in minutes
const todayDate = new Date().toLocaleDateString();

const timerDisplay = document.getElementById('timer-display');
const totalStudyTimeDisplay = document.getElementById('total-study-time');

function startPomodoro(duration) {
    isInPomodoro = true;
    let timeLeft = duration * 60; // Convert to seconds
    timerDisplay.textContent = `Timer: ${Math.floor(timeLeft / 60)}:00`;

    pomodoroTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Timer: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(pomodoroTimer);
            alert("Take a break!");

            // Log the exact duration in minutes
            console.log("Pomodoro duration logged:", duration);
            logStudySession(duration); // Log the exact duration in minutes
            startBreak();
        }
    }, 1000);
}

function startBreak() {
    const breakDuration = parseInt(document.getElementById('break-duration').value);
    let timeLeft = breakDuration * 60;

    breakTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Break: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(breakTimer);
            const continueSession = confirm("Will you do another Pomodoro session?");
            if (continueSession) {
                startPomodoro(parseInt(document.getElementById('pomodoro-duration').value));
            } else {
                isInPomodoro = false;
                timerDisplay.textContent = "Timer: 00:00";
            }
        }
    }, 1000);
}

function logStudySession(duration) {
    totalStudyTimeToday += duration; // Increment total study time in minutes
    const totalHours = Math.floor(totalStudyTimeToday / 60);
    const totalMinutes = totalStudyTimeToday % 60;

    // Update the displayed total study time
    totalStudyTimeDisplay.textContent = `Total Study Time Today: ${totalHours}h ${totalMinutes}m`;

    // Save the session to local storage in hours and minutes
    const loggedHours = duration / 60; // Convert to hours for storage
    addStudySession(todayDate, loggedHours); // Save in hours
}

// Stop timer functionality
function stopTimer() {
    clearInterval(pomodoroTimer);
    clearInterval(breakTimer);
    isInPomodoro = false;
    timerDisplay.textContent = "Timer: 00:00";
}

// Reset timer functionality
function resetTimer() {
    stopTimer();
    timerDisplay.textContent = "Timer: 00:00"; // Reset displayed timer
}

// Start Pomodoro session when button is clicked
document.getElementById('start-timer').addEventListener('click', () => {
    const duration = parseInt(document.getElementById('pomodoro-duration').value);
    if (!isInPomodoro) {
        startPomodoro(duration);
    }
});

// Stop timer when stop button is clicked
document.getElementById('stop-timer').addEventListener('click', stopTimer);

// Reset timer when reset button is clicked
document.getElementById('reset-timer').addEventListener('click', resetTimer);

// Display the study sessions on page load
document.addEventListener('DOMContentLoaded', displayStudySessions);
