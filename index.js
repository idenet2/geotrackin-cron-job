const axios = require("axios");
const schedule = require("node-schedule");
const fs = require("fs");

// List of URLs with their scheduled execution times
const urls = [
    { url: "http://localhost:5700/DUHReport/flechebleue", time: "12:21:01" },
    // { url: "http://localhost:5700/OBCReport/TOTALENERGIES", time: "1:30:01" },
    // { url: "http://localhost/RapportIVMS/lafargeholcimreport/eventsReport.php", time: "2:00:01" },
    // { url: "http://localhost/RapportIVMS/riachele_utocom_report/eventsReport.php", time: "12:00:01" },
    // { url: "http://localhost/RapportIVMS/flechbleueReport/eventsReport.php", time: "3:00:01" },
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

// Schedule tasks for each URL
urls.forEach(({ url, time }) => {
    const [hour, minute, second] = time.split(":").map(Number); // Extract hour, minute, and second

    // Log the scheduling action
    logToFile(`Scheduling URL: ${url} for time ${time}`);
    
    schedule.scheduleJob({ hour, minute, second }, () => {
        const now = new Date();
        console.log(`Executing URL at ${now.toLocaleString()} - URL: ${url}`);
        logToFile(`Executing URL at ${now.toLocaleString()} - URL: ${url}`);
        fetchUrl(url); // Call the fetchUrl function for the specified URL
    });

    console.log(`Scheduled URL: ${url} at ${time}`);
    logToFile(`Scheduled URL: ${url} at ${time}`);
});

// Log a message to indicate the scheduling process has started
logToFile("The scheduling process has started successfully.");
