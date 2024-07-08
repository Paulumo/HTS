const logList = document.getElementById('logList');
const logDateInput = document.getElementById('logDate');

function logEvent(event) {
    const timestamp = new Date();
    const formattedTimestamp = timestamp.toLocaleString();
    const dateKey = timestamp.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format

    const logEntry = { event, timestamp: formattedTimestamp };

    // Get logs from local storage
    const logs = JSON.parse(localStorage.getItem(dateKey)) || [];

    // Add new log entry
    logs.push(logEntry);

    // Save logs back to local storage
    localStorage.setItem(dateKey, JSON.stringify(logs));

    // Update log display
    if (dateKey === new Date().toISOString().split('T')[0]) {
        displayLogs(logs);
    }
}

function displayLogs(logs) {
    logList.innerHTML = '';
    logs.forEach(log => {
        const logEntry = document.createElement('div');
        logEntry.textContent = `${log.event}: ${log.timestamp}`;
        logList.appendChild(logEntry);
    });
}

function showLogForToday() {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const logs = JSON.parse(localStorage.getItem(today)) || [];
    displayLogs(logs);
}

function showLogForDate() {
    const selectedDate = logDateInput.value;
    if (!selectedDate) {
        alert('Please select a date.');
        return;
    }
    const logs = JSON.parse(localStorage.getItem(selectedDate)) || [];
    displayLogs(logs);
}

// Show today's log on page load
showLogForToday();

