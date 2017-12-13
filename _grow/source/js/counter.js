'use strict';

(function(){
  var startedWithMinutes = null;

  // This number *never* changes
  var developerSecondsSavedBeforeAnalyticIngester = 26304323354;

  // These numbers are taken from our SQL query
  var developerSecondsSavedAfterAnalyticIngester = 4292012226;
  var developerSecondsSavedPerSecond = 560;
  var timeUpdated = 1499885116;

  var odometerEl = document.getElementById('odometer');

  var calculateHours = function() {
      // get current time
     // get difference in seconds from timeUpdated
     // multiply difference in seconds by developerSecondsSavedPerSecond
     // add to sum of developerSecondsSavedBefore and After
     var currentEpoch = ((new Date()).getTime()) / 1000;
     var developerSecondsSavedSinceUpdate = (currentEpoch - timeUpdated) * developerSecondsSavedPerSecond;
     var seconds = developerSecondsSavedSinceUpdate + developerSecondsSavedBeforeAnalyticIngester + developerSecondsSavedAfterAnalyticIngester;
     var minutes = seconds / 60; // to minutes
     if (startedWithMinutes === null) {
       startedWithMinutes = minutes;
     }
     var hours = parseInt(minutes / 60); // to hours
     odometerEl.innerHTML = hours;
  }

  setTimeout(calculateHours, 50);
  setInterval(function(){
     calculateHours();
  }, 5000);
})();
