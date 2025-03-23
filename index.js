const axios = require("axios");
const schedule = require("node-schedule");
const fs = require("fs");

// List of URLs with their scheduled execution times
const urls = [
    { url: "http://localhost:5700/DUHReport/flechebleue", time: "2:30:01" },
    { url: "http://localhost:5700/OBCReport/TOTALENERGIES", time: "3:00:01" },
    { url: "http://localhost/RapportIVMS/lafargeholcimreport/eventsReport.php", time: "1:00:01" },
    { url: "http://localhost/RapportIVMS/riachele_utocom_report/eventsReport.php", time: "1:30:01" },
    { url: "http://localhost/RapportIVMS/flechbleueReport/eventsReport.php", time: "2:00:01" },
];

// Function to send a GET request to a URL
const fetchUrl = async (url) => {
    try {
        const response = await axios.get(url); // Send a GET request
        const message = `Success: ${url} - Status: ${response.status}`;
        console.log(message);
        logToFile(message); // Log the success message
    } catch (error) {
        const message = `Error fetching ${url}: ${error.message}`;
        console.error(message);
        logToFile(message); // Log the error message
    }
};

// Function to write logs to a file
const logToFile = (message) => {
    const timestamp = new Date().toISOString(); // Get the current timestamp
    fs.appendFileSync("execution_logs.txt", `[${timestamp}] ${message}\n`); // Append the log message to the file
};

// Schedule tasks for each URL
urls.forEach(({ url, time }) => {
    const [hour, minute, second] = time.split(":").map(Number); // Extract hour, minute, and second

    // Create a scheduled job for each URL
    schedule.scheduleJob({ hour, minute, second }, () => {
        console.log(`Executing URL at ${time}: ${url}`);
        fetchUrl(url); // Call the URL when the time comes
    });

    console.log(`Scheduled URL: ${url} at ${time}`);
});
