class EnsembleTimer {
    /**
     * @constructor
     */
    constructor() {
        /**
         * @type {HTMLElement}
         */
        this.ensembleBtn = document.querySelector('#ensemble-btn');
        /**
         * @type {HTMLElement}
         */
        this.longBreakBtn = document.querySelector('#long-break-btn');
        /**
         * @type {HTMLElement}
         */
        this.shortBreakBtn = document.querySelector('#short-break-btn');
        /**
         * @type {HTMLElement}
         */
        this.timeDisplay = document.querySelector('#time-display');
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
        this.longBreakBtn.addEventListener("click", function () {iself.startTimer(15)});
        /**
         * @type {HTMLElement}
         */
        this.shortBreakBtn.addEventListener("click", function () {iself.startTimer(5)});
        /**
         * @type {HTMLElement}
         */
        this.ensembleBtn.addEventListener("click", function() { 
            var myList = document.getElementById("list_item").getElementsByTagName("li")
            if (myList.length < 3) {
                alert("Need more people!")
            } else {
                alert("Ensemble started!")
                iself.startTimer(10)
            }
        });
    }

    /**
     * @param seconds
     * @returns {string|*}
     */
    timePadding = (seconds) => {
        return seconds < 10 ? `0${seconds.toString()}` : seconds;
    }
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
    }
    /**
     * @param timeInMinutes
     */
    startTimer = (timeInMinutes) => {
        let iself = this;
        clearInterval(this.timeout);
        let ensembleTimeInSeconds = timeInMinutes * 60;
        this.renderTime(ensembleTimeInSeconds);
        this.timeout = setInterval(function() {
            if (ensembleTimeInSeconds > 0) {
                ensembleTimeInSeconds--;
            }
            iself.renderTime(ensembleTimeInSeconds);
        }, 1000);
    }
}

/**
 * @type {EnsembleTimer}
 */
let Timer = new EnsembleTimer();
Timer.setEventListeners();

document.getElementById("add").onclick  = function() {
    
    var node = document.createElement("Li");
    var text = document.getElementById("user_input").value; 
    var textnode=document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("list_item").appendChild(node);

}



