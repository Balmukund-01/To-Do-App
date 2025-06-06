// const eventForm = document.getElementById('eventForm');
// const eventNameInput = document.getElementById('eventName');
// const eventDateInput = document.getElementById('eventDate');
// const eventTimeInput = document.getElementById('eventTime');
// const eventLocationInput = document.getElementById('eventLocation');
// const eventsList = document.getElementById('events');

// eventForm.addEventListener('submit', createEvent);

// function createEvent(e) {
//   e.preventDefault();
//   const eventName = eventNameInput.value;
//   const eventDate = eventDateInput.value;
//   const eventTime = eventTimeInput.value;
//   const eventLocation = eventLocationInput.value;

//   if (eventName && eventDate && eventTime && eventLocation) {
//     const eventItem = document.createElement('li');
//     eventItem.innerHTML = `
//       <strong>${eventName}</strong><br>
//       Date: ${eventDate}<br>
//       Time: ${eventTime}<br>
//       Location: ${eventLocation}
//     `;
//     eventsList.appendChild(eventItem);
//     eventForm.reset();
//   }
// }


const eventForm = document.getElementById('eventForm');
const eventNameInput = document.getElementById('eventName');
const eventDateInput = document.getElementById('eventDate');
const eventTimeInput = document.getElementById('eventTime');
const eventLocationInput = document.getElementById('eventLocation');
const eventsList = document.getElementById('events');

window.addEventListener('DOMContentLoaded', loadEventsFromStorage);
eventForm.addEventListener('submit', createEvent);

function createEvent(e) {
  e.preventDefault();

  const eventName = eventNameInput.value.trim();
  const eventDate = eventDateInput.value;
  const eventTime = eventTimeInput.value;
  const eventLocation = eventLocationInput.value.trim();

  if (eventName && eventDate && eventTime && eventLocation) {
    const newEvent = {
      id: Date.now(), // unique id for event
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation
    };

    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));

    appendEventToList(newEvent);
    eventForm.reset();
  }
}

function appendEventToList(event) {
  const eventItem = document.createElement('li');
  eventItem.dataset.id = event.id;  // store event id in li attribute

  eventItem.innerHTML = `
    <strong>${event.name}</strong><br>
    Date: ${event.date}<br>
    Time: ${event.time}<br>
    Location: ${event.location}
    <button class="delete-btn" title="Delete Event">&times;</button>
  `;

  // Delete button functionality
  const deleteBtn = eventItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    deleteEvent(event.id);
  });

  eventsList.appendChild(eventItem);
}

function loadEventsFromStorage() {
  const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
  storedEvents.forEach(event => {
    appendEventToList(event);
  });
}

function deleteEvent(id) {
  let events = JSON.parse(localStorage.getItem('events')) || [];
  events = events.filter(event => event.id !== id);  // Remove event by id
  localStorage.setItem('events', JSON.stringify(events));

  // Remove from DOM
  const eventItem = eventsList.querySelector(`li[data-id="${id}"]`);
  if (eventItem) {
    eventsList.removeChild(eventItem);
  }
}
