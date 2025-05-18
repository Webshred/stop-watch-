var hr = 0, min = 0, sec = 0, ms = 0;
var interval = null;

function startTimer() {
  if (interval === null) {
    interval = setInterval(runTimer, 10);
  }
}

function runTimer() {
  ms += 1;
  if (ms === 100) {
    ms = 0;
    sec += 1;
  }
  if (sec === 60) {
    sec = 0;
    min += 1;
  }
  if (min === 60) {
    min = 0;
    hr += 1;
  }

  document.getElementById("hr").innerText = format(hr);
  document.getElementById("min").innerText = format(min);
  document.getElementById("sec").innerText = format(sec);
  document.getElementById("ms").innerText = format(ms);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  hr = min = sec = ms = 0;
  document.getElementById("hr").innerText = "00";
  document.getElementById("min").innerText = "00";
  document.getElementById("sec").innerText = "00";
  document.getElementById("ms").innerText = "00";

  document.getElementById("laps").innerHTML = "";
  document.getElementById("laps").style.display = "none";
  document.getElementById("laph").style.display = "none";

  localStorage.removeItem("laps");
}

function lapTime() {
  var lap = format(hr) + ":" + format(min) + ":" + format(sec) + ":" + format(ms);
  var lapsList = document.getElementById("laps");

  var li = document.createElement("li");
  li.className = "list-group-item";
  li.innerText = lap;
  lapsList.appendChild(li);

  // Show heading and list
  document.getElementById("laps").style.display = "block";
  document.getElementById("laph").style.display = "block";

  var storedLaps = JSON.parse(localStorage.getItem("laps")) || [];
  storedLaps.push(lap);
  localStorage.setItem("laps", JSON.stringify(storedLaps));
}

function format(number) {
  return number < 10 ? "0" + number : number;
}

window.onload = function () {
  var storedLaps = JSON.parse(localStorage.getItem("laps")) || [];
  var lapsList = document.getElementById("laps");

  if (storedLaps.length > 0) {
    document.getElementById("laps").style.display = "block";
    document.getElementById("laph").style.display = "block";

    for (var i = 0; i < storedLaps.length; i++) {
      var li = document.createElement("li");
      li.className = "list-group-item";
      li.innerText = storedLaps[i];
      lapsList.appendChild(li);
    }
  }
};
