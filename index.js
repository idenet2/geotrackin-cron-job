const axios = require("axios");
const schedule = require("node-schedule");
const fs = require("fs");

// List of URLs with their scheduled execution times and frequency
const urls = [
    { url: "localhost:5800/WorkingHours/tosyali1/165/24h",    time: "02:00:01", frequency: "daily" },
    { url: "localhost:5800/WorkingHours/tosyali1/165/3x8",    time: "02:10:01", frequency: "daily" },
    { url: "localhost:5800/WorkingHours/tosyali1/164/24h",    time: "02:20:01", frequency: "daily" },
    { url: "localhost:5800/WorkingHours/tosyali1/164/3x8",    time: "02:30:01", frequency: "daily" },
    { url: "http://localhost:5700/DUHReport/flechebleue",     time: "03:00:01", frequency: "daily" },
    { url: "http://localhost:5700/OBCReport/TOTALENERGIES",   time: "03:00:01", frequency: "daily" },
    { url: "http://localhost:5700/OBCMonthlyReport/TOTALENERGIES", time: "05:00:01", frequency: "monthly" }, // Monthly URL
];

// Function to write logs to a file
const logToFile = (message) => {
    const timestamp = new Date().toISOString(); // Get the current timestamp
    fs.appendFileSync("execution_logs.txt", `[${timestamp}] ${message}\n`); // Append the log message to the file
};

// Function to send a GET request to a URL
const fetchUrl = async (url) => {
    try {
        const response = await axios.get(url); // Send a GET request
        const message = `Success: URL ${url} - Status: ${response.status}`;
        console.log(message);
        logToFile(message); // Write the success message to the logs
    } catch (error) {
        const message = `Error accessing ${url}: ${error.message}`;
        console.error(message);
        logToFile(message); // Write the error message to the logs
    }
};

// Schedule tasks for each URL based on frequency
urls.forEach(({ url, time, frequency }) => {
    const [hour, minute, second] = time.split(":").map(Number); // Extract hour, minute, and second

    if (frequency === "daily") {
        // Schedule daily tasks
        logToFile(`Scheduling daily URL: ${url} for time ${time}`);
        schedule.scheduleJob({ hour, minute, second }, () => {
            const now = new Date();
            console.log(`Executing daily URL at ${now.toLocaleString()} - URL: ${url}`);
            logToFile(`Executing daily URL at ${now.toLocaleString()} - URL: ${url}`);
            fetchUrl(url);
        });
        console.log(`Scheduled daily URL: ${url} at ${time}`);
        logToFile(`Scheduled daily URL: ${url} at ${time}`);
    } else if (frequency === "monthly") {
        // Schedule monthly tasks
        logToFile(`Scheduling monthly URL: ${url} for the 1st of every month at ${time}`);
        schedule.scheduleJob({ date: 1, hour, minute, second }, () => {
            const now = new Date();
            console.log(`Executing monthly URL at ${now.toLocaleString()} - URL: ${url}`);
            logToFile(`Executing monthly URL at ${now.toLocaleString()} - URL: ${url}`);
            fetchUrl(url);
        });
        console.log(`Scheduled monthly URL: ${url} on the 1st of each month at ${time}`);
        logToFile(`Scheduled monthly URL: ${url} on the 1st of each month at ${time}`);
    }
});

// Log a message to indicate the scheduling process has started
logToFile("The scheduling process has started successfully.");
