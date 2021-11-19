const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZeros(time) {
    if(time <= 9)    {
        time = "0" + time;
    }
    return time;
}


// Run a standard minute/second/hundredths timer:
function runTimer()    {
    let currentTime = leadingZeros(timer[0]) + ":" + leadingZeros(timer[1]) + ":" + leadingZeros(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
    timer[2] = Math.floor(timer[3]-(timer[1]*100) - (timer[0]*6000));
}

// Match the text entered with the provided text on the page:
function spellCheck()   {
    let textEntered = testArea.value;
    let originTextTruncate = originText.substring(0,textEntered.length);

    if(textEntered === originText) //matches test text exactly
    {
        // stop timer
        clearInterval(interval);
        // border turns green
        testWrapper.style.borderColor = "green";
        
    }
    else if(textEntered === originTextTruncate) // substring of test text
    {
        // border turns blue
        testWrapper.style.borderColor = "blue";
    }
    else   // none of the above
    {
        // border turns red
        testWrapper.style.borderColor = "red";
    }
    // console.log(textEntered);
}

// Start the timer:
function startTimer()   {
    let textEnteredLength = testArea.value.length;
    // start timer when first key is pressed only
    if(textEnteredLength === 0 && !timerRunning)
    {
        timerRunning = true;
        interval =  setInterval(runTimer,10);
    }
    // console.log(textEnteredLength);
        
}


// Reset everything:
function resetTest()    {
    // reset interval - to not set up a new interval
    clearInterval(interval);
    interval = null;

    // reset timer
    theTimer.innerHTML = "00:00:00";
    timer[0]=timer[1]=timer[2]=timer[3]=0;
    timerRunning = false;
    
    // empty testArea
    testArea.value = "";

    
    testWrapper.style.borderColor = "grey";

    //console.log("Reset button has been clicked");


}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",startTimer,false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",resetTest,false);