// Variables for tracking punch-in status and time
let punchedIn = false;
let punchInTime = null;
let punchRecords = [];
let remainingTime = 0;
let currentTime = new Date();

console.log("inside try attednace file");


// Initialize and start updating the current time every second
function init() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
}

// Update current time and work time display if punched in
function updateCurrentTime() {
    currentTime = new Date();

    if (punchInTime) {
        const elapsedTime = (new Date().getTime() - punchInTime.getTime()) / 1000;
        remainingTime = Math.max(60 - elapsedTime, 0);
        updateWorkTimeDisplay(elapsedTime);
    }
}

// Handle punch-in and punch-out logic
function handlePunchClick() {
    console.log("handle punch click called");

    if (!punchedIn) {
        console.log("punching in");

        punchedIn = true;
        punchInTime = new Date();
        punchRecords.push({ punchIn: punchInTime, punchOut: null });
        document.getElementById("punchInDiv").style.display = "none";
        document.getElementById("punchOutDiv").style.display = "block";
    } else {
        console.log("punching out");

        const now = new Date();
        punchedIn = false;
        if (punchRecords.length > 0) {
            punchRecords[punchRecords.length - 1].punchOut = now;
        }
        punchInTime = null;
        document.getElementById("punchInDiv").style.display = "block";
        document.getElementById("punchOutDiv").style.display = "none";
    }
}

// Update the work time display in hours, minutes, and seconds
function updateWorkTimeDisplay(elapsedTime) {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = Math.floor(elapsedTime % 60);
    document.getElementById("workTime").textContent = `${hours} Hrs : ${minutes} Min : ${seconds} Sec`;
}

// Initialize everything on page load
init();
