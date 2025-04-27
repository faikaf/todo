
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var deadlineInput = document.getElementById("deadlineInput");
    var taskText = taskInput.value.trim();
    var deadline = deadlineInput.value;
    
    if (taskText === "" || deadline === "") {
      alert("Please enter both task and deadline!");
      return;
    }
  
    var li = document.createElement("li");
    
    var deadlineDate = new Date(deadline);
    var now = new Date();
    
    var deadlineClass = "";
    var deadlineText = "Deadline: " + deadlineDate.toLocaleString();
    
    if (deadlineDate < now) {
      deadlineClass = "deadline-passed";
      deadlineText += " (Deadline Passed ❗)";
    }
     
    var taskId = "task-" + Date.now();
    li.innerHTML = `
      <div>
        ${taskText}
        <div class="task-deadline ${deadlineClass}">${deadlineText}</div>
      </div>
      <div class="task-deadline ${deadlineClass}" id="${taskId}" style="color:green"></div>
  
  
      <button class="delete-btn" onclick="removeTask(this)">Delete</button>
    `;
    
    document.getElementById("taskList").appendChild(li);
  
      // Start countdown
      startCountdown(taskId, deadlineDate);
    // Reset inputs
    taskInput.value = "";
    deadlineInput.value = "";
  }
  
  function removeTask(btn) {
    var li = btn.parentElement;
    li.remove();
  }
  function startCountdown(elementId, deadlineDate) {
    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = deadlineDate.getTime() - now;
  
      var element = document.getElementById(elementId);
      
      if (!element) {
        clearInterval(x);
        return;
      }
      
      if (distance < 0) {
        element.innerHTML = `<span class="deadline-passed">Deadline Passed ❗</span>`;
        element.style.color = "red";  // 🔴 After passing deadline, red color
        clearInterval(x);
      } else {
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        element.innerHTML = `Time Left: ${hours}h ${minutes}m ${seconds}s`;
  
        if (distance <= 30 * 60 * 1000) { 
          // ⏳ If 30 minutes (300,000 ms) left
          element.style.color = "red"; // Orange warning color
        } else {
          element.style.color = "green"; // Normal color
        }
      }
    }, 1000);
  }
  