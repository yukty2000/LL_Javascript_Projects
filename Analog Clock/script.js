const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

var date = new Date();
let hrs = date.getHours();
let mins = date.getMinutes();
let secs = date.getSeconds();

// console.log(hrs,mins,secs);

let secPosition = secs * (360/60);
let minPosition = (mins * (360/60)) + (secPosition/60);
let hrPosition =hrs<12 ? hrs * (360/12) : (hrs-12) * (360/12); 
hrPosition += (minPosition/12);

function runTheClock()  {

    secPosition += (360/60);
    minPosition += (1/10);
    hrPosition +=(1/600);

    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";

}


var interval = setInterval(runTheClock , 1000);