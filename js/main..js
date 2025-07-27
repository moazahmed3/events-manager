const btnAdd = document.querySelector("#add");
const eventName = document.querySelector("#event-name");
const eventOrganizer = document.querySelector("#event-organizer");
const date = document.querySelector("#date");
const events = document.querySelector(".events");
let eventsArr = JSON.parse(localStorage.getItem("events")) || [];

let currentDate = new Date();

setMinDate();
displayEvents();
function setMinDate() {
  const today = currentDate.toISOString().split("T")[0];
  date.min = today;
  date.addEventListener("change", () => {
    if (date.value < today) {
      date.value = today;
    }
  });
}

btnAdd.addEventListener("click", function () {
  if (eventName.value && eventOrganizer.value && date.value) {
    const event = {
      organizer: eventOrganizer.value,
      name: eventName.value,
      fullDate: date.value,
      timeSpan: new Date(date.value).getTime(),
    };
    eventsArr.push(event);
    localStorage.setItem("events", JSON.stringify(eventsArr));
    displayEvents();
    clearInput();
  } else {
    alert("Please file date");
  }
});

function displayEvents() {
  let cards = "";
  eventsArr.forEach((event, index) => {
    cards += `
         <div class="card">
        <h3>${event.name}</h3>
        <div class="box">
          <p>by</p>
          <p>${event.organizer}</p>
        </div>
        <div class="box">
          <p>on</p>
          <p>${event.fullDate}</p>
        </div>
        <div class="box">
          <p>Time Left</p>
          <p>${breakdownTimeSpan(event.timeSpan - new Date().getTime())}</p>
        </div>
        <button class="btn delete" onClick='deleteEvent(${index})' >delete</button>
      </div>`;
  });

  events.innerHTML = cards;
}

function deleteEvent(index){
      eventsArr.splice(index, 1);
      localStorage.setItem("events", JSON.stringify(eventsArr));
      displayEvents();
   
}

function breakdownTimeSpan(timeSpan) {
  if (timeSpan <= 0) return `0d 0h 0m 0s`;

  let days = Math.floor(timeSpan / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeSpan % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeSpan % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeSpan % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function clearInput() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((el) => {
    el.value = "";
  });
}
setInterval(displayEvents, 1000);
