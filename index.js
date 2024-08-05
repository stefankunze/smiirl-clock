#!/usr/bin/env node

const { exec } = require("child_process");
const cron = require("node-cron");

// Function to get the current time in HHMM format
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return hours + minutes;
}

// Function to update the Smiirl counter with the current time
function updateSmiirlCounter(deviceId, token) {
    const currentTime = getCurrentTime();
    const curlCommand = `curl -X GET "http://api.smiirl.com/${deviceId}/set-number/${token}/${currentTime}"`;

    exec(curlCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Failed to update Smiirl counter: ${error.message}`);
            return;
        }
        console.log(`Updated Smiirl counter to ${currentTime}`);
    });
}

// Function to start the Smiirl clock
function startSmiirlClock(deviceId, token) {
    // Schedule the task to run every minute
    cron.schedule("* * * * *", () => {
        updateSmiirlCounter(deviceId, token);
    });
    console.log("Smiirl clock started.");
}

// Retrieve deviceId and token from command line arguments
const deviceId = process.argv[2];
const token = process.argv[3];

// Ensure deviceId and token are provided
if (!deviceId || !token) {
    console.error(
        "Please provide your Smiirl device ID and token as arguments."
    );
    process.exit(1);
}

// Start the Smiirl clock
startSmiirlClock(deviceId, token);
