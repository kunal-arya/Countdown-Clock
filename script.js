const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const button = document.querySelectorAll("[data-time]");

// setInterval countdown
let countdown;

function timer(seconds) {
    //clear any existing timer
    clearInterval(countdown);

    // Getting the current time in milli seconds
    let now = Date.now();
    
    // Adding the current Time + number of Seconds we want for the timer to run
    let then = now + seconds * 1000;
    
    // To Display the first second we start the timer
    displayTimeLeft(seconds);

    // To display the endTime 
    displayEndTime(then);
    
    countdown = setInterval(() => {
        // Calculating Number of seconds left in the counter
        const secondsLeft = Math.round((then - Date.now()) / 1000 );

        // if secondsLeft become less than zero, stop the Function
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        // display the timer
        displayTimeLeft(secondsLeft);
    },1000)
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds/3600);
    const remSec = seconds % 3600;
    const minutes = Math.floor(remSec/60);
    const remSeconds = remSec % 60;

    // Display the time in hours, minutes and seconds
    const adjustedMinute = `${minutes < 10 ? '0' : ''}${minutes}`
    display = `${hours}:${adjustedMinute}:${remSeconds < 10 ? '0' : '' }${remSeconds}`;

    // if hours == 0, just show minutes and seconds
    if(hours == 0) {
        display = `${adjustedMinute}:${remSeconds < 10 ? '0' : '' }${remSeconds}`;
    }

    // Setting the display of the current timer in timerDisplay element
    timerDisplay.textContent = display;
    
    // Setting the display of the current timer in Title
    document.title = display;
}

function displayEndTime(timeStamp) {
    // getting the end time 
    const end = new Date(timeStamp);
    // getting hours
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;

    // getting minutes
    const minute = end.getMinutes();
    const adjustedMinute = `${minute < 10 ? '0' : ''}${minute}`
    
    // Setting the endTime Element TextContent
    endTime.textContent = `Be back at ${adjustedHour}: ${adjustedMinute}`;
}

function startTimer() {
    // Getting the time from the dataset
    const seconds = parseInt(this.dataset.time);

    // starting the timer
    timer(seconds);
}


button.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
    // prevent any default behaviour like reloading the page when 
    // submitting the form
    e.preventDefault();
    
    // Get minutes from the input field
    const mins = this.minutes.value;
    
    // multiplying by 60 b/c our function timer takes seconds
    timer(mins * 60);
    // to clear the value in input field
    this.reset();
})