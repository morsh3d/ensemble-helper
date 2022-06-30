class EnsembleTimer {
  /**
   * @constructor
   */
  constructor() {
    /**
     * @type {HTMLElement}
     */
    this.ensembleBtn = document.querySelector("#ensemble-btn");
    /**
     * @type {HTMLElement}
     */
    this.longBreakBtn = document.querySelector("#long-break-btn");
    /**
     * @type {HTMLElement}
     */
    this.shortBreakBtn = document.querySelector("#short-break-btn");
    /**
     * @type {HTMLElement}
     */
    this.timeDisplay = document.querySelector("#time-display");
    /**
     * @type {null | setInterval}
     */
    this.timeout = null;
  }
  setEventListeners() {
    /**
     * @type {this}
     */
    let iself = this;
    /**
     * @type {HTMLElement}
     */
    this.longBreakBtn.addEventListener("click", function () {
      iself.startTimer(15);
    });
    /**
     * @type {HTMLElement}
     */
    this.shortBreakBtn.addEventListener("click", function () {
      iself.startTimer(5);
    });
    /**
     * @type {HTMLElement}
     */
  }

  /**
   * @param seconds
   * @returns {string|*}
   */
  timePadding = (seconds) => {
    return seconds < 10 ? `0${seconds.toString()}` : seconds;
  };
  /**
   * @param seconds
   */
  renderTime = (seconds) => {
    const minutesInText = Math.floor(seconds / 60);
    const actualSeconds = seconds % 60;

    const secondsInText = this.timePadding(actualSeconds);
    const time = `${minutesInText}:${secondsInText}`;

    this.timeDisplay.textContent = time;
    document.title = `meow ${time}`;
  };
  /**
   * @param timeInMinutes
   */
  startTimer = (timeInMinutes) => {
    let iself = this;
    clearInterval(this.timeout);
    let ensembleTimeInSeconds = timeInMinutes * 60;
    this.renderTime(ensembleTimeInSeconds);
    this.timeout = setInterval(function () {
      if (ensembleTimeInSeconds > 0) {
        ensembleTimeInSeconds--;
      }
      iself.renderTime(ensembleTimeInSeconds);
    }, 1000);
  };
}

/**
 * @type {EnsembleTimer}
 */
let Timer = new EnsembleTimer();
Timer.setEventListeners();

// Local Storage functions
function getPeople() {
  return localStorage.getItem("people")?.split(",") ?? [];
}

function addPerson(name) {
  localStorage.setItem(
    "people",
    [localStorage.getItem("people"), text].filter((x) => x).join(",")
  );
}

function removeAllPeople() {
  localStorage.setItem("people", null);
}

// UI functions
function setText(id, text) {
  document.getElementById(id).innerText = text;
}

function renderPerson(name) {
  const node = document.createElement("Li");
  const text = document.getElementById("user_input").value;
  const textnode = document.createTextNode(text);
  node.appendChild(textnode);
  document.getElementById("list_item").appendChild(node);
}

function renderPeopleList() {
  document.getElementById("list_item").innerHTML = "";
  const people = getPeople();

  for (person in people) {
    renderPerson(person);
  }
}

document.getElementById("add").onclick = function () {
  const name = document.getElementById("user_input").value;
  addPerson(name);
  renderPerson(name);
};

document.querySelector("#ensemble-btn").addEventListener("click", function () {
  const people = getPeople();

  if (people.length < 3) {
    alert("Need more people!\n Add at least 3 people to the list!");
  } else {
    alert("Ensemble started!");
    iself.startTimer(10);
    console.log(people);
    const list = document
      .getElementById("list_item")
      .getElementsByTagName("li");
    // document.getElementById("people_role").innerText = list[0].innerText + " " + list[1].innerText + " " + list[2].innerText
    setText("roles-title", "Roles");
    setText("role1", people[0] + " " + "is NAVIGATOR");
    setText("role2", people[1] + " " + "is TYPIST");
    setText("role3", people[2] + " " + "is CO-NAVIGATOR");
  }
});

document.querySelector("#reset").addEventListener("click", function () {
    removeAllPeople()
    renderPeopleList()
})

function initialize() {
  renderPeopleList()
}

initialize();
