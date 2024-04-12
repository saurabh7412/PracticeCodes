import React, { useState } from "react";
import "../assets/Modal.css"; // Import your Modal CSS file
import EventForm from "./EventForm"; // Import your EventForm component

const Modal = ({
  date,
  events,
  onClose,
  onAddEvent,
  onDeleteEvent,
  onEditEvent,
}) => {
  const [isAddingEvent, setAddingEvent] = useState(false);
  const [editableEvent, setEditableEvent] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState("");

  const handleAddEventClick = () => {
    setAddingEvent(true);
  };

  const handleEditEventClick = (event) => {
    setEditableEvent(event);
  };

  const handleDeleteEventClick = (event) => {
    onDeleteEvent(event);
  };

  const handleNewEventSubmit = (e) => {
    e.preventDefault();
    if (newEventTitle.trim() !== "") {
      onAddEvent({ date: date.toDateString(), title: newEventTitle });
      setNewEventTitle("");
      setAddingEvent(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{date.toDateString()}</h2>
          {isAddingEvent ? (
            <form onSubmit={handleNewEventSubmit} className="add-form">
              <div className="div-1">
                <input
                  type="text"
                  placeholder="Enter event title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                />
              </div>
              <div className="div-2" style={{display:"flex",flexDirection:"column", justifyContent:"space-around", margin:"auto"}}>
                <button type="submit">Add</button>
                <button onClick={() => setAddingEvent(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <button className="add-event-button" onClick={handleAddEventClick}>
              Add New Event
            </button>
          )}
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          {events.length === 0 && <h2>No Events to Show...</h2>}
          {events.map((event) => (
            <div key={event.id} className="event">
              {editableEvent && editableEvent.id === event.id ? (
                <div className="div-1">
                  <input
                    type="text"
                    value={editableEvent.title}
                    onChange={(e) =>
                      setEditableEvent({
                        ...editableEvent,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter new title"
                  />
                  <button
                    onClick={() => {
                      onEditEvent(editableEvent);
                      setEditableEvent(null);
                    }}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="event">
                  <div>
                    <span>{event.title}</span>
                  </div>
                  <div className="eventButtons">
                    <button onClick={() => handleEditEventClick(event)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteEventClick(event)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
