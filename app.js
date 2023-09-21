document.addEventListener("DOMContentLoaded", function () {
  const batteryLevel = document.querySelector(".battery-level");
  const batteryPercentageDisplay = document.getElementById('batteryPercentage');
  const batteryPercentageDisplay2 = document.getElementById('batteryPercentage2');
  const audio = document.getElementById('audio');
  const bhead = document.querySelector(".bhead");
  const headborder = document.querySelector(".headborder")
  
  // Function to update battery level and status
  function updateBatteryStatus() {
      // Check if the Battery Status API is available
      if ("getBattery" in navigator) {
          navigator.getBattery().then(function (battery) {
              const percentage = Math.floor(battery.level * 100);
              batteryLevel.style.width = percentage + "%";
              
              if (percentage <= 20) {
                  batteryLevel.style.backgroundColor = "red";
                  batteryLevel.style.borderColor = "darkred";
              } else if (percentage <= 50) {
                  batteryLevel.style.backgroundColor = "orange";
                  batteryLevel.style.borderColor = "darkgoldenrod";
              } else {
                  batteryLevel.style.backgroundColor = "green";
                  batteryLevel.style.borderColor = "darkgreen";
              }

              if(percentage >= 97){
                batteryLevel.style.borderRadius="10px";
              }

              if(percentage == 100){
                bhead.style.backgroundColor="green";
                headborder.style.borderColor = "darkgreen";
              }else{
                bhead.style.backgroundColor="transparent";
                headborder.style.borderColor = "transparent";
              }

              // Check the charging property of the battery object
              if (battery.charging) {
                  document.getElementById("batteryStatus").innerText = "Plugged in";
              } else {
                  document.getElementById("batteryStatus").innerText = "Unplugged";
              }

              // Check if the battery level is 100% and play audio
              if (percentage === 100) {
                  audio.play();
              }
              
              batteryPercentageDisplay.textContent = percentage;
              batteryPercentageDisplay2.textContent = percentage;
          }).catch(function (error) {
              console.error('Battery status API error: ' + error);
          });
      } else {
          // Handle the case when the Battery Status API is not supported
          console.log('Battery Status API is not supported in this browser.');
      }
  }

  // Start checking the battery status every second
  const batteryCheckInterval = setInterval(updateBatteryStatus, 1000);

  // Stop checking when the Stop button is pressed
  const stopButton = document.getElementById('stopButton');
  stopButton.addEventListener('click', function () {
      clearInterval(batteryCheckInterval);
      audio.pause();
  });

  // Initial battery status update
  updateBatteryStatus();
});
