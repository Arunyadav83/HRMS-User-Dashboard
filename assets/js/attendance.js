// // Event listener for Relogin button after break
document.getElementById("punchInBtn").addEventListener('click', function (event) {
    event.preventDefault();

    const employeeId = localStorage.getItem("employeeId"); // Get employee ID from local storage

    // Get the current login time
    const loginTime = new Date().toISOString();
    document.getElementById("loginTime").value = loginTime;

    const attendanceDetails = {
        loginTime: loginTime,
        logoutTime: null, // Empty for punch-in
        date: document.getElementById("date").value,
        attendanceId: null // No attendanceId for punch-in, set to null

    };
    console.log(attendanceDetails);
    

    fetch(`http://localhost:8081/api/attendance/check-in/${employeeId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceDetails),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Punch in failed');
            }
        })
        .then(data => {
            // alert("Punch in Successful");
            console.log("Punch In Successful:", data);

            // Store attendanceId in local storage for punch-out use
            localStorage.setItem("attendanceId", data.attendanceId);

            // Hide Punch-In button and show Punch-Out button
            document.getElementById("punchInDiv").style.display = "none";
            document.getElementById("punchOutDiv").style.display = "block";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Punch in failed");
        });
});

document.getElementById("punchOutBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    const logoutTime = new Date().toISOString(); // Get current logout time
    document.getElementById("logoutTime").value = logoutTime; // Set logout time in hidden field

    // Get attendanceId from localStorage
    const attendanceId = localStorage.getItem("attendanceId");

    if (!attendanceId) {
        console.error("Attendance ID is missing");
        alert("Error: Attendance ID is missing.");
        return;
    }

    const attendanceDetails = {
        loginTime: document.getElementById("loginTime").value, // Use stored login time
        logoutTime: logoutTime,
        date: document.getElementById("date").value
    };

    fetch(`http://localhost:8081/api/attendance/check-out/${attendanceId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceDetails),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Punch out failed');
            }
        })
        .then(data => {
            // alert("Punch out successful");
            console.log("Punch Out Successful:", data);

            // Optionally, reset attendanceId and show Punch-In button again
            localStorage.removeItem("attendanceId");
            document.getElementById("punchOutDiv").style.display = "none";
            document.getElementById("punchInDiv").style.display = "block";
        })
        .catch(error => {
            console.error("Error:", error);
            // alert("Punch out failed");
        });
});

document.getElementById("reloginBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the current login time
    const loginTime = new Date().toISOString(); // Get current time as login time
    document.getElementById("loginTime").value = loginTime; // Set login time in hidden field

    //const employeeId = 152; // Replace with actual employee ID dynamically

    // Prepare attendance details for relogin
    const attendanceDetails = {
        loginTime: loginTime,
        logoutTime: null, // Empty for relogin
        date: document.getElementById("date").value,
        attendanceId: null // No attendance ID yet, create new record
    };

    fetch(`http://localhost:8081/api/attendance/check-in/${employeeId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceDetails),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Relogin failed');
            }
        })
        .then(data => {
            alert("Relogin Successful");
            console.log("Relogin Successful:", data);

            // Hide Relogin button and show Punch-Out button
            document.getElementById("reloginDiv").style.display = "none";
            document.getElementById("punchOutDiv").style.display = "block";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Relogin failed");
        });
});
