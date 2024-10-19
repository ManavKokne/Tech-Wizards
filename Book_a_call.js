let selectedSlot = "";
let timerInterval;
let notificationTimeout;

function showConfirmButton() {
    document.getElementById("confirm-call").classList.remove("hidden");
}


function selectSlot(element, time) {
    
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => slot.classList.remove('selected'));

    
    selectedSlot = time;
    element.classList.add('selected');
}


function confirmCall() {
    if (selectedSlot === "") {
        alert("Please select a slot first!");
        return;
    }

    document.getElementById("confirmation-popup").classList.remove("hidden");
    document.getElementById("cancel-call").classList.remove("hidden");
    startCountdown();
}

function cancelCall() {
    document.getElementById("confirmation-popup").classList.add("hidden");
    document.getElementById("countdown").classList.add("hidden");
    document.getElementById("cancel-call").classList.add("hidden");
    selectedSlot = "";

   
    clearInterval(timerInterval);
    clearTimeout(notificationTimeout);
    alert("Your call has been cancelled.");
}


function closePopup() {
    document.getElementById("confirmation-popup").classList.add("hidden");
}

function startCountdown() {
    document.getElementById("countdown").classList.remove("hidden");

    
    let countDownTime = new Date().getTime() + 60 * 60 * 1000;

    timerInterval = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownTime - now;

        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

     
        if (distance <= 10 * 60 * 1000 && distance > 9 * 60 * 1000) {
            showNotification();
        }

      
        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown").classList.add("hidden");
        }
    }, 1000);
}


function showNotification() {
    document.getElementById("notification-popup").classList.remove("hidden");
}


function closeNotification() {
    document.getElementById("notification-popup").classList.add("hidden");
}
