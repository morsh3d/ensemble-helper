// Constants
const durationInMinutes = 1;

// Local Storage functions

function playSound() {
  let audio = new Audio("sounds/grandfatherclock.mp3");
  audio.play();
}

function getPeople() {
  return (
    localStorage
      .getItem("people")
      ?.split(",")
      ?.filter((x) => x) ?? []
  );
}

function addPerson(name) {
  localStorage.setItem(
    "people",
    [localStorage.getItem("people"), name].filter((x) => x).join(",")
  );
}

function removeAllPeople() {
  localStorage.setItem("people", "");
}

function setStartTime(date) {
  localStorage.setItem("start_time", date ? date.toISOString() : "");
}

function getStartTime() {
  const dateString = localStorage.getItem("start_time");
  return dateString ? new Date(dateString) : null;
}

// UI functions
function padStartWithZero(value) {
  let valueString = value.toString();
  if (valueString.length === 1) {
    valueString = `0${valueString}`;
  }

  return valueString;
}

function onFinished() {
  setStartTime(null);
  playSound();
  alert("Ensemble is over!");
}

function getDisplayTime() {
  const startTime = getStartTime();
  if (!startTime) {
    return "00:00";
  }

  const time = new Date(startTime.getTime() + durationInMinutes * 60000);
  if (new Date() > time) {
    onFinished();
    return "00:00";
  }
  let msec = time - new Date();
  const hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  const mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  const ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  return `${padStartWithZero(mm)}:${padStartWithZero(ss)}`;
}

function setText(id, text) {
  document.getElementById(id).innerText = text;
}

function renderPerson(name) {
  const node = document.createElement("Li");
  const textnode = document.createTextNode(name);
  node.appendChild(textnode);
  document.getElementById("list_item").appendChild(node);
}

function renderPeopleList() {
  document.getElementById("list_item").innerHTML = "";
  const people = getPeople();

  for (let i = 0; i < people.length; i++) {
    renderPerson(people[i]);
  }
}

function clearEnsembleList() {
  document.getElementById("roles").style.display = "none";
}

function renderEnsembleList() {
  const startTime = getStartTime();
  if (!startTime) {
    return;
  }

  const people = getPeople();
  const list = document.getElementById("list_item").getElementsByTagName("li");

  document.getElementById("roles").style.display = "block";
  setText("roles-title", "Roles");
  setText("role1", people[0] + " " + "is NAVIGATOR");
  setText("role2", people[1] + " " + "is TYPIST");
  setText("role3", people[2] + " " + "is CO-NAVIGATOR");
}

function addPersonFromInput() {
  const name = document.getElementById("user_input").value;
  addPerson(name);
  renderPerson(name);
  document.getElementById("user_input").value = "";
  document.getElementById("user_input").focus();
}

document.getElementById("add").onclick = addPersonFromInput;

document.getElementById("add").addEventListener("keypress", (event) => {
  console.log(event.key, event)
  if (event.key === "Enter") {
    addPersonFromInput();
  }
});

document.querySelector("#ensemble-btn").addEventListener("click", function () {
  const startTime = getStartTime();
  if (startTime) {
    alert("Timer is already started.");
    return;
  }

  const people = getPeople();
  if (people.length < 3) {
    alert("Need more people!\n Add at least 3 people to the list!");
  } else {
    playSound();
    alert("Ensemble started!");
    setStartTime(new Date());
    renderEnsembleList();
  }
});

document.querySelector("#reset").addEventListener("click", function () {
  setStartTime(null);
  removeAllPeople();
  renderPeopleList();
  clearEnsembleList();
});

function initialize() {
  renderPeopleList();
  renderEnsembleList();
}

setInterval(() => {
  document.querySelector("#time-display").textContent = getDisplayTime();
}, 200);

initialize();
