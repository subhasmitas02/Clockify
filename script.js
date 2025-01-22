const hourHand = document.getElementsByClassName('hr')[0];
const minuteHand = document.getElementsByClassName('min')[0];
const secondHand = document.getElementsByClassName('sec')[0];
const allNum = document.getElementsByClassName('number');
const clock = document.getElementsByClassName('clock')[0];
const alarmSound = document.getElementById('alarmSound');
const snoozeButton = document.getElementById('snoozeButton');
let alarmTime = null;
let snoozeTimeout = null;

// Adjust numbers on the clock face
for (let num of allNum) {
    num.style.transform = `rotate(${30 * num.innerText}deg)`;
}

// Adding tick marks on the clock
for (let count = 0; count < 60; count++) {
    const bar = document.createElement('div');
    clock.appendChild(bar);
    bar.innerText = 'I';
    bar.classList.add('bar_item');
    bar.style.transform = `rotate(${6 * count}deg)`;
    if (count % 5 == 0) {
        bar.style.color = 'rgba(40, 173, 235, 0.8)';
        bar.style.fontWeight = 'bold';
    }
}

// Update the rotation of the clock hands
const setRotation = (element, rotationRatio) => {
    element.style.setProperty('--rotation', rotationRatio * 360);
};

// Set the current time on the clock
const setClock = () => {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);

    if (alarmTime) checkAlarm(currentDate);
};

// Set an alarm
const setAlarm = () => {
    const alarmInputValue = document.getElementById('alarmTime').value;
    if (alarmInputValue) {
        alarmTime = new Date();
        const [alarmHour, alarmMinutes] = alarmInputValue.split(':');
        alarmTime.setHours(alarmHour);
        alarmTime.setMinutes(alarmMinutes);
        alarmTime.setSeconds(0);
        document.getElementById('setAlarmButton').innerText = 'Alarm Set';
        alert(`Alarm set for ${alarmHour}:${alarmMinutes}`);
    }
};

// Check if alarm needs to go off
const checkAlarm = (currentDate) => {
    if (
        alarmTime &&
        alarmTime.getHours() === currentDate.getHours() &&
        alarmTime.getMinutes() === currentDate.getMinutes()
    ) {
        alarmSound.play().catch(error => console.error('Error playing sound:', error));
        snoozeButton.style.display = 'block';
        alarmTime = null;
    }
};

// Snooze functionality
const snoozeAlarm = () => {
    const currentDate = new Date();
    alarmTime = new Date(currentDate.getTime() + 1 * 60000); // 5 minutes snooze
    alarmSound.pause(); // Stop the alarm sound
    alarmSound.currentTime = 0; // Reset the sound position
    alert('Alarm snoozed for 5 minutes');
    snoozeButton.style.display = 'none';
};

snoozeButton.addEventListener('click', snoozeAlarm);
document.getElementById('setAlarmButton').addEventListener('click', setAlarm);

setClock();
setInterval(setClock, 1000);
