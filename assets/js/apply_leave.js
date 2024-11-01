document.getElementById('leaveForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // // Function to handle the selection and store the selected session
    // function setSession(sessionName) {
    //     // Set the button's text to the selected session
    //     document.getElementById('sessionDropdownButton').innerText = sessionName;

    //     // Store the selected session in localStorage (optional)
    //     localStorage.setItem('selectedSession', sessionName);

    //     // Log the selected session (for debugging or further processing)
    //     console.log("Selected Session:", sessionName);
    // }

  

    // Extract values from the form
    const leaveType = document.getElementById("leaveType").value;
    const startDate = document.getElementById("startDate").value;
    // const session1 = document.getElementById("session1").value;
    const endDate = document.getElementById("endDate").value;
    // const session2 = document.getElementById("session2").value;
    const applying = document.getElementById("applying").value;
    const ccto = document.getElementById("ccto").value;
    const numberofdays = document.getElementById("numberofdays").value;
    const file = document.getElementById("file").value;
    const reason = document.getElementById("reason").value;
    // Create an object with the form data
    const leaveData = {
        leaveType: leaveType,
        // session1: session1,
        endDate: endDate,
        // session2: session2,
        applyingTo: applying,
        cc: ccto,
        numberofleaves: numberofdays,
        file: file,
        reason: reason,
        startDate: startDate
    };
    console.log(leaveData);

    const employeeId = localStorage.getItem('employeeId');
    console.log(employeeId);


    // Perform a fetch request to send the data to the backend API
    fetch(`http://localhost:8081/api/leaves/leave/${employeeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveData), // Send the form data as JSON
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // You can add code here to handle success, like showing a success message or closing the modal
            alert('Leave applied successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error case
            alert('Failed to apply leave');
        });
});

  // W When the page loads, check if a session is already stored and display it
  window.onload = function () {
    const storedSession = localStorage.getItem('selectedSession');
    if (storedSession) {
        document.getElementById('sessionDropdownButton').innerText = storedSession;
    }
};